
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp,
  Target,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  UserCheck,
  Timer,
  BarChart3
} from "lucide-react";

export function ModernDashboard() {
  return (
    <div className="space-y-8 p-6">
      {/* Modern Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-yellow-modern hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Total de Franqueados</p>
                <p className="text-3xl font-bold text-gray-900">128</p>
                <div className="flex items-center text-gray-700 text-sm mt-2">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +12% este mês
                </div>
              </div>
              <div className="h-16 w-16 bg-white/40 rounded-2xl flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-blue-modern hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Faturamento Total</p>
                <p className="text-3xl font-bold text-white">R$ 1,2M</p>
                <div className="flex items-center text-white/90 text-sm mt-2">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +8,5% este mês
                </div>
              </div>
              <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-green-modern hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Serviços Realizados</p>
                <p className="text-3xl font-bold text-white">5,842</p>
                <div className="flex items-center text-white/90 text-sm mt-2">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +15% este mês
                </div>
              </div>
              <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Activity className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-cream-modern hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Satisfação do Cliente</p>
                <p className="text-3xl font-bold text-gray-900">4.9/5</p>
                <div className="flex items-center text-gray-700 text-sm mt-2">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +0.2 este mês
                </div>
              </div>
              <div className="h-16 w-16 bg-white/40 rounded-2xl flex items-center justify-center">
                <Star className="h-8 w-8 text-gray-800" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-yellow-modern/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-yellow-modern" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">2,845</p>
              <p className="text-sm text-gray-600 mb-3">Clientes Ativos</p>
              <div className="flex items-center text-green-modern text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                12% este mês
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-blue-modern/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-modern" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">R$ 458K</p>
              <p className="text-sm text-gray-600 mb-3">Faturamento Mensal</p>
              <div className="flex items-center text-green-modern text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                8% este mês
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-green-modern/20 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-modern" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">1,248</p>
              <p className="text-sm text-gray-600 mb-3">Agendamentos</p>
              <div className="flex items-center text-green-modern text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                5% este mês
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-yellow-modern/20 rounded-xl flex items-center justify-center">
                <Timer className="h-6 w-6 text-yellow-modern" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">3.5h</p>
              <p className="text-sm text-gray-600 mb-3">Tempo Médio de Serviço</p>
              <div className="flex items-center text-yellow-modern text-sm">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                10% este mês
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Taxa de Conversão</p>
              <p className="text-4xl font-bold text-gray-900 mb-4">68%</p>
            </div>
            <div className="text-green-modern text-sm">
              <ArrowUpRight className="h-4 w-4 inline mr-1" />
              5% em relação ao mês anterior
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Ticket Médio</p>
              <p className="text-4xl font-bold text-gray-900 mb-4">R$ 245</p>
            </div>
            <div className="text-green-modern text-sm">
              <ArrowUpRight className="h-4 w-4 inline mr-1" />
              8% em relação ao mês anterior
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Taxa de Retenção</p>
              <p className="text-4xl font-bold text-gray-900 mb-4">92%</p>
            </div>
            <div className="text-green-modern text-sm">
              <ArrowUpRight className="h-4 w-4 inline mr-1" />
              2% em relação ao mês anterior
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Reclamações</p>
              <p className="text-4xl font-bold text-gray-900 mb-4">1.2%</p>
            </div>
            <div className="text-yellow-modern text-sm">
              <ArrowDownRight className="h-4 w-4 inline mr-1" />
              0.5% em relação ao mês anterior
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-yellow-modern hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-gray-900 text-lg">Desempenho de Vendas</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-900">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm opacity-90">Meta Mensal</p>
                <p className="text-xl font-bold">R$ 500.000</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Realizado</p>
                <p className="text-xl font-bold">R$ 458.750</p>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Progresso</span>
                <span className="text-sm font-bold">92%</span>
              </div>
              <Progress value={92} className="h-2 bg-white/20" />
            </div>
            <p className="text-sm opacity-90">Faltam 8 dias para o fim do mês</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-blue-modern hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">Expansão da Rede</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm opacity-90">Meta Anual</p>
                <p className="text-xl font-bold">50 Franquias</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Atual</p>
                <p className="text-xl font-bold">42 Franquias</p>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Progresso</span>
                <span className="text-sm font-bold">84%</span>
              </div>
              <Progress value={84} className="h-2 bg-white/20" />
            </div>
            <p className="text-sm opacity-90">4 novas franquias em negociação</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-green-modern hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">Satisfação do Cliente</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm opacity-90">Meta</p>
                <p className="text-xl font-bold">4.8/5.0</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Atual</p>
                <p className="text-xl font-bold">4.9/5.0</p>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Progresso</span>
                <span className="text-sm font-bold">102%</span>
              </div>
              <Progress value={100} className="h-2 bg-white/20" />
            </div>
            <div className="flex justify-between text-sm opacity-90">
              <span>5 estrelas: 92%</span>
              <span>4 estrelas: 6%</span>
              <span>≤ 3 estrelas: 2%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-cream-modern rounded-2xl p-2 shadow-sm">
          <TabsTrigger value="geral" className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern">
            Análise Geral
          </TabsTrigger>
          <TabsTrigger value="clientes" className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern">
            Clientes
          </TabsTrigger>
          <TabsTrigger value="profissionais" className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern">
            Profissionais
          </TabsTrigger>
          <TabsTrigger value="comercial" className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern">
            Comercial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-modern" />
                  Performance Geral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Crescimento Mensal</span>
                    <Badge variant="secondary" className="bg-green-modern/20 text-green-modern border-green-modern/30">+15.3%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Satisfação Média</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-modern mr-1" />
                      <span className="font-semibold">4.8</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Taxa de Retenção</span>
                    <Badge variant="secondary" className="bg-blue-modern/20 text-blue-modern border-blue-modern/30">87%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Resumo de Agendamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 text-blue-modern mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Agendamentos</h3>
                  <p className="text-gray-600 mb-6">Acesse o módulo de agendamentos para visualizar todos os compromissos</p>
                  <Button className="bg-blue-modern hover:bg-blue-600">
                    Ver Agendamentos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clientes" className="space-y-6 mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: "Atendidos", value: "245", color: "blue" },
              { title: "Novos", value: "18", color: "green" },
              { title: "Recorrentes", value: "156", color: "yellow" },
              { title: "Não Retornaram", value: "23", color: "red" },
              { title: "Novos PF", value: "12", color: "orange" },
              { title: "Novos PJ", value: "6", color: "indigo" },
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profissionais" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: "Ativas", value: "34", color: "green" },
              { title: "Inativas", value: "8", color: "gray" },
              { title: "Novas", value: "5", color: "blue" },
              { title: "Em Ativação", value: "3", color: "yellow" },
              { title: "Inativadas", value: "2", color: "red" },
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comercial" className="space-y-6 mt-6">
          <div className="text-center py-12">
            <div className="mx-auto max-w-md">
              <TrendingUp className="h-16 w-16 text-blue-modern mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Pipeline de Vendas</h3>
              <p className="text-gray-600 mb-6">Acesse o módulo comercial para visualizar o Kanban completo do pipeline de vendas</p>
              <Button className="bg-blue-modern hover:bg-blue-600">
                Ir para Comercial
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
