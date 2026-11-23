import { NextResponse } from 'next/server';
import { getDb, rowToUsuario, type DbUserRow } from '@/app/lib/db';
import { verifyPassword, setSession } from '@/app/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { correo, contrasena } = body;

    if (!correo || !contrasena) {
      return NextResponse.json(
        { error: 'Ingresa tu correo y contraseña' },
        { status: 400 }
      );
    }

    const cleanEmail = correo.trim().toLowerCase();
    const db = getDb();
    const user = db.prepare('SELECT * FROM usuarios WHERE LOWER(correo) = ?').get(cleanEmail) as DbUserRow | undefined;

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'El correo no está registrado en el sistema' },
        { status: 401 }
      );
    }

    const passwordValida = verifyPassword(contrasena, user.password);
    if (!passwordValida) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    await setSession(user.id);

    return NextResponse.json({
      ok: true,
      user: rowToUsuario(user),
    });
  } catch (error: any) {
    console.error('Error en /api/auth/login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al procesar el inicio de sesión' },
      { status: 500 }
    );
  }
}
