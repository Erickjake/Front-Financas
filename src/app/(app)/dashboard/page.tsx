"use client";

import { useState } from "react";
import {
  CategoryChart,
  EvolutionChart,
  RecentTransactions,
  SummaryCards,
  TimeframeSelector,
} from "@/features/dashboard";
import type { DashboardFilters } from "@/features/dashboard/types";

export default function DashboardPage() {
  const [filters, setFilters] = useState<DashboardFilters>(() => {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    return { date: `${year}-${month}` };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Visão geral das suas finanças
          </p>
        </div>

        <TimeframeSelector filters={filters} onFiltersChange={setFilters} />
      </div>

      <SummaryCards filters={filters} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EvolutionChart filters={filters} />
        </div>
        <CategoryChart filters={filters} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentTransactions />
      </div>
    </div>
  );
}
