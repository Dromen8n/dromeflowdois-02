import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Mail, Phone, MapPin, Calendar, MoreHorizontal, Building2, Target, DollarSign, Users, ArrowUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PipelineKanban = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Tech Solutions Ltda",
      description: "Empresa interessada em automação",
      email: "contato@techsolutions.com",
      phone: "(11) 99999-0001",
      service: "Software",
      value: "R$ 12.500,00",
      stage: "novos",
      size: "Médio Porte",
      responsible: "João Silva"
    },
    {
      id: 2,
      name: "Grupo ABC",
      description: "Necessita sistema integrado",
      email: "vendas@grupoabc.com",
      phone: "(11) 99999-0002",
      service: "ERP",
      value: "R$ 28.000,00",
      stage: "novos",
      size: "Grande Porte",
      responsible: "Ana Costa"
    },
    {
      id: 3,
      name: "Construtora JLM",
      description: "Interessados em sistema financeiro",
      email: "obras@construtorajlm.com",
      phone: "(11) 99999-0003",
      service: "Financeiro",
      value: "R$ 35.000,00",
      stage: "contato",
      size: "Médio Porte",
      responsible: "Roberto Almeida"
    },
    {
      id: 4,
      name: "Comércio Rápido ME",
      description: "Precisa de solução de PDV",
      email: "comercio@rapidome.com",
      phone: "(11) 99999-0004",
      service: "PDV",
      value: "R$ 8.000,00",
      stage: "apresentacao",
      size: "Pequeno Porte",
      responsible: "Maria Santos"
    }
  ]);

  const stages = [
    { 
      id: "novos", 
      title: "Novos Leads", 
      color: "border-t-blue-modern bg-blue-modern/10", 
      count: leads.filter(l => l.stage === 'novos').length 
    },
    { 
      id: "contato", 
      title: "Contato Inicial", 
      color: "border-t-teal-modern bg-teal-modern/10", 
      count: leads.filter(l => l.stage === 'contato').length 
    },
    { 
      id: "apresentacao", 
      title: "Apresentação", 
      color: "border-t-purple-500 bg-purple-50/50", 
      count: leads.filter(l => l.stage === 'apresentacao').length 
    },
    { 
      id: "proposta", 
      title: "Proposta", 
      color: "border-t-orange-modern bg-orange-modern/10", 
      count: leads.filter(l => l.stage === 'proposta').length 
    }
  ];

  const handleSchedule = (lead: any) => {
    toast({
      title: "Agendamento Realizado!",
      description: `Reunião com ${lead.name} foi agendada com sucesso.`,
    });
  };

  const LeadCard = ({ lead }: { lead: any }) => (
    <Card className="mb-4 bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-sm font-semibold text-gray-900 leading-tight">
            {lead.name}
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">{lead.description}</p>
        
        <div className="flex gap-2 mt-2">
          <Badge variant="outline" className="text-xs bg-blue-modern/20 text-blue-modern border-blue-modern/30">
            {lead.service}
          </Badge>
          <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
            {lead.size}
          </Badge>
        </div>
        
        <div className="text-lg font-bold text-green-modern mt-2">
          {lead.value}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2 text-xs text-gray-600 mb-3">
          <div className="flex items-center">
            <Mail className="h-3 w-3 mr-2 text-gray-400" />
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-3 w-3 mr-2 text-gray-400" />
            {lead.phone}
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-2 text-gray-400" />
            <span className="text-gray-600">{lead.responsible}</span>
          </div>
        </div>
        
        <Button 
          size="sm" 
          variant="outline"
          className="w-full text-blue-modern border-blue-modern/30 hover:bg-blue-modern/10" 
          onClick={() => handleSchedule(lead)}
        >
          <Calendar className="h-3 w-3 mr-2" />
          Agendar
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-blue-modern text-white">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-blue-100">Novos Leads</p>
              <p className="text-2xl font-bold">{leads.filter(l => l.stage === 'novos').length}</p>
              <div className="flex items-center text-xs text-blue-200">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>+2 na semana</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-orange-modern text-white">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-orange-100">Em Andamento</p>
              <p className="text-2xl font-bold">{leads.filter(l => l.stage !== 'novos').length}</p>
              <div className="flex items-center text-xs text-orange-200">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>+1 na semana</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-green-modern text-white">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-green-100">Taxa Conversão</p>
              <p className="text-2xl font-bold">25%</p>
              <div className="flex items-center text-xs text-green-200">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>+2%</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-teal-modern text-white">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-teal-100">Valor Total</p>
              <p className="text-2xl font-bold">R$ 83.5K</p>
              <div className="flex items-center text-xs text-teal-200">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>+R$15K</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className={`${stage.color} rounded-lg border-t-4 bg-white min-h-[600px]`}>
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {stage.title}
                </h3>
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                  {stage.count}
                </Badge>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {leads.filter(lead => lead.stage === stage.id).map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
              <Button 
                variant="ghost" 
                className="w-full border-2 border-dashed border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-600 h-12"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Cartão
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-modern hover:bg-blue-modern/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nova Lista
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Lead</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome/Empresa</Label>
                <Input id="name" placeholder="Digite o nome ou empresa" />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" placeholder="Descrição do lead..." />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(11) 99999-9999" />
              </div>
              <div>
                <Label htmlFor="service">Tipo de Serviço</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="erp">ERP</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                    <SelectItem value="pdv">PDV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="value">Valor</Label>
                <Input id="value" placeholder="R$ 0,00" />
              </div>
              <Button className="w-full bg-blue-modern hover:bg-blue-modern/90 text-white">Adicionar Lead</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PipelineKanban;
