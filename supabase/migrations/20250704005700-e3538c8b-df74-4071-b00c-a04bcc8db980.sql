-- Inserir usuários de teste para o sistema de autenticação simples
INSERT INTO public.users (email, hashed_password, nome, role, active) VALUES
('admin@mariaflow.com', 'admin123', 'Administrador do Sistema', 'super_admin', true),
('gestor@mariaflow.com', 'gestor123', 'Gestor da Franquia', 'admin', true),
('unidade@mariaflow.com', 'unidade123', 'Usuário da Unidade', 'unidade', true)
ON CONFLICT (email) DO NOTHING;

-- Criar uma empresa de teste
INSERT INTO public.companies (name, key, document, plan, status, active) VALUES
('MariaFlow Franquia Teste', 'mariaflow-teste', '12.345.678/0001-99', 'premium', 'active', true)
ON CONFLICT (key) DO NOTHING;

-- Criar uma unidade de teste
INSERT INTO public.units (name, code, status, company_id) 
SELECT 'Unidade Centro', 'UNIT001', 'active', c.id 
FROM public.companies c 
WHERE c.key = 'mariaflow-teste'
ON CONFLICT DO NOTHING;