
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, AlertTriangle, Building, ArrowUp } from "lucide-react";
import ClientsTable from "./ClientsTable";

const ClientsModule = () => {
  const stats = {
    total: { value: 5, trend: "+2" },
    active: { value: 2, trend: "+1" },
    attention: { value: 2, trend: "0" },
    contracts: { value: 1, trend: "0" }
  };

  return (
    <div className="space-y-8">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-blue-modern text-white">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-blue-100">Total de Clientes</p>
              <p className="text-2xl font-bold">{stats.total.value}</p>
              <div className="flex items-center text-xs text-blue-200">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>{stats.total.trend} na semana</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-green-modern text-white">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-green-100">Clientes Ativos</p>
              <p className="text-2xl font-bold">{stats.active.value}</p>
              <div className="flex items-center text-xs text-green-200">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>{stats.active.trend} na semana</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
              <UserCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-orange-modern text-white">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-orange-100">Em Atenção</p>
              <p className="text-2xl font-bold">{stats.attention.value}</p>
              <div className="flex items-center text-xs text-orange-200">
                <span>{stats.attention.trend} na semana</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-teal-modern text-white">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-teal-100">Com Contrato</p>
              <p className="text-2xl font-bold">{stats.contracts.value}</p>
              <div className="flex items-center text-xs text-teal-200">
                <span>{stats.contracts.trend} na semana</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Building className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Componente principal da tabela */}
      <ClientsTable />
    </div>
  );
};

export default ClientsModule;
