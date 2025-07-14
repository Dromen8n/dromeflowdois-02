
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AgendamentosSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  // selectedDate and setSelectedDate removed
}

export default function AgendamentosSearch({ 
  searchTerm, 
  setSearchTerm,
}: AgendamentosSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder="Buscar por cliente, profissional, serviço..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-12 pl-10 pr-4 w-full border-gray-200 hover:border-blue-modern focus:border-blue-modern focus:ring-blue-modern rounded-xl"
      />
    </div>
  );
}
