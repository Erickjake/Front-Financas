import { apiFetch } from "@/lib/api-client";
import type { UserProfile } from "../types";

export async function getUserProfile(): Promise<UserProfile> {
  return apiFetch<UserProfile>("/users/me");
}

export async function updateUserProfile(
  payload: Partial<Omit<UserProfile, "id">>,
): Promise<UserProfile> {
  return apiFetch<UserProfile>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function getUsers(): Promise<UserProfile[]> {
  return apiFetch<UserProfile[]>("/users");
}

export async function getUserById(id: string): Promise<UserProfile> {
  return apiFetch<UserProfile>(`/users/${id}`);
}

export async function deleteUser(id: string): Promise<void> {
  await apiFetch(`/users/${id}`, { method: "DELETE" });
}
