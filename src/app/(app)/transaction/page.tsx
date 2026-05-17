"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateTransactionForm } from "@/features/transactions/components/create-transaction-form";
import { TransactionsList } from "@/features/transactions/components/transactions-list";
import { useTransactions } from "@/features/transactions/hooks/use-transactions";
import type { Transaction } from "@/features/transactions/types";

export default function TransactionPage() {
  const transactionsController = useTransactions();
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  async function handleCreated() {
    setShowForm(false);
    setEditingTransaction(null);
    await transactionsController.refresh();
  }

  function handleEdit(transaction: Transaction) {
    setEditingTransaction(transaction);
    setShowForm(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Transações
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie suas entradas e saídas
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setShowForm((v) => !v);
            if (showForm) setEditingTransaction(null);
          }}
        >
          {showForm ? "Cancelar" : "Nova transação"}
        </Button>
      </div>

      {showForm && (
        <CreateTransactionForm
          onCreated={handleCreated}
          initialData={editingTransaction ?? undefined}
        />
      )}

      <TransactionsList
        controller={transactionsController}
        onEdit={handleEdit}
      />
    </div>
  );
}
