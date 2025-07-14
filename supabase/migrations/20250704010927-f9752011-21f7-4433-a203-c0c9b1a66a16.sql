-- Create Security Definer functions for Super Admin operations

-- Function to create companies bypassing RLS
CREATE OR REPLACE FUNCTION public.super_admin_create_company(
    p_name text,
    p_key text,
    p_document text DEFAULT NULL,
    p_plan text DEFAULT 'starter'
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_company_id uuid;
    v_result jsonb;
BEGIN
    -- Insert company
    INSERT INTO companies (name, key, document, plan, status)
    VALUES (p_name, p_key, p_document, p_plan, 'active')
    RETURNING id INTO v_company_id;
    
    -- Return success response
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

-- Function to get all companies bypassing RLS
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

-- Function to create units bypassing RLS
CREATE OR REPLACE FUNCTION public.super_admin_create_unit(
    p_name text,
    p_company_id uuid,
    p_code text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_unit_id uuid;
    v_result jsonb;
BEGIN
    -- Check if company exists
    IF NOT EXISTS (SELECT 1 FROM companies WHERE id = p_company_id) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Empresa não encontrada');
    END IF;
    
    -- Insert unit
    INSERT INTO units (name, code, company_id, status)
    VALUES (p_name, p_code, p_company_id, 'active')
    RETURNING id INTO v_unit_id;
    
    -- Return success response
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

-- Function to get all units bypassing RLS
CREATE OR REPLACE FUNCTION public.super_admin_get_units()
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
            'code', code,
            'company_id', company_id,
            'status', status,
            'created_at', created_at
        )
        ORDER BY created_at DESC
    ) INTO v_result
    FROM units;
    
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

-- Function to create users bypassing RLS
CREATE OR REPLACE FUNCTION public.super_admin_create_user(
    p_email text,
    p_nome text,
    p_role text,
    p_password text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id uuid;
    v_result jsonb;
BEGIN
    -- Check if email already exists
    IF EXISTS (SELECT 1 FROM users WHERE email = p_email) THEN
        RETURN jsonb_build_object('success', false, 'message', 'Email já cadastrado');
    END IF;
    
    -- Insert user
    INSERT INTO users (email, nome, role, hashed_password, active)
    VALUES (p_email, p_nome, p_role, p_password, true)
    RETURNING id INTO v_user_id;
    
    -- Return success response
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

-- Function to get all users bypassing RLS
CREATE OR REPLACE FUNCTION public.super_admin_get_users()
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
            'email', email,
            'nome', nome,
            'role', role,
            'active', active,
            'created_at', created_at
        )
        ORDER BY created_at DESC
    ) INTO v_result
    FROM users;
    
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;