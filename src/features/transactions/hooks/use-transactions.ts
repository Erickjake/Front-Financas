"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/features/transactions/services/transactions-service";
import type { Transaction } from "@/features/transactions/types";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  return {
    transactions,
    isLoading: transactions.length === 0,
  };
}
