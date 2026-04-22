"use client";

import { useEffect, useState } from "react";
import { getDashboardSummary } from "@/features/dashboard/services/dashboard-service";
import type { DashboardSummary } from "@/features/dashboard/types";

export function useDashboardSummary() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    getDashboardSummary().then(setSummary);
  }, []);

  return {
    summary,
    isLoading: !summary,
  };
}
