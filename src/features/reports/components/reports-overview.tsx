"use client";

import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  CategoryReport,
  DashboardSummary,
  MonthlyReport,
} from "@/features/dashboard/types";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function SummaryCards({ summary }: { summary: DashboardSummary }) {
  const items = [
    {
      label: "Receitas",
      value: summary.total_income,
      icon: TrendingUp,
      color: "text-emerald-600",
    },
    {
      label: "Despesas",
      value: summary.total_expense,
      icon: TrendingDown,
      color: "text-rose-600",
    },
    {
      label: "Saldo",
      value: summary.balance,
      icon: Wallet,
      color: "text-foreground",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${item.color}`} />
                {item.label}
              </CardDescription>
              <CardTitle className={`text-2xl ${item.color}`}>
                {currencyFormatter.format(item.value)}
              </CardTitle>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}

function CategoryTable({ items }: { items: CategoryReport[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhum dado por categoria neste período.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.category}
          className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
        >
          <span className="font-medium">{item.category}</span>
          <span className="text-muted-foreground">
            {currencyFormatter.format(item.total)} ({item.percentage.toFixed(1)}
            %)
          </span>
        </div>
      ))}
    </div>
  );
}

function MonthlyTable({ items }: { items: MonthlyReport[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhum dado mensal disponível.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted-foreground">
            <th className="pb-2 pr-4 font-medium">Período</th>
            <th className="pb-2 pr-4 font-medium">Receitas</th>
            <th className="pb-2 pr-4 font-medium">Despesas</th>
            <th className="pb-2 font-medium">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={row.DATA} className="border-b border-border/50">
              <td className="py-2 pr-4">{row.DATA}</td>
              <td className="py-2 pr-4 text-emerald-600">
                {currencyFormatter.format(row.income)}
              </td>
              <td className="py-2 pr-4 text-rose-600">
                {currencyFormatter.format(row.expense)}
              </td>
              <td className="py-2">{currencyFormatter.format(row.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ReportsOverview({
  summary,
  byCategory,
  monthly,
  isLoading,
}: {
  summary: DashboardSummary | null;
  byCategory: CategoryReport[];
  monthly: MonthlyReport[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} />

      <Card>
        <CardHeader>
          <CardTitle>Por categoria</CardTitle>
          <CardDescription>Distribuição de gastos no período</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryTable items={byCategory} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Evolução mensal</CardTitle>
          <CardDescription>Receitas, despesas e saldo por mês</CardDescription>
        </CardHeader>
        <CardContent>
          <MonthlyTable items={monthly} />
        </CardContent>
      </Card>
    </div>
  );
}
