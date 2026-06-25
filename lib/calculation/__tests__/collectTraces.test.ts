import { describe, expect, it } from "vitest";
import { collectCalculationTraces } from "@/lib/calculation/collectTraces";

const fullFinanceMetrics = {
  monthly_revenue: 5_000_000,
  cogs: 1_250_000,
  monthly_rent: 350_000,
  monthly_payroll: 680_000,
  other_monthly_expenses: 220_000,
  cash_on_hand: 450_000,
  revenue_prior_month: 4_500_000,
};

describe("collectCalculationTraces", () => {
  it("produces at least 4 computed finance rows from full financial inputs", () => {
    const traces = collectCalculationTraces(fullFinanceMetrics);
    const computed = traces.filter((t) => t.status === "computed");
    const financeIds = [
      "gross_margin",
      "net_margin",
      "total_expenses",
      "rent_share",
      "cash_reserve",
    ];

    for (const id of financeIds) {
      const row = computed.find((t) => t.id === id);
      expect(row, `expected computed row for ${id}`).toBeDefined();
      expect(row!.resultValue).not.toBeNull();
    }

    expect(computed.length).toBeGreaterThanOrEqual(4);

    const gross = computed.find((t) => t.id === "gross_margin");
    expect(gross!.resultValue).toBe(75);

    const net = computed.find((t) => t.id === "net_margin");
    expect(net!.resultValue).toBe(50);
  });

  it("marks rows as skipped when required inputs are missing", () => {
    const traces = collectCalculationTraces({ monthly_revenue: 2_000_000 });
    const skipped = traces.filter((t) => t.status === "skipped");
    const gross = traces.find((t) => t.id === "gross_margin");

    expect(skipped.length).toBeGreaterThan(0);
    expect(gross?.status).toBe("skipped");
    expect(gross?.missingKeys).toContain("cogs");
  });

  it("does not crash on empty metrics", () => {
    expect(() => collectCalculationTraces({})).not.toThrow();
    const traces = collectCalculationTraces({});
    expect(traces.every((t) => t.status === "skipped")).toBe(true);
  });
});
