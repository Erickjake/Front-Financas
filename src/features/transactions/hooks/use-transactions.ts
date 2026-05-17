"use client";

import { useCallback, useEffect, useState } from "react";
import { getTransactions } from "@/features/transactions/services/transactions-service";
import type {
  Transaction,
  TransactionType,
} from "@/features/transactions/types";

import { deleteTransaction as apiDelete } from "../services/transactions-service";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    search: string;
    type: TransactionType | "ALL";
  }>({
    search: "",
    type: "ALL",
  });

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar transações",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function remove(id: string) {
    try {
      await apiDelete(id);
      await refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao remover transação",
      );
    }
  }

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesType =
      filters.type === "ALL" ||
      t.type === filters.type ||
      (filters.type === "RECEITA" && t.type === "INCOME") ||
      (filters.type === "DESPESA" && t.type === "EXPENSE");
    return matchesSearch && matchesType;
  });

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    isLoading,
    error,
    refresh,
    remove,
    filters,
    setFilters,
  };
}
