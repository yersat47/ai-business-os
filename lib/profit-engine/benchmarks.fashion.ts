import type { BenchmarkMap } from "@/lib/profit-engine/types";

/** Fashion retail benchmarks — stands in for Industry Brain API (Industry_Brain_Fashion_v2). */
export const FASHION_BENCHMARKS: BenchmarkMap = {
  grossMarginPct: 52,
  netMarginPct: 18,
  repeatCustomerRate: 38,
  cac: 3000,
  roas: 3.5,
  deadStockPct: 12,
  revenueGrowthMom: 5,
  cashReserveMonths: 3,
  inventoryTurnover: 5,
  /** Max healthy share of revenue on Fri–Sun (above = weekend dependency risk). */
  weekendRevenueSharePct: 55,
};
