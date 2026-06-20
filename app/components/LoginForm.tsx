'use client';

import { Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {

  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');

      localStorage.setItem('token', data.access_token);
      document.cookie = `token=${data.access_tokenreg}; path=/; max-age=86400`;
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] lg:w-[30%] mx-auto px-6 py-12 bg-[#020618] rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-white text-left">Iniciar Sesión</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Correo Electrónico</label>
        <div className="relative">
          <Mail className="absolute left-3 top-4 text-slate-500" size={18} />
          <input required type="email" name="email" 
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
            onChange={handleChange} 
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Contraseña</label>
        <div className="relative">
          <Lock className="absolute left-3 top-4 text-slate-500" size={18} />
          <input required type="password" name="password" 
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
            onChange={handleChange} 
          />
        </div>
      </div>

      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-md  transition font-bold">
        Ingresar
      </button>
      <div className="">
        <a 
          href="/register" 
          className="text-white hover:text-indigo-400 transition-colors cursor-pointer"
        >
          ¿No tienes cuenta? <span className="underline font-semibold">Regístrate</span>
        </a>
      </div>
    </form>
  );
}