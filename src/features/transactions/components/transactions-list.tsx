"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Edit2,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { useTransactions } from "@/features/transactions/hooks/use-transactions";
import type { Transaction } from "@/features/transactions/types";
import { currencyFormatter, shortDateFormatter } from "@/lib/formatters";

export function TransactionsList({
  controller,
  onEdit,
}: {
  controller: ReturnType<typeof useTransactions>;
  onEdit?: (transaction: Transaction) => void;
}) {
  const {
    transactions,
    allTransactions,
    isLoading,
    error,
    filters,
    setFilters,
    remove,
  } = controller;

  function exportToCSV() {
    const headers = ["Título", "Valor", "Tipo", "Data", "Categoria"];
    const rows = allTransactions.map((t) => [
      t.title,
      t.amount.toString(),
      t.type,
      t.date,
      t.category ?? "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `transacoes_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (isLoading) {
    return (
      <Card className="py-0">
        <CardHeader>
          <CardTitle>Transações</CardTitle>
          <CardDescription>Gerencie seu fluxo financeiro</CardDescription>
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

  return (
    <Card className="py-0">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Transações</CardTitle>
            <CardDescription>Gerencie seu fluxo financeiro</CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="gap-2"
              title="Exportar para CSV"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Exportar</span>
            </Button>

            <div className="relative flex-1 sm:min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por título..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, search: e.target.value }))
                }
                className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="flex gap-1 rounded-md border border-input p-1">
              {(["ALL", "RECEITA", "DESPESA"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilters((f) => ({ ...f, type: t }))}
                  className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                    filters.type === t
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {t === "ALL"
                    ? "Todas"
                    : t === "RECEITA"
                      ? "Receitas"
                      : "Despesas"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5 pb-4">
        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        {transactions.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhuma transação encontrada com os filtros aplicados.
          </p>
        ) : (
          transactions.map((item) => {
            const isIncome = item.type === "RECEITA" || item.type === "INCOME";
            return (
              <article
                key={item.id}
                className={`group flex items-center justify-between rounded-lg border p-3 transition-colors ${
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
                      {shortDateFormatter.format(new Date(item.date))}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
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

                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => onEdit?.(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <ConfirmDialog
                      title="Excluir transação"
                      description="Deseja realmente excluir esta transação? Esta ação não pode ser desfeita."
                      confirmLabel="Excluir"
                      onConfirm={() => remove(item.id)}
                    >
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </ConfirmDialog>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
