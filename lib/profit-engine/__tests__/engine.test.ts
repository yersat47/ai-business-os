import { describe, expect, it } from "vitest";
import { PE_REV_001, PE_RET_001 } from "@/lib/profit-engine/rules";
import { FASHION_BENCHMARKS } from "@/lib/profit-engine/benchmarks.fashion";
import { calculateProfitPotential } from "@/lib/profit-engine/profitPotential";
import { runProfitEngine } from "@/lib/profit-engine/engine";
import { revenueGrowthMom, repeatCustomerRate } from "@/lib/profit-engine/formulas";

describe("PE-REV-001 Revenue Decline", () => {
  const metrics = {
    monthly_revenue: 7_500_000,
    revenue_prior_month: 8_450_000,
  };

  it("detects revenue decline below benchmark", () => {
    expect(PE_REV_001.detect(metrics, FASHION_BENCHMARKS)).toBe(true);
  });

  it("calculates impact as revenue gap", () => {
    expect(PE_REV_001.calculateImpact(metrics, FASHION_BENCHMARKS)).toBe(950_000);
  });

  it("formula matches engine detection", () => {
    const growth = revenueGrowthMom(metrics);
    expect(growth).not.toBeNull();
    expect(growth!).toBeLessThan(0);
  });
});

describe("PE-RET-001 Low Repeat Rate", () => {
  const metrics = {
    monthly_revenue: 8_450_000,
    repeat_customers: 60,
    new_customers_monthly: 120,
  };

  it("detects low repeat customer rate", () => {
    const rate = repeatCustomerRate(metrics);
    expect(rate).toBeCloseTo(33.33, 1);
    expect(PE_RET_001.detect(metrics, FASHION_BENCHMARKS)).toBe(true);
  });

  it("calculates positive impact when below benchmark", () => {
    expect(PE_RET_001.calculateImpact(metrics, FASHION_BENCHMARKS)).toBeGreaterThan(0);
  });
});

describe("Profit Potential formula", () => {
  it("returns net less implementation cost", () => {
    const metrics = {
      monthly_revenue: 8_450_000,
      revenue_prior_month: 7_900_000,
      repeat_customers: 60,
      new_customers_monthly: 120,
      marketing_spend: 250_000,
      ad_revenue: 400_000,
      dead_stock_value: 1_100_000,
      total_inventory_value: 4_200_000,
      cogs: 4_200_000,
      monthly_expenses: 1_800_000,
      cash_on_hand: 900_000,
    };

    const output = runProfitEngine(metrics);
    const pp = calculateProfitPotential(metrics, output.findings, FASHION_BENCHMARKS);

    expect(pp.gross).toBeGreaterThan(0);
    expect(pp.net).toBe(pp.gross - pp.implementationCost);
    expect(pp.implementationCost).toBe(Math.round(pp.gross * 0.08));
  });
});
