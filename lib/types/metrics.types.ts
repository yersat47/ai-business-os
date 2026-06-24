export type MetricKey =
  | "monthly_revenue"
  | "revenue_prior_month"
  | "monthly_transactions"
  | "repeat_customers"
  | "new_customers_monthly"
  | "cogs"
  | "marketing_spend"
  | "ad_revenue"
  | "dead_stock_value"
  | "total_inventory_value"
  | "cash_on_hand"
  | "monthly_rent"
  | "monthly_expenses"
  | "payroll"
  | "sku_count"
  | "sales_staff_count"
  | "staff_turnover"
  | "upt";

export type BusinessMetrics = Partial<Record<MetricKey, number>>;

export interface HealthTimelineEntry {
  monthKey: string;
  date: string;
  masterScoreBefore: number | null;
  masterScoreAfter: number;
  delta: number;
  linkedPillars: string[];
}
