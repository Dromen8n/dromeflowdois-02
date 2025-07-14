
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";
import { weeklyStats, professionalAvailability } from "@/data/agenda";
import { StatusBadge } from "./StatusBadge";

interface GestaoTabProps {
  currentWeek: string;
}

export const GestaoTab = ({ currentWeek }: GestaoTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CalendarIcon className="h-6 w-6 text-gray-700" />
              <h2 className="text-xl font-semibold">Gestão Semanal</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{currentWeek}</span>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Enviar Agenda via Webhook
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo da Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{weeklyStats.profissionaisLivres}</div>
              <div className="text-sm text-gray-600">Profissionais Livres</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{weeklyStats.faltas}</div>
              <div className="text-sm text-gray-600">Faltas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{weeklyStats.cancelamentos}</div>
              <div className="text-sm text-gray-600">Cancelamentos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{weeklyStats.fixos}</div>
              <div className="text-sm text-gray-600">Fixos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{weeklyStats.clientes}</div>
              <div className="text-sm text-gray-600">Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">{weeklyStats.totalAgendados}</div>
              <div className="text-sm text-gray-600">Total Agendados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-500">{weeklyStats.possiveis}</div>
              <div className="text-sm text-gray-600">Possíveis</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disponibilidade das Profissionais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Profissional</th>
                  <th className="text-center p-4 font-medium">
                    <div>Seg</div>
                    <div className="text-xs text-gray-500">09/06</div>
                  </th>
                  <th className="text-center p-4 font-medium">
                    <div>Ter</div>
                    <div className="text-xs text-gray-500">10/06</div>
                  </th>
                  <th className="text-center p-4 font-medium">
                    <div>Qua</div>
                    <div className="text-xs text-gray-500">11/06</div>
                  </th>
                  <th className="text-center p-4 font-medium">
                    <div>Qui</div>
                    <div className="text-xs text-gray-500">12/06</div>
                  </th>
                  <th className="text-center p-4 font-medium">
                    <div>Sex</div>
                    <div className="text-xs text-gray-500">13/06</div>
                  </th>
                  <th className="text-center p-4 font-medium">
                    <div>Sáb</div>
                    <div className="text-xs text-gray-500">14/06</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {professionalAvailability.map((professional, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{professional.name}</td>
                    <td className="p-4 text-center"><StatusBadge status={professional.schedule.seg} /></td>
                    <td className="p-4 text-center"><StatusBadge status={professional.schedule.ter} /></td>
                    <td className="p-4 text-center"><StatusBadge status={professional.schedule.qua} /></td>
                    <td className="p-4 text-center"><StatusBadge status={professional.schedule.qui} /></td>
                    <td className="p-4 text-center"><StatusBadge status={professional.schedule.sex} /></td>
                    <td className="p-4 text-center"><StatusBadge status={professional.schedule.sab} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
