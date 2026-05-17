import type {
  AuthUser,
  LoginPayload,
  RegisterPayload,
  SessionState,
} from "@/features/auth/types";
import { apiFetch } from "@/lib/api-client";

type UsersApiResponse = {
  id: number;
  name: string;
  email: string;
};

async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const data = await apiFetch<UsersApiResponse>("/users/me", {
      method: "GET",
    });
    return { id: String(data.id), name: data.name, email: data.email };
  } catch {
    return null;
  }
}

export async function login(payload: LoginPayload): Promise<SessionState> {
  await apiFetch<{ message: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const user = await fetchCurrentUser();
  return { user, isAuthenticated: true };
}

export async function register(payload: RegisterPayload): Promise<void> {
  await apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getSession(): Promise<SessionState> {
  const user = await fetchCurrentUser();
  if (!user) return { user: null, isAuthenticated: false };
  return { user, isAuthenticated: true };
}

export async function logout(): Promise<void> {
  await apiFetch("/auth/logout", { method: "POST" });
}

export async function refreshToken(): Promise<void> {
  await apiFetch("/auth/refresh", { method: "POST" });
}
