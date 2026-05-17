"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createTransaction,
  updateTransaction,
} from "@/features/transactions/services/transactions-service";
import type {
  Transaction,
  TransactionType,
} from "@/features/transactions/types";

const today = () => new Date().toISOString().split("T")[0];

export function CreateTransactionForm({
  onCreated,
  initialData,
}: {
  onCreated?: () => void;
  initialData?: Transaction;
}) {
  const isEditing = !!initialData;
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [amount, setAmount] = useState(initialData?.amount.toString() ?? "");
  const [type, setType] = useState<TransactionType>(
    initialData?.type ?? "RECEITA",
  );
  const [date, setDate] = useState(initialData?.date ?? today());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedAmount = Number.parseFloat(amount);

    if (!title || !amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Preencha todos os campos corretamente.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditing && initialData) {
        await updateTransaction(initialData.id, {
          title,
          amount: parsedAmount,
          type,
          date,
        });
        setSuccess("Transação atualizada com sucesso!");
      } else {
        await createTransaction({ title, amount: parsedAmount, type, date });
        setSuccess("Transação criada com sucesso!");
        setTitle("");
        setAmount("");
        setDate(today());
      }
      onCreated?.();
    } catch {
      setError(
        `Não foi possível ${isEditing ? "atualizar" : "criar"} a transação.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="py-0">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Editar transação" : "Nova transação"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Atualize os dados da transação"
            : "Registre uma receita ou despesa"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              htmlFor="title"
            >
              Título
            </label>
            <input
              id="title"
              type="text"
              placeholder="Ex: Salário"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              htmlFor="amount"
            >
              Valor (R$)
            </label>
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              htmlFor="type"
            >
              Tipo
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  label: "+ Receita",
                  value: "RECEITA",
                  match: ["RECEITA", "INCOME"],
                },
                {
                  label: "- Despesa",
                  value: "DESPESA",
                  match: ["DESPESA", "EXPENSE"],
                },
              ].map((t) => {
                const isSelected = t.match.includes(type);
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setType(t.value as TransactionType)}
                    disabled={isSubmitting}
                    className={`flex h-10 items-center justify-center gap-1.5 rounded-lg border text-sm font-medium transition-all ${
                      isSelected
                        ? t.value === "RECEITA"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-rose-500 bg-rose-50 text-rose-700"
                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              htmlFor="date"
            >
              Data
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              disabled={isSubmitting}
            />
          </div>

          {error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="rounded-md border border-emerald-500/30 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
              {success}
            </p>
          ) : null}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting
              ? "Salvando..."
              : isEditing
                ? "Salvar alterações"
                : "Adicionar transação"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
