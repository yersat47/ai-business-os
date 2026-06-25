import type { BusinessMetrics, MetricKey } from "@/lib/types/metrics.types";
import type { FormulaTraceResult, TraceResultFormat } from "@/lib/calculation/trace.types";
import {
  grossMarginPct,
  netMarginPct,
  totalMonthlyExpenses,
  operatingExpenses,
  cashReserveMonths,
  expenseRatio,
  averageOrderValue,
  conversionRate,
  repeatCustomerRate,
  cac,
  roas,
  deadStockPct,
  revenueGrowthMom,
  staffTurnoverPct,
  rentShareOfExpenses,
} from "@/lib/profit-engine/formulas";

export interface FormulaDefinition {
  id: string;
  labelKey: string;
  requiredKeys: MetricKey[];
  compute: (metrics: BusinessMetrics) => FormulaTraceResult;
}

function num(value: number | undefined): number | null {
  return value !== undefined && Number.isFinite(value) ? value : null;
}

function pickInputs(
  metrics: BusinessMetrics,
  keys: MetricKey[]
): Partial<Record<MetricKey, number>> {
  const inputs: Partial<Record<MetricKey, number>> = {};
  for (const key of keys) {
    const value = num(metrics[key]);
    if (value !== null) inputs[key] = value;
  }
  return inputs;
}

function trace(
  metrics: BusinessMetrics,
  keys: MetricKey[],
  labelKey: string,
  value: number | null,
  resultFormat: TraceResultFormat,
  severity?: "critical" | "warning" | null
): FormulaTraceResult {
  return {
    value,
    trace: {
      inputs: pickInputs(metrics, keys),
      labelKey,
      resultFormat,
      severity,
    },
  };
}

function cashSeverity(months: number | null): "critical" | "warning" | null {
  if (months === null) return null;
  if (months < 1) return "critical";
  if (months < 3) return "warning";
  return null;
}

export const FORMULA_MANIFEST: FormulaDefinition[] = [
  {
    id: "gross_margin",
    labelKey: "formulas.grossMargin",
    requiredKeys: ["monthly_revenue", "cogs"],
    compute: (m) =>
      trace(
        m,
        ["monthly_revenue", "cogs"],
        "formulas.grossMargin",
        grossMarginPct(m),
        "percent"
      ),
  },
  {
    id: "net_margin",
    labelKey: "formulas.netMargin",
    requiredKeys: ["monthly_revenue", "cogs"],
    compute: (m) => {
      const keys: MetricKey[] = ["monthly_revenue", "cogs"];
      if (num(m.monthly_rent) !== null) keys.push("monthly_rent");
      if (num(m.monthly_payroll) !== null) keys.push("monthly_payroll");
      if (num(m.other_monthly_expenses) !== null) keys.push("other_monthly_expenses");
      return trace(m, keys, "formulas.netMargin", netMarginPct(m), "percent");
    },
  },
  {
    id: "total_expenses",
    labelKey: "formulas.totalExpenses",
    requiredKeys: ["cogs"],
    compute: (m) => {
      const keys: MetricKey[] = ["cogs"];
      if (num(m.monthly_rent) !== null) keys.push("monthly_rent");
      if (num(m.monthly_payroll) !== null) keys.push("monthly_payroll");
      if (num(m.other_monthly_expenses) !== null) keys.push("other_monthly_expenses");
      return trace(m, keys, "formulas.totalExpenses", totalMonthlyExpenses(m), "currency");
    },
  },
  {
    id: "rent_share",
    labelKey: "formulas.rentShare",
    requiredKeys: ["monthly_rent", "cogs"],
    compute: (m) =>
      trace(
        m,
        ["monthly_rent", "cogs", "monthly_payroll", "other_monthly_expenses"],
        "formulas.rentShare",
        rentShareOfExpenses(m),
        "percent"
      ),
  },
  {
    id: "cash_reserve",
    labelKey: "formulas.cashReserve",
    requiredKeys: ["cash_on_hand", "cogs"],
    compute: (m) => {
      const months = cashReserveMonths(m);
      return trace(
        m,
        ["cash_on_hand", "cogs", "monthly_rent", "monthly_payroll", "other_monthly_expenses"],
        "formulas.cashReserve",
        months,
        "months",
        cashSeverity(months)
      );
    },
  },
  {
    id: "expense_ratio",
    labelKey: "formulas.expenseRatio",
    requiredKeys: ["monthly_revenue", "cogs"],
    compute: (m) =>
      trace(
        m,
        ["monthly_revenue", "cogs", "monthly_rent", "monthly_payroll", "other_monthly_expenses"],
        "formulas.expenseRatio",
        expenseRatio(m),
        "percent"
      ),
  },
  {
    id: "revenue_growth",
    labelKey: "formulas.revenueGrowth",
    requiredKeys: ["monthly_revenue", "revenue_prior_month"],
    compute: (m) =>
      trace(
        m,
        ["monthly_revenue", "revenue_prior_month"],
        "formulas.revenueGrowth",
        revenueGrowthMom(m),
        "percent"
      ),
  },
  {
    id: "average_order_value",
    labelKey: "formulas.aov",
    requiredKeys: ["monthly_revenue", "monthly_transactions"],
    compute: (m) =>
      trace(
        m,
        ["monthly_revenue", "monthly_transactions"],
        "formulas.aov",
        averageOrderValue(m),
        "currency"
      ),
  },
  {
    id: "conversion_rate",
    labelKey: "formulas.conversion",
    requiredKeys: ["store_visitors", "monthly_transactions"],
    compute: (m) =>
      trace(
        m,
        ["store_visitors", "monthly_transactions"],
        "formulas.conversion",
        conversionRate(m),
        "percent"
      ),
  },
  {
    id: "repeat_customer_rate",
    labelKey: "formulas.repeatRate",
    requiredKeys: ["repeat_customers", "new_customers_monthly"],
    compute: (m) =>
      trace(
        m,
        ["repeat_customers", "new_customers_monthly"],
        "formulas.repeatRate",
        repeatCustomerRate(m),
        "percent"
      ),
  },
  {
    id: "cac",
    labelKey: "formulas.cac",
    requiredKeys: ["marketing_spend", "new_customers_monthly"],
    compute: (m) =>
      trace(
        m,
        ["marketing_spend", "new_customers_monthly"],
        "formulas.cac",
        cac(m),
        "currency"
      ),
  },
  {
    id: "roas",
    labelKey: "formulas.roas",
    requiredKeys: ["ad_revenue", "marketing_spend"],
    compute: (m) =>
      trace(m, ["ad_revenue", "marketing_spend"], "formulas.roas", roas(m), "ratio"),
  },
  {
    id: "dead_stock",
    labelKey: "formulas.deadStock",
    requiredKeys: ["dead_stock_value", "total_inventory_value"],
    compute: (m) =>
      trace(
        m,
        ["dead_stock_value", "total_inventory_value"],
        "formulas.deadStock",
        deadStockPct(m),
        "percent"
      ),
  },
  {
    id: "staff_turnover",
    labelKey: "formulas.staffTurnover",
    requiredKeys: ["employees_left_quarter", "sales_staff_count"],
    compute: (m) =>
      trace(
        m,
        ["employees_left_quarter", "sales_staff_count"],
        "formulas.staffTurnover",
        staffTurnoverPct(m),
        "percent"
      ),
  },
  {
    id: "operating_expenses",
    labelKey: "formulas.operatingExpenses",
    requiredKeys: ["monthly_rent"],
    compute: (m) => {
      const keys: MetricKey[] = [];
      if (num(m.monthly_rent) !== null) keys.push("monthly_rent");
      if (num(m.monthly_payroll) !== null) keys.push("monthly_payroll");
      if (num(m.other_monthly_expenses) !== null) keys.push("other_monthly_expenses");
      return trace(m, keys, "formulas.operatingExpenses", operatingExpenses(m), "currency");
    },
  },
];
