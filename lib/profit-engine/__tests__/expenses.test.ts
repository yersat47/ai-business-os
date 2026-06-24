import { describe, expect, it } from "vitest";
import {
  totalMonthlyExpenses,
  grossMarginPct,
  netMarginPct,
  cashReserveMonths,
} from "@/lib/profit-engine/formulas";

describe("Itemized expense calculations (Block 1)", () => {
  const metrics = {
    monthly_revenue: 2_500_000,
    cogs: 1_250_000,
    monthly_rent: 350_000,
    monthly_payroll: 680_000,
    other_monthly_expenses: 220_000,
    cash_on_hand: 450_000,
  };

  it("computes total_expenses without double-counting", () => {
    expect(totalMonthlyExpenses(metrics)).toBe(2_500_000);
  });

  it("derives gross margin from revenue and cogs", () => {
    expect(grossMarginPct(metrics)).toBe(50);
  });

  it("derives net margin from revenue and total expenses", () => {
    expect(netMarginPct(metrics)).toBe(0);
  });

  it("derives cash reserve months", () => {
    expect(cashReserveMonths(metrics)).toBeCloseTo(0.18, 2);
  });
});
