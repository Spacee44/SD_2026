import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { type Categoria, type Producto, type Usuario } from './data';

const DB_PATH = path.join(process.cwd(), 'fif_store.db');

let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(DB_PATH);
    dbInstance.pragma('journal_mode = WAL');
    dbInstance.pragma('foreign_keys = ON');
    initSchema(dbInstance);
  }
  return dbInstance;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      carrera TEXT NOT NULL DEFAULT 'Ing. en Software',
      telefono TEXT NOT NULL,
      correo TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      precio REAL NOT NULL,
      categoria TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      vendedor_id TEXT NOT NULL,
      vendido INTEGER NOT NULL DEFAULT 0,
      imagenes TEXT NOT NULL DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (vendedor_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS favoritos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id TEXT NOT NULL,
      producto_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(usuario_id, producto_id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria);
    CREATE INDEX IF NOT EXISTS idx_productos_vendedor ON productos(vendedor_id);
    CREATE INDEX IF NOT EXISTS idx_favoritos_usuario ON favoritos(usuario_id);
  `);
}

// Interfaces y transformaciones
export interface DbUserRow {
  id: string;
  nombre: string;
  carrera: string;
  telefono: string;
  correo: string;
  password?: string;
  created_at?: string;
}

export interface DbProductRow {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  vendedor_id: string;
  vendido: number;
  imagenes: string;
  created_at?: string;
}

export function rowToProducto(row: DbProductRow): Producto {
  let parsedImages: string[] = [];
  try {
    parsedImages = JSON.parse(row.imagenes);
    if (!Array.isArray(parsedImages)) parsedImages = [];
  } catch {
    parsedImages = [];
  }

  return {
    id: row.id,
    nombre: row.nombre,
    precio: row.precio,
    categoria: row.categoria as Categoria,
    descripcion: row.descripcion,
    vendedorId: row.vendedor_id,
    vendido: row.vendido === 1,
    imagenes: parsedImages,
  };
}

export function rowToUsuario(row: DbUserRow): Usuario {
  return {
    id: row.id,
    nombre: row.nombre,
    carrera: row.carrera,
    telefono: row.telefono,
    correo: row.correo,
  };
}
