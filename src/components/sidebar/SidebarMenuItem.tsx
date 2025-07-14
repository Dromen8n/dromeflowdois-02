
import { Badge } from "@/components/ui/badge";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { MenuItem, isParentActive } from "./MenuItems";
import { useAuth } from "@/hooks/useAuth";

interface SidebarMenuItemComponentProps {
  item: MenuItem;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export function SidebarMenuItemComponent({ 
  item, 
  activeModule, 
  setActiveModule 
}: SidebarMenuItemComponentProps) {
  const { isSuperAdmin } = useAuth();
  const isActive = isParentActive(item, activeModule);

  // Verificar se o item deve ser exibido baseado nas permissões
  const shouldShowItem = () => {
    if (item.id === "super-admin") {
      return isSuperAdmin;
    }
    return true;
  };

  // Se não deve mostrar o item, retorna null
  if (!shouldShowItem()) {
    return null;
  }

  if (item.submenu) {
    return (
      <SidebarMenuItem>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={`group w-full justify-between rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-200 hover:bg-white/10 hover:text-white hover:shadow-md"
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                <span>{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className={`h-6 px-2.5 text-xs font-bold transition-colors duration-200 ${
                      isActive
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-slate-600 text-slate-200 border-slate-500"
                    }`}
                  >
                    {item.badge}
                  </Badge>
                )}
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </div>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <SidebarMenuSub className="mt-2 ml-2 border-l-2 border-slate-600">
              {item.submenu.map((subItem) => (
                <li key={subItem.id}>
                  <SidebarMenuSubButton
                    onClick={() => setActiveModule(subItem.id)}
                    className={`group w-full pl-6 pr-3 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                      activeModule === subItem.id
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-purple-500/20"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <subItem.icon className={`h-4 w-4 mr-3 transition-transform duration-200 ${activeModule === subItem.id ? 'scale-110' : 'group-hover:scale-105'}`} />
                    <span className="font-medium">{subItem.label}</span>
                  </SidebarMenuSubButton>
                </li>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => setActiveModule(item.id)}
        className={`group w-full justify-between rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${
          isActive
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
            : "text-slate-200 hover:bg-white/10 hover:text-white hover:shadow-md"
        }`}
      >
        <div className="flex items-center space-x-3">
          <item.icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
          <span>{item.label}</span>
        </div>
        {item.badge && (
          <Badge
            variant="secondary"
            className={`h-6 px-2.5 text-xs font-bold transition-colors duration-200 ${
              isActive
                ? "bg-white/20 text-white border-white/30"
                : "bg-slate-600 text-slate-200 border-slate-500"
            }`}
          >
            {item.badge}
          </Badge>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
