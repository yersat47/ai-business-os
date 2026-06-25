"use client";

import { useCompanyStore } from "@/lib/stores/company.store";
import { useMetricsStore } from "@/lib/stores/metrics.store";

/** True when user has entered or submitted business metrics (live or persisted). */
export function useHasBusinessMetrics(): boolean {
  const company = useCompanyStore((s) => s.company);
  const monthlyRevenue = useMetricsStore((s) => s.currentMonthMetrics.monthly_revenue);
  const lastSubmittedMonth = useMetricsStore((s) => s.lastSubmittedMonth);

  return (
    company.metricsEntered === true ||
    (company.monthlyRevenue ?? 0) > 0 ||
    (monthlyRevenue ?? 0) > 0 ||
    !!lastSubmittedMonth
  );
}
