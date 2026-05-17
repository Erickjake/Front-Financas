"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getDashboardSummary,
  getMonthlyReport,
  getReportByCategory,
} from "@/features/dashboard/services/dashboard-service";
import type {
  CategoryReport,
  DashboardSummary,
  MonthlyReport,
} from "@/features/dashboard/types";

export function useReports(dataFilter: string) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [byCategory, setByCategory] = useState<CategoryReport[]>([]);
  const [monthly, setMonthly] = useState<MonthlyReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [summaryData, categoryData, monthlyData] = await Promise.all([
        getDashboardSummary(dataFilter),
        getReportByCategory(dataFilter),
        getMonthlyReport(dataFilter),
      ]);
      setSummary(summaryData);
      setByCategory(categoryData);
      setMonthly(monthlyData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar os relatórios.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [dataFilter]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { summary, byCategory, monthly, isLoading, error, refresh };
}
