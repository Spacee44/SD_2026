'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { enlaceWhatsApp, type Producto } from '../../lib/data';
import { cerrarSesion, eliminarProducto, useHidratado, useStore, useUsuarioActual } from '../../lib/store';
import Avatar from '../ui/avatar';
import BottomNav from '../ui/bottomNav';
import ConfirmDialog from '../ui/confirmDialog';
import PhoneShell from '../ui/phoneShell';
import ProductImage from '../ui/productImage';
import TopBar from '../ui/topBar';

/**
 * Perfil de un usuario. Si es el usuario actual muestra "Mi perfil"
 * (con editar/eliminar publicaciones); si no, el perfil público con "Contactar".
 */
export default function ProfileView({ usuarioId }: { usuarioId: string }) {
  const router = useRouter();
  const { usuarios, productos } = useStore();
  const usuarioActual = useUsuarioActual();
  const hidratado = useHidratado();
  const [porEliminar, setPorEliminar] = useState<Producto | null>(null);
  const cerrarDialogo = useCallback(() => setPorEliminar(null), []);

  const esPropio = usuarioId === usuarioActual.id;
  const usuario = usuarios.find((u) => u.id === usuarioId);

  if (!usuario) {
    return (
      <PhoneShell>
        <TopBar titulo="Perfil" />
        <p className="flex-grow flex items-center justify-center text-fif-muted text-xl">
          {hidratado ? 'Este usuario no existe.' : 'Cargando…'}
        </p>
        <BottomNav />
      </PhoneShell>
    );
  }

  const suyos = productos.filter((p) => p.vendedorId === usuario.id);
  const activos = suyos.filter((p) => !p.vendido);
  const vendidos = suyos.length - activos.length;
  // En el perfil propio se ven también los vendidos para poder gestionarlos.
  const lista = esPropio ? suyos : activos;

  const accionEditar = esPropio ? (
    <Link
      href="/perfil/editar"
      aria-label="Editar perfil"
      className="w-12 h-12 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-fif-orange"
    >
      <Image src="/icons/edit-pencil-white.png" alt="" width={32} height={32} />
    </Link>
  ) : undefined;

  return (
    <PhoneShell>
      <TopBar titulo={esPropio ? 'Mi perfil' : 'Perfil'} accion={accionEditar} />

      <main className="flex-grow overflow-y-auto px-8 pt-6 pb-32">
        {/* Tarjeta de perfil */}
        <section className="relative bg-fif-cream rounded-[50px] px-6 pt-7 pb-6 flex flex-col items-center text-center">
          {esPropio && (
            <Link
              href="/favoritos"
              aria-label="Mis favoritos"
              className="absolute top-4 right-5 rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-fif-navy"
            >
              <Image src="/icons/favorite.png" alt="" width={44} height={44} />
            </Link>
          )}

          <Avatar nombre={usuario.nombre} className="w-[129px] h-[129px] text-[4rem]" />
          <h2 className="text-fif-navy text-[2rem] mt-3 leading-tight">{usuario.nombre}</h2>
          <p className="text-fif-navy text-xl">{usuario.carrera} - FIF</p>

          <dl className="w-full grid grid-cols-2 mt-3">
            <div className="flex flex-col-reverse items-center">
              <dt className="text-fif-navy text-xl">Publicaciones</dt>
              <dd className="text-black text-4xl">{activos.length}</dd>
            </div>
            <div className="flex flex-col-reverse items-center">
              <dt className="text-fif-navy text-xl">Vendidos</dt>
              <dd className="text-black text-4xl">{vendidos}</dd>
            </div>
          </dl>

          {!esPropio ? (
            <a
              href={enlaceWhatsApp(
                usuario.telefono,
                `Hola ${usuario.nombre.split(' ')[0]}, te escribo desde FIF Store.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-[240px] h-10 rounded-[20px] bg-fif-orange hover:bg-fif-orange-hover text-fif-navy text-xl flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-fif-navy"
            >
              <Image src="/icons/whatsapp.png" alt="" width={27} height={27} />
              Contactar
            </a>
          ) : (
            <button
              type="button"
              onClick={async () => {
                await cerrarSesion();
                router.push('/');
              }}
              className="mt-4 px-6 py-2 rounded-full border border-fif-navy/30 text-fif-navy text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
            >
              Cerrar sesión
            </button>
          )}
        </section>

        {/* Publicaciones */}
        <h3 className="text-fif-navy text-[2rem] mt-5 mb-3">
          {esPropio ? 'Mis Publicaciones' : 'Publicaciones'}
        </h3>

        {lista.length === 0 ? (
          <p className="text-center text-fif-muted text-xl mt-8">
            {esPropio ? (
              <>
                Aún no publicas nada.{' '}
                <Link href="/vender" className="text-fif-navy underline">
                  Publica tu primer producto
                </Link>
              </>
            ) : (
              'Este vendedor no tiene publicaciones disponibles.'
            )}
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {lista.map((p) => (
              <li
                key={p.id}
                className="relative bg-white border border-fif-border rounded-[50px] min-h-[135px] px-4 py-4 flex items-center gap-4"
              >
                <Link
                  href={`/producto/${p.id}`}
                  className="flex items-center gap-4 flex-grow min-w-0 rounded-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-fif-orange"
                >
                  <div className="w-[98px] h-[103px] shrink-0 bg-fif-cream rounded-[30px] flex items-center justify-center overflow-hidden">
                    <ProductImage producto={p} iconSize={52} />
                  </div>
                  <div className="min-w-0 text-black text-2xl leading-snug">
                    <p className="break-words">{p.nombre}</p>
                    <p>${p.precio}</p>
                    {p.vendido && <p className="text-base text-fif-muted">Vendido</p>}
                  </div>
                </Link>

                {esPropio && (
                  <div className="flex items-center self-end gap-1 shrink-0">
                    <Link
                      href={`/producto/${p.id}/editar`}
                      aria-label={`Editar ${p.nombre}`}
                      className="p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-fif-orange"
                    >
                      <Image src="/icons/edit-pencil.png" alt="" width={28} height={28} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setPorEliminar(p)}
                      aria-label={`Eliminar ${p.nombre}`}
                      className="p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-fif-orange"
                    >
                      <Image src="/icons/delete.png" alt="" width={32} height={32} />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>

      <BottomNav />

      <ConfirmDialog
        abierto={porEliminar !== null}
        titulo="Eliminar Publicación"
        mensaje="¿Seguro que quieres eliminarla?"
        onCancelar={cerrarDialogo}
        onConfirmar={() => {
          if (porEliminar) eliminarProducto(porEliminar.id);
          setPorEliminar(null);
        }}
      />
    </PhoneShell>
  );
}
