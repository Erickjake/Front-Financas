export type DashboardKpi = {
  label: string;
  value: string;
  trend: string;
};

export type DashboardSummary = {
  period: string;
  kpis: DashboardKpi[];
};
