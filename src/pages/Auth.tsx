import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Building2, Loader2, AlertCircle } from "lucide-react";

export function Auth() {
  const { user, login } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    nome: ""
  });
  const [error, setError] = useState("");

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      setError("Email e senha são obrigatórios");
      return;
    }

    if (isSignUp && !credentials.nome) {
      setError("Nome é obrigatório para cadastro");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        // Sign up flow
        const { data, error } = await supabase.auth.signUp({
          email: credentials.email,
          password: credentials.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              nome: credentials.nome
            }
          }
        });

        if (error) {
          setError(error.message);
          return;
        }

        if (data.user) {
          // Create user profile
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              auth_user_id: data.user.id,
              email: credentials.email,
              nome: credentials.nome,
              role: 'user'
            });

          if (profileError) {
            console.error('Error creating profile:', profileError);
          }

          toast({
            title: "Cadastro realizado",
            description: "Verifique seu email para confirmar a conta"
          });
        }
      } else {
        // Sign in flow
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        });

        if (error) {
          setError(error.message || "Credenciais inválidas");
          return;
        }

        if (data.user) {
          // Get user profile
          const { data: userProfile } = await supabase
            .from('users')
            .select('*')
            .eq('auth_user_id', data.user.id)
            .single();

          const profile = userProfile || {
            id: data.user.id,
            email: data.user.email || '',
            nome: data.user.user_metadata?.nome || credentials.nome || 'Usuário',
            role: 'user'
          };

          const userData = {
            id: profile.id,
            email: profile.email,
            nome: profile.nome,
            role: profile.role,
            companies: []
          };

          login(userData);

          toast({
            title: "Login realizado",
            description: `Bem-vindo, ${userData.nome}!`
          });
        }
      }
    } catch (error: any) {
      console.error('Erro na autenticação:', error);
      setError("Erro interno do sistema");
    } finally {
      setLoading(false);
    }
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
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isSignUp ? 'Criar Conta' : 'DromeFlow'}
            </CardTitle>
            <p className="text-gray-600">
              {isSignUp ? 'Cadastre-se no sistema' : 'Sistema de Gestão Inteligente'}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    type="text"
                    value={credentials.nome}
                    onChange={(e) => setCredentials({ ...credentials, nome: e.target.value })}
                    placeholder="Seu nome completo"
                    className="mt-1"
                  />
                </div>
              )}

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
                  placeholder={isSignUp ? "Mínimo 6 caracteres" : "Digite sua senha"}
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
                    {isSignUp ? 'Criando conta...' : 'Entrando...'}
                  </>
                ) : (
                  isSignUp ? 'Criar Conta' : 'Entrar'
                )}
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
                className="text-blue-modern"
              >
                {isSignUp 
                  ? 'Já tem uma conta? Faça login' 
                  : 'Não tem uma conta? Cadastre-se'
                }
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                DromeFlow - Sistema de Gestão v2.0.0
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}