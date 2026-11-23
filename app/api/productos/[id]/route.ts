import { NextResponse } from 'next/server';
import { getDb, rowToProducto, type DbProductRow } from '@/app/lib/db';
import { getCurrentUserId } from '@/app/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const row = db.prepare('SELECT * FROM productos WHERE id = ?').get(id) as DbProductRow | undefined;

    if (!row) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ producto: rowToProducto(row) });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error al consultar producto' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = getDb();

    // Puede actualizar vendido o datos generales
    if (body.vendido !== undefined) {
      db.prepare('UPDATE productos SET vendido = ? WHERE id = ?').run(
        body.vendido ? 1 : 0,
        id
      );
    } else {
      const { nombre, precio, categoria, descripcion, imagenes } = body;
      const imgsJson = JSON.stringify(Array.isArray(imagenes) ? imagenes : []);
      db.prepare(`
        UPDATE productos
        SET nombre = COALESCE(?, nombre),
            precio = COALESCE(?, precio),
            categoria = COALESCE(?, categoria),
            descripcion = COALESCE(?, descripcion),
            imagenes = COALESCE(?, imagenes)
        WHERE id = ?
      `).run(nombre, precio ? Number(precio) : null, categoria, descripcion, imgsJson, id);
    }

    const updated = db.prepare('SELECT * FROM productos WHERE id = ?').get(id) as DbProductRow;
    return NextResponse.json({ ok: true, producto: rowToProducto(updated) });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    db.prepare('DELETE FROM productos WHERE id = ?').run(id);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
  }
}
