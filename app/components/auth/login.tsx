'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginUsuario } from '../../lib/store';

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Credenciales incorrectas');
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

  const usarCuentaDemo = () => {
    setCorreo('alan.rubio@uaq.edu.mx');
    setContrasena('password123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="w-full max-w-md h-screen sm:h-[850px] sm:max-h-screen bg-[#1b364c] sm:rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col sm:my-8">
        
        <div className="flex flex-col items-center pt-10 pb-6 px-6 shrink-0">
          <div className="bg-white w-[180px] h-[180px] rounded-[36px] shadow-lg flex items-center justify-center mb-4 p-2 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/7-removebg-preview.png"
              alt="FIF Store Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden text-gray-400 text-sm">Logo</div>
          </div>

          <h2 className="text-white text-center text-[1.1rem] leading-snug font-medium max-w-[250px] tracking-wide">
            Compra y venta entre compañeros de la FIF
          </h2>
        </div>

        <div className="bg-white w-full flex-grow rounded-t-[40px] pt-8 pb-8 px-8 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-y-auto">
          
          <h1 className="text-[#2d4059] text-[1.75rem] font-semibold mb-6">
            Iniciar sesión
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
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2 ml-2">
                Correo institucional
              </label>
              <input 
                type="email" 
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="correo@uaq.edu.mx"
                className="w-full bg-[#e8ecef] text-gray-800 rounded-full px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#f6a847] transition-all placeholder-gray-400 font-medium"
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 text-sm mb-2 ml-2">
                Contraseña
              </label>
              <input 
                type="password" 
                required
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="***************"
                className="w-full bg-[#e8ecef] text-gray-800 rounded-full px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#f6a847] transition-all placeholder-gray-400 font-medium tracking-widest"
              />
            </div>

            {/* Botón de acceso rápido con cuenta de prueba */}
            <div className="mb-4 text-center">
              <button
                type="button"
                onClick={usarCuentaDemo}
                className="text-xs text-[#2d4059]/70 hover:text-[#2d4059] underline"
              >
                Cargar cuenta demo (alan.rubio@uaq.edu.mx)
              </button>
            </div>

            <div className="mt-auto mb-4 flex justify-center">
              <button 
                type="submit"
                disabled={cargando}
                className="w-4/5 max-w-[250px] bg-[#fbb040] hover:bg-[#f5a123] text-[#2d4059] font-bold text-lg rounded-full py-3.5 shadow-md transition-colors active:scale-95 disabled:opacity-50"
              >
                {cargando ? 'Ingresando…' : 'Entrar'}
              </button>
            </div>

            <div className="text-center mt-2">
              <p className="text-gray-500 text-sm">
                ¿Aún no tienes cuenta?{' '}
                <Link href="/registro" className="text-[#2d4059] font-semibold hover:underline">
                  Regístrate
                </Link>
              </p>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
