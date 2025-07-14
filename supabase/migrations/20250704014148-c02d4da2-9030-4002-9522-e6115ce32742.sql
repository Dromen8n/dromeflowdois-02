-- Atualizar função de criação de franquia (anteriormente empresa)
CREATE OR REPLACE FUNCTION public.super_admin_create_company(
  p_name TEXT, 
  p_key TEXT, 
  p_document TEXT DEFAULT NULL, 
  p_plan TEXT DEFAULT 'starter'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_company_id UUID;
    v_result JSONB;
    v_user_id UUID;
BEGIN
    -- Verificar se é super admin
    SELECT id INTO v_user_id FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin';
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Acesso negado');
    END IF;

    -- Inserir franquia
    INSERT INTO companies (name, key, document, plan, status)
    VALUES (p_name, p_key, p_document, p_plan, 'active')
    RETURNING id INTO v_company_id;
    
    -- Registrar log de auditoria
    PERFORM log_audit(
        'create_company',
        'company',
        v_company_id,
        NULL,
        jsonb_build_object(
            'name', p_name,
            'key', p_key,
            'document', p_document,
            'plan', p_plan
        ),
        v_company_id
    );
    
    -- Retornar sucesso
    SELECT jsonb_build_object(
        'success', true,
        'company_id', v_company_id,
        'message', 'Franquia criada com sucesso'
    ) INTO v_result;
    
    RETURN v_result;
EXCEPTION
    WHEN unique_violation THEN
        RETURN jsonb_build_object('success', false, 'message', 'Chave da franquia já existe');
    WHEN OTHERS THEN
        RETURN jsonb_build_object('success', false, 'message', 'Erro ao criar franquia: ' || SQLERRM);
END;
$$;

-- Atualizar função de obter franquias
CREATE OR REPLACE FUNCTION public.super_admin_get_companies()
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
            'key', key,
            'document', document,
            'plan', plan,
            'status', status,
            'has_units', has_units,
            'max_units', max_units,
            'created_at', created_at
        )
        ORDER BY created_at DESC
    ) INTO v_result
    FROM companies;
    
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

-- Atualizar função de obter informações da franquia
CREATE OR REPLACE FUNCTION public.get_company_info(p_company_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $$
DECLARE
    v_result jsonb;
BEGIN
    -- Informações básicas da franquia
    SELECT jsonb_build_object(
        'id', c.id,
        'name', c.name,
        'key', c.key,
        'document', c.document,
        'plan', c.plan,
        'status', c.status,
        'modules', c.modules,
        'settings', c.settings,
        'contact', c.contact,
        'address', c.address,
        'has_units', c.has_units,
        'max_units', c.max_units,
        'logo_url', c.logo_url,
        'created_at', c.created_at,
        'trial_ends_at', c.trial_ends_at,
        'units', (
            SELECT jsonb_agg(jsonb_build_object(
                'id', u.id,
                'name', u.name,
                'code', u.code,
                'status', u.status,
                'modules', u.modules
            ))
            FROM units u
            WHERE u.company_id = c.id
        ),
        'members', (
            SELECT jsonb_agg(jsonb_build_object(
                'id', cm.id,
                'user_id', cm.user_id,
                'role', cm.role,
                'user', jsonb_build_object(
                    'id', u.id,
                    'email', u.email,
                    'nome', u.nome
                )
            ))
            FROM company_members cm
            JOIN users u ON u.id = cm.user_id
            WHERE cm.company_id = c.id
        ),
        'active_modules', (
            SELECT jsonb_agg(jsonb_build_object(
                'id', mi.id,
                'module', jsonb_build_object(
                    'id', m.id,
                    'key', m.key,
                    'name', m.name
                ),
                'status', mi.status,
                'config', mi.config
            ))
            FROM module_instances mi
            JOIN modules m ON m.id = mi.module_id
            WHERE mi.company_id = c.id AND mi.unit_id IS NULL AND mi.status = 'active'
        )
    ) INTO v_result
    FROM companies c
    WHERE c.id = p_company_id;
    
    RETURN v_result;
END;
$$;

-- Atualizar função de obter franquias do usuário
CREATE OR REPLACE FUNCTION public.get_user_companies(p_user_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $$
DECLARE
    v_user_role text;
    v_result jsonb;
BEGIN
    -- Verificar o papel do usuário
    SELECT role INTO v_user_role FROM users WHERE id = p_user_id;
    
    -- Super admin pode ver todas as franquias
    IF v_user_role = 'super_admin' THEN
        SELECT jsonb_build_object(
            'companies', jsonb_agg(jsonb_build_object(
                'id', c.id,
                'name', c.name,
                'key', c.key,
                'document', c.document,
                'plan', c.plan,
                'status', c.status,
                'has_units', c.has_units,
                'logo_url', c.logo_url,
                'created_at', c.created_at
            ))
        )
        INTO v_result
        FROM companies c;
    ELSE
        -- Usuários normais só veem suas próprias franquias
        SELECT jsonb_build_object(
            'companies', jsonb_agg(jsonb_build_object(
                'id', c.id,
                'name', c.name,
                'key', c.key,
                'document', c.document,
                'plan', c.plan,
                'status', c.status,
                'has_units', c.has_units,
                'logo_url', c.logo_url,
                'created_at', c.created_at,
                'role', cm.role
            ))
        )
        INTO v_result
        FROM companies c
        JOIN company_members cm ON cm.company_id = c.id
        WHERE cm.user_id = p_user_id;
    END IF;
    
    RETURN v_result;
END;
$$;

-- Atualizar função de criação de unidade para incluir referência à franquia
CREATE OR REPLACE FUNCTION public.super_admin_create_unit(
  p_name TEXT, 
  p_company_id UUID, 
  p_code TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_unit_id UUID;
    v_result JSONB;
    v_user_id UUID;
BEGIN
    -- Verificar se é super admin
    SELECT id INTO v_user_id FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin';
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Acesso negado');
    END IF;

    -- Verificar se a franquia existe
    IF NOT EXISTS (SELECT 1 FROM companies WHERE id = p_company_id) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Franquia não encontrada');
    END IF;
    
    -- Inserir unidade
    INSERT INTO units (name, code, company_id, status)
    VALUES (p_name, p_code, p_company_id, 'active')
    RETURNING id INTO v_unit_id;
    
    -- Registrar log de auditoria
    PERFORM log_audit(
        'create_unit',
        'unit',
        v_unit_id,
        NULL,
        jsonb_build_object(
            'name', p_name,
            'code', p_code,
            'company_id', p_company_id
        ),
        p_company_id,
        v_unit_id
    );
    
    -- Retornar sucesso
    SELECT jsonb_build_object(
        'success', true,
        'unit_id', v_unit_id,
        'message', 'Unidade criada com sucesso'
    ) INTO v_result;
    
    RETURN v_result;
EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object('success', false, 'message', 'Erro ao criar unidade: ' || SQLERRM);
END;
$$;

-- Atualizar função de adicionar membro à franquia
CREATE OR REPLACE FUNCTION public.add_company_member(p_user_id uuid, p_company_id uuid, p_role text DEFAULT 'member'::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $$
DECLARE
    v_member_id uuid;
BEGIN
    -- Verificar se o usuário existe
    IF NOT EXISTS (SELECT 1 FROM users WHERE id = p_user_id) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Usuário não encontrado');
    END IF;
    
    -- Verificar se a franquia existe
    IF NOT EXISTS (SELECT 1 FROM companies WHERE id = p_company_id) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Franquia não encontrada');
    END IF;
    
    -- Verificar se o usuário já é membro da franquia
    IF EXISTS (SELECT 1 FROM company_members WHERE user_id = p_user_id AND company_id = p_company_id) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Usuário já é membro desta franquia');
    END IF;
    
    -- Adicionar como membro
    INSERT INTO company_members (user_id, company_id, role)
    VALUES (p_user_id, p_company_id, p_role)
    RETURNING id INTO v_member_id;
    
    -- Registrar atividade
    INSERT INTO activities (type, description, user_id, action, entity_type, entity_id)
    VALUES ('member_added', 'Usuário adicionado como ' || p_role || ' na franquia', p_user_id, 'create', 'company_member', v_member_id);
    
    RETURN jsonb_build_object(
        'success', true,
        'member_id', v_member_id,
        'message', 'Usuário adicionado com sucesso à franquia'
    );
END;
$$;