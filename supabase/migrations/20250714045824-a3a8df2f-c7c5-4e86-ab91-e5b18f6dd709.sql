-- Create missing RPC functions for super admin operations
CREATE OR REPLACE FUNCTION public.super_admin_create_company(
  p_name TEXT,
  p_key TEXT,
  p_document TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_company_id UUID;
    v_result JSONB;
BEGIN
    -- Check if user is super admin
    SELECT id INTO v_user_id FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin';
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('error', 'Access denied');
    END IF;

    -- Create the franchise/company
    INSERT INTO franquias (nome, codigo, cnpj, status)
    VALUES (p_name, p_key, p_document, 'ativo')
    RETURNING id INTO v_company_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'company_id', v_company_id,
        'message', 'Company created successfully'
    );
END;
$$;

-- Function to activate/deactivate modules
CREATE OR REPLACE FUNCTION public.activate_module(
  p_module_id UUID,
  p_active BOOLEAN
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
BEGIN
    -- Check if user is super admin
    SELECT id INTO v_user_id FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin';
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('error', 'Access denied');
    END IF;

    -- Update module status
    UPDATE modulos_sistema 
    SET ativo = p_active, updated_at = now()
    WHERE id = p_module_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'message', 'Module status updated successfully'
    );
END;
$$;

-- Function to get franchise plans (uses existing planos_sistema table)
CREATE OR REPLACE FUNCTION public.get_franchise_plans()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_result JSONB;
BEGIN
    -- Check if user is super admin
    SELECT id INTO v_user_id FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin';
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('error', 'Access denied');
    END IF;

    SELECT jsonb_agg(
        jsonb_build_object(
            'id', p.id,
            'name', p.nome,
            'description', COALESCE(p.recursos->>'description', ''),
            'price', p.preco,
            'billing_cycle', CASE p.tipo 
                WHEN 'basico' THEN 'monthly'
                WHEN 'profissional' THEN 'monthly' 
                WHEN 'empresarial' THEN 'monthly'
                WHEN 'enterprise' THEN 'annual'
                ELSE 'monthly'
            END,
            'max_units', p.max_unidades,
            'max_users', p.max_usuarios,
            'features', p.modulos_incluidos,
            'limitations', p.recursos,
            'is_active', p.ativo
        )
    )
    INTO v_result
    FROM planos_sistema p;
    
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

-- Create system_notifications table for notifications
CREATE TABLE IF NOT EXISTS public.system_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) NOT NULL DEFAULT 'info',
    priority INTEGER NOT NULL DEFAULT 1,
    target_audience JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on system_notifications
ALTER TABLE public.system_notifications ENABLE ROW LEVEL SECURITY;

-- Create policy for system_notifications (only super admins can manage)
CREATE POLICY "SuperAdmins can manage notifications" ON public.system_notifications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.auth_user_id = auth.uid() 
            AND u.role = 'super_admin'
        )
    );

-- Add trigger for updated_at
CREATE TRIGGER update_system_notifications_updated_at
    BEFORE UPDATE ON public.system_notifications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Update get_audit_logs function to support entity_type filter
CREATE OR REPLACE FUNCTION public.get_audit_logs(
    p_limit INTEGER DEFAULT 100,
    p_offset INTEGER DEFAULT 0,
    p_entity_type TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_result JSONB;
    v_where_clause TEXT := '';
BEGIN
    -- Check if user is super admin
    SELECT id INTO v_user_id FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin';
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('error', 'Access denied');
    END IF;

    -- Build WHERE clause for entity type filter
    IF p_entity_type IS NOT NULL THEN
        v_where_clause := ' WHERE l.entidade = $3';
    END IF;

    -- Execute dynamic query
    EXECUTE format('
        SELECT jsonb_build_object(
            ''logs'', COALESCE(jsonb_agg(
                jsonb_build_object(
                    ''id'', l.id,
                    ''action'', l.acao,
                    ''entity_type'', l.entidade,
                    ''entity_id'', l.entidade_id,
                    ''old_data'', l.dados_antes,
                    ''new_data'', l.dados_depois,
                    ''created_at'', l.created_at,
                    ''user'', jsonb_build_object(
                        ''id'', sa.id,
                        ''name'', u.nome
                    ),
                    ''company'', null,
                    ''unit'', null
                )
            ), ''[]''::jsonb),
            ''total_count'', (SELECT COUNT(*) FROM logs_sistema_global%s)
        )
        FROM logs_sistema_global l
        LEFT JOIN super_admins sa ON l.super_admin_id = sa.id
        LEFT JOIN users u ON sa.user_id = u.auth_user_id
        %s
        ORDER BY l.created_at DESC
        LIMIT $1 OFFSET $2
    ', v_where_clause, v_where_clause)
    INTO v_result
    USING p_limit, p_offset, p_entity_type;
    
    RETURN COALESCE(v_result, jsonb_build_object('logs', '[]'::jsonb, 'total_count', 0));
END;
$$;