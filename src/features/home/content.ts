import { ChartSpline, CreditCard, Goal, ShieldCheck } from "lucide-react";
import type { HomeFeature, HomeKpi } from "@/features/home/types";

export const HOME_KPIS: HomeKpi[] = [
  {
    label: "Usuarios ativos",
    value: "+24 mil",
    detail: "crescimento de 18% no trimestre",
  },
  {
    label: "Movimentacao mensal",
    value: "R$ 92 mi",
    detail: "monitorada com categorizacao automatica",
  },
  {
    label: "Metas concluidas",
    value: "87%",
    detail: "media de progresso por cliente",
  },
];

export const HOME_FEATURES: HomeFeature[] = [
  {
    title: "Visao em tempo real",
    text: "Veja entrada, saida e reservas em um unico fluxo visual com alertas inteligentes.",
    icon: ChartSpline,
  },
  {
    title: "Cartoes centralizados",
    text: "Consolide faturas, limites e vencimentos de varios bancos sem planilhas manuais.",
    icon: CreditCard,
  },
  {
    title: "Metas com estrategia",
    text: "Defina objetivos e acompanhe o caminho com checkpoints semanais de performance.",
    icon: Goal,
  },
  {
    title: "Seguranca bancaria",
    text: "Protecao com criptografia e monitoramento continuo para cada transacao critica.",
    icon: ShieldCheck,
  },
];

export const HOME_STEPS: string[] = [
  "Conecte suas contas e cartoes em menos de 3 minutos.",
  "Receba um diagnostico com gargalos e oportunidades de economia.",
  "Ative metas automatizadas e acompanhe sua evolucao semanal.",
];
