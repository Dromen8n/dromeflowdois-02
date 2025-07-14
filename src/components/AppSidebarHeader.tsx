
import { SidebarHeader } from "@/components/ui/sidebar";

export function AppSidebarHeader() {
  return (
    <SidebarHeader className="border-b border-slate-600/60 p-6">
      <div className="flex items-center space-x-3">
        <img
          src="https://nehmpbytxsvmsevrxvxa.supabase.co/storage/v1/object/public/imagenscursos//mariaflowlogo1.png"
          alt="MariaFlow Logo"
          className="h-11 w-11 object-contain"
        />
        <div>
          <h1 className="text-xl font-bold text-white">
            MariaFlow
          </h1>
          <p className="text-sm text-slate-300 font-medium">Gestão Inteligente</p>
        </div>
      </div>
    </SidebarHeader>
  );
}
