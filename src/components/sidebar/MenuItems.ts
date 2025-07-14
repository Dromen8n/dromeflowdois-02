
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  UserCheck,
  DollarSign,
  Workflow,
  Gift,
  Calendar,
  UserPlus,
  CalendarDays,
  Shield
} from "lucide-react";

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  submenu?: {
    id: string;
    label: string;
    icon: any;
  }[];
}

export const menuItems: MenuItem[] = [
  {
    id: "super-admin",
    label: "Super Admin",
    icon: Shield,
    badge: "Admin",
  },
  {
    id: "franchise",
    label: "Minha Franquia", 
    icon: LayoutDashboard,
    badge: "Franquia",
  },
  {
    id: "dashboard",
    label: "Visão Geral",
    icon: LayoutDashboard,
    submenu: [
      {
        id: "gestao",
        label: "Gestão",
        icon: LayoutDashboard,
      },
      {
        id: "agendamentos",
        label: "Atendimentos",
        icon: CalendarDays,
      }
    ]
  },
  {
    id: "comercial",
    label: "Comercial",
    icon: TrendingUp,
    badge: "4",
    submenu: [
      {
        id: "pipeline",
        label: "Leads",
        icon: Workflow,
      },
      {
        id: "cashback",
        label: "Cashback",
        icon: Gift,
      }
    ]
  },
  {
    id: "clientes",
    label: "Clientes",
    icon: Users,
    badge: "18",
  },
  {
    id: "profissionais",
    label: "Profissionais",
    icon: UserCheck,
    submenu: [
      {
        id: "profissionais-status",
        label: "Status Atendimento",
        icon: UserCheck,
      },
      {
        id: "agenda",
        label: "Agenda",
        icon: Calendar,
      },
      {
        id: "recrutadora",
        label: "Recrutadora",
        icon: UserPlus,
      }
    ]
  },
  {
    id: "financeiro",
    label: "Financeiro",
    icon: DollarSign,
    badge: "3",
  },
];

export function isParentActive(item: MenuItem, activeModule: string): boolean {
  if (activeModule === item.id) return true;
  if (item.submenu) return item.submenu.some((subItem) => subItem.id === activeModule);
  return false;
}
