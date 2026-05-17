"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateGoalForm } from "@/features/goals/components/create-goal-form";
import { GoalsList } from "@/features/goals/components/goals-list";
import { useGoals } from "@/features/goals/hooks/use-goals";
import type { Goal } from "@/features/goals/types";

export default function MetasPage() {
  const { goals, isLoading, error, refresh } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  function handleCreated() {
    setShowForm(false);
    setEditingGoal(null);
    refresh();
  }

  function handleEdit(goal: Goal) {
    setEditingGoal(goal);
    setShowForm(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Metas
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe seus objetivos financeiros
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setShowForm((v) => !v);
            if (showForm) setEditingGoal(null);
          }}
        >
          {showForm ? "Cancelar" : "Nova meta"}
        </Button>
      </div>

      {showForm && (
        <CreateGoalForm
          onCreated={handleCreated}
          initialData={editingGoal ?? undefined}
        />
      )}

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-36 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : (
        <GoalsList goals={goals} onEdit={handleEdit} />
      )}
    </div>
  );
}
