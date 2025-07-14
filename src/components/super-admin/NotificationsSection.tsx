import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Bell,
  Plus,
  Send,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Calendar,
  Users,
  Building2
} from "lucide-react";

interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  priority: number;
  target_audience: any;
  scheduled_at: string;
  expires_at: string;
  is_active: boolean;
  created_at: string;
}

export function NotificationsSection() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info" as const,
    priority: 1,
    target_audience: "all",
    expires_at: ""
  });

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('system_notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data?.map((item: any) => ({
        ...item,
        scheduled_at: item.created_at // Add missing field
      })) || []);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as notificações",
        variant: "destructive"
      });
    }
  };

  const createNotification = async () => {
    if (!newNotification.title || !newNotification.message) {
      toast({
        title: "Erro",
        description: "Título e mensagem são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const targetAudience = newNotification.target_audience === "all" 
        ? {} 
        : { roles: [newNotification.target_audience] };

      const { error } = await supabase
        .from('system_notifications')
        .insert([{
          title: newNotification.title,
          message: newNotification.message,
          type: newNotification.type,
          priority: newNotification.priority,
          target_audience: targetAudience,
          expires_at: newNotification.expires_at || null
        }]);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Notificação criada com sucesso"
      });

      setNewNotification({
        title: "",
        message: "",
        type: "info",
        priority: 1,
        target_audience: "all",
        expires_at: ""
      });
      setShowCreateForm(false);
      loadNotifications();
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a notificação",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleNotificationStatus = async (notificationId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('system_notifications')
        .update({ is_active: !currentStatus })
        .eq('id', notificationId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Notificação ${!currentStatus ? 'ativada' : 'desativada'} com sucesso`
      });

      loadNotifications();
    } catch (error) {
      console.error('Erro ao atualizar notificação:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a notificação",
        variant: "destructive"
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return 'bg-red-500';
    if (priority >= 3) return 'bg-yellow-500';
    if (priority >= 2) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Notificações do Sistema</h3>
          <p className="text-muted-foreground">Gerencie notificações globais para usuários e franquias</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-modern hover:bg-blue-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Notificação
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="border-2 border-dashed border-blue-modern/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Criar Nova Notificação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="notification-title">Título da Notificação</Label>
                <Input
                  id="notification-title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                  placeholder="Ex: Manutenção programada do sistema"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notification-message">Mensagem</Label>
              <Textarea
                id="notification-message"
                value={newNotification.message}
                onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                placeholder="Descrição detalhada da notificação"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="notification-type">Tipo</Label>
                <Select value={newNotification.type} onValueChange={(value: any) => setNewNotification({ ...newNotification, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Informação</SelectItem>
                    <SelectItem value="warning">Aviso</SelectItem>
                    <SelectItem value="error">Erro</SelectItem>
                    <SelectItem value="success">Sucesso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notification-priority">Prioridade</Label>
                <Select value={newNotification.priority.toString()} onValueChange={(value) => setNewNotification({ ...newNotification, priority: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Baixa</SelectItem>
                    <SelectItem value="2">Normal</SelectItem>
                    <SelectItem value="3">Alta</SelectItem>
                    <SelectItem value="4">Crítica</SelectItem>
                    <SelectItem value="5">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notification-audience">Público Alvo</Label>
                <Select value={newNotification.target_audience} onValueChange={(value) => setNewNotification({ ...newNotification, target_audience: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os usuários</SelectItem>
                    <SelectItem value="super_admin">Super Admins</SelectItem>
                    <SelectItem value="franchise_owner">Proprietários de Franquia</SelectItem>
                    <SelectItem value="unit_manager">Gerentes de Unidade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notification-expires">Data de Expiração (opcional)</Label>
              <Input
                id="notification-expires"
                type="datetime-local"
                value={newNotification.expires_at}
                onChange={(e) => setNewNotification({ ...newNotification, expires_at: e.target.value })}
              />
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={createNotification} 
                disabled={loading}
                className="bg-green-modern hover:bg-green-600"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Notificação
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`${notification.is_active ? '' : 'opacity-60'}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center space-x-2 mt-1">
                    {getTypeIcon(notification.type)}
                    <div 
                      className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`}
                      title={`Prioridade: ${notification.priority}`}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-lg">{notification.title}</h4>
                      <Badge className={getTypeColor(notification.type)}>
                        {notification.type === 'info' ? 'Info' :
                         notification.type === 'warning' ? 'Aviso' :
                         notification.type === 'error' ? 'Erro' : 'Sucesso'}
                      </Badge>
                      <Badge variant="outline">
                        Prioridade {notification.priority}
                      </Badge>
                      <Badge variant={notification.is_active ? "default" : "secondary"}>
                        {notification.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{notification.message}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Criado: {formatDate(notification.created_at)}</span>
                      </div>
                      {notification.expires_at && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Expira: {formatDate(notification.expires_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant={notification.is_active ? "destructive" : "default"}
                  onClick={() => toggleNotificationStatus(notification.id, notification.is_active)}
                >
                  {notification.is_active ? 'Desativar' : 'Ativar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma notificação encontrada</h3>
            <p className="text-muted-foreground mb-4">
              Crie a primeira notificação do sistema
            </p>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-modern hover:bg-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeira Notificação
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}