import { apiFetch } from "@/lib/api-client";

export async function getBackup(): Promise<unknown> {
  return apiFetch("/backup");
}

export async function restoreBackup(payload: unknown): Promise<void> {
  await apiFetch("/backup/restore", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
