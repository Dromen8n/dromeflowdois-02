import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthUser {
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
  user: AuthUser | null;
  session: Session | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isFranchiseOwner: boolean;
  hasCompanyAccess: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Defer fetching user profile to avoid deadlock
          setTimeout(() => {
            fetchUserProfile(session.user);
          }, 0);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', authUser.id)
        .single();

      if (userProfile) {
        const userData: AuthUser = {
          id: userProfile.id,
          email: userProfile.email,
          nome: userProfile.nome,
          role: userProfile.role,
          companies: []
        };
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: AuthUser) => {
    setUser(userData);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const isAuthenticated = !!user && !!session;
  const isSuperAdmin = user?.role === 'super_admin';
  const isFranchiseOwner = user?.franchise_permissions?.can_manage_company || false;
  const hasCompanyAccess = !!user?.company_id || !!user?.companies?.length;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      login,
      logout,
      isAuthenticated,
      isSuperAdmin,
      isFranchiseOwner,
      hasCompanyAccess,
      loading
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