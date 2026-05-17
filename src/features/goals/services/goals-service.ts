import type {
  BudgetStatus,
  CreateGoalPayload,
  Goal,
  UpdateGoalPayload,
} from "@/features/goals/types";
import { apiFetch } from "@/lib/api-client";

export async function getGoals(): Promise<Goal[]> {
  return apiFetch<Goal[]>("/goals");
}

export async function getGoalById(id: number): Promise<Goal> {
  return apiFetch<Goal>(`/goals/${id}`);
}

export async function getBudgetStatus(
  month: number,
  year: number,
): Promise<BudgetStatus[]> {
  return apiFetch<BudgetStatus[]>(
    `/budgets/status?month=${month}&year=${year}`,
  );
}

export async function createGoal(payload: CreateGoalPayload): Promise<Goal> {
  return apiFetch<Goal>("/goals", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateGoal(
  id: number,
  payload: UpdateGoalPayload,
): Promise<Goal> {
  return apiFetch<Goal>(`/goals/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteGoal(id: number): Promise<void> {
  await apiFetch(`/goals/${id}`, { method: "DELETE" });
}
