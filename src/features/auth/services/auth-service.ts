import type { LoginPayload, SessionState } from "@/features/auth/types";

const MOCK_SESSION: SessionState = {
  user: {
    id: "u_001",
    name: "Erick",
    email: "erick@frontfinancas.dev",
  },
  isAuthenticated: true,
};

export async function login(payload: LoginPayload): Promise<SessionState> {
  if (!payload.email || !payload.password) {
    return {
      user: null,
      isAuthenticated: false,
    };
  }

  return MOCK_SESSION;
}

export async function getSession(): Promise<SessionState> {
  return MOCK_SESSION;
}
