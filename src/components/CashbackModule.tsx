import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Gift, TrendingUp, Users, History, Settings } from "lucide-react";

const CashbackModule = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const clientsData = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria.silva@email.com",
      points: 1200,
      rescueValue: "R$ 120,00",
      status: "Ativo",
      dueDate: "14/11/2024"
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao.santos@email.com",
      points: 850,
      rescueValue: "R$ 85,00",
      status: "Próximo ao Vencimento",
      dueDate: "29/06/2024"
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana.costa@email.com",
      points: 0,
      rescueValue: "R$ 0,00",
      status: "Vencido",
      dueDate: "19/05/2024"
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      points: 2400,
      rescueValue: "R$ 240,00",
      status: "Ativo",
      dueDate: "30/12/2024"
    },
    {
      id: 5,
      name: "Empresa XYZ",
      email: "contato@empresaxyz.com",
      points: 5600,
      rescueValue: "R$ 560,00",
      status: "Ativo",
      dueDate: "30/01/2025"
    }
  ];

  const configData = {
    cashbackPercentage: "10%",
    minRescueValue: "R$ 50,00",
    pointsValidity: "180 dias",
    conversionRate: "1 ponto = R$ 0,10"
  };

  const filteredClients = clientsData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-modern/20 text-green-modern hover:bg-green-modern/20">Ativo</Badge>;
      case "Próximo ao Vencimento":
        return <Badge className="bg-yellow-modern/20 text-yellow-800 hover:bg-yellow-modern/20">Próximo ao Vencimento</Badge>;
      case "Vencido":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Vencido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const CashbackHistory = ({ clientName }: { clientName: string }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-blue-modern/30 text-blue-modern hover:bg-blue-modern/10">
          Ver Histórico
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Histórico de Cashback - {clientName}</DialogTitle>
          <p className="text-sm text-gray-600">Movimentações de pontos e resgates do cliente</p>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-modern">1.200</div>
            <div className="text-sm text-gray-600">Saldo Atual</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-modern">R$ 120,00</div>
            <div className="text-sm text-gray-600">Valor para Resgate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-modern">3.600</div>
            <div className="text-sm text-gray-600">Total Acumulado</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Movimentações</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-modern/10 rounded-lg border border-green-modern/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-modern rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-green-modern">Acúmulo</div>
                  <div className="text-sm text-green-600">Atendimento: Limpeza Residencial</div>
                  <div className="text-xs text-gray-500">24/05/2024</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-modern">+300 pts</div>
                <div className="text-sm text-gray-600">R$ 300,00</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <Gift className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-red-700">Resgate</div>
                  <div className="text-sm text-red-600">Desconto em atendimento</div>
                  <div className="text-xs text-gray-500">09/04/2024</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-red-600">-1.000 pts</div>
                <div className="text-sm text-gray-600">R$ 100,00</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Tabs defaultValue="clientes" className="space-y-6">
      <div className="flex items-center justify-between">
        <TabsList className="grid w-auto grid-cols-3 bg-cream-modern border-2 border-cream-modern">
          <TabsTrigger 
            value="clientes"
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white"
          >
            Todos os Clientes
          </TabsTrigger>
          <TabsTrigger 
            value="ativos"
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white"
          >
            Ativos (3)
          </TabsTrigger>
          <TabsTrigger 
            value="configuracoes"
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white"
          >
            Configurações
          </TabsTrigger>
        </TabsList>
      </div>
      
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
                <p className="text-3xl font-bold text-green-modern">
                  {clientsData.filter(c => c.status === 'Ativo').length}
                </p>
              </div>
              <div className="h-12 w-12 bg-cream-modern rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-modern" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pontos Ativos</p>
                <p className="text-3xl font-bold text-blue-modern">10.050</p>
              </div>
              <div className="h-12 w-12 bg-cream-modern rounded-lg flex items-center justify-center">
                <Gift className="h-6 w-6 text-blue-modern" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor a Resgatar</p>
                <p className="text-3xl font-bold text-teal-modern">R$ 1.005</p>
              </div>
              <div className="h-12 w-12 bg-cream-modern rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-teal-modern" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa Conversão</p>
                <p className="text-3xl font-bold text-orange-modern">85%</p>
              </div>
              <div className="h-12 w-12 bg-cream-modern rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-orange-modern" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
        <TabsContent value="clientes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-end">
                  <Button className="bg-blue-modern hover:bg-blue-modern/90 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Cashback
                  </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Saldo de Pontos</TableHead>
                    <TableHead>Valor para Resgate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-bold text-blue-modern">{client.points.toLocaleString()}</span>
                          <span className="text-sm text-gray-500 ml-1">pontos</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-modern">{client.rescueValue}</span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(client.status)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{client.dueDate}</span>
                      </TableCell>
                      <TableCell>
                        <CashbackHistory clientName={client.name} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ativos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes Ativos</CardTitle>
              <p className="text-sm text-gray-600">Clientes com pontos válidos no programa</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Saldo de Pontos</TableHead>
                    <TableHead>Valor para Resgate</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientsData.filter(client => client.status === 'Ativo').map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-bold text-blue-modern">{client.points.toLocaleString()}</span>
                          <span className="text-sm text-gray-500 ml-1">pontos</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-modern">{client.rescueValue}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{client.dueDate}</span>
                      </TableCell>
                      <TableCell>
                        <CashbackHistory clientName={client.name} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Programa</CardTitle>
              <p className="text-sm text-gray-600">Configure as regras do programa de cashback</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Percentual de Cashback</h4>
                    <div className="p-4 bg-blue-modern/10 rounded-lg border border-blue-modern/20">
                      <div className="text-2xl font-bold text-blue-modern">{configData.cashbackPercentage}</div>
                      <div className="text-sm text-gray-600">Percentual sobre o valor do atendimento</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Valor Mínimo para Resgate</h4>
                    <div className="p-4 bg-green-modern/10 rounded-lg border border-green-modern/20">
                      <div className="text-2xl font-bold text-green-modern">{configData.minRescueValue}</div>
                      <div className="text-sm text-gray-600">Valor mínimo necessário para resgate</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Validade dos Pontos</h4>
                    <div className="p-4 bg-orange-modern/10 rounded-lg border border-orange-modern/20">
                      <div className="text-2xl font-bold text-orange-modern">{configData.pointsValidity}</div>
                      <div className="text-sm text-gray-600">Tempo de validade após acúmulo</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Taxa de Conversão</h4>
                    <div className="p-4 bg-teal-modern/10 rounded-lg border border-teal-modern/20">
                      <div className="text-2xl font-bold text-teal-modern">{configData.conversionRate}</div>
                      <div className="text-sm text-gray-600">Valor de cada ponto em reais</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="bg-blue-modern hover:bg-blue-modern/90 text-white">
                  Editar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
    </Tabs>
  );
};

export default CashbackModule;
