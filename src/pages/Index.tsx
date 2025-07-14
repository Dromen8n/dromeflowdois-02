
import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ModernHeader } from "@/components/ModernHeader";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import PipelineKanban from "@/components/PipelineKanban";
import ClientsModule from "@/components/ClientsModule";
import ProfessionalsModule from "@/components/ProfessionalsModule";
import AgendaModule from "@/components/AgendaModule";
import RecrutadoraModule from "@/components/RecrutadoraModule";
import FinancialModule from "@/components/FinancialModule";
import CashbackModule from "@/components/CashbackModule";
import AgendamentosModule from "@/components/AgendamentosModule";
import { ModernDashboard } from "@/components/ModernDashboard";
import { SuperAdminModule } from "@/components/SuperAdminModule";
import { FranchiseModule } from "@/components/FranchiseModule";

const Index = () => {
  const { user, login, isAuthenticated } = useAuth();
  const [activeModule, setActiveModule] = useState("gestao");

  // Se não estiver autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  const getPageTitle = () => {
    switch (activeModule) {
      case "super-admin":
        return "Super Admin";
      case "franchise":
        return "Minha Franquia";
      case "gestao":
        return "Visão Geral";
      case "agendamentos":
        return "Atendimentos";
      case "comercial":
        return "Comercial";
      case "pipeline":
        return "Leads";
      case "cashback":
        return "Cashback";
      case "clientes":
        return "Gestão de Clientes";
      case "profissionais":
        return "Profissionais";
      case "profissionais-status":
        return "Status Atendimento";
      case "agenda":
        return "Agenda";
      case "recrutadora":
        return "Recrutadora";
      case "financeiro":
        return "Financeiro";
      default:
        return "MariaFlow";
    }
  };

  const getPageSubtitle = () => {
    switch (activeModule) {
      case "super-admin":
        return "Configurações e gerenciamento do sistema";
      case "franchise":
        return "Painel completo de gestão da sua franquia";
      case "gestao":
        return "Acompanhe o desempenho da sua franquia";
      case "agendamentos":
        return "Gerencie os atendimentos dos próximos dias";
      case "comercial":
        return "Gestão comercial da franquia";
      case "pipeline":
        return "Gerencie oportunidades e feche mais negócios";
      case "cashback":
        return "Gerencie o programa de fidelidade e cashback";
      case "clientes":
        return "Administre sua base de clientes";
      case "profissionais":
        return "Controle de equipe e performance";
      case "profissionais-status":
        return "Controle de equipe e performance";
      case "agenda":
        return "Gerencie a agenda dos profissionais";
      case "recrutadora":
        return "Gerencie o processo de recrutamento";
      case "financeiro":
        return "Controle financeiro completo";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (activeModule) {
      case "super-admin":
        // Verificar se o usuário tem permissão para acessar Super Admin
        if (user?.role !== 'super_admin') {
          return <ModernDashboard />;
        }
        return <SuperAdminModule />;
      case "franchise":
        return <FranchiseModule />;
      case "gestao":
        return <ModernDashboard />;
      case "agendamentos":
        return <AgendamentosModule />;
      case "comercial":
        return <PipelineKanban />;
      case "pipeline":
        return <PipelineKanban />;
      case "cashback":
        return <CashbackModule />;
      case "clientes":
        return <ClientsModule />;
      case "profissionais":
        return <ProfessionalsModule />;
      case "profissionais-status":
        return <ProfessionalsModule />;
      case "agenda":
        return <AgendaModule />;
      case "recrutadora":
        return <RecrutadoraModule />;
      case "financeiro":
        return <FinancialModule />;
      default:
        return <ModernDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/30">
        <AppSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <SidebarInset className="flex-1">
          <ModernHeader 
            title={getPageTitle()} 
            subtitle={getPageSubtitle()}
          />
          <main className="flex-1 p-6">
            <div className="mx-auto max-w-7xl">
              {renderContent()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
