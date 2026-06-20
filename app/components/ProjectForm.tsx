'use client';

import { Divider } from 'antd';
import { useState } from 'react';

interface ProjectFormProps {
  initialData?: { 
    id?: number; 
    titulo: string; 
    descripcion: string; 
    montoObjetivo: number; 
    fechaLimite: string;
    sector: string;
    duracionEstimada: string; 
    tamanioEquipo: string; 
    complejidad: string; 
    tieneMvp: boolean; 
    tieneDocumentacion: boolean; 
    objetivosClaros: string; 
    estudioMercado: boolean;
    tieneMonetizacion: boolean; 
    tieneCompetidores: boolean; 
    experienciaSupervisor: string; 
    proyectosSimilares: string; 
  };
  isEditing?: boolean;
}

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  
  const [formData, setFormData] = useState({
    titulo: initialData?.titulo || '',
    descripcion: initialData?.descripcion || '',
    montoObjetivo: initialData?.montoObjetivo || 0,
    fechaLimite: initialData?.fechaLimite || '',
    sector: initialData?.sector || '',
    duracionEstimada: initialData?.duracionEstimada || '',
    tamanioEquipo: initialData?.tamanioEquipo || '',
    complejidad: initialData?.complejidad || '',
    tieneMvp: initialData?.tieneMvp || '',
    tieneDocumentacion: initialData?.tieneDocumentacion || '',
    objetivosClaros: initialData?.objetivosClaros || '',
    estudioMercado: initialData?.estudioMercado || '',
    tieneMonetizacion: initialData?.tieneMonetizacion || '',
    tieneCompetidores: initialData?.tieneCompetidores || '',
    experienciaSupervisor: initialData?.experienciaSupervisor || '',
    proyectosSimilares: initialData?.proyectosSimilares || '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No estás autenticado. Inicia sesión primero.');
      return;
    }

    const url = isEditing 
      ? `http://localhost:3001/projects/${initialData?.id}` 
      : 'http://localhost:3001/projects';
      
    const method = isEditing ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Inyectamos el JWT de forma obligatoria
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al procesar el proyecto');

      alert(isEditing ? '¡Proyecto actualizado!' : '¡Proyecto creado con éxito!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto p-6 rounded-lg shadow-md space-y-6">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className='flex gap-4'>
        <div>
          <label className="block text-sm font-medium text-white">Título del Proyecto</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            required
            onChange={handleChange}
            className="mt-1 text-white block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            required
            onChange={handleChange}
            rows={4}
            className="mt-1 text-white block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
      </div>


      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white">Monto Objetivo ($)</label>
          <input
            name="montoObjetivo"
            value={formData.montoObjetivo}
            required
            onChange={handleChange}
            className="mt-1 text-white block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Fecha Límite</label>
          <input
            type="date"
            name="fechaLimite"
            value={formData.fechaLimite}
            required
            onChange={handleChange}
            className="mt-1 text-white block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
      </div>
      <Divider className='bg-white' />

      <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition">
        {isEditing ? 'Guardar Cambios' : 'Crear Proyecto'}
      </button>
    </form>
  );
}