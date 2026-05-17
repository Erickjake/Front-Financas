"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BudgetStatus } from "@/features/goals/types";

function formatCurrency(value?: number) {
  return (value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function BudgetStatusCard({
  status,
}: {
  status: BudgetStatus & { amount?: number };
}) {
  const target = status.amount ?? status.targetAmount ?? 0;
  const spent = status.spentAmount ?? 0;
  const remaining = status.remainingAmount ?? target - spent;

  const progress =
    target > 0 ? Math.min(100, Math.round((spent / target) * 100)) : 0;
  const isOver = spent > target;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">
            {status.title || "Orçamento"}
          </CardTitle>
          <Badge variant={isOver ? "destructive" : "outline"}>
            {isOver ? "Acima" : `${progress}%`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all ${isOver ? "bg-destructive" : "bg-primary"}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <p className="text-muted-foreground">Gasto</p>
            <p className="font-medium">{formatCurrency(spent)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Meta</p>
            <p className="font-medium">{formatCurrency(target)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Restante</p>
            <p
              className={`font-medium ${remaining < 0 ? "text-destructive" : ""}`}
            >
              {formatCurrency(remaining)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function BudgetStatusList({
  statuses,
  isLoading,
}: {
  statuses: BudgetStatus[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-36 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    );
  }

  if (statuses.length === 0) {
    return (
      <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Nenhum orçamento para este período
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Cadastre metas em Metas para acompanhar o progresso mensal.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {statuses.map((status) => (
        <BudgetStatusCard key={status.id} status={status} />
      ))}
    </div>
  );
}
