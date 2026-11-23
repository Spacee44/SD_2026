'use client';

import ProfileView from '../components/profile/profileView';
import { useUsuarioActual } from '../lib/store';

export default function PerfilPage() {
  const usuario = useUsuarioActual();
  return <ProfileView usuarioId={usuario.id} />;
}
