import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Database,
  Plus,
  Edit,
  Eye,
  Loader2
} from "lucide-react";

interface Company {
  id: string;
  name: string;
  key: string;
  status: string;
  plan: string;
  created_at: string;
  has_units: boolean;
  max_units: number;
}

interface Unit {
  id: string;
  name: string;
  code: string;
  status: string;
  company_id: string;
  created_at: string;
}

interface UnitSectionProps {
  units: Unit[];
  companies: Company[];
  onUnitsChange: () => void;
}

export function UnitSection({ units, companies, onUnitsChange }: UnitSectionProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [newUnit, setNewUnit] = useState({
    name: "",
    code: "",
    company_id: ""
  });

  const createUnit = async () => {
    if (!newUnit.name || !newUnit.company_id) {
      toast({
        title: "Erro",
        description: "Nome da unidade e franquia são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('super_admin_create_unit', {
        p_name: newUnit.name,
        p_company_id: newUnit.company_id,
        p_code: newUnit.code || null
      });

      if (error) throw error;

      const result = data as { success: boolean; message: string };
      
      if (!result.success) {
        toast({
          title: "Erro",
          description: result.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: result.message
      });

      setNewUnit({ name: "", code: "", company_id: "" });
      onUnitsChange();
    } catch (error) {
      console.error('Erro ao criar unidade:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a unidade",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form to create unit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Nova Unidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="unit-name">Nome da Unidade</Label>
            <Input
              id="unit-name"
              value={newUnit.name}
              onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
              placeholder="Digite o nome da unidade"
            />
          </div>
          <div>
            <Label htmlFor="unit-code">Código</Label>
            <Input
              id="unit-code"
              value={newUnit.code}
              onChange={(e) => setNewUnit({ ...newUnit, code: e.target.value })}
              placeholder="UNIT001"
            />
          </div>
          <div>
            <Label htmlFor="unit-company">Franquia</Label>
            <select
              id="unit-company"
              value={newUnit.company_id}
              onChange={(e) => setNewUnit({ ...newUnit, company_id: e.target.value })}
              className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="">Selecione uma franquia</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <Button 
            onClick={createUnit} 
            disabled={loading}
            className="w-full bg-green-modern hover:bg-green-600"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            Criar Unidade
          </Button>
        </CardContent>
      </Card>

      {/* Units List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Unidades Cadastradas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {units.map((unit) => (
              <div key={unit.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{unit.name}</p>
                  <p className="text-sm text-muted-foreground">{unit.code}</p>
                  <Badge 
                    variant={unit.status === 'active' ? 'default' : 'secondary'}
                    className="mt-1"
                  >
                    {unit.status}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}