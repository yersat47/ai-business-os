import type { BusinessMetrics, MetricKey } from "@/lib/types/metrics.types";

function num(value: number | undefined): number | null {
  return value !== undefined && Number.isFinite(value) ? value : null;
}

/** Operating expenses excluding COGS (rent + payroll + other). */
export function operatingExpenses(metrics: BusinessMetrics): number | null {
  const rent = num(metrics.monthly_rent) ?? 0;
  const payroll = num(metrics.monthly_payroll) ?? 0;
  const other = num(metrics.other_monthly_expenses) ?? 0;
  if (rent === 0 && payroll === 0 && other === 0) return null;
  return rent + payroll + other;
}

/** Total expenses = COGS + rent + payroll + other (no double-counting). */
export function totalMonthlyExpenses(metrics: BusinessMetrics): number | null {
  const cogs = num(metrics.cogs);
  const operating = operatingExpenses(metrics);
  if (cogs === null && operating === null) return null;
  return (cogs ?? 0) + (operating ?? 0);
}

export function grossMarginPct(metrics: BusinessMetrics): number | null {
  const revenue = num(metrics.monthly_revenue);
  const cogs = num(metrics.cogs);
  if (revenue === null || cogs === null || revenue <= 0) return null;
  return ((revenue - cogs) / revenue) * 100;
}

export function netMarginPct(metrics: BusinessMetrics): number | null {
  const revenue = num(metrics.monthly_revenue);
  const total = totalMonthlyExpenses(metrics);
  if (revenue === null || total === null || revenue <= 0) return null;
  return ((revenue - total) / revenue) * 100;
}

export function averageOrderValue(metrics: BusinessMetrics): number | null {
  const revenue = num(metrics.monthly_revenue);
  const tx = num(metrics.monthly_transactions);
  if (revenue === null || tx === null || tx <= 0) return null;
  return revenue / tx;
}

export function conversionRate(metrics: BusinessMetrics): number | null {
  const visitors = num(metrics.store_visitors);
  const tx = num(metrics.monthly_transactions);
  if (visitors === null || tx === null || visitors <= 0) return null;
  return (tx / visitors) * 100;
}

export function repeatCustomerRate(metrics: BusinessMetrics): number | null {
  const repeat = num(metrics.repeat_customers);
  const newCust = num(metrics.new_customers_monthly);
  if (repeat === null || newCust === null) return null;
  const total = repeat + newCust;
  if (total <= 0) return null;
  return (repeat / total) * 100;
}

export function cac(metrics: BusinessMetrics): number | null {
  const spend = num(metrics.marketing_spend);
  const newCust = num(metrics.new_customers_monthly);
  if (spend === null || newCust === null || newCust <= 0) return null;
  return spend / newCust;
}

export function roas(metrics: BusinessMetrics): number | null {
  const adRev = num(metrics.ad_revenue);
  const spend = num(metrics.marketing_spend);
  if (adRev === null || spend === null || spend <= 0) return null;
  return adRev / spend;
}

export function deadStockPct(metrics: BusinessMetrics): number | null {
  const dead = num(metrics.dead_stock_value);
  const total = num(metrics.total_inventory_value);
  if (dead === null || total === null || total <= 0) return null;
  return (dead / total) * 100;
}

export function revenueGrowthMom(metrics: BusinessMetrics): number | null {
  const current = num(metrics.monthly_revenue);
  const prior = num(metrics.revenue_prior_month);
  if (current === null || prior === null || prior <= 0) return null;
  return ((current - prior) / prior) * 100;
}

export function cashReserveMonths(metrics: BusinessMetrics): number | null {
  const cash = num(metrics.cash_on_hand);
  const total = totalMonthlyExpenses(metrics);
  if (cash === null || total === null || total <= 0) return null;
  return cash / total;
}

export function expenseRatio(metrics: BusinessMetrics): number | null {
  const revenue = num(metrics.monthly_revenue);
  const total = totalMonthlyExpenses(metrics);
  if (revenue === null || total === null || revenue <= 0) return null;
  return (total / revenue) * 100;
}

export function staffTurnoverPct(
  metrics: BusinessMetrics,
  employeeCount?: number
): number | null {
  const left = num(metrics.employees_left_quarter);
  const count = employeeCount ?? num(metrics.sales_staff_count);
  if (left === null || count === null || count <= 0) return null;
  return (left / count) * 100 * 4;
}

export const REQUIRED_METRIC_KEYS = [
  "monthly_revenue",
  "cogs",
  "marketing_spend",
  "dead_stock_value",
  "total_inventory_value",
] as const;

export function dataCompletenessPct(metrics: BusinessMetrics): number {
  const allKeys: MetricKey[] = [
    "monthly_revenue",
    "revenue_prior_month",
    "cogs",
    "monthly_rent",
    "monthly_payroll",
    "other_monthly_expenses",
    "cash_on_hand",
    "monthly_transactions",
    "store_visitors",
    "repeat_customers",
    "new_customers_monthly",
    "items_per_purchase",
    "marketing_spend",
    "ad_revenue",
    "dead_stock_value",
    "total_inventory_value",
    "sku_count",
    "sales_staff_count",
    "employees_left_quarter",
  ];

  const filled = allKeys.filter(
    (key) => metrics[key] !== undefined && metrics[key]! > 0
  ).length;
  return Math.round((filled / allKeys.length) * 100);
}
