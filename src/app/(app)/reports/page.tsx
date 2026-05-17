"use client";

import { useState } from "react";
import { TimeframeSelector } from "@/features/dashboard";
import type { DashboardFilters } from "@/features/dashboard/types";
import { ReportsOverview, useReports } from "@/features/reports";

export default function ReportsPage() {
  const [filters, setFilters] = useState<DashboardFilters>(() => {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    return { date: `${year}-${month}` };
  });

  const { summary, byCategory, monthly, isLoading, error } = useReports(
    filters.date,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Relatórios
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Análise financeira por período, categoria e evolução mensal
          </p>
        </div>
        <TimeframeSelector filters={filters} onFiltersChange={setFilters} />
      </div>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <ReportsOverview
        summary={summary}
        byCategory={byCategory}
        monthly={monthly}
        isLoading={isLoading}
      />
    </div>
  );
}
