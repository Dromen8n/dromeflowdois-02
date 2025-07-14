import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  CreditCard,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Users,
  Building
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billing_cycle: string;
  max_units: number;
  max_users: number;
  features: string[];
  limitations: any;
  is_active: boolean;
}

export function PlansSection() {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    price: 0,
    billing_cycle: "monthly",
    max_units: 1,
    max_users: 5,
    features: [] as string[],
    limitations: {}
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const { data, error } = await supabase.rpc('get_franchise_plans');
      if (error) throw error;
      setPlans((data as unknown as Plan[]) || []);
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os planos",
        variant: "destructive"
      });
    }
  };

  const createPlan = async () => {
    if (!newPlan.name || newPlan.price <= 0) {
      toast({
        title: "Erro",
        description: "Nome e preço são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
    const { error } = await supabase
      .from('planos_sistema')
      .insert([{
        nome: newPlan.name,
        tipo: 'profissional' as const,
        preco: newPlan.price,
        max_unidades: newPlan.max_units,
        max_usuarios: newPlan.max_users,
        modulos_incluidos: newPlan.features,
        recursos: { 
          description: newPlan.description,
          limitations: newPlan.limitations 
        }
      }]);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Plano criado com sucesso"
      });

      setNewPlan({
        name: "",
        description: "",
        price: 0,
        billing_cycle: "monthly",
        max_units: 1,
        max_users: 5,
        features: [],
        limitations: {}
      });
      setShowCreateForm(false);
      loadPlans();
    } catch (error) {
      console.error('Erro ao criar plano:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o plano",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePlanStatus = async (planId: string, currentStatus: boolean) => {
    try {
    const { error } = await supabase
      .from('planos_sistema')
      .update({ ativo: !currentStatus })
      .eq('id', planId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Plano ${!currentStatus ? 'ativado' : 'desativado'} com sucesso`
      });

      loadPlans();
    } catch (error) {
      console.error('Erro ao atualizar plano:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o plano",
        variant: "destructive"
      });
    }
  };

  const addFeature = (feature: string) => {
    if (feature && !newPlan.features.includes(feature)) {
      setNewPlan(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
    }
  };

  const removeFeature = (index: number) => {
    setNewPlan(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Planos de Franquia</h3>
          <p className="text-muted-foreground">Gerencie os planos disponíveis para as franquias</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-modern hover:bg-blue-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Plano
        </Button>
      </div>

      {/* Create Plan Form */}
      {showCreateForm && (
        <Card className="border-2 border-dashed border-blue-modern/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Criar Novo Plano
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plan-name">Nome do Plano</Label>
                <Input
                  id="plan-name"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  placeholder="Ex: Professional"
                />
              </div>
              <div>
                <Label htmlFor="plan-price">Preço</Label>
                <Input
                  id="plan-price"
                  type="number"
                  step="0.01"
                  value={newPlan.price}
                  onChange={(e) => setNewPlan({ ...newPlan, price: parseFloat(e.target.value) })}
                  placeholder="99.00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="plan-description">Descrição</Label>
              <Textarea
                id="plan-description"
                value={newPlan.description}
                onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                placeholder="Descrição detalhada do plano"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="billing-cycle">Ciclo de Cobrança</Label>
                <Select value={newPlan.billing_cycle} onValueChange={(value) => setNewPlan({ ...newPlan, billing_cycle: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="quarterly">Trimestral</SelectItem>
                    <SelectItem value="annual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="max-units">Máx. Unidades</Label>
                <Input
                  id="max-units"
                  type="number"
                  value={newPlan.max_units}
                  onChange={(e) => setNewPlan({ ...newPlan, max_units: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="max-users">Máx. Usuários</Label>
                <Input
                  id="max-users"
                  type="number"
                  value={newPlan.max_users}
                  onChange={(e) => setNewPlan({ ...newPlan, max_users: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={createPlan} 
                disabled={loading}
                className="bg-green-modern hover:bg-green-600"
              >
                <Check className="h-4 w-4 mr-2" />
                Criar Plano
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.is_active ? 'border-green-modern' : 'border-muted opacity-60'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  {plan.name}
                </CardTitle>
                <Badge variant={plan.is_active ? "default" : "secondary"}>
                  {plan.is_active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-blue-modern">
                R$ {plan.price.toFixed(2)}
                <span className="text-sm text-muted-foreground ml-1">
                  /{plan.billing_cycle === 'monthly' ? 'mês' : plan.billing_cycle === 'quarterly' ? 'trimestre' : 'ano'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Building className="h-4 w-4 mr-2 text-blue-modern" />
                  <span>Até {plan.max_units} unidades</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-green-modern" />
                  <span>Até {plan.max_users} usuários</span>
                </div>
              </div>

              {plan.features && plan.features.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Recursos inclusos:</h4>
                  <div className="flex flex-wrap gap-1">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {plan.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{plan.features.length - 3} mais
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setEditingPlan(plan)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant={plan.is_active ? "destructive" : "default"}
                  onClick={() => togglePlanStatus(plan.id, plan.is_active)}
                >
                  {plan.is_active ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {plans.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum plano encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Crie o primeiro plano de franquia para começar
            </p>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-modern hover:bg-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Plano
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}