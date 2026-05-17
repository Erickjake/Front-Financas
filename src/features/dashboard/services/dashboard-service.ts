import type {
  CategoryReport,
  DashboardSummary,
  MonthlyReport,
} from "@/features/dashboard/types";
import { apiFetch } from "@/lib/api-client";

export async function getDashboardSummary(
  date?: string,
): Promise<DashboardSummary> {
  const query = new URLSearchParams();
  if (date) {
    query.set("DATA", date);
  }

  const url = query.toString()
    ? `/reports/summary?${query}`
    : "/reports/summary";
  const data = await apiFetch<{
    income: number | null;
    expense: number | null;
    balance: number;
  }>(url);

  return {
    total_income: data.income ?? 0,
    total_expense: data.expense ?? 0,
    balance: data.balance,
  };
}

export async function getReportByCategory(
  date: string,
): Promise<CategoryReport[]> {
  const query = new URLSearchParams();
  query.set("DATA", date);
  return apiFetch<CategoryReport[]>(`/reports/by-category?${query}`);
}

/** Tipo bruto retornado pela API (usa DATA ao invés de date). */
type MonthlyReportRaw = Omit<MonthlyReport, "date"> & { DATA: string };

export async function getMonthlyReport(date: string): Promise<MonthlyReport[]> {
  const query = new URLSearchParams();
  query.set("DATA", date);
  const raw = await apiFetch<MonthlyReportRaw[]>(`/reports/monthly?${query}`);
  return raw.map(({ DATA, ...rest }) => ({ ...rest, date: DATA }));
}
