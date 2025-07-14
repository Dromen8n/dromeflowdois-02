import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Search, Plus, Eye } from "lucide-react";
import { ClientDetailModal } from "./ClientDetailModal";
import { NewClientModal } from "./NewClientModal";

const ClientsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const clients = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "(11) 99999-1234",
      address: "Rua das Flores, 123 - São Paulo, SP",
      status: "Atenção",
      lastService: "09/05/2024",
      daysSinceLastService: "18 dias atrás",
      totalServices: 12,
      totalValue: "R$ 3.600",
      rating: 4.7,
      observations: "Cliente preferencial, sempre pontual nos pagamentos"
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao.santos@email.com",
      phone: "(11) 99999-5678",
      address: "Av. Paulista, 456 - São Paulo, SP",
      status: "Ativo",
      lastService: "24/05/2024",
      daysSinceLastService: "3 dias atrás",
      totalServices: 8,
      totalValue: "R$ 2.400",
      rating: 4.2,
      observations: "Cliente recorrente, serviços de limpeza residencial"
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "(11) 99999-9012",
      address: "Rua do Centro, 789 - São Paulo, SP",
      status: "Inativo",
      lastService: "14/04/2024",
      daysSinceLastService: "43 dias atrás",
      totalServices: 3,
      totalValue: "R$ 900",
      rating: 3.5,
      observations: "Necessita acompanhamento para reativação"
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      phone: "(11) 99999-3456",
      address: "Av. dos Estados, 321 - São Paulo, SP",
      status: "Atenção",
      lastService: "12/05/2024",
      daysSinceLastService: "15 dias atrás",
      totalServices: 6,
      totalValue: "R$ 1.800",
      rating: 4.0,
      observations: "Cliente empresarial, serviços quinzenais"
    },
    {
      id: 5,
      name: "Empresa XYZ Ltda",
      email: "contato@empresaxyz.com",
      phone: "(11) 99999-7890",
      address: "Rua Comercial, 654 - São Paulo, SP",
      status: "Ativo",
      lastService: "23/05/2024",
      daysSinceLastService: "4 dias atrás",
      totalServices: 24,
      totalValue: "R$ 12.000",
      rating: 4.8,
      observations: "Contrato empresarial mensal"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-green-modern/20 text-green-modern border-green-modern/30";
      case "Inativo": return "bg-red-100 text-red-800 border-red-200";
      case "Atenção": return "bg-orange-modern/20 text-orange-modern border-orange-modern/30";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    
    const matchesFilter = selectedFilter === "todos" || 
                         (selectedFilter === "atencao" && client.status === "Atenção") ||
                         (selectedFilter === "inativos" && client.status === "Inativo") ||
                         (selectedFilter === "recorrentes" && client.status === "Ativo" && client.totalServices > 10);
    
    return matchesSearch && matchesFilter;
  });

  const filterCounts = {
    todos: clients.length,
    atencao: clients.filter(c => c.status === "Atenção").length,
    inativos: clients.filter(c => c.status === "Inativo").length,
    recorrentes: clients.filter(c => c.status === "Ativo" && c.totalServices > 10).length
  };

  const handleViewClient = (client: any) => {
    setSelectedClient(client);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filtros por categoria */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedFilter === "todos" ? "default" : "outline"}
            onClick={() => setSelectedFilter("todos")}
            className={selectedFilter === "todos" ? 
              "bg-blue-modern hover:bg-blue-modern/90 text-white" : 
              "border-blue-modern/30 text-blue-modern hover:bg-blue-modern/10"
            }
          >
            Todos os Clientes ({filterCounts.todos})
          </Button>
          <Button
            variant={selectedFilter === "atencao" ? "default" : "outline"}
            onClick={() => setSelectedFilter("atencao")}
            className={selectedFilter === "atencao" ? 
              "bg-orange-modern hover:bg-orange-modern/90 text-white" : 
              "border-orange-modern/30 text-orange-modern hover:bg-orange-modern/10"
            }
          >
            ⚠️ Atenção ({filterCounts.atencao})
          </Button>
          <Button
            variant={selectedFilter === "inativos" ? "default" : "outline"}
            onClick={() => setSelectedFilter("inativos")}
            className={selectedFilter === "inativos" ? 
              "bg-red-500 hover:bg-red-600 text-white" : 
              "border-red-300 text-red-600 hover:bg-red-50"
            }
          >
            ⏰ Inativos ({filterCounts.inativos})
          </Button>
          <Button
            variant={selectedFilter === "recorrentes" ? "default" : "outline"}
            onClick={() => setSelectedFilter("recorrentes")}
            className={selectedFilter === "recorrentes" ? 
              "bg-green-modern hover:bg-green-modern/90 text-white" : 
              "border-green-modern/30 text-green-modern hover:bg-green-modern/10"
            }
          >
            🔄 Recorrentes ({filterCounts.recorrentes})
          </Button>
        </div>
        <NewClientModal>
          <Button className="bg-blue-modern hover:bg-blue-modern/90 text-white w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </NewClientModal>
      </div>

      {/* Tabela de clientes */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Atendimento</TableHead>
                  <TableHead>Atendimentos</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-blue-modern/20 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-modern">
                            {client.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.lastService}</div>
                        <div className="text-sm text-gray-500">{client.daysSinceLastService}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="font-medium">{client.totalServices}</span>
                        <Calendar className="h-4 w-4 ml-1 text-blue-modern" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{client.totalValue}</span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewClient(client)}
                        className="flex items-center gap-2 border-blue-modern/30 text-blue-modern hover:bg-blue-modern/10"
                      >
                        <Calendar className="h-4 w-4" />
                        Agendar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredClients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum cliente encontrado com os filtros aplicados.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Paginação */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Página 1 de 1
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm" disabled>
            Próximo
          </Button>
        </div>
      </div>

      {/* Modal de detalhes do cliente */}
      <ClientDetailModal
        client={selectedClient}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
};

export default ClientsTable;
