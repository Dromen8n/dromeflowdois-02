import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Building2,
  Users,
  Calendar,
  TrendingUp,
  Settings,
  CreditCard,
  Shield,
  BarChart3,
  FileText,
  Bell
} from "lucide-react";

interface FranchiseData {
  company: {
    id: string;
    name: string;
    key: string;
    plan: string;
    status: string;
    franchise_type: string;
    subscription_expires_at: string;
    max_units: number;
    has_units: boolean;
  };
  subscription: {
    plan: {
      name: string;
      price: number;
      features: string[];
    };
    status: string;
    expires_at: string;
  };
  units: Array<{
    id: string;
    name: string;
    status: string;
    compliance_status: string;
  }>;
  members: Array<{
    user: {
      nome: string;
      email: string;
    };
    role: string;
  }>;
}

export function FranchiseModule() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [franchiseData, setFranchiseData] = useState<FranchiseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (user) {
      loadFranchiseData();
    }
  }, [user]);

  const loadFranchiseData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Primeiro, precisamos encontrar a empresa do usuário
      const { data: memberData, error: memberError } = await supabase
        .from('company_members')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

      if (memberError) throw memberError;

      // Agora buscar os dados completos da franquia
      const { data, error } = await supabase.rpc('get_franchise_details', {
        p_company_id: memberData.company_id
      });

      if (error) throw error;

      setFranchiseData(data as unknown as FranchiseData);
    } catch (error) {
      console.error('Erro ao carregar dados da franquia:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados da franquia",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'non_compliant':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isSubscriptionExpiringSoon = () => {
    if (!franchiseData?.subscription?.expires_at) return false;
    const daysUntilExpiry = Math.ceil(
      (new Date(franchiseData.subscription.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!franchiseData) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Franquia não encontrada</h3>
          <p className="text-muted-foreground">
            Não foi possível carregar os dados da sua franquia
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with franchise info */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{franchiseData.company.name}</h1>
          <p className="text-muted-foreground">Painel de Gestão da Franquia</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-blue-modern/20 text-blue-modern border-blue-modern/30">
            <Building2 className="h-4 w-4 mr-1" />
            {franchiseData.company.franchise_type}
          </Badge>
          <Badge className={getStatusColor(franchiseData.company.status)}>
            {franchiseData.company.status === 'active' ? 'Ativo' : 'Suspenso'}
          </Badge>
        </div>
      </div>

      {/* Subscription warning if expiring soon */}
      {isSubscriptionExpiringSoon() && (
        <Card className="border-yellow-300 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Assinatura expirando em breve</p>
                <p className="text-sm text-yellow-600">
                  Sua assinatura expira em {formatDate(franchiseData.subscription.expires_at)}. 
                  Entre em contato para renovar.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-blue-modern">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Plano Atual</p>
                <p className="text-2xl font-bold text-white">{franchiseData.subscription?.plan?.name || franchiseData.company.plan}</p>
              </div>
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-green-modern">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Unidades Ativas</p>
                <p className="text-3xl font-bold text-white">
                  {franchiseData.units?.filter(u => u.status === 'active').length || 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-yellow-modern">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Membros da Equipe</p>
                <p className="text-3xl font-bold text-gray-900">{franchiseData.members?.length || 0}</p>
              </div>
              <div className="h-12 w-12 bg-white/40 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-cream-modern">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Conformidade</p>
                <p className="text-lg font-bold text-gray-900">
                  {franchiseData.units?.filter(u => u.compliance_status === 'compliant').length || 0}/
                  {franchiseData.units?.length || 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-white/40 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-gray-800" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white border-2 border-cream-modern rounded-2xl p-2 shadow-sm">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger 
            value="units" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Unidades
          </TabsTrigger>
          <TabsTrigger 
            value="team" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Equipe
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Relatórios
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
          >
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subscription Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Informações da Assinatura
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {franchiseData.subscription ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Plano:</span>
                      <Badge variant="outline">{franchiseData.subscription.plan.name}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Valor:</span>
                      <span className="font-medium">R$ {franchiseData.subscription.plan.price.toFixed(2)}/mês</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge className={getStatusColor(franchiseData.subscription.status)}>
                        {franchiseData.subscription.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Expira em:</span>
                      <span className="font-medium">{formatDate(franchiseData.subscription.expires_at)}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">Nenhuma assinatura ativa encontrada</p>
                )}
              </CardContent>
            </Card>

            {/* Units Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Resumo das Unidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {franchiseData.units?.length > 0 ? (
                    franchiseData.units.map((unit) => (
                      <div key={unit.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{unit.name}</p>
                          <p className="text-sm text-muted-foreground">Status: {unit.status}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getStatusColor(unit.status)}>
                            {unit.status === 'active' ? 'Ativo' : 'Inativo'}
                          </Badge>
                          <Badge className={getComplianceColor(unit.compliance_status)}>
                            {unit.compliance_status === 'compliant' ? 'Conforme' : 
                             unit.compliance_status === 'warning' ? 'Atenção' : 'Não conforme'}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhuma unidade cadastrada
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="units" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Unidades</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conteúdo das unidades será implementado aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Equipe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conteúdo da equipe será implementado aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Relatórios serão implementados aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configurações serão implementadas aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}