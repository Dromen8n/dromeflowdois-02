-- Fix the authenticate_user function to handle plain text passwords
CREATE OR REPLACE FUNCTION public.authenticate_user(email text, password text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    user_record users%ROWTYPE;
    result jsonb;
BEGIN
    -- Busca o usuário pelo email
    SELECT * INTO user_record
    FROM users
    WHERE users.email = authenticate_user.email;
    
    -- Verifica se o usuário existe
    IF user_record.id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Usuário não encontrado');
    END IF;
    
    -- Verifica se o usuário está ativo
    IF NOT user_record.active THEN
        RETURN jsonb_build_object('success', false, 'message', 'Usuário inativo');
    END IF;
    
    -- Verifica a senha (comparação direta para senhas em texto simples)
    IF user_record.hashed_password != password THEN
        RETURN jsonb_build_object('success', false, 'message', 'Senha incorreta');
    END IF;
    
    -- Atualiza último login
    UPDATE users
    SET last_login = now()
    WHERE id = user_record.id;
    
    -- Retorna informações do usuário
    SELECT jsonb_build_object(
        'success', true,
        'user', jsonb_build_object(
            'id', user_record.id,
            'email', user_record.email,
            'nome', user_record.nome,
            'role', user_record.role,
            'unidade_id', user_record.unidade_id
        )
    ) INTO result;
    
    RETURN result;
END;
$function$;