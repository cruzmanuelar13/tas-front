import ProjectForm from "@/app/components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className=" bg-slate-900 p-8">
      <div className="w-full">
        <div className="text-left mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Registrar Nuevo Proyecto
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Completa la información requerida para registrar y predecir el éxito de tu propuesta académica.
          </p>
        </div>
        
        {/* Renderizado de tu componente de Canvas */}
        <div className="bg-slate-950 py-6 px-1 rounded-2xl border border-slate-800 shadow-xl">
          <ProjectForm isEditing={false} />
        </div>
      </div>
    </div>
  );
}