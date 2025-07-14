import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  FileText,
  Search,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  User,
  Building,
} from "lucide-react";

interface AuditLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_data: any;
  new_data: any;
  created_at: string;
  user: {
    id: string;
    nome: string;
    email: string;
  };
  company?: {
    id: string;
    name: string;
  };
  unit?: {
    id: string;
    name: string;
  };
}

export function AuditLogsSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    entity_type: '',
    company_id: '',
    search: ''
  });

  const pageSize = 20;

  useEffect(() => {
    loadAuditLogs();
  }, [currentPage, filters]);

  const loadAuditLogs = async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * pageSize;
      const params: any = {
        p_limit: pageSize,
        p_offset: offset
      };
      
      if (filters.entity_type) {
        params.p_entity_type = filters.entity_type;
      }
      
      const { data, error } = await supabase.rpc('get_audit_logs', params);

      if (error) throw error;

      const result = data as unknown as { logs: AuditLog[]; total_count: number; has_more: boolean };
      setLogs(result.logs || []);
      setTotalCount(result.total_count || 0);
      setHasMore(result.has_more || false);
    } catch (error) {
      console.error('Erro ao carregar logs:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os logs de auditoria",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const getActionLabel = (action: string) => {
    const actionLabels: Record<string, string> = {
      'create': 'Criou',
      'update': 'Atualizou',
      'delete': 'Deletou',
      'login': 'Login',
      'logout': 'Logout',
      'update_system_setting': 'Configuração Alterada',
      'create_company': 'Franquia Criada',
      'create_unit': 'Unidade Criada',
      'create_user': 'Usuário Criado'
    };
    return actionLabels[action] || action;
  };

  const getEntityTypeLabel = (entityType: string) => {
    const entityLabels: Record<string, string> = {
      'company': 'Franquia',
      'unit': 'Unidade',
      'user': 'Usuário',
      'system_setting': 'Configuração',
      'module': 'Módulo',
      'notification': 'Notificação'
    };
    return entityLabels[entityType] || entityType;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-6">
      {/* Header com Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Logs de Auditoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar logs..."
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
            </div>
            <Select value={filters.entity_type} onValueChange={(value) => handleFilterChange('entity_type', value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo de Entidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os tipos</SelectItem>
                <SelectItem value="company">Franquia</SelectItem>
                <SelectItem value="unit">Unidade</SelectItem>
                <SelectItem value="user">Usuário</SelectItem>
                <SelectItem value="system_setting">Configuração</SelectItem>
                <SelectItem value="module">Módulo</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={loadAuditLogs} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>

          {/* Estatísticas */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <span>Total de {totalCount} registros</span>
            <span>Página {currentPage} de {totalPages}</span>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Logs */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Carregando logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Nenhum log encontrado</p>
            </div>
          ) : (
            <div className="divide-y">
              {logs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-muted/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">
                          {getActionLabel(log.action)}
                        </Badge>
                        <Badge variant="secondary">
                          {getEntityTypeLabel(log.entity_type)}
                        </Badge>
                        {log.company && (
                          <Badge variant="outline" className="bg-blue-modern/10 text-blue-modern">
                            <Building className="h-3 w-3 mr-1" />
                            {log.company.name}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {log.user?.nome || 'Sistema'}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(log.created_at)}
                        </div>
                      </div>

                      {/* Detalhes das mudanças */}
                      {(log.old_data || log.new_data) && (
                        <div className="mt-3 p-3 bg-muted/30 rounded-md">
                          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                            Detalhes da Mudança
                          </h4>
                          <div className="text-xs space-y-1">
                            {log.old_data && (
                              <div>
                                <span className="font-medium">Anterior:</span> {JSON.stringify(log.old_data)}
                              </div>
                            )}
                            {log.new_data && (
                              <div>
                                <span className="font-medium">Novo:</span> {JSON.stringify(log.new_data)}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Paginação */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Próximo
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}