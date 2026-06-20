'use client';

import React, { useEffect, useState } from 'react';
import { BrainCircuit, LayoutGrid, PlusCircle, Wallet, Sparkles, ChartColumnIncreasing, SquareChartGantt, Bell } from 'lucide-react';
import ProjectForm from './ProjectForm';
import CreateProject from './CreateProject';

export default function Sidebar() {
  const [pathname, setPathname] = useState('/');
  const [openCreate, setOpenCreate] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  const navItems = [
    {
      label: 'Inicio',
      href: '/dashboard',
      icon: LayoutGrid,
    },
    {
      label: 'Registrar Proyecto',
      href: '/projects/new',
      icon: PlusCircle,
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: ChartColumnIncreasing,
    },
    {
      label: 'Mis proyectos',
      href: '/projects',
      icon: SquareChartGantt,
    },
    {
      label: 'Notificaciones',
      href: '/notifications',
      icon: Bell,
    },
    // {
    //   label: 'Registrar Aporte',
    //   href: '/contributions/new',
    //   icon: Wallet,
    // },
  ];

  return (
    <aside className="w-full md:w-64 bg-white py-6 px-4 flex flex-col justify-between shrink-0 md:h-screen md:sticky md:top-0 shadow-md shadow-r">
      <div>
        {/* Logo / Título del Sistema */}
        <div className="flex items-center gap-3 mb-8 select-none">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-slate-800">ImpulsaTec</h1>
            <span className="text-xs text-indigo-400 font-medium">Crowdfunding</span>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Evaluamos si el botón actual es la ruta activa
            const isActive = pathname === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Footer de la barra lateral */}
      <div className="mt-8 pt-6 border-t border-slate-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
            UI
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800">Investigador</p>
            <p className="text-[10px] text-slate-500">UNMSM</p>
          </div>
        </div>
      </div>

      <CreateProject
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
      />

      
    </aside>
  );
}