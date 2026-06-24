import type { BusinessMetrics } from "@/lib/types/metrics.types";
import type {
  BenchmarkMap,
  MonthlyProfitPotential,
  RuleResult,
} from "@/lib/profit-engine/types";
import {
  averageOrderValue,
  cac,
  deadStockPct,
  grossMarginPct,
  repeatCustomerRate,
  roas,
} from "@/lib/profit-engine/formulas";

const IMPLEMENTATION_COST_RATE = 0.08;

export function calculateProfitPotential(
  metrics: BusinessMetrics,
  findings: RuleResult[],
  benchmarks: BenchmarkMap
): MonthlyProfitPotential {
  const revenue = metrics.monthly_revenue ?? 0;

  const retentionFinding = findings.find((f) => f.ruleId === "PE-RET-001");
  const retention = retentionFinding?.impact ?? 0;

  const aovGap =
    averageOrderValue(metrics) !== null && revenue > 0
      ? Math.round(revenue * 0.03)
      : 0;

  const conversion = findings.find((f) => f.ruleId === "PE-REV-001")?.impact
    ? Math.round(revenue * 0.05)
    : 0;

  const inventoryRecovery =
    findings.find((f) => f.ruleId === "PE-INV-001")?.impact ??
    Math.round((metrics.dead_stock_value ?? 0) * 0.25);

  const marketingWasteRecovery =
    findings.find((f) => f.ruleId === "PE-MRG-001")?.impact ??
    (roas(metrics) !== null && roas(metrics)! < benchmarks.roas
      ? Math.round((metrics.marketing_spend ?? 0) * 0.2)
      : 0);

  const marginRecovery =
    findings.find((f) => f.ruleId === "PE-FIN-001")?.impact ??
    (grossMarginPct(metrics) !== null &&
    grossMarginPct(metrics)! < benchmarks.grossMarginPct
      ? Math.round(revenue * 0.04)
      : 0);

  const gross =
    retention +
    aovGap +
    conversion +
    inventoryRecovery +
    marketingWasteRecovery +
    marginRecovery;

  const implementationCost = Math.round(gross * IMPLEMENTATION_COST_RATE);
  const net = Math.max(0, gross - implementationCost);

  let confidence: MonthlyProfitPotential["confidence"] = "low";
  const filledSignals = [
    repeatCustomerRate(metrics),
    cac(metrics),
    deadStockPct(metrics),
    grossMarginPct(metrics),
  ].filter((v) => v !== null).length;

  if (filledSignals >= 3) confidence = "high";
  else if (filledSignals >= 2) confidence = "medium";

  return {
    gross,
    implementationCost,
    net,
    confidence,
    breakdown: {
      retention,
      aov: aovGap,
      conversion,
      inventoryRecovery,
      marketingWasteRecovery,
      marginRecovery,
    },
  };
}
