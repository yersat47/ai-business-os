import { describe, expect, it } from "vitest";
import { calculateMasterHealth } from "@/lib/health-system/masterScore";
import { runProfitEngine } from "@/lib/profit-engine/engine";

const urbanMetrics = {
  monthly_revenue: 8_450_000,
  revenue_prior_month: 7_900_000,
  monthly_transactions: 420,
  repeat_customers: 95,
  new_customers_monthly: 55,
  cogs: 4_200_000,
  marketing_spend: 250_000,
  ad_revenue: 800_000,
  dead_stock_value: 1_100_000,
  total_inventory_value: 4_200_000,
  monthly_expenses: 1_800_000,
  monthly_rent: 350_000,
  payroll: 680_000,
  cash_on_hand: 2_100_000,
  sales_staff_count: 4,
  staff_turnover: 25,
};

describe("Business Health master score", () => {
  it("produces score between 0 and 100 for full Urban Mode inputs", () => {
    const profit = runProfitEngine(urbanMetrics);
    const health = calculateMasterHealth(urbanMetrics, profit);

    expect(health.masterScore).toBeGreaterThan(0);
    expect(health.masterScore).toBeLessThanOrEqual(100);
    expect(health.pillars).toHaveLength(8);
    expect(health.topRisks.length).toBeGreaterThan(0);
  });

  it("returns empty health when data is insufficient", () => {
    const profit = runProfitEngine({});
    const health = calculateMasterHealth({}, profit);
    expect(health.masterScore).toBe(0);
  });
});
