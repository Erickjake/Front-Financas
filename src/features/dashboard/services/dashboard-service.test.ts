import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiFetch } from "@/lib/api-client";
import {
  getDashboardSummary,
  getMonthlyReport,
  getReportByCategory,
} from "./dashboard-service";

vi.mock("@/lib/api-client", () => ({
  apiFetch: vi.fn(),
}));

describe("dashboard-service", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("maps summary response to dashboard totals", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce({
      income: 1000,
      expense: 400,
      balance: 600,
    });

    const summary = await getDashboardSummary("2026-05");

    expect(apiFetch).toHaveBeenCalledWith("/reports/summary?DATA=2026-05");
    expect(summary).toEqual({
      total_income: 1000,
      total_expense: 400,
      balance: 600,
    });
  });

  it("defaults null income and expense to zero", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce({
      income: null,
      expense: null,
      balance: 0,
    });

    const summary = await getDashboardSummary();

    expect(summary.total_income).toBe(0);
    expect(summary.total_expense).toBe(0);
  });

  it("fetches category and monthly reports with DATA filter", async () => {
    vi.mocked(apiFetch)
      .mockResolvedValueOnce([
        { category: "Mercado", total: 50, percentage: 10 },
      ])
      .mockResolvedValueOnce([
        { date: "2026-05", income: 1, expense: 2, balance: -1 },
      ]);

    const byCategory = await getReportByCategory("2026-05");
    const monthly = await getMonthlyReport("2026-05");

    expect(apiFetch).toHaveBeenNthCalledWith(
      1,
      "/reports/by-category?DATA=2026-05",
    );
    expect(apiFetch).toHaveBeenNthCalledWith(
      2,
      "/reports/monthly?DATA=2026-05",
    );
    expect(byCategory).toHaveLength(1);
    expect(monthly).toHaveLength(1);
  });
});
