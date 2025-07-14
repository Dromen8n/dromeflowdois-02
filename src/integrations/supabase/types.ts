export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agendamentos: {
        Row: {
          cliente_id: string | null
          created_at: string | null
          data_agendamento: string
          endereco: Json | null
          franquia_id: string | null
          id: string
          observacoes: string | null
          profissional_id: string | null
          servico: string
          status: string | null
          unidade_id: string | null
          updated_at: string | null
          valor_estimado: number | null
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string | null
          data_agendamento: string
          endereco?: Json | null
          franquia_id?: string | null
          id?: string
          observacoes?: string | null
          profissional_id?: string | null
          servico: string
          status?: string | null
          unidade_id?: string | null
          updated_at?: string | null
          valor_estimado?: number | null
        }
        Update: {
          cliente_id?: string | null
          created_at?: string | null
          data_agendamento?: string
          endereco?: Json | null
          franquia_id?: string | null
          id?: string
          observacoes?: string | null
          profissional_id?: string | null
          servico?: string
          status?: string | null
          unidade_id?: string | null
          updated_at?: string | null
          valor_estimado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agendamentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_profissional_id_fkey"
            columns: ["profissional_id"]
            isOneToOne: false
            referencedRelation: "profissionais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_franquia: {
        Row: {
          consolidacao: Json | null
          created_at: string | null
          data_referencia: string
          franquia_id: string | null
          id: string
          metricas: Json
        }
        Insert: {
          consolidacao?: Json | null
          created_at?: string | null
          data_referencia: string
          franquia_id?: string | null
          id?: string
          metricas: Json
        }
        Update: {
          consolidacao?: Json | null
          created_at?: string | null
          data_referencia?: string
          franquia_id?: string | null
          id?: string
          metricas?: Json
        }
        Relationships: [
          {
            foreignKeyName: "analytics_franquia_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_franquia_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      atendimentos: {
        Row: {
          avaliacao: number | null
          cliente_id: string | null
          created_at: string | null
          data_atendimento: string
          endereco: Json | null
          franquia_id: string | null
          id: string
          observacoes: string | null
          profissional_id: string | null
          repasse: number | null
          servico: string
          status: string | null
          tipo: string | null
          unidade_id: string | null
          updated_at: string | null
          valor: number | null
        }
        Insert: {
          avaliacao?: number | null
          cliente_id?: string | null
          created_at?: string | null
          data_atendimento: string
          endereco?: Json | null
          franquia_id?: string | null
          id?: string
          observacoes?: string | null
          profissional_id?: string | null
          repasse?: number | null
          servico: string
          status?: string | null
          tipo?: string | null
          unidade_id?: string | null
          updated_at?: string | null
          valor?: number | null
        }
        Update: {
          avaliacao?: number | null
          cliente_id?: string | null
          created_at?: string | null
          data_atendimento?: string
          endereco?: Json | null
          franquia_id?: string | null
          id?: string
          observacoes?: string | null
          profissional_id?: string | null
          repasse?: number | null
          servico?: string
          status?: string | null
          tipo?: string | null
          unidade_id?: string | null
          updated_at?: string | null
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "atendimentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimentos_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimentos_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimentos_profissional_id_fkey"
            columns: ["profissional_id"]
            isOneToOne: false
            referencedRelation: "profissionais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimentos_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_global: {
        Row: {
          created_at: string | null
          data_pagamento: string | null
          data_vencimento: string
          franquia_id: string | null
          id: string
          metodo_pagamento: string | null
          observacoes: string | null
          plano_id: string | null
          status: string | null
          valor: number
        }
        Insert: {
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento: string
          franquia_id?: string | null
          id?: string
          metodo_pagamento?: string | null
          observacoes?: string | null
          plano_id?: string | null
          status?: string | null
          valor: number
        }
        Update: {
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string
          franquia_id?: string | null
          id?: string
          metodo_pagamento?: string | null
          observacoes?: string | null
          plano_id?: string | null
          status?: string | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "billing_global_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_global_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_global_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos_sistema"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          ativo: boolean | null
          cpf: string | null
          created_at: string | null
          email: string | null
          endereco: Json | null
          franquia_id: string | null
          historico: Json | null
          id: string
          nome: string
          preferencias: Json | null
          segmentacao: string | null
          tags: string[] | null
          telefone: string | null
          unidade_id: string | null
          updated_at: string | null
          whatsapp: string | null
        }
        Insert: {
          ativo?: boolean | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: Json | null
          franquia_id?: string | null
          historico?: Json | null
          id?: string
          nome: string
          preferencias?: Json | null
          segmentacao?: string | null
          tags?: string[] | null
          telefone?: string | null
          unidade_id?: string | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Update: {
          ativo?: boolean | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: Json | null
          franquia_id?: string | null
          historico?: Json | null
          id?: string
          nome?: string
          preferencias?: Json | null
          segmentacao?: string | null
          tags?: string[] | null
          telefone?: string | null
          unidade_id?: string | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clientes_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clientes_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clientes_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
      compras: {
        Row: {
          created_at: string | null
          fornecedor: string | null
          franquia_id: string | null
          id: string
          item: string
          quantidade: number
          status: string | null
          tipo: string
          unidade_id: string | null
          valor_total: number | null
          valor_unitario: number | null
        }
        Insert: {
          created_at?: string | null
          fornecedor?: string | null
          franquia_id?: string | null
          id?: string
          item: string
          quantidade: number
          status?: string | null
          tipo: string
          unidade_id?: string | null
          valor_total?: number | null
          valor_unitario?: number | null
        }
        Update: {
          created_at?: string | null
          fornecedor?: string | null
          franquia_id?: string | null
          id?: string
          item?: string
          quantidade?: number
          status?: string | null
          tipo?: string
          unidade_id?: string | null
          valor_total?: number | null
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "compras_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
      comunicacao_interna: {
        Row: {
          anexos: Json | null
          assunto: string | null
          created_at: string | null
          destinatario_id: string | null
          franquia_id: string | null
          id: string
          lida: boolean | null
          mensagem: string
          remetente_id: string | null
          tipo: string
        }
        Insert: {
          anexos?: Json | null
          assunto?: string | null
          created_at?: string | null
          destinatario_id?: string | null
          franquia_id?: string | null
          id?: string
          lida?: boolean | null
          mensagem: string
          remetente_id?: string | null
          tipo: string
        }
        Update: {
          anexos?: Json | null
          assunto?: string | null
          created_at?: string | null
          destinatario_id?: string | null
          franquia_id?: string | null
          id?: string
          lida?: boolean | null
          mensagem?: string
          remetente_id?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "comunicacao_interna_destinatario_id_fkey"
            columns: ["destinatario_id"]
            isOneToOne: false
            referencedRelation: "usuarios_franquia"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comunicacao_interna_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comunicacao_interna_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comunicacao_interna_remetente_id_fkey"
            columns: ["remetente_id"]
            isOneToOne: false
            referencedRelation: "usuarios_franquia"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracoes_franquia: {
        Row: {
          categoria: string | null
          chave: string
          created_at: string | null
          franquia_id: string | null
          id: string
          updated_at: string | null
          valor: Json
        }
        Insert: {
          categoria?: string | null
          chave: string
          created_at?: string | null
          franquia_id?: string | null
          id?: string
          updated_at?: string | null
          valor: Json
        }
        Update: {
          categoria?: string | null
          chave?: string
          created_at?: string | null
          franquia_id?: string | null
          id?: string
          updated_at?: string | null
          valor?: Json
        }
        Relationships: [
          {
            foreignKeyName: "configuracoes_franquia_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "configuracoes_franquia_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracoes_globais: {
        Row: {
          categoria: string | null
          chave: string
          created_at: string | null
          franquia_id: string | null
          id: string
          sensitivo: boolean | null
          updated_at: string | null
          valor: Json
        }
        Insert: {
          categoria?: string | null
          chave: string
          created_at?: string | null
          franquia_id?: string | null
          id?: string
          sensitivo?: boolean | null
          updated_at?: string | null
          valor: Json
        }
        Update: {
          categoria?: string | null
          chave?: string
          created_at?: string | null
          franquia_id?: string | null
          id?: string
          sensitivo?: boolean | null
          updated_at?: string | null
          valor?: Json
        }
        Relationships: [
          {
            foreignKeyName: "configuracoes_globais_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "configuracoes_globais_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      consultores: {
        Row: {
          created_at: string | null
          franquia_id: string | null
          franquias_atribuidas: string[] | null
          id: string
          performance_metrics: Json | null
          setores_especializacao: string[]
          territorios_atribuidos: Json | null
          usuario_id: string | null
        }
        Insert: {
          created_at?: string | null
          franquia_id?: string | null
          franquias_atribuidas?: string[] | null
          id?: string
          performance_metrics?: Json | null
          setores_especializacao: string[]
          territorios_atribuidos?: Json | null
          usuario_id?: string | null
        }
        Update: {
          created_at?: string | null
          franquia_id?: string | null
          franquias_atribuidas?: string[] | null
          id?: string
          performance_metrics?: Json | null
          setores_especializacao?: string[]
          territorios_atribuidos?: Json | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultores_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultores_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultores_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios_franquia"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          cnpj: string | null
          codigo: string
          configuracoes: Json | null
          contato: Json | null
          created_at: string | null
          endereco: Json | null
          franquia_id: string | null
          id: string
          nome: string
          status: Database["public"]["Enums"]["sistema_status"] | null
          updated_at: string | null
        }
        Insert: {
          cnpj?: string | null
          codigo: string
          configuracoes?: Json | null
          contato?: Json | null
          created_at?: string | null
          endereco?: Json | null
          franquia_id?: string | null
          id?: string
          nome: string
          status?: Database["public"]["Enums"]["sistema_status"] | null
          updated_at?: string | null
        }
        Update: {
          cnpj?: string | null
          codigo?: string
          configuracoes?: Json | null
          contato?: Json | null
          created_at?: string | null
          endereco?: Json | null
          franquia_id?: string | null
          id?: string
          nome?: string
          status?: Database["public"]["Enums"]["sistema_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empresas_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresas_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      financeiro: {
        Row: {
          atendimento_id: string | null
          categoria: string | null
          created_at: string | null
          data_pagamento: string | null
          data_vencimento: string | null
          descricao: string | null
          franquia_id: string | null
          id: string
          status: string | null
          tipo: string
          unidade_id: string | null
          valor: number
        }
        Insert: {
          atendimento_id?: string | null
          categoria?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string | null
          descricao?: string | null
          franquia_id?: string | null
          id?: string
          status?: string | null
          tipo: string
          unidade_id?: string | null
          valor: number
        }
        Update: {
          atendimento_id?: string | null
          categoria?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string | null
          descricao?: string | null
          franquia_id?: string | null
          id?: string
          status?: string | null
          tipo?: string
          unidade_id?: string | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "financeiro_atendimento_id_fkey"
            columns: ["atendimento_id"]
            isOneToOne: false
            referencedRelation: "atendimentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financeiro_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financeiro_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financeiro_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
      franquias: {
        Row: {
          cnpj: string
          codigo: string
          company_id: string | null
          configuracoes: Json | null
          created_at: string | null
          id: string
          limites: Json | null
          nome: string
          plano_id: string | null
          razao_social: string
          status: Database["public"]["Enums"]["sistema_status"] | null
          updated_at: string | null
          webhooks: Json | null
        }
        Insert: {
          cnpj: string
          codigo: string
          company_id?: string | null
          configuracoes?: Json | null
          created_at?: string | null
          id?: string
          limites?: Json | null
          nome: string
          plano_id?: string | null
          razao_social: string
          status?: Database["public"]["Enums"]["sistema_status"] | null
          updated_at?: string | null
          webhooks?: Json | null
        }
        Update: {
          cnpj?: string
          codigo?: string
          company_id?: string | null
          configuracoes?: Json | null
          created_at?: string | null
          id?: string
          limites?: Json | null
          nome?: string
          plano_id?: string | null
          razao_social?: string
          status?: Database["public"]["Enums"]["sistema_status"] | null
          updated_at?: string | null
          webhooks?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "franquias_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "franquias_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "franquias_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos_sistema"
            referencedColumns: ["id"]
          },
        ]
      }
      governanca_local: {
        Row: {
          acao: string
          created_at: string | null
          dados: Json | null
          entidade: string | null
          entidade_id: string | null
          franquia_id: string | null
          id: string
          ip_address: unknown | null
          unidade_id: string | null
          usuario_id: string | null
        }
        Insert: {
          acao: string
          created_at?: string | null
          dados?: Json | null
          entidade?: string | null
          entidade_id?: string | null
          franquia_id?: string | null
          id?: string
          ip_address?: unknown | null
          unidade_id?: string | null
          usuario_id?: string | null
        }
        Update: {
          acao?: string
          created_at?: string | null
          dados?: Json | null
          entidade?: string | null
          entidade_id?: string | null
          franquia_id?: string | null
          id?: string
          ip_address?: unknown | null
          unidade_id?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "governanca_local_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "governanca_local_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "governanca_local_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "governanca_local_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios_unidade"
            referencedColumns: ["id"]
          },
        ]
      }
      logs_sistema_global: {
        Row: {
          acao: string
          created_at: string | null
          dados_antes: Json | null
          dados_depois: Json | null
          entidade: string | null
          entidade_id: string | null
          id: string
          ip_address: unknown | null
          super_admin_id: string | null
          user_agent: string | null
        }
        Insert: {
          acao: string
          created_at?: string | null
          dados_antes?: Json | null
          dados_depois?: Json | null
          entidade?: string | null
          entidade_id?: string | null
          id?: string
          ip_address?: unknown | null
          super_admin_id?: string | null
          user_agent?: string | null
        }
        Update: {
          acao?: string
          created_at?: string | null
          dados_antes?: Json | null
          dados_depois?: Json | null
          entidade?: string | null
          entidade_id?: string | null
          id?: string
          ip_address?: unknown | null
          super_admin_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_sistema_global_super_admin_id_fkey"
            columns: ["super_admin_id"]
            isOneToOne: false
            referencedRelation: "super_admins"
            referencedColumns: ["id"]
          },
        ]
      }
      maria_uni: {
        Row: {
          certificacoes: Json | null
          created_at: string | null
          curso_id: string | null
          franquia_id: string | null
          id: string
          pontuacao: number | null
          progresso: Json | null
          unidade_id: string | null
          updated_at: string | null
          usuario_id: string | null
        }
        Insert: {
          certificacoes?: Json | null
          created_at?: string | null
          curso_id?: string | null
          franquia_id?: string | null
          id?: string
          pontuacao?: number | null
          progresso?: Json | null
          unidade_id?: string | null
          updated_at?: string | null
          usuario_id?: string | null
        }
        Update: {
          certificacoes?: Json | null
          created_at?: string | null
          curso_id?: string | null
          franquia_id?: string | null
          id?: string
          pontuacao?: number | null
          progresso?: Json | null
          unidade_id?: string | null
          updated_at?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maria_uni_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maria_uni_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maria_uni_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maria_uni_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios_unidade"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing: {
        Row: {
          ativo: boolean | null
          configuracoes: Json | null
          created_at: string | null
          franquia_id: string | null
          id: string
          nome: string
          resultados: Json | null
          tipo: string
          unidade_id: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          configuracoes?: Json | null
          created_at?: string | null
          franquia_id?: string | null
          id?: string
          nome: string
          resultados?: Json | null
          tipo: string
          unidade_id?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          configuracoes?: Json | null
          created_at?: string | null
          franquia_id?: string | null
          id?: string
          nome?: string
          resultados?: Json | null
          tipo?: string
          unidade_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketing_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketing_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
      mcp_endpoints: {
        Row: {
          ativo: boolean | null
          configuracao: Json | null
          created_at: string | null
          endpoint: string
          franquia_id: string | null
          id: string
          metodo: string
          nivel_acesso: Database["public"]["Enums"]["nivel_acesso"]
          nome: string
        }
        Insert: {
          ativo?: boolean | null
          configuracao?: Json | null
          created_at?: string | null
          endpoint: string
          franquia_id?: string | null
          id?: string
          metodo: string
          nivel_acesso: Database["public"]["Enums"]["nivel_acesso"]
          nome: string
        }
        Update: {
          ativo?: boolean | null
          configuracao?: Json | null
          created_at?: string | null
          endpoint?: string
          franquia_id?: string | null
          id?: string
          metodo?: string
          nivel_acesso?: Database["public"]["Enums"]["nivel_acesso"]
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "mcp_endpoints_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mcp_endpoints_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      mcp_logs: {
        Row: {
          created_at: string | null
          endpoint_id: string | null
          id: string
          ip_address: unknown | null
          metodo: string | null
          payload: Json | null
          response: Json | null
          status_code: number | null
          tempo_resposta: number | null
          usuario_id: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint_id?: string | null
          id?: string
          ip_address?: unknown | null
          metodo?: string | null
          payload?: Json | null
          response?: Json | null
          status_code?: number | null
          tempo_resposta?: number | null
          usuario_id?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint_id?: string | null
          id?: string
          ip_address?: unknown | null
          metodo?: string | null
          payload?: Json | null
          response?: Json | null
          status_code?: number | null
          tempo_resposta?: number | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mcp_logs_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "mcp_endpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      modulos_sistema: {
        Row: {
          ativo: boolean | null
          chave: string
          configuracoes: Json | null
          created_at: string | null
          descricao: string | null
          id: string
          nivel_acesso: Database["public"]["Enums"]["nivel_acesso"]
          nome: string
        }
        Insert: {
          ativo?: boolean | null
          chave: string
          configuracoes?: Json | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nivel_acesso: Database["public"]["Enums"]["nivel_acesso"]
          nome: string
        }
        Update: {
          ativo?: boolean | null
          chave?: string
          configuracoes?: Json | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nivel_acesso?: Database["public"]["Enums"]["nivel_acesso"]
          nome?: string
        }
        Relationships: []
      }
      permissoes_globais: {
        Row: {
          chave: string
          created_at: string | null
          descricao: string | null
          id: string
          modulo_id: string | null
          nivel_acesso: Database["public"]["Enums"]["nivel_acesso"]
          nome: string
        }
        Insert: {
          chave: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          modulo_id?: string | null
          nivel_acesso: Database["public"]["Enums"]["nivel_acesso"]
          nome: string
        }
        Update: {
          chave?: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          modulo_id?: string | null
          nivel_acesso?: Database["public"]["Enums"]["nivel_acesso"]
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "permissoes_globais_modulo_id_fkey"
            columns: ["modulo_id"]
            isOneToOne: false
            referencedRelation: "modulos_sistema"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_captacao: {
        Row: {
          avaliacao_financeira: Json | null
          consultor_id: string | null
          created_at: string | null
          dados_pessoais: Json
          documentos: Json | null
          estagio_atual: string
          franquia_id: string | null
          historico_comunicacao: Json | null
          id: string
          origem: string | null
          timeline_processo: Json | null
          updated_at: string | null
        }
        Insert: {
          avaliacao_financeira?: Json | null
          consultor_id?: string | null
          created_at?: string | null
          dados_pessoais: Json
          documentos?: Json | null
          estagio_atual: string
          franquia_id?: string | null
          historico_comunicacao?: Json | null
          id?: string
          origem?: string | null
          timeline_processo?: Json | null
          updated_at?: string | null
        }
        Update: {
          avaliacao_financeira?: Json | null
          consultor_id?: string | null
          created_at?: string | null
          dados_pessoais?: Json
          documentos?: Json | null
          estagio_atual?: string
          franquia_id?: string | null
          historico_comunicacao?: Json | null
          id?: string
          origem?: string | null
          timeline_processo?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_captacao_consultor_id_fkey"
            columns: ["consultor_id"]
            isOneToOne: false
            referencedRelation: "usuarios_franquia"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_captacao_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_captacao_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      planos_sistema: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          id: string
          max_unidades: number
          max_usuarios: number
          modulos_incluidos: Json
          nome: string
          preco: number
          recursos: Json
          tipo: Database["public"]["Enums"]["plano_tipo"]
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          id?: string
          max_unidades?: number
          max_usuarios?: number
          modulos_incluidos?: Json
          nome: string
          preco: number
          recursos?: Json
          tipo: Database["public"]["Enums"]["plano_tipo"]
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          id?: string
          max_unidades?: number
          max_usuarios?: number
          modulos_incluidos?: Json
          nome?: string
          preco?: number
          recursos?: Json
          tipo?: Database["public"]["Enums"]["plano_tipo"]
          updated_at?: string | null
        }
        Relationships: []
      }
      profissionais: {
        Row: {
          avaliacao_media: number | null
          certificacoes: Json | null
          cpf: string | null
          created_at: string | null
          disponibilidade: Json | null
          documentos: Json | null
          endereco: Json | null
          especializacoes: string[] | null
          franquia_id: string | null
          id: string
          nome: string
          status: string | null
          telefone: string | null
          unidade_id: string | null
          updated_at: string | null
          whatsapp: string | null
        }
        Insert: {
          avaliacao_media?: number | null
          certificacoes?: Json | null
          cpf?: string | null
          created_at?: string | null
          disponibilidade?: Json | null
          documentos?: Json | null
          endereco?: Json | null
          especializacoes?: string[] | null
          franquia_id?: string | null
          id?: string
          nome: string
          status?: string | null
          telefone?: string | null
          unidade_id?: string | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Update: {
          avaliacao_media?: number | null
          certificacoes?: Json | null
          cpf?: string | null
          created_at?: string | null
          disponibilidade?: Json | null
          documentos?: Json | null
          endereco?: Json | null
          especializacoes?: string[] | null
          franquia_id?: string | null
          id?: string
          nome?: string
          status?: string | null
          telefone?: string | null
          unidade_id?: string | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profissionais_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profissionais_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profissionais_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
      sistema_global: {
        Row: {
          configuracoes: Json
          created_at: string | null
          id: string
          manutencao: boolean | null
          nome: string
          updated_at: string | null
          versao: string
        }
        Insert: {
          configuracoes?: Json
          created_at?: string | null
          id?: string
          manutencao?: boolean | null
          nome?: string
          updated_at?: string | null
          versao: string
        }
        Update: {
          configuracoes?: Json
          created_at?: string | null
          id?: string
          manutencao?: boolean | null
          nome?: string
          updated_at?: string | null
          versao?: string
        }
        Relationships: []
      }
      super_admins: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          id: string
          nivel_acesso: number | null
          permissoes: Json | null
          ultimo_acesso: string | null
          user_id: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          id?: string
          nivel_acesso?: number | null
          permissoes?: Json | null
          ultimo_acesso?: string | null
          user_id?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          id?: string
          nivel_acesso?: number | null
          permissoes?: Json | null
          ultimo_acesso?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      suporte: {
        Row: {
          assunto: string
          created_at: string | null
          descricao: string | null
          franquia_id: string | null
          id: string
          prioridade: string | null
          resposta: string | null
          solicitante_id: string | null
          status: string | null
          tipo: string
          unidade_id: string | null
          updated_at: string | null
        }
        Insert: {
          assunto: string
          created_at?: string | null
          descricao?: string | null
          franquia_id?: string | null
          id?: string
          prioridade?: string | null
          resposta?: string | null
          solicitante_id?: string | null
          status?: string | null
          tipo: string
          unidade_id?: string | null
          updated_at?: string | null
        }
        Update: {
          assunto?: string
          created_at?: string | null
          descricao?: string | null
          franquia_id?: string | null
          id?: string
          prioridade?: string | null
          resposta?: string | null
          solicitante_id?: string | null
          status?: string | null
          tipo?: string
          unidade_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "suporte_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suporte_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suporte_solicitante_id_fkey"
            columns: ["solicitante_id"]
            isOneToOne: false
            referencedRelation: "usuarios_unidade"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suporte_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
      system_notifications: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          message: string
          priority: number
          target_audience: Json
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          message: string
          priority?: number
          target_audience?: Json
          title: string
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          message?: string
          priority?: number
          target_audience?: Json
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      unidades: {
        Row: {
          codigo: string
          configuracoes: Json | null
          created_at: string | null
          empresa_id: string | null
          endereco: Json | null
          franquia_id: string | null
          id: string
          limites_operacionais: Json | null
          modulos_ativos: Json | null
          nome: string
          status: Database["public"]["Enums"]["sistema_status"] | null
          updated_at: string | null
        }
        Insert: {
          codigo: string
          configuracoes?: Json | null
          created_at?: string | null
          empresa_id?: string | null
          endereco?: Json | null
          franquia_id?: string | null
          id?: string
          limites_operacionais?: Json | null
          modulos_ativos?: Json | null
          nome: string
          status?: Database["public"]["Enums"]["sistema_status"] | null
          updated_at?: string | null
        }
        Update: {
          codigo?: string
          configuracoes?: Json | null
          created_at?: string | null
          empresa_id?: string | null
          endereco?: Json | null
          franquia_id?: string | null
          id?: string
          limites_operacionais?: Json | null
          modulos_ativos?: Json | null
          nome?: string
          status?: Database["public"]["Enums"]["sistema_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unidades_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unidades_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unidades_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          active: boolean | null
          auth_user_id: string | null
          created_at: string | null
          email: string
          hashed_password: string | null
          id: string
          nome: string
          role: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          auth_user_id?: string | null
          created_at?: string | null
          email: string
          hashed_password?: string | null
          id?: string
          nome: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          auth_user_id?: string | null
          created_at?: string | null
          email?: string
          hashed_password?: string | null
          id?: string
          nome?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      usuarios_franquia: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          email: string
          empresa_id: string | null
          franquia_id: string | null
          id: string
          nome: string
          permissoes: Json | null
          tipo: Database["public"]["Enums"]["usuario_tipo"]
          unidades_acesso: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          email: string
          empresa_id?: string | null
          franquia_id?: string | null
          id?: string
          nome: string
          permissoes?: Json | null
          tipo: Database["public"]["Enums"]["usuario_tipo"]
          unidades_acesso?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          email?: string
          empresa_id?: string | null
          franquia_id?: string | null
          id?: string
          nome?: string
          permissoes?: Json | null
          tipo?: Database["public"]["Enums"]["usuario_tipo"]
          unidades_acesso?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_franquia_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_franquia_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_franquia_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios_unidade: {
        Row: {
          ativo: boolean | null
          configuracoes: Json | null
          created_at: string | null
          email: string
          franquia_id: string | null
          id: string
          nome: string
          permissoes: Json | null
          tipo: Database["public"]["Enums"]["usuario_tipo"]
          unidade_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          ativo?: boolean | null
          configuracoes?: Json | null
          created_at?: string | null
          email: string
          franquia_id?: string | null
          id?: string
          nome: string
          permissoes?: Json | null
          tipo: Database["public"]["Enums"]["usuario_tipo"]
          unidade_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          ativo?: boolean | null
          configuracoes?: Json | null
          created_at?: string | null
          email?: string
          franquia_id?: string | null
          id?: string
          nome?: string
          permissoes?: Json | null
          tipo?: Database["public"]["Enums"]["usuario_tipo"]
          unidade_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_unidade_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_unidade_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_unidade_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      companies: {
        Row: {
          created_at: string | null
          document: string | null
          id: string | null
          key: string | null
          name: string | null
          status: Database["public"]["Enums"]["sistema_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          document?: string | null
          id?: string | null
          key?: string | null
          name?: string | null
          status?: Database["public"]["Enums"]["sistema_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          document?: string | null
          id?: string | null
          key?: string | null
          name?: string | null
          status?: Database["public"]["Enums"]["sistema_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      activate_module: {
        Args: { p_module_id: string; p_active: boolean }
        Returns: Json
      }
      authenticate_user: {
        Args: { p_email: string; p_password: string }
        Returns: Json
      }
      daitch_mokotoff: {
        Args: { "": string }
        Returns: string[]
      }
      dmetaphone: {
        Args: { "": string }
        Returns: string
      }
      dmetaphone_alt: {
        Args: { "": string }
        Returns: string
      }
      get_audit_logs: {
        Args:
          | { p_limit?: number; p_offset?: number }
          | { p_limit?: number; p_offset?: number; p_entity_type?: string }
        Returns: Json
      }
      get_franchise_details: {
        Args: { p_user_id: string }
        Returns: Json
      }
      get_franchise_plans: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_system_settings: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_companies: {
        Args: { p_user_id: string }
        Returns: Json
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      log_audit: {
        Args: {
          p_action: string
          p_entity: string
          p_entity_id: string
          p_data_before?: Json
          p_data_after?: Json
          p_company_id?: string
          p_unit_id?: string
        }
        Returns: undefined
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      soundex: {
        Args: { "": string }
        Returns: string
      }
      super_admin_create_company: {
        Args: { p_name: string; p_key: string; p_document: string }
        Returns: Json
      }
      super_admin_create_unit: {
        Args: { p_name: string; p_code: string; p_company_id: string }
        Returns: Json
      }
      super_admin_create_user: {
        Args: {
          p_email: string
          p_name: string
          p_role: string
          p_password?: string
        }
        Returns: Json
      }
      super_admin_get_companies: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      super_admin_get_units: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      super_admin_get_users: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      text_soundex: {
        Args: { "": string }
        Returns: string
      }
      update_system_setting: {
        Args: { p_key: string; p_value: Json; p_description?: string }
        Returns: Json
      }
      validate_mcp_access: {
        Args: {
          endpoint_name: string
          user_level: Database["public"]["Enums"]["nivel_acesso"]
        }
        Returns: boolean
      }
    }
    Enums: {
      nivel_acesso: "dromeflow" | "admin" | "mariaflow"
      plano_tipo: "basico" | "profissional" | "empresarial" | "enterprise"
      sistema_status: "ativo" | "inativo" | "suspenso" | "em_manutencao"
      usuario_tipo:
        | "super_admin"
        | "franquia_admin"
        | "consultor"
        | "unidade_admin"
        | "operador"
        | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      nivel_acesso: ["dromeflow", "admin", "mariaflow"],
      plano_tipo: ["basico", "profissional", "empresarial", "enterprise"],
      sistema_status: ["ativo", "inativo", "suspenso", "em_manutencao"],
      usuario_tipo: [
        "super_admin",
        "franquia_admin",
        "consultor",
        "unidade_admin",
        "operador",
        "viewer",
      ],
    },
  },
} as const
