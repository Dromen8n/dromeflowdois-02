import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  Plus,
  Edit,
  Eye,
  Loader2
} from "lucide-react";

interface User {
  id: string;
  email: string;
  nome: string;
  role: string;
  active: boolean;
  created_at: string;
}

interface UserSectionProps {
  users: User[];
  onUsersChange: () => void;
}

export function UserSection({ users, onUsersChange }: UserSectionProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    nome: "",
    role: "unidade",
    password: ""
  });

  const createUser = async () => {
    if (!newUser.email || !newUser.nome || !newUser.password) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('super_admin_create_user', {
        p_email: newUser.email,
        p_nome: newUser.nome,
        p_role: newUser.role,
        p_password: newUser.password
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

      setNewUser({ email: "", nome: "", role: "unidade", password: "" });
      onUsersChange();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o usuário",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form to create user */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Novo Usuário
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="user-email">Email</Label>
            <Input
              id="user-email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="usuario@email.com"
            />
          </div>
          <div>
            <Label htmlFor="user-nome">Nome</Label>
            <Input
              id="user-nome"
              value={newUser.nome}
              onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
              placeholder="Nome do usuário"
            />
          </div>
          <div>
            <Label htmlFor="user-role">Função</Label>
            <select
              id="user-role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="unidade">Unidade</option>
            </select>
          </div>
          <div>
            <Label htmlFor="user-password">Senha</Label>
            <Input
              id="user-password"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="Digite a senha"
            />
          </div>
          <Button 
            onClick={createUser} 
            disabled={loading}
            className="w-full bg-yellow-modern hover:bg-yellow-600"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            Criar Usuário
          </Button>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Usuários Cadastrados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{user.nome}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex space-x-2 mt-1">
                    <Badge variant="outline">{user.role}</Badge>
                    <Badge 
                      variant={user.active ? 'default' : 'secondary'}
                    >
                      {user.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
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