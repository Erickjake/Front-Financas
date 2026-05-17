import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Transaction } from "@/features/transactions/types";
import TransactionPage from "./page";

let transactions: Transaction[];

vi.mock("@/features/transactions/services/transactions-service", () => ({
  getTransactions: vi.fn(async () => transactions),
  createTransaction: vi.fn(async (payload: Omit<Transaction, "id">) => {
    const transaction = { id: "2", ...payload };
    transactions = [...transactions, transaction];
    return transaction;
  }),
  updateTransaction: vi.fn(),
  deleteTransaction: vi.fn(),
}));

describe("TransactionPage", () => {
  beforeEach(() => {
    transactions = [
      {
        id: "1",
        title: "Salario",
        amount: 5000,
        date: "2026-05-01",
        type: "RECEITA",
      },
    ];
  });

  it("refreshes the visible transaction list after creating a transaction", async () => {
    render(<TransactionPage />);

    expect(await screen.findByText("Salario")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Nova transação" }));
    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Mercado" },
    });
    fireEvent.change(screen.getByLabelText("Valor (R$)"), {
      target: { value: "120.5" },
    });
    fireEvent.click(screen.getByRole("button", { name: "- Despesa" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Adicionar transação" }),
    );

    await waitFor(() => {
      expect(screen.getByText("Mercado")).toBeInTheDocument();
    });
  });
});
