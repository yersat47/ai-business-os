import type { BusinessMetrics } from "@/lib/types/metrics.types";
import type {
  DayOfWeekId,
  SalesDayCell,
  SalesDayHeatmapData,
} from "@/lib/types/sales-heatmap.types";
import {
  weekendRevenueSharePct,
  weekdayWeekendTotal,
} from "@/lib/profit-engine/formulas";
import { FASHION_BENCHMARKS } from "@/lib/profit-engine/benchmarks.fashion";

const WEEKDAYS: DayOfWeekId[] = ["mon", "tue", "wed", "thu"];
const WEEKEND_DAYS: DayOfWeekId[] = ["fri", "sat", "sun"];

function distributeEvenly(total: number, days: DayOfWeekId[]): SalesDayCell[] {
  const perDay = total / days.length;
  return days.map((day) => ({
    day,
    value: perDay,
    estimated: true,
  }));
}

/** Build 7-day heatmap cells from optional weekday/weekend split. */
export function buildSalesDayHeatmapData(
  metrics: BusinessMetrics
): SalesDayHeatmapData {
  const weekday = metrics.weekday_revenue;
  const weekend = metrics.weekend_revenue;

  if (
    weekday === undefined ||
    weekend === undefined ||
    !Number.isFinite(weekday) ||
    !Number.isFinite(weekend) ||
    weekday + weekend <= 0
  ) {
    return {
      cells: [],
      weekendSharePct: null,
      ruleTriggered: false,
      hasData: false,
      isEstimated: false,
    };
  }

  const cells: SalesDayCell[] = [
    ...distributeEvenly(weekday, WEEKDAYS),
    ...distributeEvenly(weekend, WEEKEND_DAYS),
  ];

  const weekendSharePct = weekendRevenueSharePct(metrics);
  const ruleTriggered =
    weekendSharePct !== null &&
    weekendSharePct > FASHION_BENCHMARKS.weekendRevenueSharePct;

  return {
    cells,
    weekendSharePct,
    ruleTriggered,
    hasData: true,
    isEstimated: true,
  };
}

/** Future POS integration: pass real per-day or hourly breakdown. */
export function buildSalesDayHeatmapFromDaily(
  dailyValues: Record<DayOfWeekId, number>,
  estimated = false
): SalesDayHeatmapData {
  const cells = (Object.keys(dailyValues) as DayOfWeekId[]).map((day) => ({
    day,
    value: dailyValues[day],
    estimated,
  }));
  const total = cells.reduce((sum, c) => sum + c.value, 0);
  const weekendTotal =
    (dailyValues.fri ?? 0) + (dailyValues.sat ?? 0) + (dailyValues.sun ?? 0);
  const weekendSharePct = total > 0 ? (weekendTotal / total) * 100 : null;
  const ruleTriggered =
    weekendSharePct !== null &&
    weekendSharePct > FASHION_BENCHMARKS.weekendRevenueSharePct;

  return {
    cells,
    weekendSharePct,
    ruleTriggered,
    hasData: total > 0,
    isEstimated: estimated,
  };
}

/** Future 7×24 hourly grid — pass through to SalesDayHeatmap hourly prop. */
export function aggregateHourlyToDays(hourly: number[][]): SalesDayCell[] {
  const dayIds: DayOfWeekId[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return hourly.map((hours, i) => ({
    day: dayIds[i],
    value: hours.reduce((sum, h) => sum + h, 0),
    estimated: false,
  }));
}

export function getWeekendShareCaption(
  data: SalesDayHeatmapData,
  t: (key: string, values?: Record<string, string | number>) => string
): string {
  if (!data.hasData || data.weekendSharePct === null) {
    return t("emptyCaption");
  }
  if (data.ruleTriggered) {
    return t("riskCaption", {
      pct: Math.round(data.weekendSharePct),
    });
  }
  return t("balancedCaption");
}
