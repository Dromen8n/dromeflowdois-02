import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  nome: string;
  role: string;
  unidade_id?: string;
  company_id?: string;
  franchise_permissions?: {
    can_manage_company: boolean;
    can_manage_units: boolean;
    can_view_financials: boolean;
    can_manage_users: boolean;
  };
  companies?: Array<{
    id: string;
    name: string;
    key: string;
    role: string;
  }>;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isFranchiseOwner: boolean;
  hasCompanyAccess: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('mariaflow_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Erro ao carregar usuário salvo:', error);
        localStorage.removeItem('mariaflow_user');
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('mariaflow_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mariaflow_user');
  };

  const isAuthenticated = !!user;
  const isSuperAdmin = user?.role === 'super_admin';
  const isFranchiseOwner = user?.franchise_permissions?.can_manage_company || false;
  const hasCompanyAccess = !!user?.company_id || !!user?.companies?.length;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      isSuperAdmin,
      isFranchiseOwner,
      hasCompanyAccess
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}