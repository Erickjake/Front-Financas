"use client";

import { ArrowDownRight, ArrowUpRight, History } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTransactions } from "@/features/transactions/services/transactions-service";
import type { Transaction } from "@/features/transactions/types";
import { cn } from "@/lib/utils";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
});

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTransactions({ limit: 5 });
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao carregar transações recentes:", error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-bold">
            Atividade Recente
          </CardTitle>
          <CardDescription className="text-xs">
            Suas últimas 5 transações
          </CardDescription>
        </div>
        <History className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="h-8 w-8 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="h-3 w-20 rounded bg-muted" />
                </div>
                <div className="h-4 w-16 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Nenhuma transação encontrada.
          </p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    transaction.type === "RECEITA" ||
                      transaction.type === "INCOME"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600",
                  )}
                >
                  {transaction.type === "RECEITA" ||
                  transaction.type === "INCOME" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {transaction.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.category || "Sem categoria"} •{" "}
                    {dateFormatter.format(new Date(transaction.date))}
                  </p>
                </div>
                <p
                  className={cn(
                    "text-sm font-bold tabular-nums",
                    transaction.type === "RECEITA" ||
                      transaction.type === "INCOME"
                      ? "text-emerald-700"
                      : "text-rose-700",
                  )}
                >
                  {transaction.type === "RECEITA" ||
                  transaction.type === "INCOME"
                    ? "+"
                    : "-"}
                  {currencyFormatter.format(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
