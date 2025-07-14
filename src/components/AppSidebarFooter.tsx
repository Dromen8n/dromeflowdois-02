
import { SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";

export function AppSidebarFooter() {
  return (
    <SidebarFooter className="border-t border-slate-600/60 p-4">
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-xl text-slate-300 hover:text-blue-400 hover:bg-white/10 transition-all duration-200 hover:scale-110"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-xl text-slate-300 hover:text-purple-400 hover:bg-white/10 transition-all duration-200 hover:scale-110"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      <div className="text-center">
        <div className="text-xs text-slate-400 font-medium">
          Versão 2.0.0
        </div>
      </div>
    </SidebarFooter>
  );
}
