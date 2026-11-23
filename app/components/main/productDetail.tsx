'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { enlaceWhatsApp, type Producto, type Usuario } from '../../lib/data';
import {
  alternarFavorito,
  alternarVendido,
  eliminarProducto,
  useHidratado,
  useStore,
  useUsuarioActual,
} from '../../lib/store';
import Avatar from '../ui/avatar';
import ConfirmDialog from '../ui/confirmDialog';
import PhoneShell from '../ui/phoneShell';
import ProductImage from '../ui/productImage';
import TopBar from '../ui/topBar';

export default function ProductDetail({ id }: { id: number }) {
  const { productos, usuarios, favoritos } = useStore();
  const hidratado = useHidratado();
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return (
      <PhoneShell>
        <TopBar titulo="Detalles" />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-10 text-fif-muted text-xl">
          {hidratado ? (
            <>
              <p>Esta publicación ya no existe.</p>
              <Link href="/feed" className="mt-4 text-fif-navy underline">
                Volver al inicio
              </Link>
            </>
          ) : (
            <p>Cargando…</p>
          )}
        </div>
      </PhoneShell>
    );
  }

  const vendedor = usuarios.find((u) => u.id === producto.vendedorId);

  const usuarioActual = useUsuarioActual();

  if (producto.vendedorId === usuarioActual.id) {
    return <VistaDueno producto={producto} vendedor={vendedor} />;
  }

  return (
    <VistaComprador
      producto={producto}
      vendedor={vendedor}
      esFavorito={favoritos.includes(producto.id)}
    />
  );
}

function EstadoPill({ vendido, className }: { vendido: boolean; className: string }) {
  return (
    <span
      className={`rounded-full flex items-center justify-center shrink-0 ${
        vendido ? 'bg-fif-input text-gray-600' : 'bg-fif-orange text-fif-navy'
      } ${className}`}
    >
      {vendido ? 'Vendido' : 'Disponible'}
    </span>
  );
}

// ---------- Vista de quien compra (diseño "detalles") ----------

function VistaComprador({
  producto,
  vendedor,
  esFavorito,
}: {
  producto: Producto;
  vendedor?: Usuario;
  esFavorito: boolean;
}) {
  const botonFavorito = (
    <button
      type="button"
      onClick={() => alternarFavorito(producto.id)}
      aria-pressed={esFavorito}
      aria-label={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      className="w-12 h-12 flex items-center justify-center rounded-full active:scale-90 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-fif-orange"
    >
      {esFavorito ? (
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-fif-orange" fill="currentColor" aria-hidden="true">
          <path d="M12 21s-7.5-4.6-10-9.3C.3 8.4 2.2 4 6.3 4c2.3 0 3.9 1.3 5.7 3.4C13.8 5.3 15.4 4 17.7 4c4.1 0 6 4.4 4.3 7.7C19.5 16.4 12 21 12 21z" />
        </svg>
      ) : (
        <Image src="/icons/favorite.png" alt="" width={44} height={44} />
      )}
    </button>
  );

  const mensaje = `Hola${vendedor ? ` ${vendedor.nombre.split(' ')[0]}` : ''}, me interesa tu publicación "${producto.nombre}" ($${producto.precio}) en FIF Store.`;

  return (
    <PhoneShell>
      <TopBar titulo="Detalles" accion={botonFavorito} />

      <main className="flex-grow overflow-y-auto pb-8">
        <div className="bg-fif-cream h-[300px] flex items-center justify-center overflow-hidden">
          <ProductImage producto={producto} iconSize={119} />
        </div>

        <div className="px-9 pt-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-fif-navy text-5xl">${producto.precio}</p>
            <EstadoPill vendido={producto.vendido} className="h-[47px] w-[178px] text-2xl" />
          </div>

          <h2 className="text-fif-navy text-4xl mt-5 break-words">{producto.nombre}</h2>

          <span className="inline-block mt-4 rounded-full border border-fif-navy bg-[#eaeaea] text-fif-navy text-2xl px-8 py-2">
            {producto.categoria}
          </span>

          {producto.descripcion && (
            <p className="text-fif-navy text-2xl mt-5 whitespace-pre-line break-words">
              {producto.descripcion}
            </p>
          )}

          {vendedor && (
            <Link
              href={`/vendedor/${vendedor.id}`}
              className="mt-6 flex items-center gap-3 bg-fif-cream rounded-[30px] px-3 py-5 hover:brightness-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-fif-orange"
            >
              <Avatar nombre={vendedor.nombre} className="w-16 h-16 text-2xl" />
              <div className="min-w-0">
                <p className="text-fif-navy text-base">Vendedor</p>
                <p className="text-fif-navy text-2xl truncate">{vendedor.nombre}</p>
              </div>
            </Link>
          )}

          {producto.vendido ? (
            <p className="mt-6 h-20 rounded-[30px] bg-fif-input text-gray-600 text-3xl flex items-center justify-center">
              Ya se vendió
            </p>
          ) : (
            <a
              href={vendedor ? enlaceWhatsApp(vendedor.telefono, mensaje) : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 h-20 rounded-[30px] bg-fif-orange hover:bg-fif-orange-hover text-fif-navy text-[2.5rem] flex items-center justify-center shadow-md active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-fif-navy"
            >
              Comprar
            </a>
          )}
        </div>
      </main>
    </PhoneShell>
  );
}

// ---------- Vista de quien publicó (diseño "Detalle" / "Borrar Publicacion") ----------

function VistaDueno({ producto, vendedor }: { producto: Producto; vendedor?: Usuario }) {
  const router = useRouter();
  const [confirmar, setConfirmar] = useState(false);

  return (
    <PhoneShell>
      <TopBar titulo="Detalle" fallbackHref="/perfil" />

      <main className="flex-grow overflow-y-auto pb-8">
        <div className="bg-fif-cream h-[236px] flex items-center justify-center overflow-hidden">
          <ProductImage producto={producto} iconSize={90} />
        </div>

        <div className="px-7 pt-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-fif-navy text-[2rem]">${producto.precio}</p>
            <EstadoPill vendido={producto.vendido} className="h-[33px] w-[144px] text-xl" />
          </div>

          <h2 className="text-fif-navy text-[2rem] mt-1 break-words">{producto.nombre}</h2>

          {producto.descripcion && (
            <p className="text-[#7d7d7d] text-xl mt-4 whitespace-pre-line break-words">
              {producto.descripcion}
            </p>
          )}

          <div className="mt-10 flex flex-col gap-4">
            <p className="h-[47px] rounded-[20px] bg-fif-cream text-fif-navy text-xl flex items-center px-7">
              Tú - {vendedor?.carrera ?? 'FIF'}
            </p>

            <Link
              href={`/producto/${producto.id}/editar`}
              className="h-[47px] rounded-[20px] bg-fif-orange hover:bg-fif-orange-hover text-fif-navy text-xl flex items-center gap-3 px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-fif-navy"
            >
              <Image src="/icons/edit-pencil.png" alt="" width={30} height={30} />
              Editar publicación
            </Link>

            <button
              type="button"
              onClick={() => alternarVendido(producto.id)}
              className="h-[58px] rounded-[20px] border-2 border-fif-navy bg-white text-black text-xl flex items-center justify-center gap-3 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-fif-orange"
            >
              <Image src="/icons/double-tick.png" alt="" width={28} height={28} />
              {producto.vendido ? 'Marcar como disponible' : 'Marcar como vendido'}
            </button>

            <button
              type="button"
              onClick={() => setConfirmar(true)}
              className="h-[55px] rounded-[20px] border-2 border-fif-danger bg-white text-fif-danger text-xl flex items-center justify-center gap-1 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-fif-orange"
            >
              <Image src="/icons/delete.png" alt="" width={32} height={32} />
              Eliminar
            </button>
          </div>
        </div>
      </main>

      <ConfirmDialog
        abierto={confirmar}
        titulo="Eliminar Publicación"
        mensaje="¿Seguro que quieres eliminarla?"
        onCancelar={() => setConfirmar(false)}
        onConfirmar={() => {
          eliminarProducto(producto.id);
          router.replace('/perfil');
        }}
      />
    </PhoneShell>
  );
}
