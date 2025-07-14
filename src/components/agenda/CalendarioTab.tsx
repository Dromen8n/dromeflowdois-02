
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColorfulCalendar } from "../ColorfulCalendar";
import {
  Calendar as CalendarIcon,
  Check,
  X,
  Plus,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
} from "lucide-react";
import { availableProfessionals, unassignedAppointments } from "@/data/agenda";
import { ProfessionalDetailModal } from "./ProfessionalDetailModal";

interface CalendarioTabProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

export const CalendarioTab = ({ selectedDate, onDateSelect }: CalendarioTabProps) => {
  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agendados</p>
                <p className="text-3xl font-bold text-blue-600">15</p>
                <p className="text-sm text-gray-500">em relação a ontem</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+10%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponíveis</p>
                <p className="text-3xl font-bold text-green-600">4</p>
                <p className="text-sm text-gray-500">em relação a ontem</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-sm text-red-600">-5%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Possíveis</p>
                <p className="text-3xl font-bold text-orange-600">19</p>
                <p className="text-sm text-gray-500">em relação a ontem</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+8%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelamentos</p>
                <p className="text-3xl font-bold text-red-600">3</p>
                <p className="text-sm text-gray-500">em relação a ontem</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <X className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">-2%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Calendário
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ColorfulCalendar
                selected={selectedDate}
                onSelect={onDateSelect}
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Disponíveis</CardTitle>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center">
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableProfessionals.map((professional) => (
                  <ProfessionalDetailModal key={professional.id} professional={professional} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Sem Profissionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {unassignedAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="font-medium text-sm">{appointment.client}</div>
                    <div className="text-xs text-gray-600">
                      {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{appointment.service}</div>
                    <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs w-full">
                      Vincular
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
