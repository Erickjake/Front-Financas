import { apiFetch } from "@/lib/api-client";
import type {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "../types";

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

export async function getCategoryById(id: string): Promise<Category> {
  return apiFetch<Category>(`/categories/${id}`);
}

export async function createCategory(
  payload: CreateCategoryPayload,
): Promise<Category> {
  return apiFetch<Category>("/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateCategory(
  id: string,
  payload: UpdateCategoryPayload,
): Promise<Category> {
  return apiFetch<Category>(`/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteCategory(id: string): Promise<void> {
  await apiFetch(`/categories/${id}`, { method: "DELETE" });
}
