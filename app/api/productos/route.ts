import { NextResponse } from 'next/server';
import { getDb, rowToProducto, type DbProductRow } from '@/app/lib/db';
import { getCurrentUserId } from '@/app/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');
    const busqueda = searchParams.get('q');

    const db = getDb();
    let query = 'SELECT * FROM productos WHERE 1=1';
    const params: any[] = [];

    if (categoria && categoria !== 'Todo') {
      query += ' AND categoria = ?';
      params.push(categoria);
    }

    if (busqueda && busqueda.trim()) {
      query += ' AND LOWER(nombre) LIKE ?';
      params.push(`%${busqueda.trim().toLowerCase()}%`);
    }

    query += ' ORDER BY id ASC';

    const rows = db.prepare(query).all(...params) as DbProductRow[];
    const productos = rows.map(rowToProducto);

    return NextResponse.json({ productos });
  } catch (error: any) {
    console.error('Error en GET /api/productos:', error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUserId = (await getCurrentUserId()) || 'u1';
    const body = await request.json();
    const { nombre, precio, categoria, descripcion, imagenes } = body;

    if (!nombre || !precio || !categoria) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const db = getDb();
    const insert = db.prepare(`
      INSERT INTO productos (nombre, precio, categoria, descripcion, vendedor_id, vendido, imagenes)
      VALUES (?, ?, ?, ?, ?, 0, ?)
    `);

    const imgsJson = JSON.stringify(Array.isArray(imagenes) ? imagenes : []);
    const info = insert.run(
      nombre.trim(),
      Number(precio),
      categoria,
      (descripcion || '').trim(),
      currentUserId,
      imgsJson
    );

    const created = db.prepare('SELECT * FROM productos WHERE id = ?').get(info.lastInsertRowid) as DbProductRow;

    return NextResponse.json({ ok: true, producto: rowToProducto(created) });
  } catch (error: any) {
    console.error('Error en POST /api/productos:', error);
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}
