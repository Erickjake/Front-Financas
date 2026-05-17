import type { Transaction } from "@/features/transactions/types";
import { apiFetch } from "@/lib/api-client";

export async function getTransactions(params?: {
  page?: number;
  limit?: number;
}): Promise<Transaction[]> {
  const query = new URLSearchParams();
  if (params?.page !== undefined) query.set("page", String(params.page));
  if (params?.limit !== undefined) query.set("limit", String(params.limit));
  const url = query.toString() ? `/transactions?${query}` : "/transactions";
  const result = await apiFetch<unknown>(url);
  if (Array.isArray(result)) return result as Transaction[];
  if (
    result !== null &&
    typeof result === "object" &&
    "data" in result &&
    Array.isArray((result as { data: unknown }).data)
  ) {
    return (result as { data: Transaction[] }).data;
  }
  return [];
}

export async function getTransactionById(id: string): Promise<Transaction> {
  return apiFetch<Transaction>(`/transactions/${id}`);
}

export async function createTransaction(
  payload: Omit<Transaction, "id">,
): Promise<Transaction> {
  return await apiFetch<Transaction>("/transactions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTransaction(
  id: string,
  payload: Partial<Omit<Transaction, "id">>,
): Promise<Transaction> {
  return await apiFetch<Transaction>(`/transactions/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteTransaction(id: string): Promise<void> {
  await apiFetch(`/transactions/${id}`, {
    method: "DELETE",
  });
}
