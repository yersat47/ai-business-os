import { describe, expect, it } from "vitest";
import { PE_REV_002 } from "@/lib/profit-engine/rules/pe-rev-002";
import { FASHION_BENCHMARKS } from "@/lib/profit-engine/benchmarks.fashion";
import { buildSalesDayHeatmapData } from "@/lib/sales/heatmap";
import { runProfitEngine } from "@/lib/profit-engine/engine";
import { weekendRevenueSharePct } from "@/lib/profit-engine/formulas";

describe("PE-REV-002 Weekend Revenue Dependency", () => {
  const highWeekendMetrics = {
    weekday_revenue: 1_500_000,
    weekend_revenue: 3_500_000,
  };

  const balancedMetrics = {
    weekday_revenue: 2_500_000,
    weekend_revenue: 2_500_000,
  };

  it("detects high weekend share above benchmark", () => {
    const share = weekendRevenueSharePct(highWeekendMetrics);
    expect(share).toBe(70);
    expect(PE_REV_002.detect(highWeekendMetrics, FASHION_BENCHMARKS)).toBe(true);
  });

  it("does not trigger when weekend share is balanced", () => {
    expect(weekendRevenueSharePct(balancedMetrics)).toBe(50);
    expect(PE_REV_002.detect(balancedMetrics, FASHION_BENCHMARKS)).toBe(false);
  });

  it("is skipped in engine when optional inputs are missing", () => {
    const output = runProfitEngine({ monthly_revenue: 5_000_000 });
    expect(output.missingDataForRule["PE-REV-002"]).toBeDefined();
    expect(output.findings.some((f) => f.ruleId === "PE-REV-002")).toBe(false);
  });

  it("appears in engine findings when weekend dependency is high", () => {
    const output = runProfitEngine(highWeekendMetrics);
    expect(output.findings.some((f) => f.ruleId === "PE-REV-002")).toBe(true);
  });
});

describe("buildSalesDayHeatmapData", () => {
  it("distributes weekday and weekend totals across 7 days", () => {
    const data = buildSalesDayHeatmapData({
      weekday_revenue: 4_000_000,
      weekend_revenue: 3_000_000,
    });

    expect(data.hasData).toBe(true);
    expect(data.cells).toHaveLength(7);
    expect(data.isEstimated).toBe(true);
    expect(data.weekendSharePct).toBeCloseTo(42.86, 1);
    expect(data.ruleTriggered).toBe(false);

    const total = data.cells.reduce((sum, c) => sum + c.value, 0);
    expect(total).toBe(7_000_000);
  });

  it("returns empty state when split is not provided", () => {
    const data = buildSalesDayHeatmapData({ monthly_revenue: 5_000_000 });
    expect(data.hasData).toBe(false);
    expect(data.cells).toHaveLength(0);
  });
});
