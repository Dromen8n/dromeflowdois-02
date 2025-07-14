import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Building2,
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

interface CompanySectionProps {
  companies: Company[];
  onCompaniesChange: () => void;
}

export function CompanySection({ companies, onCompaniesChange }: CompanySectionProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    key: "",
    document: "",
    plan: "starter"
  });

  const createCompany = async () => {
    if (!newCompany.name || !newCompany.key) {
      toast({
        title: "Erro",
        description: "Nome e chave da franquia são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('super_admin_create_company', {
        p_name: newCompany.name,
        p_key: newCompany.key,
        p_document: newCompany.document || null
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

      setNewCompany({ name: "", key: "", document: "", plan: "starter" });
      onCompaniesChange();
    } catch (error) {
      console.error('Erro ao criar franquia:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a franquia",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form to create company */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Nova Franquia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="company-name">Nome da Franquia</Label>
            <Input
              id="company-name"
              value={newCompany.name}
              onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
              placeholder="Digite o nome da franquia"
            />
          </div>
          <div>
            <Label htmlFor="company-key">Chave Única</Label>
            <Input
              id="company-key"
              value={newCompany.key}
              onChange={(e) => setNewCompany({ ...newCompany, key: e.target.value })}
              placeholder="chave-unica-franquia"
            />
          </div>
          <div>
            <Label htmlFor="company-document">CNPJ</Label>
            <Input
              id="company-document"
              value={newCompany.document}
              onChange={(e) => setNewCompany({ ...newCompany, document: e.target.value })}
              placeholder="00.000.000/0000-00"
            />
          </div>
          <Button 
            onClick={createCompany} 
            disabled={loading}
            className="w-full bg-blue-modern hover:bg-blue-600"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            Criar Franquia
          </Button>
        </CardContent>
      </Card>

      {/* Companies List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Franquias Cadastradas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {companies.map((company) => (
              <div key={company.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{company.name}</p>
                  <p className="text-sm text-muted-foreground">{company.key}</p>
                  <Badge 
                    variant={company.status === 'active' ? 'default' : 'secondary'}
                    className="mt-1"
                  >
                    {company.status}
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