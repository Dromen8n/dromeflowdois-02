import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Loader2,
  Settings,
  Info,
} from "lucide-react";

interface Module {
  id: string;
  key: string;
  name: string;
  description: string;
  version: string;
  category: string;
  icon: string;
  status: 'active' | 'inactive' | 'deprecated';
  created_at: string;
  config_schema: any;
  dependencies: string[];
}

interface Company {
  id: string;
  name: string;
  key: string;
}

export function ModulesSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState<Module[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [newModule, setNewModule] = useState({
    key: '',
    name: '',
    description: '',
    category: 'general',
    icon: '',
    version: '1.0.0'
  });

  useEffect(() => {
    loadModules();
    loadCompanies();
  }, []);

  const loadModules = async () => {
    try {
      const { data, error } = await supabase
        .from('modulos_sistema')
        .select('*')
        .order('chave', { ascending: true });
      
      if (error) throw error;
      setModules((data || []).map(item => ({
        id: item.id,
        key: item.chave,
        name: item.nome,
        description: item.descricao || '',
        version: '1.0.0',
        category: 'general',
        icon: '',
        status: item.ativo ? 'active' : 'inactive',
        created_at: item.created_at,
        config_schema: item.configuracoes,
        dependencies: []
      })) as Module[]);
    } catch (error) {
      console.error('Erro ao carregar módulos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os módulos",
        variant: "destructive"
      });
    }
  };

  const loadCompanies = async () => {
    try {
      const { data, error } = await supabase.rpc('super_admin_get_companies');
      if (error) throw error;
      const result = data as unknown as Company[];
      setCompanies(result || []);
    } catch (error) {
      console.error('Erro ao carregar empresas:', error);
    }
  };

  const createModule = async () => {
    if (!newModule.key || !newModule.name) {
      toast({
        title: "Erro",
        description: "Nome e chave do módulo são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('modulos_sistema')
        .insert({
          chave: newModule.key,
          nome: newModule.name,
          descricao: newModule.description,
          nivel_acesso: 'admin',
          ativo: true,
          configuracoes: {}
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Módulo criado com sucesso"
      });

      setNewModule({
        key: '',
        name: '',
        description: '',
        category: 'general',
        icon: '',
        version: '1.0.0'
      });
      
      await loadModules();
    } catch (error: any) {
      console.error('Erro ao criar módulo:', error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível criar o módulo",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateModuleStatus = async (moduleId: string, status: 'active' | 'inactive') => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('modulos_sistema')
        .update({ ativo: status === 'active' })
        .eq('id', moduleId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Módulo ${status === 'active' ? 'ativado' : 'desativado'} com sucesso`
      });

      await loadModules();
    } catch (error) {
      console.error('Erro ao atualizar status do módulo:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status do módulo",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const activateModuleForCompany = async (moduleKey: string, companyId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('activate_module', {
        p_module_id: moduleKey,
        p_active: true
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Módulo ativado para a empresa com sucesso"
      });
    } catch (error) {
      console.error('Erro ao ativar módulo:', error);
      toast({
        title: "Erro",
        description: "Não foi possível ativar o módulo para a empresa",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    const categoryLabels: Record<string, string> = {
      'core': 'Núcleo',
      'business': 'Negócios',
      'hr': 'Recursos Humanos',
      'marketing': 'Marketing',
      'sales': 'Vendas',
      'analytics': 'Análises',
      'communication': 'Comunicação',
      'general': 'Geral'
    };
    return categoryLabels[category] || category;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-modern';
      case 'inactive': return 'bg-yellow-modern';
      case 'deprecated': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredModules = selectedCategory === 'all' 
    ? modules 
    : modules.filter(module => module.category === selectedCategory);

  const categories = Array.from(new Set(modules.map(m => m.category)));

  return (
    <div className="space-y-6">
      {/* Header com Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Módulos</h2>
          <p className="text-muted-foreground">Gerencie módulos disponíveis no sistema</p>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {getCategoryLabel(category)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Criar Novo Módulo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Novo Módulo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="module-key">Chave do Módulo</Label>
              <Input
                id="module-key"
                value={newModule.key}
                onChange={(e) => setNewModule({ ...newModule, key: e.target.value })}
                placeholder="ex: custom-module"
              />
            </div>
            <div>
              <Label htmlFor="module-name">Nome</Label>
              <Input
                id="module-name"
                value={newModule.name}
                onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                placeholder="Nome do módulo"
              />
            </div>
            <div>
              <Label htmlFor="module-description">Descrição</Label>
              <Textarea
                id="module-description"
                value={newModule.description}
                onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                placeholder="Descrição do módulo"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="module-category">Categoria</Label>
              <Select 
                value={newModule.category} 
                onValueChange={(value) => setNewModule({ ...newModule, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">Núcleo</SelectItem>
                  <SelectItem value="business">Negócios</SelectItem>
                  <SelectItem value="hr">Recursos Humanos</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Vendas</SelectItem>
                  <SelectItem value="analytics">Análises</SelectItem>
                  <SelectItem value="communication">Comunicação</SelectItem>
                  <SelectItem value="general">Geral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="module-icon">Ícone</Label>
                <Input
                  id="module-icon"
                  value={newModule.icon}
                  onChange={(e) => setNewModule({ ...newModule, icon: e.target.value })}
                  placeholder="NomeDoIcone"
                />
              </div>
              <div>
                <Label htmlFor="module-version">Versão</Label>
                <Input
                  id="module-version"
                  value={newModule.version}
                  onChange={(e) => setNewModule({ ...newModule, version: e.target.value })}
                  placeholder="1.0.0"
                />
              </div>
            </div>
            <Button onClick={createModule} disabled={loading} className="w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
              Criar Módulo
            </Button>
          </CardContent>
        </Card>

        {/* Lista de Módulos */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Módulos ({filteredModules.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredModules.map((module) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{module.name}</h4>
                          <Badge variant="outline">{getCategoryLabel(module.category)}</Badge>
                          <Badge className={getStatusColor(module.status)}>
                            {module.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Chave: {module.key}</span>
                          <span>v{module.version}</span>
                          {module.dependencies.length > 0 && (
                            <span>Deps: {module.dependencies.join(', ')}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateModuleStatus(
                            module.id, 
                            module.status === 'active' ? 'inactive' : 'active'
                          )}
                          disabled={loading}
                        >
                          {module.status === 'active' ? 
                            <PowerOff className="h-4 w-4" /> : 
                            <Power className="h-4 w-4" />
                          }
                        </Button>
                      </div>
                    </div>
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