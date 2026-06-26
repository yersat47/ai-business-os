import type { BusinessMetrics } from "@/lib/types/metrics.types";
import type { DayOfWeekId } from "@/lib/types/sales-heatmap.types";
import { buildSalesDayHeatmapData } from "@/lib/sales/heatmap";

export type DayColorStatus = "green" | "amber" | "red" | "neutral";

export const DAY_STATUS_COLORS: Record<DayColorStatus, string> = {
  green: "#4ADE80",
  amber: "#FBBF24",
  red: "#F87171",
  neutral: "#5E6571",
};

const DAY_INDEX_TO_ID: DayOfWeekId[] = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
];

/** Compare daily sales vs average; thresholds per spec. */
export function getDayColorStatus(
  daySales: number | null,
  averageDailySales: number
): DayColorStatus {
  if (daySales === null || averageDailySales <= 0) return "neutral";
  const ratio = daySales / averageDailySales;
  if (ratio >= 1.1) return "green";
  if (ratio >= 0.7) return "amber";
  return "red";
}

function dayOfWeekId(date: Date): DayOfWeekId {
  return DAY_INDEX_TO_ID[date.getDay()];
}

/**
 * Estimated daily sales using weekday/weekend split (same logic as heatmap).
 * Returns null for future days or when no revenue data exists.
 */
export function estimateDailySales(
  date: Date,
  metrics: BusinessMetrics,
  today: Date = new Date()
): number | null {
  const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (dayStart > todayStart) return null;

  const heatmap = buildSalesDayHeatmapData(metrics);
  if (!heatmap.hasData) {
    const revenue = metrics.monthly_revenue;
    if (!revenue || revenue <= 0) return null;
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    return revenue / daysInMonth;
  }

  const cell = heatmap.cells.find((c) => c.day === dayOfWeekId(date));
  if (!cell) return null;
  return cell.value;
}

export function averageDailySalesForMonth(
  metrics: BusinessMetrics,
  month: Date
): number {
  const revenue = metrics.monthly_revenue;
  if (!revenue || revenue <= 0) return 0;
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  return revenue / daysInMonth;
}
