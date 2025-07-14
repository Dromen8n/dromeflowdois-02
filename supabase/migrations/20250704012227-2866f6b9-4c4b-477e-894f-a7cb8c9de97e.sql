-- Criar tabela de módulos do sistema
CREATE TABLE public.modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  version TEXT DEFAULT '1.0.0',
  category TEXT DEFAULT 'general',
  icon TEXT,
  config_schema JSONB DEFAULT '{}',
  dependencies TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'deprecated')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de logs de auditoria
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  company_id UUID REFERENCES companies(id),
  unit_id UUID REFERENCES units(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de configurações do sistema
CREATE TABLE public.system_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inserir módulos padrão do sistema
INSERT INTO modules (key, name, description, category, icon) VALUES
('dashboard', 'Dashboard', 'Painel principal com visão geral', 'core', 'LayoutDashboard'),
('clients', 'Gestão de Clientes', 'Módulo para gerenciar clientes', 'business', 'Users'),
('professionals', 'Profissionais', 'Gestão de profissionais', 'business', 'UserCheck'),
('agenda', 'Agenda', 'Sistema de agendamentos', 'business', 'Calendar'),
('financial', 'Financeiro', 'Gestão financeira', 'business', 'DollarSign'),
('recruitment', 'Recrutamento', 'Sistema de recrutamento', 'hr', 'UserPlus'),
('cashback', 'Cashback', 'Sistema de cashback', 'marketing', 'Gift'),
('pipeline', 'Pipeline', 'Gestão de leads', 'sales', 'Workflow'),
('reports', 'Relatórios', 'Sistema de relatórios', 'analytics', 'BarChart'),
('notifications', 'Notificações', 'Sistema de notificações', 'communication', 'Bell');

-- Inserir configurações padrão do sistema
INSERT INTO system_settings (key, value, description, category) VALUES
('site_name', '"MariaFlow"', 'Nome do sistema', 'general'),
('site_description', '"Sistema de gestão para franquias"', 'Descrição do sistema', 'general'),
('maintenance_mode', 'false', 'Modo de manutenção', 'system'),
('max_companies', '100', 'Máximo de empresas permitidas', 'limits'),
('max_units_per_company', '50', 'Máximo de unidades por empresa', 'limits'),
('email_notifications', 'true', 'Habilitar notificações por email', 'notifications'),
('audit_retention_days', '365', 'Dias para manter logs de auditoria', 'system');

-- Função para registrar logs de auditoria
CREATE OR REPLACE FUNCTION public.log_audit(
  p_action TEXT,
  p_entity_type TEXT,
  p_entity_id UUID DEFAULT NULL,
  p_old_data JSONB DEFAULT NULL,
  p_new_data JSONB DEFAULT NULL,
  p_company_id UUID DEFAULT NULL,
  p_unit_id UUID DEFAULT NULL
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_log_id UUID;
  v_user_id UUID;
BEGIN
  -- Obter ID do usuário atual
  SELECT id INTO v_user_id FROM users WHERE auth_user_id = auth.uid();
  
  -- Inserir log de auditoria
  INSERT INTO audit_logs (
    user_id, action, entity_type, entity_id, 
    old_data, new_data, company_id, unit_id
  ) VALUES (
    v_user_id, p_action, p_entity_type, p_entity_id,
    p_old_data, p_new_data, p_company_id, p_unit_id
  ) RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;

-- Função para obter configurações do sistema
CREATE OR REPLACE FUNCTION public.get_system_settings()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSONB;
BEGIN
  SELECT jsonb_object_agg(key, value) INTO v_result
  FROM system_settings
  WHERE is_public = true OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'super_admin'
  );
  
  RETURN COALESCE(v_result, '{}'::jsonb);
END;
$$;

-- Função para atualizar configurações do sistema
CREATE OR REPLACE FUNCTION public.update_system_setting(
  p_key TEXT,
  p_value JSONB,
  p_description TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_old_value JSONB;
BEGIN
  -- Verificar se é super admin
  IF NOT EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin') THEN
    RETURN jsonb_build_object('success', false, 'message', 'Acesso negado');
  END IF;
  
  -- Obter valor antigo
  SELECT value INTO v_old_value FROM system_settings WHERE key = p_key;
  
  -- Atualizar ou inserir configuração
  INSERT INTO system_settings (key, value, description, updated_at)
  VALUES (p_key, p_value, p_description, now())
  ON CONFLICT (key) DO UPDATE SET
    value = p_value,
    description = COALESCE(p_description, system_settings.description),
    updated_at = now();
  
  -- Registrar log de auditoria
  PERFORM log_audit(
    'update_system_setting',
    'system_setting',
    NULL,
    jsonb_build_object('key', p_key, 'old_value', v_old_value),
    jsonb_build_object('key', p_key, 'new_value', p_value)
  );
  
  RETURN jsonb_build_object('success', true, 'message', 'Configuração atualizada com sucesso');
END;
$$;

-- Função para obter logs de auditoria
CREATE OR REPLACE FUNCTION public.get_audit_logs(
  p_limit INTEGER DEFAULT 50,
  p_offset INTEGER DEFAULT 0,
  p_entity_type TEXT DEFAULT NULL,
  p_company_id UUID DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSONB;
  v_total_count INTEGER;
BEGIN
  -- Verificar se é super admin
  IF NOT EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin') THEN
    RETURN jsonb_build_object('success', false, 'message', 'Acesso negado');
  END IF;
  
  -- Contar total de registros
  SELECT COUNT(*) INTO v_total_count
  FROM audit_logs al
  WHERE (p_entity_type IS NULL OR al.entity_type = p_entity_type)
    AND (p_company_id IS NULL OR al.company_id = p_company_id);
  
  -- Obter logs
  SELECT jsonb_build_object(
    'logs', jsonb_agg(
      jsonb_build_object(
        'id', al.id,
        'action', al.action,
        'entity_type', al.entity_type,
        'entity_id', al.entity_id,
        'old_data', al.old_data,
        'new_data', al.new_data,
        'ip_address', al.ip_address,
        'user_agent', al.user_agent,
        'created_at', al.created_at,
        'user', jsonb_build_object(
          'id', u.id,
          'nome', u.nome,
          'email', u.email
        ),
        'company', CASE WHEN c.id IS NOT NULL THEN
          jsonb_build_object('id', c.id, 'name', c.name)
        ELSE NULL END,
        'unit', CASE WHEN un.id IS NOT NULL THEN
          jsonb_build_object('id', un.id, 'name', un.name)
        ELSE NULL END
      )
      ORDER BY al.created_at DESC
    ),
    'total_count', v_total_count,
    'has_more', (v_total_count > p_offset + p_limit)
  ) INTO v_result
  FROM audit_logs al
  LEFT JOIN users u ON u.id = al.user_id
  LEFT JOIN companies c ON c.id = al.company_id
  LEFT JOIN units un ON un.id = al.unit_id
  WHERE (p_entity_type IS NULL OR al.entity_type = p_entity_type)
    AND (p_company_id IS NULL OR al.company_id = p_company_id)
  ORDER BY al.created_at DESC
  LIMIT p_limit OFFSET p_offset;
  
  RETURN COALESCE(v_result, jsonb_build_object('logs', '[]'::jsonb, 'total_count', 0, 'has_more', false));
END;
$$;

-- Habilitar RLS nas novas tabelas
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para módulos
CREATE POLICY "Super admins can manage modules" ON modules
FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin')
);

-- Políticas RLS para logs de auditoria
CREATE POLICY "Super admins can view audit logs" ON audit_logs
FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin')
);

-- Políticas RLS para configurações do sistema
CREATE POLICY "Super admins can manage system settings" ON system_settings
FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Public settings are readable by all authenticated users" ON system_settings
FOR SELECT USING (is_public = true AND auth.uid() IS NOT NULL);