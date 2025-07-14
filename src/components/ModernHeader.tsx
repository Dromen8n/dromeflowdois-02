
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Search, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface ModernHeaderProps {
  title: string;
  subtitle?: string;
}

export function ModernHeader({ title, subtitle }: ModernHeaderProps) {
  const { user, logout, isSuperAdmin } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Até logo!"
    });
  };
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Buscar..." 
              className="w-64 pl-10 bg-cream-modern/50 border-gray-200 focus:bg-white focus:border-blue-modern focus:ring-blue-modern/20"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="relative hover:bg-cream-modern/50">
            <Bell className="h-4 w-4 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-yellow-modern text-gray-800">
              3
            </Badge>
          </Button>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hover:bg-cream-modern/50">
              <User className="h-4 w-4 text-gray-600 mr-2" />
              <span className="text-sm">{user?.nome}</span>
            </Button>
            
            {isSuperAdmin && (
              <Badge variant="outline" className="text-xs bg-blue-modern/20 text-blue-modern border-blue-modern/30">
                Super Admin
              </Badge>
            )}
            
            <Badge variant="outline" className="text-xs bg-green-modern/20 text-green-modern border-green-modern/30">
              Online
            </Badge>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="hover:bg-red-50 hover:text-red-600"
              title="Sair do sistema"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
