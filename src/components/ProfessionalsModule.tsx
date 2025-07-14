import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Star, 
  Clock, 
  Check, 
  X, 
  Plus,
  Calendar,
  History,
  MapPin,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";

const ProfessionalsModule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const [professionals] = useState([
    {
      id: 1,
      name: "Ana Costa",
      phone: "(11) 99999-0001",
      rating: 4.9,
      availability: true,
      notes: {
        pf: "Excelente para residências, muito cuidadosa",
        pj: "Experiência limitada em empresas"
      },
      confidence: 95
    },
    {
      id: 2,
      name: "Carla Lima",
      phone: "(11) 99999-0002",
      rating: 4.7,
      availability: true,
      notes: {
        pf: "Boa pontualidade, trabalho de qualidade",
        pj: "Muito experiente em limpeza comercial"
      },
      confidence: 88
    },
    {
      id: 3,
      name: "Rita Souza",
      phone: "(11) 99999-0003",
      rating: 4.8,
      availability: false,
      notes: {
        pf: "Especialista em limpeza pesada",
        pj: "Ideal para pós-obra"
      },
      confidence: 92
    }
  ]);

  const [appointments] = useState([
    {
      id: 1,
      date: "2024-01-15",
      client: "Maria Silva",
      professional: "Ana Costa",
      status: "Confirmado",
      time: "09:00"
    },
    {
      id: 2,
      date: "2024-01-15",
      client: "João Santos",
      professional: "Carla Lima",
      status: "Pendente",
      time: "14:00"
    },
    {
      id: 3,
      date: "2024-01-16",
      client: "Empresa XYZ",
      professional: "Rita Souza",
      status: "Recusado",
      time: "08:00"
    }
  ]);

  const [statusFilter, setStatusFilter] = useState("all");

  const statusCounts = {
    all: appointments.length,
    Confirmado: appointments.filter(a => a.status === 'Confirmado').length,
    Pendente: appointments.filter(a => a.status === 'Pendente').length,
    Recusado: appointments.filter(a => a.status === 'Recusado').length,
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (statusFilter === 'all') return true;
    return appointment.status === statusFilter;
  });

  // Atendimentos do dia
  const [todayAppointments] = useState([
    {
      id: 1,
      time: "09:00",
      client: "Maria Silva",
      professional: "Ana Costa",
      service: "Limpeza Residencial",
      address: "Rua das Flores, 123",
      status: "Em andamento"
    },
    {
      id: 2,
      time: "14:00",
      client: "João Santos",
      professional: "Carla Lima",
      service: "Limpeza Comercial",
      address: "Av. Paulista, 1000",
      status: "Agendado"
    },
    {
      id: 3,
      time: "16:00",
      client: "Pedro Costa",
      professional: "Rita Souza",
      service: "Limpeza Pós-Obra",
      address: "Rua Augusta, 500",
      status: "Concluído"
    }
  ]);

  // Histórico de atendimentos
  const [appointmentHistory] = useState([
    {
      id: 1,
      date: "2024-01-14",
      time: "09:00",
      client: "Ana Paula",
      professional: "Ana Costa",
      service: "Limpeza Residencial",
      status: "Concluído",
      rating: 5
    },
    {
      id: 2,
      date: "2024-01-13",
      time: "14:00",
      client: "Carlos Mendes",
      professional: "Carla Lima",
      service: "Limpeza Comercial",
      status: "Concluído",
      rating: 4
    },
    {
      id: 3,
      date: "2024-01-12",
      time: "10:00",
      client: "Loja ABC",
      professional: "Rita Souza",
      service: "Limpeza Pós-Obra",
      status: "Cancelado",
      rating: null
    }
  ]);

  const ProfessionalCard = ({ professional }: { professional: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{professional.name}</CardTitle>
          <Badge variant={professional.availability ? "default" : "secondary"} 
                 className={professional.availability ? 
                   "bg-green-modern text-white" : 
                   "bg-gray-100 text-gray-700"
                 }>
            {professional.availability ? "Disponível" : "Ocupada"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-modern mr-1" />
              <span className="font-medium">{professional.rating}</span>
            </div>
            <span className="text-sm text-gray-600">Confiança: {professional.confidence}%</span>
          </div>
          
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-blue-modern">PF:</span>
              <p className="text-sm text-gray-600">{professional.notes.pf}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-green-modern">PJ:</span>
              <p className="text-sm text-gray-600">{professional.notes.pj}</p>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="font-medium">Telefone:</span> {professional.phone}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      "Agendado": "bg-blue-modern/20 text-blue-modern",
      "Em andamento": "bg-yellow-modern/20 text-yellow-800",
      "Concluído": "bg-green-modern/20 text-green-modern",
      "Cancelado": "bg-red-100 text-red-800",
      "Confirmado": "bg-green-modern/20 text-green-modern",
      "Pendente": "bg-yellow-modern/20 text-yellow-800",
      "Recusado": "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"}>
        {status}
      </Badge>
    );
  };

  const FilterCard = ({ title, count, value, icon: Icon, color, onClick, isSelected }: any) => (
    <Card 
      onClick={onClick}
      className={cn(
        "cursor-pointer hover:shadow-lg transition-shadow border-l-4",
        isSelected ? `${color} bg-slate-50` : "border-transparent bg-white",
      )}
    >
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{count}</p>
        </div>
        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", isSelected ? `${color}`: 'bg-gray-100')}>
          <Icon className={cn("h-5 w-5", isSelected ? "text-white" : "text-gray-500")} />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Profissionais</h1>
      </div>

      <Tabs defaultValue="status" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-cream-modern border-2 border-cream-modern">
          <TabsTrigger 
            value="status"
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white"
          >
            Status Atendimento
          </TabsTrigger>
          <TabsTrigger 
            value="dia"
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white"
          >
            Atendimentos do Dia
          </TabsTrigger>
          <TabsTrigger 
            value="historico"
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white"
          >
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <FilterCard
              title="Todos"
              count={statusCounts.all}
              value="all"
              icon={ClipboardList}
              color="border-blue-modern"
              onClick={() => setStatusFilter("all")}
              isSelected={statusFilter === "all"}
            />
            <FilterCard
              title="Confirmados"
              count={statusCounts.Confirmado}
              value="Confirmado"
              icon={Check}
              color="border-green-modern"
              onClick={() => setStatusFilter("Confirmado")}
              isSelected={statusFilter === "Confirmado"}
            />
            <FilterCard
              title="Pendentes"
              count={statusCounts.Pendente}
              value="Pendente"
              icon={Clock}
              color="border-yellow-modern"
              onClick={() => setStatusFilter("Pendente")}
              isSelected={statusFilter === "Pendente"}
            />
            <FilterCard
              title="Recusados"
              count={statusCounts.Recusado}
              value="Recusado"
              icon={X}
              color="border-red-500"
              onClick={() => setStatusFilter("Recusado")}
              isSelected={statusFilter === "Recusado"}
            />
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Data</th>
                      <th className="text-left p-4">Cliente</th>
                      <th className="text-left p-4">Profissional</th>
                      <th className="text-left p-4">Horário</th>
                      <th className="text-left p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{new Date(appointment.date).toLocaleDateString('pt-BR')}</td>
                        <td className="p-4">{appointment.client}</td>
                        <td className="p-4">{appointment.professional}</td>
                        <td className="p-4">{appointment.time}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {appointment.status === "Confirmado" && (
                              <Badge className="bg-green-modern/20 text-green-modern">
                                <Check className="h-3 w-3 mr-1" />
                                Confirmado
                              </Badge>
                            )}
                            {appointment.status === "Pendente" && (
                              <Badge className="bg-yellow-modern/20 text-yellow-800">
                                <Clock className="h-3 w-3 mr-1" />
                                Pendente
                              </Badge>
                            )}
                            {appointment.status === "Recusado" && (
                              <Badge className="bg-red-100 text-red-800">
                                <X className="h-3 w-3 mr-1" />
                                Recusado
                              </Badge>
                            )}
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

        <TabsContent value="dia" className="space-y-6">
          <div className="flex items-center justify-end">
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {todayAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-blue-modern">
                        {appointment.time}
                      </div>
                      <div>
                        <h3 className="font-semibold">{appointment.client}</h3>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {appointment.address}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{appointment.professional}</div>
                      <div className="mt-2">
                        {getStatusBadge(appointment.status)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="historico" className="space-y-6">
          <div className="flex items-center justify-end">
            <Button variant="outline" className="border-blue-modern/30 text-blue-modern hover:bg-blue-modern/10">
              <Plus className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          <Card>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Data</th>
                      <th className="text-left p-4">Horário</th>
                      <th className="text-left p-4">Cliente</th>
                      <th className="text-left p-4">Profissional</th>
                      <th className="text-left p-4">Serviço</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Avaliação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentHistory.map((appointment) => (
                      <tr key={appointment.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{new Date(appointment.date).toLocaleDateString('pt-BR')}</td>
                        <td className="p-4">{appointment.time}</td>
                        <td className="p-4 font-medium">{appointment.client}</td>
                        <td className="p-4">{appointment.professional}</td>
                        <td className="p-4">{appointment.service}</td>
                        <td className="p-4">
                          {getStatusBadge(appointment.status)}
                        </td>
                        <td className="p-4">
                          {appointment.rating ? (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-modern mr-1" />
                              <span>{appointment.rating}/5</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessionalsModule;
