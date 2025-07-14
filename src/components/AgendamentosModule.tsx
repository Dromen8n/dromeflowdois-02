import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addDays, format } from "date-fns";
import { pt } from "date-fns/locale";
import AgendamentosTabContent from "./agendamentos/AgendamentosTabContent";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const mockAgendamentos = [
  {
    id: 1,
    cliente: "Maria Silva",
    profissional: "Ana Costa",
    servico: "Corte e Escova",
    horario: "09:00",
    telefone: "(11) 99999-9999",
    status: "Confirmado",
    data: new Date(),
  },
  {
    id: 2,
    cliente: "João Santos",
    profissional: "Carla Lima",
    servico: "Barba e Cabelo",
    horario: "14:00",
    telefone: "(11) 88888-8888",
    status: "Pendente",
    data: new Date(),
  },
  {
    id: 3,
    cliente: "Empresa XYZ",
    profissional: "Rita Souza",
    servico: "Reunião Comercial",
    horario: "16:00",
    telefone: "(11) 77777-7777",
    status: "Confirmado",
    data: new Date(),
  },
  {
    id: 4,
    cliente: "Pedro Costa",
    profissional: "Ana Costa",
    servico: "Corte Masculino",
    horario: "10:30",
    telefone: "(11) 66666-6666",
    status: "Confirmado",
    data: addDays(new Date(), 1),
  },
  {
    id: 5,
    cliente: "Lucia Mendes",
    profissional: "Carla Lima",
    servico: "Hidratação",
    horario: "15:00",
    telefone: "(11) 55555-5555",
    status: "Confirmado",
    data: addDays(new Date(), 2),
  },
];

export default function AgendamentosModule() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("hoje");

  const today = new Date();
  const tomorrow = addDays(today, 1);
  const dayAfterTomorrow = addDays(today, 2);
  const threeDaysLater = addDays(today, 3);

  const tabs = [
    { id: "hoje", label: "Hoje", date: today },
    { id: "amanha", label: "Amanhã", date: tomorrow },
    { id: "depois", label: format(dayAfterTomorrow, "dd/MM", { locale: pt }), date: dayAfterTomorrow },
    { id: "tres", label: format(threeDaysLater, "dd/MM", { locale: pt }), date: threeDaysLater },
  ];

  const getFilteredAgendamentos = (targetDate: Date) => {
    return mockAgendamentos.filter(agendamento => {
      const sameDay = format(agendamento.data, "yyyy-MM-dd") === format(targetDate, "yyyy-MM-dd");
      const matchesSearch = agendamento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agendamento.profissional.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agendamento.servico.toLowerCase().includes(searchTerm.toLowerCase());
      return sameDay && matchesSearch;
    });
  };

  const getAgendamentosBySelectedDate = () => {
    return mockAgendamentos.filter(agendamento => {
      const sameDay = format(agendamento.data, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
      const matchesSearch = agendamento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agendamento.profissional.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agendamento.servico.toLowerCase().includes(searchTerm.toLowerCase());
      return sameDay && matchesSearch;
    });
  };

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white border-2 border-cream-modern rounded-2xl p-2 shadow-sm">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              onClick={() => setSelectedDate(tab.date)}
              className="data-[state=active]:bg-blue-modern data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-200 font-medium hover:bg-cream-modern"
            >
              {tab.label}
            </TabsTrigger>
          ))}
           <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-full w-full rounded-xl hover:bg-cream-modern focus:ring-0">
                <CalendarIcon className="h-5 w-5 text-blue-modern" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    setActiveTab(""); // Deselect tabs
                  }
                }}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-8">
            <AgendamentosTabContent
              agendamentos={getFilteredAgendamentos(tab.date)}
              date={tab.date}
            />
          </TabsContent>
        ))}
      </Tabs>

      {!tabs.some(tab => format(tab.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")) && (
        <div className="mt-8">
          <AgendamentosTabContent
            agendamentos={getAgendamentosBySelectedDate()}
            date={selectedDate}
            isCustomDate={true}
          />
        </div>
      )}
    </div>
  );
}
