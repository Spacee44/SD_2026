'use client';

// Estado global del cliente sincronizado con la Base de Datos SQLite y API REST.
import { useSyncExternalStore } from 'react';
import {
  FAVORITOS_INICIALES,
  PRODUCTOS_INICIALES,
  USUARIO_ACTUAL_ID,
  USUARIOS_INICIALES,
  type Producto,
  type Usuario,
} from './data';

type Estado = {
  productos: Producto[];
  usuarios: Usuario[];
  favoritos: number[];
  usuarioActualId: string;
};

const CLAVE = 'fif-store-v2';

const ESTADO_INICIAL: Estado = {
  productos: PRODUCTOS_INICIALES,
  usuarios: USUARIOS_INICIALES,
  favoritos: FAVORITOS_INICIALES,
  usuarioActualId: USUARIO_ACTUAL_ID,
};

let estado: Estado = ESTADO_INICIAL;
let cargado = false;
const oyentes = new Set<() => void>();

function cargar() {
  if (cargado || typeof window === 'undefined') return;
  cargado = true;

  try {
    const guardado = window.localStorage.getItem(CLAVE);
    if (guardado) {
      const parsed = JSON.parse(guardado);
      estado = {
        ...ESTADO_INICIAL,
        ...parsed,
        // Si no tiene los 100 productos en caché viejo, asegurar los iniciales
        productos: parsed.productos && parsed.productos.length >= 100 ? parsed.productos : PRODUCTOS_INICIALES,
      };
    }
  } catch {
    // Almacenamiento no disponible o datos corruptos
  }

  // Sincronizar asíncronamente con el backend SQLite
  sincronizarConBackend();
}

async function sincronizarConBackend() {
  try {
    const [resMe, resProd, resFav] = await Promise.all([
      fetch('/api/auth/me').catch(() => null),
      fetch('/api/productos').catch(() => null),
      fetch('/api/favoritos').catch(() => null),
    ]);

    let nuevoEstado = { ...estado };

    if (resMe && resMe.ok) {
      const dataMe = await resMe.json();
      if (dataMe.user) {
        nuevoEstado.usuarioActualId = dataMe.user.id;
      }
      if (dataMe.usuarios && dataMe.usuarios.length > 0) {
        nuevoEstado.usuarios = dataMe.usuarios;
      }
    }

    if (resProd && resProd.ok) {
      const dataProd = await resProd.json();
      if (dataProd.productos && dataProd.productos.length > 0) {
        nuevoEstado.productos = dataProd.productos;
      }
    }

    if (resFav && resFav.ok) {
      const dataFav = await resFav.json();
      if (Array.isArray(dataFav.favoritos)) {
        nuevoEstado.favoritos = dataFav.favoritos;
      }
    }

    actualizar(() => nuevoEstado);
  } catch (err) {
    console.error('Error sincronizando con backend:', err);
  }
}

function guardar() {
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(estado));
  } catch {
    // Espacio limitado o bloqueado
  }
}

function actualizar(fn: (e: Estado) => Estado) {
  cargar();
  estado = fn(estado);
  guardar();
  oyentes.forEach((o) => o());
}

function suscribir(oyente: () => void) {
  cargar();
  oyentes.add(oyente);
  return () => {
    oyentes.delete(oyente);
  };
}

function obtenerEstado() {
  cargar();
  return estado;
}

function obtenerEstadoServidor() {
  return ESTADO_INICIAL;
}

export function useStore(): Estado {
  return useSyncExternalStore(suscribir, obtenerEstado, obtenerEstadoServidor);
}

const noop = () => () => {};

/** `true` una vez que el cliente ya leyó datos en el navegador. */
export function useHidratado(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}

export function useUsuarioActual(): Usuario {
  const { usuarios, usuarioActualId } = useStore();
  return (
    usuarios.find((u) => u.id === usuarioActualId) ??
    usuarios.find((u) => u.id === USUARIO_ACTUAL_ID) ??
    USUARIOS_INICIALES[0]
  );
}

// ----- Acciones de Autenticación -----

export function loginUsuario(usuario: Usuario) {
  actualizar((e) => {
    const existe = e.usuarios.some((u) => u.id === usuario.id);
    const listaUsuarios = existe
      ? e.usuarios.map((u) => (u.id === usuario.id ? usuario : u))
      : [...e.usuarios, usuario];

    return {
      ...e,
      usuarioActualId: usuario.id,
      usuarios: listaUsuarios,
    };
  });
}

export async function cerrarSesion() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch (e) {
    console.error('Error al cerrar sesión:', e);
  }
  actualizar((e) => ({
    ...e,
    usuarioActualId: USUARIO_ACTUAL_ID,
  }));
}

// ----- Acciones de Productos -----

export type DatosProducto = Pick<
  Producto,
  'nombre' | 'precio' | 'categoria' | 'descripcion' | 'imagenes'
>;

export function crearProducto(datos: DatosProducto): number {
  let nuevoId = 0;
  actualizar((e) => {
    nuevoId = Math.max(Date.now(), ...e.productos.map((p) => p.id + 1));
    const nuevo: Producto = {
      ...datos,
      id: nuevoId,
      vendedorId: e.usuarioActualId,
      vendido: false,
    };
    return { ...e, productos: [nuevo, ...e.productos] };
  });

  // Guardar en la base de datos SQLite vía API
  fetch('/api/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  }).catch(console.error);

  return nuevoId;
}

export function editarProducto(id: number, datos: DatosProducto) {
  actualizar((e) => ({
    ...e,
    productos: e.productos.map((p) => (p.id === id ? { ...p, ...datos } : p)),
  }));

  fetch(`/api/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  }).catch(console.error);
}

export function alternarVendido(id: number) {
  let nuevoEstado = false;
  actualizar((e) => {
    const prod = e.productos.find((p) => p.id === id);
    if (prod) nuevoEstado = !prod.vendido;
    return {
      ...e,
      productos: e.productos.map((p) =>
        p.id === id ? { ...p, vendido: !p.vendido } : p,
      ),
    };
  });

  fetch(`/api/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vendido: nuevoEstado }),
  }).catch(console.error);
}

export function eliminarProducto(id: number) {
  actualizar((e) => ({
    ...e,
    productos: e.productos.filter((p) => p.id !== id),
    favoritos: e.favoritos.filter((f) => f !== id),
  }));

  fetch(`/api/productos/${id}`, {
    method: 'DELETE',
  }).catch(console.error);
}

export function alternarFavorito(id: number) {
  actualizar((e) => ({
    ...e,
    favoritos: e.favoritos.includes(id)
      ? e.favoritos.filter((f) => f !== id)
      : [...e.favoritos, id],
  }));

  fetch('/api/favoritos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productoId: id }),
  }).catch(console.error);
}

export function actualizarUsuarioActual(
  datos: Partial<Omit<Usuario, 'id'>>,
) {
  actualizar((e) => ({
    ...e,
    usuarios: e.usuarios.map((u) =>
      u.id === e.usuarioActualId ? { ...u, ...datos } : u,
    ),
  }));
}
