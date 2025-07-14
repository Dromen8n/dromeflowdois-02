
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Edit, Mail, MapPin, MessageSquare, Phone, Star, X } from "lucide-react";
import { ScheduleAppointmentModal } from "./ScheduleAppointmentModal";

interface ClientDetailModalProps {
  client: any;
  isOpen: boolean;
  onClose: () => void;
}

export const ClientDetailModal = ({ client, isOpen, onClose }: ClientDetailModalProps) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  if (!client) return null;

  const serviceHistory = [
    {
      id: 1,
      service: "Limpeza Residencial Completa",
      date: "24/05/2024",
      professional: "Maria Santos",
      value: "R$ 300",
      rating: 5,
      feedback: "Serviço excelente, cliente muito satisfeito",
      status: "Concluído"
    },
    {
      id: 2,
      service: "Limpeza de Carpetes",
      date: "09/05/2024",
      professional: "João Silva",
      value: "R$ 150",
      rating: 4,
      feedback: "Bom trabalho, pequenos ajustes necessários",
      status: "Concluído"
    },
    {
      id: 3,
      service: "Limpeza Pós-Obra",
      date: "27/04/2024",
      professional: "Ana Costa",
      value: "R$ 450",
      rating: 5,
      feedback: "Trabalho impecável, recomendaria novamente",
      status: "Concluído"
    }
  ];

  const financialData = {
    totalValue: "R$ 3.600",
    averageTicket: "R$ 300",
    highestService: "R$ 450",
    lowestService: "R$ 150",
    monthlyBilling: [
      { month: "Maio 2024", value: "R$ 450" },
      { month: "Abril 2024", value: "R$ 600" },
      { month: "Março 2024", value: "R$ 300" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-green-100 text-green-800";
      case "Inativo": return "bg-red-100 text-red-800";
      case "Atenção": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-lg font-semibold text-blue-600">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <DialogTitle className="text-xl">{client.name}</DialogTitle>
                  <p className="text-gray-500">Informações detalhadas do cliente e histórico de atendimentos</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <Tabs defaultValue="perfil" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="perfil">Perfil</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
                <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
              </TabsList>

              <TabsContent value="perfil" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Informações Pessoais */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{client.address}</span>
                      </div>
                      <div className="flex items-center space-x-3 pt-2">
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Cliente Recorrente
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Estatísticas */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Estatísticas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total de Atendimentos:</span>
                        <span className="font-semibold">{client.totalServices}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Valor Total Gasto:</span>
                        <span className="font-semibold">{client.totalValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Último Atendimento:</span>
                        <span className="font-semibold">{client.lastService}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dias sem Atendimento:</span>
                        <span className="font-semibold">18 dias</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Avaliação Média:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{client.rating}</span>
                          <div className="flex">
                            {renderStars(Math.floor(client.rating))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Observações */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Observações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{client.observations}</p>
                  </CardContent>
                </Card>

                {/* Ações */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Editar Cliente
                  </Button>
                  <Button 
                    onClick={() => setIsScheduleModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar Atendimento
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="historico" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Histórico de Atendimentos</CardTitle>
                    <p className="text-gray-600">Todos os atendimentos realizados para este cliente</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {serviceHistory.map((service) => (
                        <div key={service.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{service.service}</h4>
                              <p className="text-sm text-gray-500">{service.date} • {service.professional}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-lg">{service.value}</div>
                              <div className="flex items-center">
                                {renderStars(service.rating)}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{service.feedback}</p>
                          <Badge className="bg-green-100 text-green-800">
                            {service.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financeiro" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Resumo Financeiro */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        💰 Resumo Financeiro
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Valor Total:</span>
                        <span className="font-semibold text-lg">{financialData.totalValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ticket Médio:</span>
                        <span className="font-semibold">{financialData.averageTicket}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maior Atendimento:</span>
                        <span className="font-semibold">{financialData.highestService}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Menor Atendimento:</span>
                        <span className="font-semibold">{financialData.lowestService}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Faturamento por Mês */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Faturamento por Mês</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {financialData.monthlyBilling.map((month, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600">{month.month}</span>
                          <span className="font-semibold">{month.value}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      <ScheduleAppointmentModal
        client={client}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </>
  );
};
