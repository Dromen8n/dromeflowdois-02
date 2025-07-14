import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const FinancialModule = () => {
  const financialData = {
    revenue: 45231,
    expenses: 28450,
    profit: 16781,
    margin: 37.1,
    cashFlow: 8920,
    pending: 5640,
    monthlyGrowth: 12.5
  };

  const accountsReceivable = [
    {
      id: 1,
      client: "Maria Silva",
      amount: 280,
      dueDate: "2024-01-20",
      status: "pending",
      overdue: false
    },
    {
      id: 2,
      client: "Empresa ABC",
      amount: 4500,
      dueDate: "2024-01-15",
      status: "overdue",
      overdue: true
    },
    {
      id: 3,
      client: "João Santos",
      amount: 350,
      dueDate: "2024-01-25",
      status: "paid",
      overdue: false
    }
  ];

  const accountsPayable = [
    {
      id: 1,
      supplier: "Produtos de Limpeza XYZ",
      amount: 1200,
      dueDate: "2024-01-18",
      status: "pending",
      category: "Material"
    },
    {
      id: 2,
      supplier: "Folha de Pagamento",
      amount: 15000,
      dueDate: "2024-01-30",
      status: "scheduled",
      category: "Pessoal"
    },
    {
      id: 3,
      supplier: "Aluguel Escritório",
      amount: 2500,
      dueDate: "2024-01-10",
      status: "paid",
      category: "Estrutura"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-modern" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-modern" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-modern" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-modern/20 text-green-modern";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "scheduled":
        return "bg-blue-modern/20 text-blue-modern";
      default:
        return "bg-yellow-modern/20 text-yellow-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
        <Badge variant="outline" className="text-sm border-blue-modern/30 text-blue-modern">
          Janeiro 2024
        </Badge>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <div className="h-8 w-8 bg-green-modern/20 rounded-lg flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-modern" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-modern">R$ {financialData.revenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-modern">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{financialData.monthlyGrowth}% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <div className="h-8 w-8 bg-orange-modern/20 rounded-lg flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-orange-modern" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-modern">R$ {financialData.expenses.toLocaleString()}</div>
            <div className="flex items-center text-xs text-orange-modern">
              <TrendingDown className="h-3 w-3 mr-1" />
              {((financialData.expenses / financialData.revenue) * 100).toFixed(1)}% da receita
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <div className="h-8 w-8 bg-blue-modern/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-blue-modern" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-modern">R$ {financialData.profit.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Margem: {financialData.margin}%
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fluxo de Caixa</CardTitle>
            <div className="h-8 w-8 bg-teal-modern/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-teal-modern" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-modern">R$ {financialData.cashFlow.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Saldo atual disponível
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visao-geral" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-cream-modern border-2 border-cream-modern">
          <TabsTrigger 
            value="visao-geral"
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white"
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger 
            value="contas-receber"
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white"
          >
            A Receber
          </TabsTrigger>
          <TabsTrigger 
            value="contas-pagar"
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white"
          >
            A Pagar
          </TabsTrigger>
          <TabsTrigger 
            value="dre"
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white"
          >
            DRE
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visao-geral" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fluxo de Caixa (30 dias)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Entradas</span>
                    <span className="font-semibold text-green-modern">R$ {financialData.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Saídas</span>
                    <span className="font-semibold text-orange-modern">R$ {financialData.expenses.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Saldo Líquido</span>
                      <span className="font-bold text-blue-modern">R$ {financialData.profit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pendências Financeiras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">A Receber (Vencido)</span>
                    <span className="font-semibold text-red-600">R$ 4.500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">A Receber (Pendente)</span>
                    <span className="font-semibold text-yellow-modern">R$ 630</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">A Pagar (Vencendo)</span>
                    <span className="font-semibold text-orange-modern">R$ 1.200</span>
                  </div>
                  <Progress value={65} className="w-full" />
                  <p className="text-xs text-muted-foreground">65% das pendências em dia</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contas-receber" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contas a Receber</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Cliente</th>
                      <th className="text-left p-4">Valor</th>
                      <th className="text-left p-4">Vencimento</th>
                      <th className="text-left p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsReceivable.map((account) => (
                      <tr key={account.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{account.client}</td>
                        <td className="p-4">R$ {account.amount.toLocaleString()}</td>
                        <td className="p-4">{new Date(account.dueDate).toLocaleDateString('pt-BR')}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(account.status)}
                            <Badge className={getStatusColor(account.status)}>
                              {account.status === 'paid' ? 'Pago' : 
                               account.status === 'overdue' ? 'Vencido' : 'Pendente'}
                            </Badge>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contas-pagar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contas a Pagar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Fornecedor</th>
                      <th className="text-left p-4">Valor</th>
                      <th className="text-left p-4">Vencimento</th>
                      <th className="text-left p-4">Categoria</th>
                      <th className="text-left p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsPayable.map((account) => (
                      <tr key={account.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{account.supplier}</td>
                        <td className="p-4">R$ {account.amount.toLocaleString()}</td>
                        <td className="p-4">{new Date(account.dueDate).toLocaleDateString('pt-BR')}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-blue-modern/30 text-blue-modern">{account.category}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(account.status)}
                            <Badge className={getStatusColor(account.status)}>
                              {account.status === 'paid' ? 'Pago' : 
                               account.status === 'scheduled' ? 'Agendado' : 'Pendente'}
                            </Badge>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dre" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>DRE - Demonstrativo de Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-modern mb-2">RECEITAS</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Serviços PF</span>
                        <span>R$ 28.500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Serviços PJ</span>
                        <span>R$ 16.731</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>TOTAL RECEITAS</span>
                        <span>R$ {financialData.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-modern mb-2">DESPESAS</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Folha de Pagamento</span>
                        <span>R$ 15.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Materiais</span>
                        <span>R$ 3.200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estrutura</span>
                        <span>R$ 4.850</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Marketing</span>
                        <span>R$ 2.100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Outros</span>
                        <span>R$ 3.300</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>TOTAL DESPESAS</span>
                        <span>R$ {financialData.expenses.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>LUCRO LÍQUIDO</span>
                    <span className="text-blue-modern">R$ {financialData.profit.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Margem de Lucro: {financialData.margin}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialModule;
