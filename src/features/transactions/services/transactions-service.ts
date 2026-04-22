import type { Transaction } from "@/features/transactions/types";

const TRANSACTIONS_MOCK: Transaction[] = [
  {
    id: "tr_001",
    description: "Salario",
    amount: 6500,
    date: "2026-04-20",
    category: "Renda",
    type: "income",
  },
  {
    id: "tr_002",
    description: "Supermercado",
    amount: 432.7,
    date: "2026-04-19",
    category: "Alimentacao",
    type: "expense",
  },
  {
    id: "tr_003",
    description: "Internet",
    amount: 129.9,
    date: "2026-04-18",
    category: "Casa",
    type: "expense",
  },
];

export async function getTransactions(): Promise<Transaction[]> {
  return TRANSACTIONS_MOCK;
}
