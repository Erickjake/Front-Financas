"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getMonthlyReport,
  getReportByCategory,
} from "@/features/dashboard/services/dashboard-service";
import type {
  CategoryReport,
  DashboardFilters,
  MonthlyReport,
} from "@/features/dashboard/types";

export function useDashboardCharts(filters: DashboardFilters) {
  const [categoryData, setCategoryData] = useState<CategoryReport[]>([]);
  const [evolutionData, setEvolutionData] = useState<MonthlyReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [categories, evolution] = await Promise.all([
        getReportByCategory(filters.date),
        getMonthlyReport(filters.date),
      ]);
      setCategoryData(categories);
      setEvolutionData(evolution);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar gráficos",
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters.date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    categoryData,
    evolutionData,
    isLoading,
    error,
    refresh: fetchData,
  };
}
