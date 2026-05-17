export type DashboardFilters = {
  date: string; // Formato YYYY-MM
};

export type DashboardSummary = {
  total_income: number;
  total_expense: number;
  balance: number;
};

export type CategoryReport = {
  category: string;
  total: number;
  percentage: number;
};

export type MonthlyReport = {
  date: string; // Formato YYYY-MM
  income: number;
  expense: number;
  balance: number;
};
