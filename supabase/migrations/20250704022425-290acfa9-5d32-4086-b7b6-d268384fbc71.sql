-- Funções para gerenciamento de franquias e planos

-- Função para obter planos disponíveis
CREATE OR REPLACE FUNCTION public.get_franchise_plans()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result jsonb;
BEGIN
    SELECT jsonb_agg(
        jsonb_build_object(
            'id', id,
            'name', name,
            'description', description,
            'price', price,
            'billing_cycle', billing_cycle,
            'max_units', max_units,
            'max_users', max_users,
            'features', features,
            'limitations', limitations,
            'is_active', is_active
        )
        ORDER BY price ASC
    ) INTO v_result
    FROM franchise_plans
    WHERE is_active = true;
    
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

-- Função para criar assinatura de plano
CREATE OR REPLACE FUNCTION public.create_franchise_subscription(
    p_company_id uuid,
    p_plan_id uuid,
    p_expires_at timestamp with time zone DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_subscription_id uuid;
    v_plan_record franchise_plans%ROWTYPE;
    v_result jsonb;
BEGIN
    -- Verificar se é super admin ou owner da empresa
    IF NOT EXISTS (
        SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin'
    ) AND NOT EXISTS (
        SELECT 1 FROM company_members cm 
        WHERE cm.user_id = auth.uid() AND cm.company_id = p_company_id AND cm.role = 'owner'
    ) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Acesso negado');
    END IF;

    -- Obter dados do plano
    SELECT * INTO v_plan_record FROM franchise_plans WHERE id = p_plan_id AND is_active = true;
    
    IF v_plan_record.id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Plano não encontrado');
    END IF;

    -- Cancelar assinatura anterior se existir
    UPDATE franchise_subscriptions 
    SET status = 'cancelled'
    WHERE company_id = p_company_id AND status = 'active';

    -- Criar nova assinatura
    INSERT INTO franchise_subscriptions (
        company_id, plan_id, expires_at
    ) VALUES (
        p_company_id, 
        p_plan_id, 
        COALESCE(p_expires_at, now() + interval '1 month')
    ) RETURNING id INTO v_subscription_id;

    -- Atualizar empresa
    UPDATE companies 
    SET plan = v_plan_record.name,
        max_units = v_plan_record.max_units,
        subscription_expires_at = COALESCE(p_expires_at, now() + interval '1 month')
    WHERE id = p_company_id;

    RETURN jsonb_build_object(
        'success', true,
        'subscription_id', v_subscription_id,
        'message', 'Assinatura criada com sucesso'
    );
END;
$$;

-- Função para gerenciar roles customizadas
CREATE OR REPLACE FUNCTION public.manage_custom_role(
    p_action text, -- 'create', 'update', 'delete'
    p_role_id uuid DEFAULT NULL,
    p_company_id uuid DEFAULT NULL,
    p_unit_id uuid DEFAULT NULL,
    p_name text DEFAULT NULL,
    p_description text DEFAULT NULL,
    p_permissions jsonb DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_role_id uuid;
    v_user_id uuid;
    v_result jsonb;
BEGIN
    -- Obter ID do usuário atual
    SELECT id INTO v_user_id FROM users WHERE auth_user_id = auth.uid();
    
    -- Verificar permissões
    IF NOT EXISTS (
        SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin'
    ) AND NOT EXISTS (
        SELECT 1 FROM company_members cm 
        WHERE cm.user_id = auth.uid() AND cm.company_id = p_company_id AND cm.role IN ('owner', 'admin')
    ) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Acesso negado');
    END IF;

    CASE p_action
        WHEN 'create' THEN
            INSERT INTO custom_roles (
                company_id, unit_id, name, description, permissions
            ) VALUES (
                p_company_id, p_unit_id, p_name, p_description, p_permissions
            ) RETURNING id INTO v_role_id;
            
            v_result := jsonb_build_object(
                'success', true,
                'role_id', v_role_id,
                'message', 'Role criado com sucesso'
            );

        WHEN 'update' THEN
            UPDATE custom_roles 
            SET name = COALESCE(p_name, name),
                description = COALESCE(p_description, description),
                permissions = COALESCE(p_permissions, permissions),
                updated_at = now()
            WHERE id = p_role_id;
            
            v_result := jsonb_build_object(
                'success', true,
                'message', 'Role atualizado com sucesso'
            );

        WHEN 'delete' THEN
            -- Verificar se role não está sendo usado
            IF EXISTS (SELECT 1 FROM user_role_assignments WHERE role_id = p_role_id AND is_active = true) THEN
                RETURN jsonb_build_object('success', false, 'message', 'Role está sendo usado por usuários');
            END IF;
            
            DELETE FROM custom_roles WHERE id = p_role_id AND is_system_role = false;
            
            v_result := jsonb_build_object(
                'success', true,
                'message', 'Role removido com sucesso'
            );

        ELSE
            v_result := jsonb_build_object('success', false, 'message', 'Ação inválida');
    END CASE;

    RETURN v_result;
END;
$$;

-- Função para atribuir/remover roles de usuários
CREATE OR REPLACE FUNCTION public.assign_user_role(
    p_user_id uuid,
    p_role_id uuid,
    p_company_id uuid DEFAULT NULL,
    p_unit_id uuid DEFAULT NULL,
    p_action text DEFAULT 'assign' -- 'assign' ou 'remove'
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_assignment_id uuid;
    v_admin_user_id uuid;
    v_result jsonb;
BEGIN
    -- Obter ID do usuário admin
    SELECT id INTO v_admin_user_id FROM users WHERE auth_user_id = auth.uid();
    
    -- Verificar permissões
    IF NOT EXISTS (
        SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin'
    ) AND NOT EXISTS (
        SELECT 1 FROM company_members cm 
        WHERE cm.user_id = auth.uid() AND cm.company_id = p_company_id AND cm.role IN ('owner', 'admin')
    ) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Acesso negado');
    END IF;

    CASE p_action
        WHEN 'assign' THEN
            -- Remover atribuições anteriores ativas
            UPDATE user_role_assignments 
            SET is_active = false
            WHERE user_id = p_user_id AND company_id = p_company_id AND unit_id = p_unit_id;

            -- Criar nova atribuição
            INSERT INTO user_role_assignments (
                user_id, role_id, company_id, unit_id, assigned_by
            ) VALUES (
                p_user_id, p_role_id, p_company_id, p_unit_id, v_admin_user_id
            ) RETURNING id INTO v_assignment_id;
            
            v_result := jsonb_build_object(
                'success', true,
                'assignment_id', v_assignment_id,
                'message', 'Role atribuído com sucesso'
            );

        WHEN 'remove' THEN
            UPDATE user_role_assignments 
            SET is_active = false
            WHERE user_id = p_user_id AND role_id = p_role_id 
              AND company_id = p_company_id AND unit_id = p_unit_id;
            
            v_result := jsonb_build_object(
                'success', true,
                'message', 'Role removido com sucesso'
            );

        ELSE
            v_result := jsonb_build_object('success', false, 'message', 'Ação inválida');
    END CASE;

    RETURN v_result;
END;
$$;

-- Função para obter dados completos de uma franquia
CREATE OR REPLACE FUNCTION public.get_franchise_details(p_company_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result jsonb;
BEGIN
    -- Verificar permissão
    IF NOT EXISTS (
        SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin'
    ) AND NOT EXISTS (
        SELECT 1 FROM company_members cm 
        WHERE cm.user_id = auth.uid() AND cm.company_id = p_company_id
    ) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Acesso negado');
    END IF;

    SELECT jsonb_build_object(
        'company', jsonb_build_object(
            'id', c.id,
            'name', c.name,
            'key', c.key,
            'document', c.document,
            'plan', c.plan,
            'status', c.status,
            'franchise_type', c.franchise_type,
            'parent_company_id', c.parent_company_id,
            'subscription_expires_at', c.subscription_expires_at,
            'max_units', c.max_units,
            'has_units', c.has_units,
            'billing_data', c.billing_data,
            'integration_settings', c.integration_settings,
            'business_hours', c.business_hours,
            'created_at', c.created_at
        ),
        'subscription', (
            SELECT jsonb_build_object(
                'id', fs.id,
                'plan', jsonb_build_object(
                    'name', fp.name,
                    'description', fp.description,
                    'price', fp.price,
                    'billing_cycle', fp.billing_cycle,
                    'features', fp.features
                ),
                'status', fs.status,
                'starts_at', fs.starts_at,
                'expires_at', fs.expires_at,
                'auto_renew', fs.auto_renew
            )
            FROM franchise_subscriptions fs
            JOIN franchise_plans fp ON fp.id = fs.plan_id
            WHERE fs.company_id = c.id AND fs.status = 'active'
            LIMIT 1
        ),
        'units', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id', u.id,
                    'name', u.name,
                    'code', u.code,
                    'status', u.status,
                    'franchise_fee', u.franchise_fee,
                    'compliance_status', u.compliance_status,
                    'last_inspection', u.last_inspection,
                    'performance_metrics', u.performance_metrics
                )
            )
            FROM units u
            WHERE u.company_id = c.id
        ),
        'members', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id', cm.id,
                    'user', jsonb_build_object(
                        'id', u.id,
                        'nome', u.nome,
                        'email', u.email
                    ),
                    'role', cm.role,
                    'created_at', cm.created_at
                )
            )
            FROM company_members cm
            JOIN users u ON u.id = cm.user_id
            WHERE cm.company_id = c.id
        )
    ) INTO v_result
    FROM companies c
    WHERE c.id = p_company_id;
    
    RETURN COALESCE(v_result, jsonb_build_object('success', false, 'message', 'Franquia não encontrada'));
END;
$$;