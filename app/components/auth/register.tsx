'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginUsuario } from '../../lib/store';

export default function Register() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('Ing. en Software');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const campo =
    'w-full bg-[#e8ecef] text-gray-800 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#fbb040] transition-all placeholder-[#a9a9a9] text-sm';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          carrera,
          telefono,
          correo,
          contrasena,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al crear la cuenta');
        setCargando(false);
        return;
      }

      if (data.user) {
        loginUsuario(data.user);
      }
      router.push('/feed');
    } catch (err) {
      setError('Error al comunicarse con el servidor');
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="w-full max-w-md h-screen sm:h-[850px] sm:max-h-screen bg-[#1b364c] sm:rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col sm:my-8">
        <div className="flex flex-col items-center pt-8 pb-4 px-6 shrink-0">
          <div className="bg-white w-[140px] h-[140px] rounded-[30px] shadow-lg flex items-center justify-center mb-3 p-2 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/7-removebg-preview.png"
              alt="FIF Store Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-white text-center text-[1rem] leading-snug font-medium max-w-[250px] tracking-wide">
            Compra y venta entre compañeros de la FIF
          </h2>
        </div>

        <div className="bg-white w-full flex-grow rounded-t-[40px] pt-6 pb-6 px-8 flex flex-col overflow-y-auto shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <h1 className="text-[#2d4059] text-[1.6rem] font-semibold mb-4">
            Crear tu Cuenta
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center gap-2">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form className="flex flex-col flex-grow" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="reg-nombre" className="block text-[#2d4059] text-xs font-semibold mb-1 ml-2">
                Nombre Completo
              </label>
              <input
                id="reg-nombre"
                type="text"
                required
                autoComplete="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Juan Pérez González"
                className={campo}
              />
            </div>

            <div className="mb-3 grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="reg-carrera" className="block text-[#2d4059] text-xs font-semibold mb-1 ml-2">
                  Carrera
                </label>
                <select
                  id="reg-carrera"
                  value={carrera}
                  onChange={(e) => setCarrera(e.target.value)}
                  className={`${campo} py-2.5`}
                >
                  <option value="Ing. en Software">Ing. en Software</option>
                  <option value="Lic. en Informática">Lic. en Informática</option>
                  <option value="Ing. en Computación">Ing. en Computación</option>
                  <option value="Ing. en Telecomunicaciones">Ing. en Telecomunicaciones</option>
                </select>
              </div>

              <div>
                <label htmlFor="reg-tel" className="block text-[#2d4059] text-xs font-semibold mb-1 ml-2">
                  Teléfono WhatsApp
                </label>
                <input
                  id="reg-tel"
                  type="tel"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="4421234567"
                  className={campo}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="reg-correo" className="block text-[#2d4059] text-xs font-semibold mb-1 ml-2">
                Correo institucional (@uaq.edu.mx)
              </label>
              <input
                id="reg-correo"
                type="email"
                required
                autoComplete="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tu.nombre@uaq.edu.mx"
                className={campo}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="reg-pass" className="block text-[#2d4059] text-xs font-semibold mb-1 ml-2">
                Contraseña (mínimo 6 caracteres)
              </label>
              <input
                id="reg-pass"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
                className={`${campo} tracking-widest`}
              />
            </div>

            <div className="mt-auto mb-3 flex justify-center">
              <button
                type="submit"
                disabled={cargando}
                className="w-4/5 max-w-[220px] bg-[#fbb040] hover:bg-[#f5a123] text-[#2d4059] font-bold text-base rounded-full py-3 shadow-md transition-colors active:scale-95 disabled:opacity-50"
              >
                {cargando ? 'Registrando…' : 'Registrarte'}
              </button>
            </div>

            <p className="text-center text-gray-500 text-xs">
              ¿Ya tienes cuenta?{' '}
              <Link href="/" className="text-[#2d4059] font-semibold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
