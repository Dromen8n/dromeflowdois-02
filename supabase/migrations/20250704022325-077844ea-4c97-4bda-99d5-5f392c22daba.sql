-- Expandir sistema de empresas/franquias com hierarquia completa
-- Adicionar campos importantes que faltam na tabela companies
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS franchise_type text DEFAULT 'standard' CHECK (franchise_type IN ('master', 'regional', 'standard', 'micro')),
ADD COLUMN IF NOT EXISTS parent_company_id uuid REFERENCES companies(id),
ADD COLUMN IF NOT EXISTS subscription_expires_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS billing_data jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS integration_settings jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS business_hours jsonb DEFAULT '{}';

-- Criar tabela de planos de franquia
CREATE TABLE IF NOT EXISTS franchise_plans (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price numeric(10,2),
  billing_cycle text DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'quarterly', 'annual')),
  max_units integer DEFAULT 1,
  max_users integer DEFAULT 10,
  features jsonb DEFAULT '[]',
  limitations jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Criar tabela de assinaturas
CREATE TABLE IF NOT EXISTS franchise_subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  plan_id uuid NOT NULL REFERENCES franchise_plans(id),
  status text DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'cancelled', 'expired')),
  starts_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone,
  auto_renew boolean DEFAULT true,
  payment_data jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Expandir tabela units com mais informações
ALTER TABLE units 
ADD COLUMN IF NOT EXISTS franchise_fee numeric(10,2),
ADD COLUMN IF NOT EXISTS territory_bounds jsonb,
ADD COLUMN IF NOT EXISTS performance_metrics jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS compliance_status text DEFAULT 'compliant' CHECK (compliance_status IN ('compliant', 'warning', 'non_compliant')),
ADD COLUMN IF NOT EXISTS last_inspection timestamp with time zone,
ADD COLUMN IF NOT EXISTS business_license text,
ADD COLUMN IF NOT EXISTS local_settings jsonb DEFAULT '{}';

-- Criar tabela de roles e permissões customizáveis
CREATE TABLE IF NOT EXISTS custom_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  unit_id uuid REFERENCES units(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  permissions jsonb NOT NULL DEFAULT '{}',
  is_system_role boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT either_company_or_unit CHECK (
    (company_id IS NOT NULL AND unit_id IS NULL) OR 
    (company_id IS NULL AND unit_id IS NOT NULL) OR
    (company_id IS NULL AND unit_id IS NULL AND is_system_role = true)
  )
);

-- Criar tabela de atribuições de roles
CREATE TABLE IF NOT EXISTS user_role_assignments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES custom_roles(id) ON DELETE CASCADE,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  unit_id uuid REFERENCES units(id) ON DELETE CASCADE,
  assigned_by uuid REFERENCES users(id),
  assigned_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone,
  is_active boolean DEFAULT true,
  UNIQUE(user_id, role_id, company_id, unit_id)
);

-- Criar tabela de notificações do sistema
CREATE TABLE IF NOT EXISTS system_notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success')),
  priority integer DEFAULT 1 CHECK (priority BETWEEN 1 AND 5),
  target_audience jsonb DEFAULT '{}', -- {roles: [], companies: [], users: []}
  scheduled_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES users(id),
  created_at timestamp with time zone DEFAULT now()
);

-- Criar tabela de leituras de notificações
CREATE TABLE IF NOT EXISTS notification_reads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  notification_id uuid NOT NULL REFERENCES system_notifications(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  read_at timestamp with time zone DEFAULT now(),
  UNIQUE(notification_id, user_id)
);

-- Inserir planos padrão
INSERT INTO franchise_plans (name, description, price, max_units, max_users, features) VALUES
('Starter', 'Plano básico para franquias iniciantes', 99.00, 1, 5, '["dashboard", "clients", "basic_reports"]'),
('Professional', 'Plano completo para franquias estabelecidas', 199.00, 3, 15, '["dashboard", "clients", "professionals", "agenda", "financial", "reports", "integrations"]'),
('Enterprise', 'Plano corporativo para grandes redes', 399.00, 10, 50, '["all_modules", "custom_integrations", "priority_support", "advanced_analytics"]')
ON CONFLICT DO NOTHING;

-- Inserir roles padrão do sistema
INSERT INTO custom_roles (name, description, permissions, is_system_role) VALUES
('Super Admin', 'Administrador do sistema com acesso total', '{"all": true}', true),
('Franchise Owner', 'Proprietário da franquia com acesso completo à sua rede', '{"company_management": true, "unit_management": true, "user_management": true, "financial_full": true}', true),
('Unit Manager', 'Gerente de unidade com acesso local completo', '{"unit_management": true, "local_users": true, "financial_read": true, "reports": true}', true),
('Staff', 'Funcionário com acesso básico', '{"dashboard": true, "clients_read": true, "schedule": true}', true),
('Viewer', 'Acesso apenas para visualização', '{"dashboard": true, "reports_read": true}', true)
ON CONFLICT DO NOTHING;

-- Habilitar RLS nas novas tabelas
ALTER TABLE franchise_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_role_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_reads ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para franchise_plans (públicas para visualização)
CREATE POLICY "Plans are viewable by authenticated users" ON franchise_plans
FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Super admins can manage plans" ON franchise_plans
FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin')
);

-- Políticas RLS para franchise_subscriptions
CREATE POLICY "Users can view their company subscriptions" ON franchise_subscriptions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM company_members cm 
    WHERE cm.user_id = auth.uid() AND cm.company_id = franchise_subscriptions.company_id
  ) OR EXISTS (
    SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin'
  )
);

-- Políticas RLS para custom_roles
CREATE POLICY "Users can view roles in their context" ON custom_roles
FOR SELECT USING (
  is_system_role = true OR
  EXISTS (
    SELECT 1 FROM company_members cm 
    WHERE cm.user_id = auth.uid() AND cm.company_id = custom_roles.company_id
  ) OR
  EXISTS (
    SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin'
  )
);

-- Políticas RLS para user_role_assignments
CREATE POLICY "Users can view their own role assignments" ON user_role_assignments
FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin'
  )
);

-- Políticas RLS para system_notifications
CREATE POLICY "Users can view notifications targeted to them" ON system_notifications
FOR SELECT USING (
  is_active = true AND 
  (expires_at IS NULL OR expires_at > now()) AND
  (
    target_audience = '{}' OR
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.auth_user_id = auth.uid() 
      AND (
        target_audience->>'users' LIKE '%' || u.id::text || '%' OR
        target_audience->>'roles' LIKE '%' || u.role || '%'
      )
    )
  )
);

-- Triggers para updated_at
CREATE TRIGGER update_franchise_plans_updated_at BEFORE UPDATE ON franchise_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_franchise_subscriptions_updated_at BEFORE UPDATE ON franchise_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_custom_roles_updated_at BEFORE UPDATE ON custom_roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();