import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

import { SuperAdminStats } from "./super-admin/SuperAdminStats";
import { CompanySection } from "./super-admin/CompanySection";
import { UnitSection } from "./super-admin/UnitSection";
import { UserSection } from "./super-admin/UserSection";
import { SettingsSection } from "./super-admin/SettingsSection";
import { ModulesSection } from "./super-admin/ModulesSection";
import { AuditLogsSection } from "./super-admin/AuditLogsSection";
import { PlansSection } from "./super-admin/PlansSection";
import { SubscriptionsSection } from "./super-admin/SubscriptionsSection";
import { NotificationsSection } from "./super-admin/NotificationsSection";

interface Company {
  id: string;
  name: string;
  key: string;
  status: string;
  plan: string;
  created_at: string;
  has_units: boolean;
  max_units: number;
}

interface Unit {
  id: string;
  name: string;
  code: string;
  status: string;
  company_id: string;
  created_at: string;
}

interface User {
  id: string;
  email: string;
  nome: string;
  role: string;
  active: boolean;
  created_at: string;
}

export function SuperAdminModule() {
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState("companies");

  // Carregar dados
  useEffect(() => {
    loadCompanies();
    loadUnits();
    loadUsers();
  }, []);

  const loadCompanies = async () => {
    try {
      const { data, error } = await supabase.rpc('super_admin_get_companies');

      if (error) throw error;
      setCompanies((data as unknown as Company[]) || []);
    } catch (error) {
      console.error('Erro ao carregar franquias:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as franquias",
        variant: "destructive"
      });
    }
  };

  const loadUnits = async () => {
    try {
      const { data, error } = await supabase.rpc('super_admin_get_units');

      if (error) throw error;
      setUnits((data as unknown as Unit[]) || []);
    } catch (error) {
      console.error('Erro ao carregar unidades:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as unidades",
        variant: "destructive"
      });
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase.rpc('super_admin_get_users');

      if (error) throw error;
      setUsers((data as unknown as User[]) || []);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os usuários",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <SuperAdminStats 
        companiesCount={companies.length}
        unitsCount={units.length}
        usersCount={users.length}
      />

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-9 bg-white border-2 border-cream-modern rounded-2xl p-2 shadow-sm">
          <TabsTrigger 
            value="companies" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Franquias
          </TabsTrigger>
          <TabsTrigger 
            value="units" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Unidades
          </TabsTrigger>
          <TabsTrigger 
            value="users" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Usuários
          </TabsTrigger>
          <TabsTrigger 
            value="modules" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Módulos
          </TabsTrigger>
          <TabsTrigger 
            value="audit" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Auditoria
          </TabsTrigger>
          <TabsTrigger 
            value="plans" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Planos
          </TabsTrigger>
          <TabsTrigger 
            value="subscriptions" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Assinaturas
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Notificações
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="companies" className="space-y-6 mt-6">
          <CompanySection 
            companies={companies}
            onCompaniesChange={loadCompanies}
          />
        </TabsContent>

        <TabsContent value="units" className="space-y-6 mt-6">
          <UnitSection 
            units={units}
            companies={companies}
            onUnitsChange={loadUnits}
          />
        </TabsContent>

        <TabsContent value="users" className="space-y-6 mt-6">
          <UserSection 
            users={users}
            onUsersChange={loadUsers}
          />
        </TabsContent>

        <TabsContent value="modules" className="space-y-6 mt-6">
          <ModulesSection />
        </TabsContent>

        <TabsContent value="audit" className="space-y-6 mt-6">
          <AuditLogsSection />
        </TabsContent>

        <TabsContent value="plans" className="space-y-6 mt-6">
          <PlansSection />
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6 mt-6">
          <SubscriptionsSection />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <NotificationsSection />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <SettingsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}