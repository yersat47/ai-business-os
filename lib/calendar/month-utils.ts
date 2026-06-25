import type { BusinessMetrics } from "@/lib/types/metrics.types";
import { dataCompletenessPct } from "@/lib/profit-engine/formulas";

export type MonthCompletenessStatus = "filled" | "partial" | "empty";

export function monthCompletenessStatus(
  metrics?: BusinessMetrics
): MonthCompletenessStatus {
  if (!metrics || !metrics.monthly_revenue) return "empty";
  const pct = dataCompletenessPct(metrics);
  if (pct >= 70) return "filled";
  if (pct >= 30) return "partial";
  return "empty";
}

export function parseMonthKey(monthKey: string): { year: number; month: number } {
  const [year, month] = monthKey.split("-").map(Number);
  return { year, month };
}

export function formatMonthKey(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, "0")}`;
}

export function shiftMonth(monthKey: string, delta: number): string {
  const { year, month } = parseMonthKey(monthKey);
  const date = new Date(year, month - 1 + delta, 1);
  return formatMonthKey(date.getFullYear(), date.getMonth() + 1);
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function monthKeyFromDate(isoDate: string): string {
  const date = new Date(isoDate);
  return formatMonthKey(date.getFullYear(), date.getMonth() + 1);
}
