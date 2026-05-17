"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BudgetStatusList,
  GoalsList,
  useBudgetStatus,
  useGoals,
} from "@/features/goals";

function getCurrentPeriod() {
  const now = new Date();
  return { month: now.getMonth() + 1, year: now.getFullYear() };
}

export default function BudgetsPage() {
  const [period, setPeriod] = useState(getCurrentPeriod);
  const { statuses, isLoading, error, refresh } = useBudgetStatus(
    period.month,
    period.year,
  );
  const {
    goals,
    isLoading: goalsLoading,
    error: goalsError,
    refresh: refreshGoals,
  } = useGoals();

  function handlePeriodChange(field: "month" | "year", value: string) {
    const num = Number.parseInt(value, 10);
    if (Number.isNaN(num)) return;
    setPeriod((prev) => ({ ...prev, [field]: num }));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Orçamentos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe o status mensal dos seus orçamentos e metas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="grid gap-1 text-xs text-muted-foreground">
            Mês
            <input
              type="number"
              min={1}
              max={12}
              value={period.month}
              onChange={(e) => handlePeriodChange("month", e.target.value)}
              className="h-9 w-16 rounded-md border border-input bg-background px-2 text-sm"
            />
          </label>
          <label className="grid gap-1 text-xs text-muted-foreground">
            Ano
            <input
              type="number"
              min={2000}
              max={2100}
              value={period.year}
              onChange={(e) => handlePeriodChange("year", e.target.value)}
              className="h-9 w-20 rounded-md border border-input bg-background px-2 text-sm"
            />
          </label>
          <Button
            size="sm"
            variant="outline"
            className="mt-5"
            onClick={() => {
              refresh();
              refreshGoals();
            }}
          >
            Atualizar
          </Button>
        </div>
      </div>

      {(error || goalsError) && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error ?? goalsError}
        </p>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Status do mês</h2>
        <BudgetStatusList statuses={statuses} isLoading={isLoading} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Metas cadastradas</h2>
        {goalsLoading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="h-36 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : (
          <GoalsList goals={goals} />
        )}
      </section>
    </div>
  );
}
