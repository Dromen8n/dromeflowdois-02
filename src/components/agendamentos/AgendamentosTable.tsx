
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, User, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgendamentosTableProps {
  agendamentos: any[];
}

export default function AgendamentosTable({ agendamentos }: AgendamentosTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <Table>
        <TableHeader className="bg-cream-modern/50">
          <TableRow className="border-b border-gray-100">
            <TableHead className="w-[120px] font-semibold text-gray-700">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-modern" />
                Horário
              </div>
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-green-modern" />
                Cliente
              </div>
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-yellow-modern" />
                Serviço
              </div>
            </TableHead>
            <TableHead className="font-semibold text-gray-700">Profissional</TableHead>
            <TableHead className="font-semibold text-gray-700">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-teal-modern" />
                Telefone
              </div>
            </TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="w-[140px] font-semibold text-gray-700">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agendamentos.map((agendamento) => (
            <TableRow key={agendamento.id} className="hover:bg-cream-modern/30 transition-colors border-b border-gray-50">
              <TableCell>
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-modern to-blue-600 rounded-2xl shadow-sm">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">{agendamento.horario}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-semibold text-gray-900 text-base">{agendamento.cliente}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-600 bg-cream-modern px-3 py-1 rounded-full inline-block">
                  {agendamento.servico}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-700 font-medium">{agendamento.profissional}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-600 font-mono">{agendamento.telefone}</div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={agendamento.status === "Confirmado" ? "default" : "secondary"}
                  className={cn(
                    "font-medium",
                    agendamento.status === "Confirmado" 
                      ? "bg-green-modern text-white hover:bg-green-600" 
                      : "bg-yellow-modern text-gray-800 hover:bg-yellow-600"
                  )}
                >
                  {agendamento.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-blue-modern text-blue-modern hover:bg-blue-modern hover:text-white transition-colors"
                >
                  Ver Detalhes
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
