import type { BusinessMetrics } from "@/lib/types/metrics.types";

function num(value: number | undefined): number | null {
  return value !== undefined && Number.isFinite(value) ? value : null;
}

export function grossMarginPct(metrics: BusinessMetrics): number | null {
  const revenue = num(metrics.monthly_revenue);
  const cogs = num(metrics.cogs);
  if (revenue === null || cogs === null || revenue <= 0) return null;
  return ((revenue - cogs) / revenue) * 100;
}

export function netMarginPct(metrics: BusinessMetrics): number | null {
  const revenue = num(metrics.monthly_revenue);
  const cogs = num(metrics.cogs);
  const expenses = num(metrics.monthly_expenses);
  if (revenue === null || cogs === null || expenses === null || revenue <= 0) return null;
  return ((revenue - cogs - expenses) / revenue) * 100;
}

export function averageOrderValue(metrics: BusinessMetrics): number | null {
  const revenue = num(metrics.monthly_revenue);
  const tx = num(metrics.monthly_transactions);
  if (revenue === null || tx === null || tx <= 0) return null;
  return revenue / tx;
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
  const expenses = num(metrics.monthly_expenses);
  if (cash === null || expenses === null || expenses <= 0) return null;
  return cash / expenses;
}

export function expenseRatio(metrics: BusinessMetrics): number | null {
  const revenue = num(metrics.monthly_revenue);
  const expenses = num(metrics.monthly_expenses);
  if (revenue === null || expenses === null || revenue <= 0) return null;
  return (expenses / revenue) * 100;
}

export const REQUIRED_METRIC_KEYS = [
  "monthly_revenue",
  "revenue_prior_month",
  "monthly_transactions",
  "cogs",
  "marketing_spend",
  "dead_stock_value",
  "total_inventory_value",
] as const;

export function dataCompletenessPct(metrics: BusinessMetrics): number {
  const allKeys = [
    "monthly_revenue",
    "revenue_prior_month",
    "monthly_transactions",
    "repeat_customers",
    "new_customers_monthly",
    "cogs",
    "marketing_spend",
    "ad_revenue",
    "dead_stock_value",
    "total_inventory_value",
    "cash_on_hand",
    "monthly_rent",
    "monthly_expenses",
    "payroll",
    "sku_count",
    "sales_staff_count",
    "staff_turnover",
  ] as const;

  const filled = allKeys.filter((key) => metrics[key] !== undefined && metrics[key]! > 0).length;
  return Math.round((filled / allKeys.length) * 100);
}
