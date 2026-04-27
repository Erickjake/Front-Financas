"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTransactions } from "@/features/transactions/hooks/use-transactions";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});

export function TransactionsList() {
  const { transactions, isLoading, error } = useTransactions();

  if (isLoading) {
    return (
      <Card className="py-0">
        <CardHeader>
          <CardTitle>Últimas transações</CardTitle>
          <CardDescription>Lista consolidada por categoria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex animate-pulse items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted" />
                <div>
                  <div className="h-3.5 w-28 rounded bg-muted" />
                  <div className="mt-1.5 h-3 w-16 rounded bg-muted" />
                </div>
              </div>
              <div className="h-4 w-20 rounded bg-muted" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (transactions.length === 0) {
    return (
      <Card className="py-0">
        <CardHeader>
          <CardTitle>Últimas transações</CardTitle>
          <CardDescription>Lista consolidada por categoria</CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <p className="text-sm text-muted-foreground">
            Nenhuma transação encontrada.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="py-0">
      <CardHeader>
        <CardTitle>Últimas transações</CardTitle>
        <CardDescription>Lista consolidada por categoria</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1.5 pb-4">
        {transactions.map((item) => {
          const isIncome = item.type === "RECEITA";
          return (
            <article
              key={item.id}
              className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
                isIncome
                  ? "border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50"
                  : "border-rose-100 bg-rose-50/50 hover:bg-rose-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    isIncome ? "bg-emerald-100" : "bg-rose-100"
                  }`}
                >
                  {isIncome ? (
                    <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-rose-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {dateFormatter.format(new Date(item.date))}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span
                  className={`text-sm font-semibold tabular-nums ${
                    isIncome ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {isIncome ? "+" : "-"}
                  {currencyFormatter.format(Number(item.amount) || 0)}
                </span>
                <span
                  className={`text-xs font-medium ${
                    isIncome ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {isIncome ? "Entrada" : "Saída"}
                </span>
              </div>
            </article>
          );
        })}
      </CardContent>
    </Card>
  );
}
