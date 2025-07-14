-- Create missing tables and fix references
-- First, let's add the missing company_members table (seems to be a reference to usuarios_franquia)
-- and create all the missing RPC functions

-- Create missing RPC functions for authentication and data access
CREATE OR REPLACE FUNCTION public.authenticate_user(
  p_email TEXT,
  p_password TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_user_data JSONB;
BEGIN
    -- This is a placeholder - we'll use Supabase Auth instead
    -- Return user data structure for now
    SELECT jsonb_build_object(
        'success', false,
        'message', 'Use Supabase Auth instead'
    ) INTO v_user_data;
    
    RETURN v_user_data;
END;
$$;

-- Function to get franchise details
CREATE OR REPLACE FUNCTION public.get_franchise_details(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result JSONB;
BEGIN
    -- Get franchise details for a user
    SELECT jsonb_build_object(
        'franchise', f,
        'companies', (
            SELECT COALESCE(json_agg(e), '[]'::json)
            FROM empresas e 
            WHERE e.franquia_id = f.id
        ),
        'units', (
            SELECT COALESCE(json_agg(u), '[]'::json)
            FROM unidades u 
            WHERE u.franquia_id = f.id
        )
    )
    INTO v_result
    FROM franquias f
    JOIN usuarios_franquia uf ON f.id = uf.franquia_id
    WHERE uf.user_id = p_user_id AND uf.ativo = true
    LIMIT 1;
    
    RETURN COALESCE(v_result, '{}'::jsonb);
END;
$$;

-- Function to get user companies
CREATE OR REPLACE FUNCTION public.get_user_companies(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result JSONB;
BEGIN
    SELECT jsonb_agg(
        jsonb_build_object(
            'id', e.id,
            'name', e.nome,
            'code', e.codigo,
            'franchise_id', e.franquia_id
        )
    )
    INTO v_result
    FROM empresas e
    JOIN usuarios_franquia uf ON e.franquia_id = uf.franquia_id
    WHERE uf.user_id = p_user_id AND uf.ativo = true;
    
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

-- Super admin functions
CREATE OR REPLACE FUNCTION public.super_admin_get_companies()
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
            'id', f.id,
            'name', f.nome,
            'code', f.codigo,
            'status', f.status,
            'created_at', f.created_at,
            'plan', p.nome
        )
    )
    INTO v_result
    FROM franquias f
    LEFT JOIN planos_sistema p ON f.plano_id = p.id;
    
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

CREATE OR REPLACE FUNCTION public.super_admin_get_units()
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
            'id', u.id,
            'name', u.nome,
            'code', u.codigo,
            'franchise_name', f.nome,
            'status', u.status,
            'created_at', u.created_at
        )
    )
    INTO v_result
    FROM unidades u
    JOIN franquias f ON u.franquia_id = f.id;
    
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

CREATE OR REPLACE FUNCTION public.super_admin_get_users()
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
            'id', uf.id,
            'name', uf.nome,
            'email', uf.email,
            'type', uf.tipo,
            'franchise_name', f.nome,
            'active', uf.ativo,
            'created_at', uf.created_at
        )
    )
    INTO v_result
    FROM usuarios_franquia uf
    JOIN franquias f ON uf.franquia_id = f.id;
    
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

-- Audit logs function
CREATE OR REPLACE FUNCTION public.get_audit_logs(
    p_limit INTEGER DEFAULT 100,
    p_offset INTEGER DEFAULT 0
)
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
            'id', l.id,
            'action', l.acao,
            'entity', l.entidade,
            'entity_id', l.entidade_id,
            'data_before', l.dados_antes,
            'data_after', l.dados_depois,
            'created_at', l.created_at,
            'ip_address', l.ip_address
        )
    )
    INTO v_result
    FROM logs_sistema_global l
    ORDER BY l.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
    
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

-- Create a users table to support the existing authentication logic
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    nome TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    hashed_password TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy for users table
CREATE POLICY "Users can view their own data" ON public.users
    FOR ALL USING (auth.uid() = auth_user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create companies table as alias/view for franquias (to fix company_members reference)
CREATE VIEW public.companies AS
SELECT 
    id,
    nome as name,
    codigo as key,
    cnpj as document,
    status,
    created_at,
    updated_at
FROM public.franquias;

-- Add missing columns to existing tables if they don't exist
ALTER TABLE public.franquias ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES franquias(id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_auth_user_id ON public.users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_franquia_user_id ON public.usuarios_franquia(user_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_unidade_user_id ON public.usuarios_unidade(user_id);

-- Add audit logging function for all tables
CREATE OR REPLACE FUNCTION public.log_audit(
    p_action TEXT,
    p_entity TEXT,
    p_entity_id UUID,
    p_data_before JSONB DEFAULT NULL,
    p_data_after JSONB DEFAULT NULL,
    p_company_id UUID DEFAULT NULL,
    p_unit_id UUID DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO logs_sistema_global (
        acao,
        entidade,
        entidade_id,
        dados_antes,
        dados_depois,
        ip_address,
        created_at
    ) VALUES (
        p_action,
        p_entity,
        p_entity_id,
        p_data_before,
        p_data_after,
        inet_client_addr(),
        now()
    );
END;
$$;