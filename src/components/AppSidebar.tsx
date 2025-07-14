
import { Sidebar } from "@/components/ui/sidebar";
import { AppSidebarHeader } from "./AppSidebarHeader";
import { AppSidebarMenu } from "./AppSidebarMenu";
import { AppSidebarFooter } from "./AppSidebarFooter";

interface AppSidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export function AppSidebar({ activeModule, setActiveModule }: AppSidebarProps) {
  return (
    <Sidebar className="border-r-0 bg-[#010d32]">
      <AppSidebarHeader />
      <AppSidebarMenu activeModule={activeModule} setActiveModule={setActiveModule} />
      <AppSidebarFooter />
    </Sidebar>
  );
}
