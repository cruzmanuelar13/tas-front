import { Bell, EllipsisVertical } from 'lucide-react'
import React from 'react'

const Notifications = () => {

  const notifications = [
    {
      text: "Tu proyecto Sistema de prediccion de proyectos ha recibido un nuevo porcentaje de exito",
      date: "2:30pm"
    },
    {
      text: "El usuario proyecto@gmail.com ha realizado un aporte de 40$ al proyecto EduBot AI",
      date: "Hace 3 dias"
    },
    {
      text: "El proyecto MediConnect ha llegado a su total de financiamiento",
      date: "Hace 5 dias"
    },
  ]

  return (
    <div className="w-full p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Notificaciones
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Monitorera la recaudación, tiempos de campaña y edita.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </span>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        {
          notifications.map((noti) => {
            return (
              <div className='bg-[#020618] p-2 rounded-md flex justify-between py-6'>
                <div>
                  <Bell className='text-white h-5' />
                </div>
                <div className='text-white text-left flex justify-start w-full px-4'>
                  {noti.text}
                </div>
                <div className='flex w-30 items-center justify-end'>
                  <span className='text-white text-xs'>{noti.date}</span>
                  <EllipsisVertical className='text-white' />
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Notifications