import { NextResponse } from 'next/server';
import { getDb, rowToUsuario, type DbUserRow } from '@/app/lib/db';
import { hashPassword, setSession } from '@/app/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, correo, contrasena, carrera, telefono } = body;

    if (!nombre || !nombre.trim()) {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 });
    }

    if (!correo || !correo.trim()) {
      return NextResponse.json({ error: 'El correo institucional es obligatorio' }, { status: 400 });
    }

    const cleanEmail = correo.trim().toLowerCase();
    if (!cleanEmail.endsWith('@uaq.edu.mx') && !cleanEmail.endsWith('@alumnos.uaq.mx')) {
      return NextResponse.json(
        { error: 'Debes utilizar tu correo institucional (@uaq.edu.mx)' },
        { status: 400 }
      );
    }

    if (!contrasena || contrasena.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    const db = getDb();
    const existing = db.prepare('SELECT id FROM usuarios WHERE LOWER(correo) = ?').get(cleanEmail);
    if (existing) {
      return NextResponse.json(
        { error: 'Este correo institucional ya cuenta con una cuenta registrada' },
        { status: 409 }
      );
    }

    const newId = `u_${Date.now()}`;
    const passwordHash = hashPassword(contrasena);
    const carreraFinal = carrera?.trim() || 'Ing. en Software';
    const telefonoFinal = telefono?.trim() || '4420000000';

    const insert = db.prepare(`
      INSERT INTO usuarios (id, nombre, carrera, telefono, correo, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insert.run(newId, nombre.trim(), carreraFinal, telefonoFinal, cleanEmail, passwordHash);

    const newUser = db.prepare('SELECT * FROM usuarios WHERE id = ?').get(newId) as DbUserRow;
    await setSession(newId);

    return NextResponse.json({
      ok: true,
      user: rowToUsuario(newUser),
    });
  } catch (error: any) {
    console.error('Error en /api/auth/register:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al procesar el registro' },
      { status: 500 }
    );
  }
}
