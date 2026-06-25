export type DayOfWeekId = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface SalesDayCell {
  day: DayOfWeekId;
  value: number;
  estimated: boolean;
}

export interface SalesDayHeatmapData {
  cells: SalesDayCell[];
  weekendSharePct: number | null;
  ruleTriggered: boolean;
  hasData: boolean;
  isEstimated: boolean;
}
