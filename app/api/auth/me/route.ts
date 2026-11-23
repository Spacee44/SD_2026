import { NextResponse } from 'next/server';
import { getCurrentUser, clearSession } from '@/app/lib/auth';
import { getDb, rowToUsuario, type DbUserRow } from '@/app/lib/db';

export async function GET() {
  try {
    const user = await getCurrentUser();
    const db = getDb();
    const allUsers = (db.prepare('SELECT id, nombre, carrera, telefono, correo FROM usuarios').all() as DbUserRow[]).map(rowToUsuario);

    return NextResponse.json({
      user,
      usuarios: allUsers,
    });
  } catch (error: any) {
    console.error('Error en /api/auth/me:', error);
    return NextResponse.json({ user: null, usuarios: [] });
  }
}
