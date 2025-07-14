
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface ScheduleAppointmentModalProps {
  client: any;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleAppointmentModal = ({ client, isOpen, onClose }: ScheduleAppointmentModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");

  const periods = [
    { value: "manha", label: "Manhã (08:00 - 12:00)" },
    { value: "tarde", label: "Tarde (13:00 - 17:00)" },
    { value: "noite", label: "Noite (18:00 - 22:00)" }
  ];

  const professionals = [
    { value: "maria", label: "Maria Santos" },
    { value: "joao", label: "João Silva" },
    { value: "ana", label: "Ana Costa" },
    { value: "pedro", label: "Pedro Oliveira" }
  ];

  const handleSchedule = () => {
    if (selectedDate && selectedPeriod && selectedProfessional) {
      // Aqui você implementaria a lógica de agendamento
      console.log("Agendamento:", {
        client: client?.name,
        date: selectedDate,
        period: selectedPeriod,
        professional: selectedProfessional
      });
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedDate(undefined);
    setSelectedPeriod("");
    setSelectedProfessional("");
    onClose();
  };

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-600">
                  {client.name.charAt(0)}
                </span>
              </div>
              <div>
                <DialogTitle className="text-lg">Agendar Atendimento</DialogTitle>
                <p className="text-sm text-gray-600">Agendar atendimento para {client.name}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Data do Atendimento */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Data do Atendimento <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP", { locale: ptBR })
                  ) : (
                    <span className="text-pink-500">Selecione a data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Período */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Período <span className="text-red-500">*</span>
            </Label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Profissional Sugerida */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Profissional Sugerida <span className="text-red-500">*</span>
            </Label>
            <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a profissional" />
              </SelectTrigger>
              <SelectContent>
                {professionals.map((professional) => (
                  <SelectItem key={professional.value} value={professional.value}>
                    {professional.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSchedule}
              disabled={!selectedDate || !selectedPeriod || !selectedProfessional}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Agendar
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
