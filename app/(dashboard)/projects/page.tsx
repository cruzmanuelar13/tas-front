'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Sparkles, FolderOpen, AlertCircle, CheckCircle2, User, UserRound, Trash } from 'lucide-react';
import PaypalButton from '@/app/components/PaypalButton';
import { getAllProjects, getAllProjectsById } from '@/app/services/projects.service';
import { Project } from '@/app/types/projects.types';
import { ConfigProvider, notification, Segmented } from 'antd';
import { useRouter } from 'next/navigation';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function Projects() {

  const [api, contextHolder] = notification.useNotification();

  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("")

  const getDaysRemaining = (deadlineStr: string) => {

    const deadlineDate = new Date(deadlineStr);
    const today = new Date();

    const diffTime = deadlineDate.getTime() - today.getTime();

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return `${diffDays} días restantes`;
    }

    if (diffDays === 0) {
      return 'Expira hoy';
    }

    return `Expirado hace ${Math.abs(diffDays)} días`;
  };

  const handleFavorite = (id: number) => {
    let favorite = false;

    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === id) {
          favorite = !project.isFavorite;

          return {
            ...project,
            isFavorite: favorite,
          };
        }

        return project;
      })
    );

    openNotificationWithIcon("success", favorite);
  };

  const getProjects = async () => {
    const data = await getAllProjectsById()

    if (data) {
      setProjects(data)
    }
  }

  const openNotificationWithIcon = (type: NotificationType, added: boolean = true) => {
    api[type]({
      title: 'Interes actualizado',
      description: `El projecto ha sido ${added ? "agregado a" : "removido de"} favoritos`,
      className: 'custom-notification',
    });
  };



  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div className="w-full p-8">
      {contextHolder}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Tus proyectos
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Mantente al tanto de las novedades de tus proyectos y contribuciones.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </span>
        </div>
      </div>

      {(() => {
        const now = new Date();
        const filteredProjects =
          filter === 'Alto potencial' ? projects.filter((p) => (p.successScore ?? 0) > 79) :
            filter === 'Cerrados' ? projects.filter((p) => new Date(p.deadLine) < now) :
              filter === 'Complejos' ? projects.filter((p) => p.complexity === 'HIGH') :
                projects;


        return filteredProjects.length === 0 ? (
          <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center">
            <FolderOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No tienes proyectos registrados en este momento.</p>
            <p className="text-xs text-slate-500 mt-1">Registra en la sección correspondiente para comenzar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const progressPercent = Math.min(
                Math.round((project.raised / project.budget) * 100),
                100
              );
              const daysLabel = getDaysRemaining(project.deadLine);

              return (
                <div
                  key={project.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-lg">
                        <UserRound size={16} />
                        <span className='text-[14px]'>{project.teamSize ?? "?"}</span>
                      </span>
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {daysLabel}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-white mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-900">
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                        <span className="text-slate-500 uppercase tracking-wider">
                          Objetivo Recaudado
                        </span>
                        <span className="text-indigo-400">
                          ${project.raised.toLocaleString()} / ${project.budget.toLocaleString()} ({progressPercent}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div
                          className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-white'>Contribuir:</span>
                      <PaypalButton
                      key={project.id}
                      projectId={(project.id).toString()}
                    />
                    </div>

                    <button
                      onClick={() => router.push(`/analysis/${project.id}`)}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      Ver Predicción de Éxito
                    </button>
                    <div className='flex justify-end'>
                      <Trash className='text-red-500! text-md cursor-not-allowed'/>
                      {/* {project.isFavorite ? (
                        <HeartFilled
                          onClick={() => handleFavorite(project.id)}
                          className="text-red-500! text-xl cursor-pointer"
                        />
                      ) : (
                        <HeartOutlined
                          onClick={() => handleFavorite(project.id)}
                          className="text-red-500! text-xl cursor-pointer"
                        />
                      )} */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}