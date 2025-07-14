-- Create missing RPC functions for super admin operations

-- Function to get system settings
CREATE OR REPLACE FUNCTION public.get_system_settings()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
            'id', cg.id,
            'key', cg.chave,
            'value', cg.valor,
            'category', cg.categoria,
            'sensitive', cg.sensitivo,
            'created_at', cg.created_at,
            'updated_at', cg.updated_at
        )
    )
    INTO v_result
    FROM configuracoes_globais cg
    WHERE cg.franquia_id IS NULL;  -- Global settings only
    
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$function$;

-- Function to update system setting
CREATE OR REPLACE FUNCTION public.update_system_setting(p_key text, p_value jsonb, p_description text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    v_user_id UUID;
BEGIN
    -- Check if user is super admin
    SELECT id INTO v_user_id FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin';
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('error', 'Access denied');
    END IF;

    -- Update or insert setting
    INSERT INTO configuracoes_globais (chave, valor, categoria, franquia_id)
    VALUES (p_key, p_value, p_description, NULL)
    ON CONFLICT (chave, COALESCE(franquia_id, '00000000-0000-0000-0000-000000000000'::uuid))
    DO UPDATE SET 
        valor = EXCLUDED.valor,
        categoria = COALESCE(EXCLUDED.categoria, configuracoes_globais.categoria),
        updated_at = now();
    
    RETURN jsonb_build_object(
        'success', true,
        'message', 'Setting updated successfully'
    );
END;
$function$;

-- Function to create unit
CREATE OR REPLACE FUNCTION public.super_admin_create_unit(p_name text, p_code text, p_company_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    v_user_id UUID;
    v_unit_id UUID;
BEGIN
    -- Check if user is super admin
    SELECT id INTO v_user_id FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin';
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('error', 'Access denied');
    END IF;

    -- Create the unit
    INSERT INTO unidades (nome, codigo, franquia_id, status)
    VALUES (p_name, p_code, p_company_id, 'ativo')
    RETURNING id INTO v_unit_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'unit_id', v_unit_id,
        'message', 'Unit created successfully'
    );
END;
$function$;

-- Function to create user
CREATE OR REPLACE FUNCTION public.super_admin_create_user(p_email text, p_name text, p_role text, p_password text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    v_user_id UUID;
    v_new_user_id UUID;
BEGIN
    -- Check if user is super admin
    SELECT id INTO v_user_id FROM users WHERE auth_user_id = auth.uid() AND role = 'super_admin';
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('error', 'Access denied');
    END IF;

    -- Create the user record (auth will be handled separately)
    INSERT INTO users (email, nome, role, active)
    VALUES (p_email, p_name, p_role, true)
    RETURNING id INTO v_new_user_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'user_id', v_new_user_id,
        'message', 'User created successfully'
    );
END;
$function$;