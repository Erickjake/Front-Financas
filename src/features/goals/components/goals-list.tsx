"use client";

import { Edit2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Goal } from "@/features/goals/types";
import { useGoals } from "../hooks/use-goals";

function formatCurrency(value?: number) {
  return (value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

function GoalCard({
  goal,
  onEdit,
  onDelete,
}: {
  goal: Goal;
  onEdit?: (goal: Goal) => void;
  onDelete?: (id: number) => void;
}) {
  const target = goal.targetAmount;
  const current = goal.currentAmount;

  const progress =
    target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  const isComplete = progress >= 100 && target > 0;

  return (
    <Card className="group">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">
            {goal.title || "Orçamento"}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant={isComplete ? "default" : "outline"}
              className="shrink-0 text-xs"
            >
              {isComplete ? "Concluída" : `${progress}%`}
            </Badge>
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={() => onEdit?.(goal)}
                className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete?.(goal.id)}
                className="rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {formatCurrency(current)} acumulados
          </span>
          <span className="font-medium">{formatCurrency(target)}</span>
        </div>

        {goal.dueDate && (
          <p className="text-xs text-muted-foreground">
            Prazo: {formatDate(goal.dueDate)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function GoalsList({
  goals,
  onEdit,
}: {
  goals: Goal[];
  onEdit?: (goal: Goal) => void;
}) {
  const { remove } = useGoals();

  async function handleDelete(id: number) {
    if (confirm("Deseja realmente excluir esta meta?")) {
      await remove(id);
    }
  }

  if (goals.length === 0) {
    return (
      <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Nenhuma meta cadastrada
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Crie sua primeira meta financeira acima.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
