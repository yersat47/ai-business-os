import type { MetricKey } from "@/lib/types/metrics.types";

export type DataSectionId =
  | "finance"
  | "sales"
  | "marketing"
  | "inventory"
  | "team";

export type DataFieldType = "number" | "readonly";

export interface DataFieldConfig {
  id: string;
  metricKey?: MetricKey;
  labelKey: string;
  type: DataFieldType;
  placeholder?: string;
  hintKey?: string;
  sourceStore?: "company.employeeCount";
}

export interface DataSectionConfig {
  id: DataSectionId;
  titleKey: string;
  descriptionKey: string;
  fieldKeys: DataFieldConfig[];
}

export const DATA_SECTION_CONFIGS: DataSectionConfig[] = [
  {
    id: "finance",
    titleKey: "finance.title",
    descriptionKey: "finance.description",
    fieldKeys: [
      { id: "monthly_revenue", metricKey: "monthly_revenue", labelKey: "finance.monthlyRevenue", type: "number", placeholder: "8 450 000", hintKey: "finance.monthlyRevenueHint" },
      { id: "revenue_prior_month", metricKey: "revenue_prior_month", labelKey: "finance.revenuePriorMonth", type: "number", placeholder: "7 900 000", hintKey: "finance.revenuePriorMonthHint" },
      { id: "cogs", metricKey: "cogs", labelKey: "finance.cogs", type: "number", placeholder: "4 200 000", hintKey: "finance.cogsHint" },
      { id: "monthly_expenses", metricKey: "monthly_expenses", labelKey: "finance.monthlyExpenses", type: "number", placeholder: "1 800 000", hintKey: "finance.monthlyExpensesHint" },
      { id: "monthly_rent", metricKey: "monthly_rent", labelKey: "finance.rent", type: "number", placeholder: "350 000", hintKey: "finance.rentHint" },
      { id: "payroll", metricKey: "payroll", labelKey: "finance.payroll", type: "number", placeholder: "680 000", hintKey: "finance.payrollHint" },
      { id: "cash_on_hand", metricKey: "cash_on_hand", labelKey: "finance.cashOnHand", type: "number", placeholder: "2 100 000", hintKey: "finance.cashOnHandHint" },
    ],
  },
  {
    id: "sales",
    titleKey: "sales.title",
    descriptionKey: "sales.description",
    fieldKeys: [
      { id: "monthly_transactions", metricKey: "monthly_transactions", labelKey: "sales.monthlyTransactions", type: "number", placeholder: "420", hintKey: "sales.monthlyTransactionsHint" },
      { id: "repeat_customers", metricKey: "repeat_customers", labelKey: "sales.repeatCustomers", type: "number", placeholder: "95", hintKey: "sales.repeatCustomersHint" },
      { id: "new_customers_monthly", metricKey: "new_customers_monthly", labelKey: "sales.newCustomersMonthly", type: "number", placeholder: "55", hintKey: "sales.newCustomersMonthlyHint" },
      { id: "upt", metricKey: "upt", labelKey: "sales.upt", type: "number", placeholder: "1.8", hintKey: "sales.uptHint" },
    ],
  },
  {
    id: "marketing",
    titleKey: "marketing.title",
    descriptionKey: "marketing.description",
    fieldKeys: [
      { id: "marketing_spend", metricKey: "marketing_spend", labelKey: "marketing.adSpend", type: "number", placeholder: "250 000", hintKey: "marketing.adSpendHint" },
      { id: "ad_revenue", metricKey: "ad_revenue", labelKey: "marketing.adRevenue", type: "number", placeholder: "800 000", hintKey: "marketing.adRevenueHint" },
    ],
  },
  {
    id: "inventory",
    titleKey: "inventory.title",
    descriptionKey: "inventory.description",
    fieldKeys: [
      { id: "total_inventory_value", metricKey: "total_inventory_value", labelKey: "inventory.totalInventoryValue", type: "number", placeholder: "3 500 000", hintKey: "inventory.totalInventoryValueHint" },
      { id: "dead_stock_value", metricKey: "dead_stock_value", labelKey: "inventory.deadStockValue", type: "number", placeholder: "1 100 000", hintKey: "inventory.deadStockValueHint" },
      { id: "sku_count", metricKey: "sku_count", labelKey: "inventory.skuCount", type: "number", placeholder: "280", hintKey: "inventory.skuCountHint" },
    ],
  },
  {
    id: "team",
    titleKey: "team.title",
    descriptionKey: "team.description",
    fieldKeys: [
      { id: "employee_count", labelKey: "team.employeeCount", type: "readonly", sourceStore: "company.employeeCount" },
      { id: "sales_staff_count", metricKey: "sales_staff_count", labelKey: "team.salesStaffCount", type: "number", placeholder: "4", hintKey: "team.salesStaffCountHint" },
      { id: "staff_turnover", metricKey: "staff_turnover", labelKey: "team.staffTurnover", type: "number", placeholder: "25", hintKey: "team.staffTurnoverHint" },
    ],
  },
];

export const DERIVED_METRIC_LABELS = [
  "gross_margin",
  "net_margin",
  "avg_order_value",
  "conversion_rate",
  "cac",
  "roas",
  "repeat_rate",
  "inventory_turnover",
  "dead_stock_pct",
] as const;
