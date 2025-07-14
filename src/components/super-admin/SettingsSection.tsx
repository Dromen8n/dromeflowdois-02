import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Settings,
  AlertCircle,
  CheckCircle,
  Save,
  Loader2,
  Database,
  Shield,
  Bell,
  BarChart,
} from "lucide-react";

interface SystemSetting {
  key: string;
  value: any;
  description?: string;
  category: string;
}

export function SettingsSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [modules, setModules] = useState<any[]>([]);
  const [updatedSettings, setUpdatedSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    loadSystemSettings();
    loadModules();
  }, []);

  const loadSystemSettings = async () => {
    try {
      const { data, error } = await supabase.rpc('get_system_settings');
      if (error) throw error;
      setSettings(typeof data === 'object' && data !== null ? data as Record<string, any> : {});
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as configurações",
        variant: "destructive"
      });
    }
  };

  const loadModules = async () => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .order('category', { ascending: true });
      
      if (error) throw error;
      setModules(data || []);
    } catch (error) {
      console.error('Erro ao carregar módulos:', error);
    }
  };

  const updateSetting = async (key: string, value: any, description?: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('update_system_setting', {
        p_key: key,
        p_value: JSON.stringify(value),
        p_description: description
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
        description: "Configuração atualizada com sucesso"
      });

      await loadSystemSettings();
    } catch (error) {
      console.error('Erro ao atualizar configuração:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a configuração",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (key: string, value: any) => {
    setUpdatedSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    for (const [key, value] of Object.entries(updatedSettings)) {
      await updateSetting(key, value);
    }
    setUpdatedSettings({});
  };

  const getSettingValue = (key: string, defaultValue: any = '') => {
    if (key in updatedSettings) {
      return updatedSettings[key];
    }
    return settings[key] !== undefined ? JSON.parse(settings[key]) : defaultValue;
  };

  const modulesByCategory = modules.reduce((acc, module) => {
    if (!acc[module.category]) acc[module.category] = [];
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6">
      {/* Status do Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Base de Dados</p>
                <Badge variant="default" className="bg-green-modern mt-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Conectado
                </Badge>
              </div>
              <Database className="h-8 w-8 text-green-modern" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Autenticação</p>
                <Badge variant="default" className="bg-green-modern mt-1">
                  <Shield className="h-3 w-3 mr-1" />
                  Ativo
                </Badge>
              </div>
              <Shield className="h-8 w-8 text-green-modern" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Módulos</p>
                <Badge variant="default" className="bg-blue-modern mt-1">
                  {modules.length} Ativos
                </Badge>
              </div>
              <BarChart className="h-8 w-8 text-blue-modern" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notificações</p>
                <Badge variant="default" className="bg-yellow-modern mt-1">
                  <Bell className="h-3 w-3 mr-1" />
                  Ativo
                </Badge>
              </div>
              <Bell className="h-8 w-8 text-yellow-modern" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Configurações Gerais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="site_name">Nome do Sistema</Label>
              <Input
                id="site_name"
                value={getSettingValue('site_name')}
                onChange={(e) => handleSettingChange('site_name', e.target.value)}
                placeholder="Nome do sistema"
              />
            </div>
            <div>
              <Label htmlFor="site_description">Descrição</Label>
              <Input
                id="site_description"
                value={getSettingValue('site_description')}
                onChange={(e) => handleSettingChange('site_description', e.target.value)}
                placeholder="Descrição do sistema"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="max_companies">Máximo de Empresas</Label>
              <Input
                id="max_companies"
                type="number"
                value={getSettingValue('max_companies', 100)}
                onChange={(e) => handleSettingChange('max_companies', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="max_units_per_company">Máximo de Unidades por Empresa</Label>
              <Input
                id="max_units_per_company"
                type="number"
                value={getSettingValue('max_units_per_company', 50)}
                onChange={(e) => handleSettingChange('max_units_per_company', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance_mode">Modo de Manutenção</Label>
                <p className="text-sm text-muted-foreground">Bloqueia acesso ao sistema para usuários</p>
              </div>
              <Switch
                id="maintenance_mode"
                checked={getSettingValue('maintenance_mode', false)}
                onCheckedChange={(checked) => handleSettingChange('maintenance_mode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email_notifications">Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">Habilita envio de notificações por email</p>
              </div>
              <Switch
                id="email_notifications"
                checked={getSettingValue('email_notifications', true)}
                onCheckedChange={(checked) => handleSettingChange('email_notifications', checked)}
              />
            </div>
          </div>

          {Object.keys(updatedSettings).length > 0 && (
            <div className="flex justify-end">
              <Button onClick={saveSettings} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Salvar Configurações
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Módulos do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Módulos do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(modulesByCategory).map(([category, categoryModules]) => {
              const modulesArray = Array.isArray(categoryModules) ? categoryModules : [];
              return (
                <div key={category}>
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
                    {category === 'core' ? 'Núcleo' : 
                     category === 'business' ? 'Negócios' :
                     category === 'hr' ? 'Recursos Humanos' :
                     category === 'marketing' ? 'Marketing' :
                     category === 'sales' ? 'Vendas' :
                     category === 'analytics' ? 'Análises' :
                     category === 'communication' ? 'Comunicação' : category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modulesArray.map((module: any) => (
                      <div key={module.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{module.name}</h5>
                          <Badge variant={module.status === 'active' ? 'default' : 'secondary'}>
                            {module.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          v{module.version}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}