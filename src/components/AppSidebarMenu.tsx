
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { menuItems } from "./sidebar/MenuItems";
import { SidebarMenuItemComponent } from "./sidebar/SidebarMenuItem";
import { useAuth } from "@/components/AuthProvider";

interface AppSidebarMenuProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export function AppSidebarMenu({ activeModule, setActiveModule }: AppSidebarMenuProps) {
  const { isSuperAdmin, hasCompanyAccess } = useAuth();

  const getVisibleMenuItems = () => {
    return menuItems.filter(item => {
      // Ocultar Super Admin para usuários normais
      if (item.id === 'super-admin') return isSuperAdmin;
      
      // Mostrar módulo Franchise apenas para usuários com acesso à empresa (não Super Admin)
      if (item.id === 'franchise') return hasCompanyAccess && !isSuperAdmin;
      
      // Outros itens são visíveis por padrão (exceto para Super Admin)
      return !isSuperAdmin;
    });
  };

  return (
    <SidebarContent className="px-3 py-4">
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4 px-3">
          Menu Principal
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-1">
            {getVisibleMenuItems().map((item) => (
              <SidebarMenuItemComponent
                key={item.id}
                item={item}
                activeModule={activeModule}
                setActiveModule={setActiveModule}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
