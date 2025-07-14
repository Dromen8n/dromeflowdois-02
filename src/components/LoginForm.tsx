import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Building2, Loader2, AlertCircle } from "lucide-react";

interface LoginFormProps {
  onLogin: (user: any) => void;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    nome: string;
    role: string;
    unidade_id?: string;
  };
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      setError("Email e senha são obrigatórios");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Use Supabase Auth for authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        console.error('Erro na autenticação:', error);
        setError(error.message || "Credenciais inválidas");
        return;
      }

      if (!data.user) {
        setError("Dados do usuário não encontrados");
        return;
      }

      // Get user profile data
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', data.user.id)
        .single();

      if (profileError || !userProfile) {
        // Create user profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert({
            auth_user_id: data.user.id,
            email: data.user.email || '',
            nome: data.user.user_metadata?.nome || data.user.email?.split('@')[0] || 'Usuário',
            role: 'user'
          })
          .select()
          .single();

        if (createError) {
          console.error('Erro ao criar perfil:', createError);
          setError("Erro ao criar perfil do usuário");
          return;
        }
      }

      const profile = userProfile || {
        id: data.user.id,
        email: data.user.email || '',
        nome: data.user.user_metadata?.nome || data.user.email?.split('@')[0] || 'Usuário',
        role: 'user'
      };

      // Buscar as empresas do usuário
      let companies: any[] = [];
      try {
        const { data: companiesData } = await supabase.rpc('get_user_companies', {
          p_user_id: profile.id
        });
        if (companiesData && typeof companiesData === 'object') {
          companies = Array.isArray(companiesData) ? companiesData : [];
        }
      } catch (companiesError) {
        console.error('Erro ao buscar empresas:', companiesError);
      }

      // Login bem-sucedido
      const userData = {
        id: profile.id,
        email: profile.email,
        nome: profile.nome,
        role: profile.role,
        companies: companies
      };

      toast({
        title: "Login realizado",
        description: `Bem-vindo, ${userData.nome}!`
      });

      onLogin(userData);

    } catch (error) {
      console.error('Erro no login:', error);
      setError("Erro interno do sistema");
    } finally {
      setLoading(false);
    }
  };

  // Usuários de teste para facilitar o acesso
  const testUsers = [
    { email: "admin@mariaflow.com", password: "admin123", role: "Super Admin" },
    { email: "gestor@mariaflow.com", password: "gestor123", role: "Gestor" },
    { email: "unidade@mariaflow.com", password: "unidade123", role: "Unidade" },
    { email: "franqueado@teste.com", password: "senha123", role: "Franqueado" }
  ];

  const loginAsTestUser = (user: any) => {
    setCredentials({ email: user.email, password: user.password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-modern via-green-modern to-yellow-modern p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-blue-modern rounded-2xl flex items-center justify-center">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">MariaFlow</CardTitle>
            <p className="text-gray-600">Sistema de Gestão Inteligente</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Digite sua senha"
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-modern hover:bg-blue-600 h-12"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            {/* Usuários de teste para facilitar desenvolvimento */}
            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-3 text-center">Usuários de teste:</p>
              <div className="space-y-2">
                {testUsers.map((user, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => loginAsTestUser(user)}
                    className="w-full text-xs"
                  >
                    {user.role}: {user.email}
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Sistema de teste - Versão 2.0.0
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}