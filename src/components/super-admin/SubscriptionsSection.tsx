import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  CreditCard,
  Calendar,
  Building2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp
} from "lucide-react";

interface Subscription {
  id: string;
  company_id: string;
  plan_id: string;
  status: string;
  starts_at: string;
  expires_at: string;
  auto_renew: boolean;
  payment_data: any;
  plan: {
    name: string;
    price: number;
    billing_cycle: string;
  };
  company: {
    name: string;
    key: string;
  };
}

export function SubscriptionsSection() {
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    revenue: 0
  });

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      
      // Buscar assinaturas com joins
      const { data: subscriptionsData, error } = await supabase
        .from('franchise_subscriptions')
        .select(`
          *,
          franchise_plans (
            name,
            price,
            billing_cycle
          ),
          companies (
            name,
            key
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedData = subscriptionsData?.map(sub => ({
        id: sub.id,
        company_id: sub.company_id,
        plan_id: sub.plan_id,
        status: sub.status,
        starts_at: sub.starts_at,
        expires_at: sub.expires_at,
        auto_renew: sub.auto_renew,
        payment_data: sub.payment_data,
        plan: {
          name: sub.franchise_plans?.name || 'N/A',
          price: sub.franchise_plans?.price || 0,
          billing_cycle: sub.franchise_plans?.billing_cycle || 'monthly'
        },
        company: {
          name: sub.companies?.name || 'N/A',
          key: sub.companies?.key || 'N/A'
        }
      })) || [];

      setSubscriptions(formattedData);

      // Calcular estatísticas
      const totalSubs = formattedData.length;
      const activeSubs = formattedData.filter(sub => sub.status === 'active').length;
      const expiredSubs = formattedData.filter(sub => 
        new Date(sub.expires_at) < new Date() || sub.status === 'expired'
      ).length;
      const revenue = formattedData
        .filter(sub => sub.status === 'active')
        .reduce((total, sub) => total + sub.plan.price, 0);

      setStats({
        total: totalSubs,
        active: activeSubs,
        expired: expiredSubs,
        revenue: revenue
      });

    } catch (error) {
      console.error('Erro ao carregar assinaturas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as assinaturas",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'expired':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'suspended':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isExpiringSoon = (expiresAt: string) => {
    const daysUntilExpiry = Math.ceil(
      (new Date(expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-foreground">Assinaturas</h3>
        <p className="text-muted-foreground">Acompanhe todas as assinaturas ativas e histórico</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-blue-modern">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Total de Assinaturas</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
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
                <p className="text-sm font-medium text-white/80 mb-1">Assinaturas Ativas</p>
                <p className="text-3xl font-bold text-white">{stats.active}</p>
              </div>
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-yellow-modern">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Expiradas</p>
                <p className="text-3xl font-bold text-gray-900">{stats.expired}</p>
              </div>
              <div className="h-12 w-12 bg-white/40 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-gray-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-cream-modern">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Receita Mensal</p>
                <p className="text-2xl font-bold text-gray-900">R$ {stats.revenue.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 bg-white/40 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-gray-800" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Lista de Assinaturas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions.map((subscription) => (
              <div 
                key={subscription.id} 
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  isExpiringSoon(subscription.expires_at) ? 'border-yellow-300 bg-yellow-50' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(subscription.status)}
                    <div>
                      <p className="font-medium">{subscription.company.name}</p>
                      <p className="text-sm text-muted-foreground">{subscription.company.key}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {subscription.plan.name}
                    </Badge>
                    <span className="text-sm font-medium">
                      R$ {subscription.plan.price.toFixed(2)}/{subscription.plan.billing_cycle === 'monthly' ? 'mês' : 'ano'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">Expira em</p>
                    <p className={`text-sm ${
                      isExpiringSoon(subscription.expires_at) 
                        ? 'text-yellow-600 font-medium' 
                        : 'text-muted-foreground'
                    }`}>
                      {formatDate(subscription.expires_at)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge 
                      className={`${getStatusColor(subscription.status)} border-0`}
                    >
                      {subscription.status === 'active' ? 'Ativo' : 
                       subscription.status === 'expired' ? 'Expirado' :
                       subscription.status === 'suspended' ? 'Suspenso' : 'Cancelado'}
                    </Badge>
                    
                    {subscription.auto_renew && subscription.status === 'active' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Auto-renovação
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {subscriptions.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma assinatura encontrada</h3>
              <p className="text-muted-foreground">
                As assinaturas aparecerão aqui conforme as franquias se cadastram
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}