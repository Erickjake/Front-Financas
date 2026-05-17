"use client";

import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboardSummary } from "@/features/dashboard/hooks/use-dashboard-summary";
import type {
  DashboardFilters,
  DashboardSummary,
} from "@/features/dashboard/types";
import { currencyFormatter } from "@/lib/formatters";

const cards = [
  {
    key: "total_income" as const,
    label: "Receitas",
    icon: TrendingUp,
    borderColor: "border-l-emerald-500",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    valueColor: "text-emerald-700",
  },
  {
    key: "total_expense" as const,
    label: "Despesas",
    icon: TrendingDown,
    borderColor: "border-l-rose-500",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    valueColor: "text-rose-700",
  },
  {
    key: "balance" as const,
    label: "Saldo",
    icon: Wallet,
    borderColor: "border-l-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/8",
    valueColor: "text-foreground",
  },
];

interface SummaryCardsProps {
  filters?: DashboardFilters;
}

export function SummaryCards({ filters }: SummaryCardsProps) {
  const { summary, isLoading, error } = useDashboardSummary(filters);

  if (isLoading) {
    return (
      <section className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="border-l-4 border-l-border py-0 animate-pulse"
          >
            <CardHeader className="p-5">
              <div className="h-4 w-20 rounded bg-muted" />
              <div className="mt-2 h-7 w-32 rounded bg-muted" />
            </CardHeader>
          </Card>
        ))}
      </section>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (!summary) {
    return (
      <p className="text-sm text-muted-foreground">Sem dados de resumo.</p>
    );
  }

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {cards.map(
        ({
          key,
          label,
          icon: Icon,
          borderColor,
          iconColor,
          iconBg,
          valueColor,
        }) => (
          <Card
            key={key}
            className={`border-l-4 ${borderColor} py-0 shadow-sm`}
          >
            <CardHeader className="p-5">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs font-medium uppercase tracking-wide">
                  {label}
                </CardDescription>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}
                >
                  <Icon className={`h-4 w-4 ${iconColor}`} />
                </div>
              </div>
              <CardTitle
                className={`mt-2 text-2xl font-bold tabular-nums ${valueColor}`}
              >
                {currencyFormatter.format(
                  (summary[key as keyof DashboardSummary] as number) || 0,
                )}
              </CardTitle>
            </CardHeader>
          </Card>
        ),
      )}
    </section>
  );
}
