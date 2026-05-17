"use client";

import { useCallback, useEffect, useState } from "react";
import { getBudgetStatus } from "@/features/goals/services/goals-service";
import type { BudgetStatus } from "@/features/goals/types";

export function useBudgetStatus(month: number, year: number) {
  const [statuses, setStatuses] = useState<BudgetStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getBudgetStatus(month, year);
      setStatuses(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar o status dos orçamentos.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { statuses, isLoading, error, refresh };
}
