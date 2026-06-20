'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Lightbulb, CheckCircle2, AlertCircle, ArrowRightCircle } from 'lucide-react';
import { getProjectById } from '../services/projects.service';
import { Project } from '../types/projects.types';

// Interfaces para el tipado de TypeScript
interface Recommendation {
  type: 'positive' | 'warning' | 'negative' | 'action';
  title: string;
  desc: string;
}

interface ProjectAnalysis {
  id: string;
  title: string;
  probability: number;
  recommendations: Recommendation[];
}

interface AnalysisDashboardProps {
  id: string;
}

export default function AnalysisDashboard({
  id,
}: AnalysisDashboardProps) {

  const [projects] = useState<ProjectAnalysis[]>([
    {
      id: 'p1',
      title: 'Bio-Purificador de Microalgas',
      probability: 88,
      recommendations: [
        {
          type: 'positive',
          title: 'Meta financiera realista',
          desc: 'Tu monto objetivo se alinea perfectamente con el promedio de financiamiento de proyectos ambientales universitarios previos. Esto mejora la confianza de los patrocinadores en un 15%.'
        },
        {
          type: 'warning',
          title: 'Tiempo de campaña extendido',
          desc: 'Quedan bastantes días. Te sugerimos acelerar las publicaciones científicas o demostraciones en el campus para mantener alto el interés de los aportantes.'
        },
        {
          type: 'action',
          title: 'Añadir prototipos visuales',
          desc: 'Los proyectos históricos de biotecnología que incluyeron esquemas visuales o videos 3D aumentaron su tasa de conversión en un 28%. Publica un render del reactor.'
        }
      ]
    },
    {
      id: 'p2',
      title: 'App de Tutoría Inteligente (UNI-Learn)',
      probability: 52,
      recommendations: [
        {
          type: 'negative',
          title: 'Falta de claridad en la descripción',
          desc: 'Proyectos en la categoría de Software suelen requerir un listado claro de tecnologías. Te recomendamos especificar qué modelo de IA estás usando.'
        },
        {
          type: 'warning',
          title: 'Tiempo restante crítico',
          desc: 'La fecha límite es demasiado cercana para el monto restante que te falta recaudar. Intenta organizar un evento relámpago en tu facultad para asegurar micro-donaciones.'
        },
        {
          type: 'positive',
          title: 'Gran cantidad de donantes iniciales',
          desc: 'Tienes una base de contribuyentes muy activa. Esto le indica al sistema que la comunidad universitaria realmente tiene la necesidad de este servicio.'
        }
      ]
    }
  ]);

  const [project, setProject] = useState<Project>()
  const [selectedProjectId, setSelectedProjectId] = useState<string>('p1');
  const [currentProject, setCurrentProject] = useState<ProjectAnalysis | undefined>(undefined);
  const [animatedProbability, setAnimatedProbability] = useState<number>(0);

  const getProject = async (id: string) => {
    const project = await getProjectById(id)
    if (project) {
      setProject(project)
    }
  }

  useEffect(() => {
    getProject(id)
    console.log(id);
  }, [id]);

  useEffect(() => {
    const project = projects.find(p => p.id === selectedProjectId);
    setCurrentProject(project);

    if (project) {
      setAnimatedProbability(0);
      const timer = setTimeout(() => {
        setAnimatedProbability(project.probability);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedProjectId, projects]);


  const circumference = 502;
  const strokeDashoffset = circumference - ((Number(project?.successScore ?? 0) / 100) * circumference);

  // Renderizar badge de diagnóstico según la probabilidad
  const renderDiagnosisBadge = (prob: number) => {
    if (prob >= 80) {
      return {
        className: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
        text: 'Alta Probabilidad de Éxito',
        desc: 'Este proyecto cumple con los estándares más altos de viabilidad observados en tesis y proyectos ganadores de financiamiento.'
      };
    } else if (prob >= 50) {
      return {
        className: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        text: 'Probabilidad Moderada',
        desc: 'Posee fundamentos sólidos pero tiene factores de riesgo detectables (ej. plazos cortos o presupuesto ligeramente elevado).'
      };
    } else {
      return {
        className: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
        text: 'Baja Probabilidad',
        desc: 'Se aconseja reestructurar la propuesta inicial. Revisa detalladamente la lista de recomendaciones técnicas de la derecha.'
      };
    }
  };

  const diagnosis = project ? renderDiagnosisBadge(project.successScore ?? 0) : null;

  return (
    <div className="w-full space-y-8">
      {/* Encabezado e Inyector de Selección */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">{project?.title}</h2>
          <p className="text-sm text-slate-400 mt-1">{project?.description}.</p>
        </div>
      </div>

      {currentProject && diagnosis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Tarjeta de Probabilidad de Éxito */}
          <div className="lg:col-span-1 bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute w-56 h-56 bg-indigo-500/5 rounded-full blur-3xl -top-10 -right-10"></div>

            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 relative z-10">
              Probabilidad de Éxito
            </h3>

            {/* Gráfico de Anillo de Progreso */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-6 relative z-10">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  className={`${Number(project?.successScore ?? 0) >= 80 ? "text-indigo-500" :
                      Number(project?.successScore ?? 0) >= 50 ? "text-yellow-300" :
                        "text-red-500"
                    } transition-all duration-1000 ease-out`}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-extrabold text-white">
                  {project?.successScore}%
                </span>
                <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider mt-1">
                  {project?.title}
                </span>
              </div>
            </div>

            {/* Diagnóstico Breve */}
            <div className="relative z-10">
              <div className={`px-3 py-1 border rounded-full text-xs font-semibold inline-block mb-3 ${diagnosis.className}`}>
                {diagnosis.text}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed px-4">
                {diagnosis.desc}
              </p>
            </div>
          </div>

          {/* Tarjeta de Recomendaciones */}
          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Recomendaciones de Optimización</h3>
                <p className="text-xs text-slate-400">Generadas mediante comparación histórica con proyectos similares y de éxito comprobado.</p>
              </div>
            </div>

            {/* Lista de Recomendaciones de IA */}
            <div className="space-y-4">
              {currentProject.recommendations.map((rec, idx) => {
                let borderTheme = "";
                let iconTheme = "";
                let IconComponent = ArrowRightCircle;

                if (rec.type === 'positive') {
                  borderTheme = "border-emerald-500/20 bg-emerald-950/10";
                  iconTheme = "bg-emerald-500/10 text-emerald-400";
                  IconComponent = CheckCircle2;
                } else if (rec.type === 'warning') {
                  borderTheme = "border-amber-500/20 bg-amber-950/10";
                  iconTheme = "bg-amber-500/10 text-amber-400";
                  IconComponent = AlertCircle;
                } else if (rec.type === 'negative') {
                  borderTheme = "border-rose-500/20 bg-rose-950/10";
                  iconTheme = "bg-rose-500/10 text-rose-400";
                  IconComponent = AlertCircle;
                } else {
                  borderTheme = "border-indigo-500/20 bg-slate-900";
                  iconTheme = "bg-indigo-500/10 text-indigo-400";
                  IconComponent = Sparkles;
                }

                return (
                  <div key={idx} className={`p-4 border ${borderTheme} rounded-xl flex items-start gap-3 transition hover:scale-[1.01] duration-200`}>
                    <div className={`p-1.5 ${iconTheme} rounded-lg shrink-0 mt-0.5`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-200">{rec.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{rec.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}