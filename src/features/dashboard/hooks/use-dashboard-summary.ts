"use client";

import { useCallback, useEffect, useState } from "react";
import { getDashboardSummary } from "@/features/dashboard/services/dashboard-service";
import type {
  DashboardFilters,
  DashboardSummary,
} from "@/features/dashboard/types";

export function useDashboardSummary(filters?: DashboardFilters) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDashboardSummary(filters?.date);
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar resumo");
    } finally {
      setIsLoading(false);
    }
  }, [filters?.date]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    summary,
    isLoading,
    error,
    refresh,
  };
}
