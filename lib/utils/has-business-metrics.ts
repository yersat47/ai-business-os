import type { Company } from "@/lib/types/company.types";

export function hasBusinessMetrics(company: Partial<Company>): boolean {
  if (company.metricsEntered === true) return true;
  return (company.monthlyRevenue ?? 0) > 0;
}

export function getHealthScoreDisplay(
  company: Partial<Company>,
  score: number
): number | null {
  return hasBusinessMetrics(company) ? score : null;
}
