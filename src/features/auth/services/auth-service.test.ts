import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiFetch } from "@/lib/api-client";
import { getSession, login, logout } from "./auth-service";

vi.mock("@/lib/api-client", () => ({
  apiFetch: vi.fn(),
}));

describe("auth-service", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("login authenticates after successful auth and user fetch", async () => {
    vi.mocked(apiFetch)
      .mockResolvedValueOnce({ message: "ok" })
      .mockResolvedValueOnce({ id: 1, name: "Ana", email: "ana@test.com" });

    const session = await login({
      email: "ana@test.com",
      password: "secret",
    });

    expect(session.isAuthenticated).toBe(true);
    expect(session.user).toEqual({
      id: "1",
      name: "Ana",
      email: "ana@test.com",
    });
  });

  it("getSession returns unauthenticated when user fetch fails", async () => {
    vi.mocked(apiFetch).mockRejectedValueOnce(new Error("unauthorized"));

    const session = await getSession();

    expect(session.isAuthenticated).toBe(false);
    expect(session.user).toBeNull();
  });

  it("logout calls auth logout endpoint", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce(undefined);

    await logout();

    expect(apiFetch).toHaveBeenCalledWith("/auth/logout", { method: "POST" });
  });
});
