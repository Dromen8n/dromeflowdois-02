import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  Database,
  Shield,
  CheckCircle,
} from "lucide-react";

interface SuperAdminStatsProps {
  companiesCount: number;
  unitsCount: number;
  usersCount: number;
}

export function SuperAdminStats({ companiesCount, unitsCount, usersCount }: SuperAdminStatsProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Super Admin</h1>
          <p className="text-muted-foreground">Configurações e gerenciamento do sistema</p>
        </div>
        <Badge variant="secondary" className="bg-blue-modern/20 text-blue-modern border-blue-modern/30">
          <Shield className="h-4 w-4 mr-1" />
          Admin Mode
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-blue-modern hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Total de Franquias</p>
                <p className="text-3xl font-bold text-white">{companiesCount}</p>
              </div>
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-green-modern hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Total de Unidades</p>
                <p className="text-3xl font-bold text-white">{unitsCount}</p>
              </div>
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Database className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-yellow-modern hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Total de Usuários</p>
                <p className="text-3xl font-bold text-gray-900">{usersCount}</p>
              </div>
              <div className="h-12 w-12 bg-white/40 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-cream-modern hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Sistema</p>
                <p className="text-xl font-bold text-gray-900">Ativo</p>
              </div>
              <div className="h-12 w-12 bg-white/40 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}