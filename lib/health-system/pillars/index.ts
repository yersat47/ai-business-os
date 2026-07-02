import type { BusinessMetrics } from "@/lib/types/metrics.types";
import type { HealthStatus } from "@/lib/types/health.types";
import {
  grossMarginPct,
  netMarginPct,
  cashReserveMonths,
  expenseRatio,
  averageOrderValue,
  repeatCustomerRate,
  deadStockPct,
  cac,
  roas,
  revenueGrowthMom,
  staffTurnoverPct,
  conversionRate,
} from "@/lib/profit-engine/formulas";
import { FASHION_BENCHMARKS } from "@/lib/profit-engine/benchmarks.fashion";
import { scoreToStatus } from "@/lib/health-system/scoreBands";

export interface PillarResult {
  id: string;
  score: number;
  weight: number;
  status: HealthStatus;
  missingSubMetrics: string[];
}

function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function scoreFromRatio(value: number | null, benchmark: number, higherIsBetter = true): number | null {
  if (value === null) return null;
  const ratio = higherIsBetter ? value / benchmark : benchmark / Math.max(value, 0.01);
  return clamp(50 + (ratio - 1) * 40);
}

export function calculateFinancialPillar(metrics: BusinessMetrics): PillarResult {
  const missing: string[] = [];
  const gm = grossMarginPct(metrics);
  const nm = netMarginPct(metrics);
  const cr = cashReserveMonths(metrics);
  const er = expenseRatio(metrics);
  const rg = revenueGrowthMom(metrics);

  const scores: number[] = [];
  if (gm !== null) scores.push(scoreFromRatio(gm, FASHION_BENCHMARKS.grossMarginPct)!);
  else missing.push("gross_margin");
  if (nm !== null) scores.push(scoreFromRatio(nm, FASHION_BENCHMARKS.netMarginPct)!);
  else missing.push("net_margin");
  if (cr !== null) scores.push(scoreFromRatio(cr, FASHION_BENCHMARKS.cashReserveMonths)!);
  else missing.push("cash_reserve");
  if (er !== null) scores.push(scoreFromRatio(er, 65, false)!);
  else missing.push("expense_ratio");
  if (rg !== null) scores.push(clamp(60 + rg * 2));
  else missing.push("revenue_growth");

  const score = scores.length ? clamp(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  return { id: "financial", score, weight: 0.3, status: scoreToStatus(score), missingSubMetrics: missing };
}

export function calculateSalesPillar(metrics: BusinessMetrics): PillarResult {
  const missing: string[] = [];
  const aov = averageOrderValue(metrics);
  const tx = metrics.monthly_transactions;
  const conv = conversionRate(metrics);
  const scores: number[] = [];
  if (aov !== null) scores.push(scoreFromRatio(aov, 15000)!);
  else missing.push("aov");
  if (tx !== undefined) scores.push(clamp(50 + (tx / 200) * 30));
  else missing.push("transactions");
  if (conv !== null) scores.push(scoreFromRatio(conv, 28)!);
  else missing.push("conversion");

  const score = scores.length ? clamp(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  return { id: "sales", score, weight: 0.25, status: scoreToStatus(score), missingSubMetrics: missing };
}

export function calculateCustomerPillar(metrics: BusinessMetrics): PillarResult {
  const rate = repeatCustomerRate(metrics);
  const missing = rate === null ? ["repeat_rate"] : [];
  const score = rate !== null ? scoreFromRatio(rate, FASHION_BENCHMARKS.repeatCustomerRate)! : 0;
  return { id: "customer", score, weight: 0.15, status: scoreToStatus(score), missingSubMetrics: missing };
}

export function calculateInventoryPillar(metrics: BusinessMetrics): PillarResult {
  const dead = deadStockPct(metrics);
  const missing = dead === null ? ["dead_stock"] : [];
  const score = dead !== null ? scoreFromRatio(dead, FASHION_BENCHMARKS.deadStockPct, false)! : 0;
  return { id: "inventory", score, weight: 0.1, status: scoreToStatus(score), missingSubMetrics: missing };
}

export function calculateMarketingPillar(metrics: BusinessMetrics): PillarResult {
  const missing: string[] = [];
  const cacVal = cac(metrics);
  const roasVal = roas(metrics);
  const scores: number[] = [];
  if (cacVal !== null) scores.push(scoreFromRatio(cacVal, FASHION_BENCHMARKS.cac, false)!);
  else missing.push("cac");
  if (roasVal !== null) scores.push(scoreFromRatio(roasVal, FASHION_BENCHMARKS.roas)!);
  else missing.push("roas");

  const score = scores.length ? clamp(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  return { id: "marketing", score, weight: 0.1, status: scoreToStatus(score), missingSubMetrics: missing };
}

export function calculateTeamPillar(metrics: BusinessMetrics): PillarResult {
  const turnover = staffTurnoverPct(metrics);
  const staff = metrics.sales_staff_count;
  const missing: string[] = [];
  const scores: number[] = [];
  if (turnover !== null) scores.push(scoreFromRatio(turnover, 25, false)!);
  else missing.push("staff_turnover");
  if (staff !== undefined) scores.push(clamp(55 + staff * 5));
  else missing.push("sales_staff");

  const score = scores.length ? clamp(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  return { id: "team", score, weight: 0.07, status: scoreToStatus(score), missingSubMetrics: missing };
}

export function calculateOperationsPillar(metrics: BusinessMetrics): PillarResult {
  const rent = metrics.monthly_rent;
  const revenue = metrics.monthly_revenue;
  const missing: string[] = [];
  let score = 70;
  if (rent !== undefined && revenue !== undefined && revenue > 0) {
    const rentRatio = (rent / revenue) * 100;
    score = scoreFromRatio(rentRatio, 15, false) ?? 70;
  } else {
    missing.push("rent_ratio");
  }
  return { id: "operations", score, weight: 0.03, status: scoreToStatus(score), missingSubMetrics: missing };
}

export const ALL_PILLAR_CALCULATORS = [
  calculateFinancialPillar,
  calculateSalesPillar,
  calculateCustomerPillar,
  calculateInventoryPillar,
  calculateMarketingPillar,
  calculateTeamPillar,
  calculateOperationsPillar,
];
