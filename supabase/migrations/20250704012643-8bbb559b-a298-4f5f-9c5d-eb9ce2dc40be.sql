-- Atualizar função de criação de empresa para incluir log de auditoria
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

    -- Inserir empresa
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
        'message', 'Empresa criada com sucesso'
    ) INTO v_result;
    
    RETURN v_result;
EXCEPTION
    WHEN unique_violation THEN
        RETURN jsonb_build_object('success', false, 'message', 'Chave da empresa já existe');
    WHEN OTHERS THEN
        RETURN jsonb_build_object('success', false, 'message', 'Erro ao criar empresa: ' || SQLERRM);
END;
$$;

-- Atualizar função de criação de unidade para incluir log de auditoria
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

    -- Verificar se a empresa existe
    IF NOT EXISTS (SELECT 1 FROM companies WHERE id = p_company_id) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Empresa não encontrada');
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

-- Atualizar função de criação de usuário para incluir log de auditoria
CREATE OR REPLACE FUNCTION public.super_admin_create_user(
  p_email TEXT, 
  p_nome TEXT, 
  p_role TEXT, 
  p_password TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_result JSONB;
    v_admin_user_id UUID;
BEGIN
    -- Verificar se é super admin
    SELECT id INTO v_admin_user_id FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin';
    IF v_admin_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Acesso negado');
    END IF;

    -- Verificar se o email já existe
    IF EXISTS (SELECT 1 FROM users WHERE email = p_email) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Email já cadastrado');
    END IF;
    
    -- Inserir usuário
    INSERT INTO users (email, nome, role, hashed_password, active)
    VALUES (p_email, p_nome, p_role, p_password, true)
    RETURNING id INTO v_user_id;
    
    -- Registrar log de auditoria
    PERFORM log_audit(
        'create_user',
        'user',
        v_user_id,
        NULL,
        jsonb_build_object(
            'email', p_email,
            'nome', p_nome,
            'role', p_role
        )
    );
    
    -- Retornar sucesso
    SELECT jsonb_build_object(
        'success', true,
        'user_id', v_user_id,
        'message', 'Usuário criado com sucesso'
    ) INTO v_result;
    
    RETURN v_result;
EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object('success', false, 'message', 'Erro ao criar usuário: ' || SQLERRM);
END;
$$;