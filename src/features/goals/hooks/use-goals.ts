"use client";

import { useCallback, useEffect, useState } from "react";
import {
  deleteGoal as apiDelete,
  getGoals,
} from "@/features/goals/services/goals-service";
import type { Goal } from "@/features/goals/types";

type UseGoalsResult = {
  goals: Goal[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
  remove: (id: string) => Promise<void>;
};

export function useGoals(): UseGoalsResult {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getGoals();
      setGoals(data);
    } catch {
      setError("Não foi possível carregar as metas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function remove(id: string) {
    try {
      await apiDelete(id);
      await fetchGoals();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao remover meta");
    }
  }

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return { goals, isLoading, error, refresh: fetchGoals, remove };
}
