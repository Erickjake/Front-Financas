export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: TransactionType;
};
