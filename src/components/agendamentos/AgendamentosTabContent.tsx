
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import AgendamentosStats from "./AgendamentosStats";
import AgendamentosTable from "./AgendamentosTable";

interface AgendamentosTabContentProps {
  agendamentos: any[];
  date: Date;
  isCustomDate?: boolean;
}

export default function AgendamentosTabContent({ 
  agendamentos, 
  date, 
  isCustomDate = false 
}: AgendamentosTabContentProps) {
  const gradientClass = isCustomDate 
    ? "bg-gradient-to-r from-green-50 to-cream-modern/30"
    : "bg-gradient-to-r from-blue-50 to-cream-modern/50";

  return (
    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className={`border-b border-gray-100 ${gradientClass}`}>
        <AgendamentosStats agendamentos={agendamentos} date={date} />
      </CardHeader>
      
      <CardContent className="p-0">
        {agendamentos.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-cream-modern rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarIcon className="h-10 w-10 text-blue-modern" />
            </div>
            <p className="text-gray-600 text-lg">Nenhum agendamento encontrado para esta data</p>
            <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros ou verificar outras datas</p>
          </div>
        ) : (
          <div className="p-6">
            <AgendamentosTable agendamentos={agendamentos} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
