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
  createGoal,
  updateGoal,
} from "@/features/goals/services/goals-service";
import type { Goal } from "@/features/goals/types";
import { ApiError } from "@/lib/api-client";

const today = () => new Date().toISOString().split("T")[0];

export function CreateGoalForm({
  onCreated,
  initialData,
}: {
  onCreated?: () => void;
  initialData?: Goal;
}) {
  const isEditing = !!initialData;
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [targetAmount, setTargetAmount] = useState(
    initialData?.targetAmount?.toString() ?? "",
  );
  const [currentAmount, setCurrentAmount] = useState(
    initialData?.currentAmount?.toString() ?? "",
  );
  const [dueDate, setDueDate] = useState(initialData?.dueDate ?? today());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedTarget = Number.parseFloat(targetAmount);
    const parsedCurrent = currentAmount ? Number.parseFloat(currentAmount) : 0;

    if (
      !title ||
      !targetAmount ||
      Number.isNaN(parsedTarget) ||
      parsedTarget <= 0
    ) {
      setError("Preencha os campos obrigatórios corretamente.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditing && initialData) {
        await updateGoal(initialData.id, {
          title,
          targetAmount: parsedTarget,
          currentAmount: parsedCurrent,
          dueDate: dueDate || today(),
        });
        setSuccess("Meta atualizada com sucesso!");
      } else {
        await createGoal({
          title,
          targetAmount: parsedTarget,
          currentAmount: parsedCurrent,
          dueDate: dueDate || today(),
        });
        setSuccess("Meta criada com sucesso!");
        setTitle("");
        setTargetAmount("");
        setCurrentAmount("");
        setDueDate(today());
      }
      onCreated?.();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(
          `Não foi possível ${isEditing ? "atualizar" : "criar"} a meta.`,
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass =
    "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30";
  const labelClass =
    "text-xs font-semibold uppercase tracking-wide text-muted-foreground";

  return (
    <Card className="py-0">
      <CardHeader>
        <CardTitle>{isEditing ? "Editar meta" : "Nova meta"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Atualize os detalhes do seu objetivo"
            : "Defina um objetivo financeiro"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className={labelClass} htmlFor="goal-title">
              Título <span className="text-destructive">*</span>
            </label>
            <input
              id="goal-title"
              type="text"
              placeholder="Ex: Reserva de emergência"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={fieldClass}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className={labelClass} htmlFor="target-amount">
                Valor alvo (R$) <span className="text-destructive">*</span>
              </label>
              <input
                id="target-amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0,00"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className={fieldClass}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass} htmlFor="current-amount">
                Valor atual (R$)
              </label>
              <input
                id="current-amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className={fieldClass}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={labelClass} htmlFor="due-date">
              Prazo
            </label>
            <input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={fieldClass}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 border border-emerald-500/30">
              {success}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? "Salvando..."
              : isEditing
                ? "Salvar alterações"
                : "Criar meta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
