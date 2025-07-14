-- Inserir dados de teste consistentes

-- Criar uma empresa de teste
INSERT INTO companies (id, name, key, document, plan, status) 
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Franquia Teste', 'franquia-teste', '12.345.678/0001-90', 'pro', 'active')
ON CONFLICT (key) DO NOTHING;

-- Criar um usuário de teste franqueado (usando role 'admin' que deve existir)
INSERT INTO users (id, email, nome, role, hashed_password, active) 
VALUES ('550e8400-e29b-41d4-a716-446655440001', 'franqueado@teste.com', 'João Franqueado', 'admin', 'senha123', true)
ON CONFLICT (email) DO NOTHING;

-- Associar o usuário à empresa
INSERT INTO company_members (user_id, company_id, role)
VALUES ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'owner')
ON CONFLICT (user_id, company_id) DO NOTHING;

-- Criar uma unidade de teste
INSERT INTO units (id, name, code, company_id, status)
VALUES ('550e8400-e29b-41d4-a716-446655440002', 'Unidade Centro', 'UC001', '550e8400-e29b-41d4-a716-446655440000', 'active')
ON CONFLICT DO NOTHING;

-- Criar função para obter empresas do usuário durante o login
CREATE OR REPLACE FUNCTION get_user_companies(p_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_companies JSON;
BEGIN
    SELECT json_agg(
        json_build_object(
            'id', c.id,
            'name', c.name,
            'key', c.key,
            'role', cm.role
        )
    ) INTO v_companies
    FROM company_members cm
    JOIN companies c ON c.id = cm.company_id
    WHERE cm.user_id = p_user_id;
    
    RETURN COALESCE(v_companies, '[]'::json);
END;
$$;