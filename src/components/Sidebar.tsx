
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  TrendingUp, 
  DollarSign,
  Building2
} from "lucide-react";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Sidebar = ({ activeModule, setActiveModule }: SidebarProps) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Visão Geral",
      icon: LayoutDashboard,
    },
    {
      id: "comercial",
      label: "Comercial",
      icon: TrendingUp,
    },
    {
      id: "clientes",
      label: "Clientes",
      icon: Users,
    },
    {
      id: "profissionais",
      label: "Profissionais",
      icon: UserCheck,
    },
    {
      id: "financeiro",
      label: "Financeiro",
      icon: DollarSign,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-modern to-green-modern">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-xl font-bold text-white">FranquiaMax</h1>
            <p className="text-sm text-white/80">Gestão Inteligente</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeModule === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start text-left font-medium transition-all duration-200",
              activeModule === item.id 
                ? "bg-blue-modern text-white shadow-md hover:bg-blue-600" 
                : "text-gray-700 hover:bg-cream-modern/50 hover:text-gray-900"
            )}
            onClick={() => setActiveModule(item.id)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 bg-cream-modern/30">
        <div className="text-xs text-gray-500 text-center">
          Versão 1.0.0 • Lovable
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
