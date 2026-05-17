import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError, apiFetch } from "@/lib/api-client";
import { getUserProfile } from "./user-service";

vi.mock("@/lib/api-client", () => ({
  apiFetch: vi.fn(),
  ApiError: class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
      super(message);
      this.status = status;
    }
  },
}));

describe("user-service", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("returns profile from API", async () => {
    const profile = {
      id: "u_1",
      name: "Ana",
      email: "ana@test.com",
      createdAt: "2026-01-01T00:00:00.000Z",
    };
    vi.mocked(apiFetch).mockResolvedValueOnce(profile);

    await expect(getUserProfile()).resolves.toEqual(profile);
    expect(apiFetch).toHaveBeenCalledWith("/users/me");
  });

  it("propagates API errors instead of returning mock data", async () => {
    vi.mocked(apiFetch).mockRejectedValueOnce(
      new ApiError("Unauthorized", 401),
    );

    await expect(getUserProfile()).rejects.toBeInstanceOf(ApiError);
  });
});
