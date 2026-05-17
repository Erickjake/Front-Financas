"use client";

import { useCallback, useEffect, useState } from "react";
import {
  deleteCategory as apiDelete,
  getCategories,
} from "@/features/categories/services/categories-service";
import type { Category } from "@/features/categories/types";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao buscar categorias.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const remove = useCallback(
    async (id: string) => {
      await apiDelete(id);
      await fetch();
    },
    [fetch],
  );

  return { categories, isLoading, error, refresh: fetch, remove };
}
