export type TransactionType = "RECEITA" | "DESPESA" | "INCOME" | "EXPENSE";

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: TransactionType;
  category?: string;
};
