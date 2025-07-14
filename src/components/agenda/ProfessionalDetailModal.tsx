
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  Star,
  Clock,
  TrendingUp,
  X,
  UserX,
} from "lucide-react";
import type { Professional } from "@/data/agenda";

export const ProfessionalDetailModal = ({ professional }: { professional: Professional }) => (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-left hover:bg-gray-50 p-3 rounded-lg transition-colors w-full">
          <div className="font-medium text-gray-900">{professional.name}</div>
          <div className="text-sm text-gray-500">{professional.role}</div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <User className="h-6 w-6" />
            <div>
              <div className="text-xl">{professional.name}</div>
              <div className="text-sm text-gray-500 font-normal">{professional.role}</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="schedule">Agenda</TabsTrigger>
            <TabsTrigger value="appointment">Agendar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Dados Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Disponibilidade</span>
                    <span className="font-medium">{professional.availability}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Atendimentos Realizados</span>
                    <span className="font-medium">{professional.stats.appointments}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Último atendimento: {new Date(professional.lastService).toLocaleDateString('pt-BR')}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Nível de Confiança
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {professional.confidence}%
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Baseado no histórico de atendimentos
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Atendimentos
                        </span>
                        <span>{professional.stats.appointments}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-red-600">
                          <X className="h-4 w-4 mr-1" />
                          Reclamações
                        </span>
                        <span>{professional.stats.complaints}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-yellow-600">
                          <Clock className="h-4 w-4 mr-1" />
                          Atrasos
                        </span>
                        <span>{professional.stats.delays}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-red-600">
                          <UserX className="h-4 w-4 mr-1" />
                          Faltas
                        </span>
                        <span>{professional.stats.absences}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Avaliações por Serviço</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Limpeza Residencial</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">(0)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Limpeza Comercial</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">(0)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Média Geral</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">( )</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Atendimentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-8">
                  Histórico de atendimentos será exibido aqui
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Informações Financeiras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-8">
                  Informações financeiras serão exibidas aqui
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Agenda do Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-8">
                  Agenda será exibida aqui
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointment">
            <Card>
              <CardHeader>
                <CardTitle>Agendar Serviço</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-8">
                  Formulário de agendamento será exibido aqui
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
);
