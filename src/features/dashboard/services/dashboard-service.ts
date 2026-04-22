import type { DashboardSummary } from "@/features/dashboard/types";

const SUMMARY_MOCK: DashboardSummary = {
  period: "Abril 2026",
  kpis: [
    {
      label: "Saldo projetado",
      value: "R$ 21.430,00",
      trend: "+12%",
    },
    {
      label: "Receitas",
      value: "R$ 10.250,00",
      trend: "+8%",
    },
    {
      label: "Despesas",
      value: "R$ 6.320,00",
      trend: "-4%",
    },
  ],
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  return SUMMARY_MOCK;
}
