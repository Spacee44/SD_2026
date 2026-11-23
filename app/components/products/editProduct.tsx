'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { editarProducto, useHidratado, useStore, useUsuarioActual } from '../../lib/store';
import PhoneShell from '../ui/phoneShell';
import TopBar from '../ui/topBar';
import ProductForm from './productForm';

export default function EditProduct({ id }: { id: number }) {
  const router = useRouter();
  const hidratado = useHidratado();
  const usuarioActual = useUsuarioActual();
  const { productos } = useStore();
  const producto = productos.find((p) => p.id === id);
  const esMio = producto?.vendedorId === usuarioActual.id;

  return (
    <PhoneShell>
      <TopBar titulo="Editar Publicación" fallbackHref={`/producto/${id}`} />
      <main className="flex-grow overflow-y-auto">
        {!hidratado ? (
          <p className="text-center text-fif-muted text-xl mt-24">Cargando…</p>
        ) : !producto || !esMio ? (
          <div className="text-center text-fif-muted text-xl mt-24 px-10">
            <p>No puedes editar esta publicación.</p>
            <Link href="/perfil" className="mt-4 inline-block text-fif-navy underline">
              Ir a mi perfil
            </Link>
          </div>
        ) : (
          <ProductForm
            // `key` reinicia el formulario si cambia la publicación
            key={producto.id}
            inicial={producto}
            textoBoton="Guardar Cambios"
            onGuardar={(datos) => {
              editarProducto(producto.id, datos);
              router.replace(`/producto/${producto.id}`);
            }}
          />
        )}
      </main>
    </PhoneShell>
  );
}
