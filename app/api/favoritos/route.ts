import { NextResponse } from 'next/server';
import { getDb } from '@/app/lib/db';
import { getCurrentUserId } from '@/app/lib/auth';

export async function GET() {
  try {
    const userId = (await getCurrentUserId()) || 'u1';
    const db = getDb();
    const rows = db.prepare('SELECT producto_id FROM favoritos WHERE usuario_id = ?').all(userId) as { producto_id: number }[];
    const favoritos = rows.map((r) => r.producto_id);

    return NextResponse.json({ favoritos });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error al consultar favoritos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = (await getCurrentUserId()) || 'u1';
    const body = await request.json();
    const { productoId } = body;

    if (!productoId) {
      return NextResponse.json({ error: 'productoId es requerido' }, { status: 400 });
    }

    const db = getDb();
    const existing = db.prepare('SELECT id FROM favoritos WHERE usuario_id = ? AND producto_id = ?').get(userId, productoId);

    let esFavorito = false;
    if (existing) {
      db.prepare('DELETE FROM favoritos WHERE usuario_id = ? AND producto_id = ?').run(userId, productoId);
      esFavorito = false;
    } else {
      db.prepare('INSERT INTO favoritos (usuario_id, producto_id) VALUES (?, ?)').run(userId, productoId);
      esFavorito = true;
    }

    const rows = db.prepare('SELECT producto_id FROM favoritos WHERE usuario_id = ?').all(userId) as { producto_id: number }[];
    return NextResponse.json({ ok: true, esFavorito, favoritos: rows.map((r) => r.producto_id) });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error al alternar favorito' }, { status: 500 });
  }
}
