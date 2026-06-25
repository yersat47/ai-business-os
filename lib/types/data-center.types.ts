import type { MetricKey } from "@/lib/types/metrics.types";

export type DataSectionId =
  | "finance"
  | "sales"
  | "marketing"
  | "inventory"
  | "team";

export type DataFieldType = "number" | "readonly" | "group_header";

export interface DataFieldConfig {
  id: string;
  metricKey?: MetricKey;
  labelKey: string;
  type: DataFieldType;
  placeholder?: string;
  hintKey?: string;
  infoKey?: string;
  showApproximateNote?: boolean;
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
      {
        id: "monthly_revenue",
        metricKey: "monthly_revenue",
        labelKey: "finance.monthlyRevenue",
        type: "number",
        placeholder: "2 500 000",
        hintKey: "finance.monthlyRevenueHint",
        showApproximateNote: true,
      },
      {
        id: "cogs",
        metricKey: "cogs",
        labelKey: "finance.cogs",
        type: "number",
        placeholder: "1 250 000",
        infoKey: "finance.cogsInfo",
        showApproximateNote: true,
      },
      {
        id: "monthly_rent",
        metricKey: "monthly_rent",
        labelKey: "finance.rent",
        type: "number",
        placeholder: "350 000",
        showApproximateNote: true,
      },
      {
        id: "monthly_payroll",
        metricKey: "monthly_payroll",
        labelKey: "finance.payroll",
        type: "number",
        placeholder: "680 000",
        hintKey: "finance.payrollHint",
        showApproximateNote: true,
      },
      {
        id: "other_monthly_expenses",
        metricKey: "other_monthly_expenses",
        labelKey: "finance.otherExpenses",
        type: "number",
        placeholder: "220 000",
        hintKey: "finance.otherExpensesHint",
        showApproximateNote: true,
      },
      {
        id: "cash_on_hand",
        metricKey: "cash_on_hand",
        labelKey: "finance.cashOnHand",
        type: "number",
        placeholder: "450 000",
        infoKey: "finance.cashOnHandInfo",
        showApproximateNote: true,
      },
      {
        id: "revenue_prior_month",
        metricKey: "revenue_prior_month",
        labelKey: "finance.revenuePriorMonth",
        type: "number",
        placeholder: "2 300 000",
        hintKey: "finance.revenuePriorMonthHint",
        showApproximateNote: true,
      },
    ],
  },
  {
    id: "sales",
    titleKey: "sales.title",
    descriptionKey: "sales.description",
    fieldKeys: [
      {
        id: "monthly_transactions",
        metricKey: "monthly_transactions",
        labelKey: "sales.transactions",
        type: "number",
        placeholder: "180",
        hintKey: "sales.transactionsHint",
        showApproximateNote: true,
      },
      {
        id: "store_visitors",
        metricKey: "store_visitors",
        labelKey: "sales.visitors",
        type: "number",
        placeholder: "600",
        hintKey: "sales.visitorsHint",
        showApproximateNote: true,
      },
      {
        id: "repeat_customers",
        metricKey: "repeat_customers",
        labelKey: "sales.repeatCustomers",
        type: "number",
        placeholder: "45",
        hintKey: "sales.repeatCustomersHint",
        showApproximateNote: true,
      },
      {
        id: "new_customers_monthly",
        metricKey: "new_customers_monthly",
        labelKey: "sales.newCustomers",
        type: "number",
        placeholder: "40",
        hintKey: "sales.newCustomersHint",
        showApproximateNote: true,
      },
      {
        id: "items_per_purchase",
        metricKey: "items_per_purchase",
        labelKey: "sales.itemsPerPurchase",
        type: "number",
        placeholder: "2",
        hintKey: "sales.itemsPerPurchaseHint",
        showApproximateNote: true,
      },
      {
        id: "weekday_split_group",
        labelKey: "sales.weekdaySplitGroup",
        type: "group_header",
        hintKey: "sales.weekdaySplitGroupHint",
      },
      {
        id: "weekday_revenue",
        metricKey: "weekday_revenue",
        labelKey: "sales.weekdayRevenue",
        type: "number",
        placeholder: "1 800 000",
        hintKey: "sales.weekdayRevenueHint",
        showApproximateNote: true,
      },
      {
        id: "weekend_revenue",
        metricKey: "weekend_revenue",
        labelKey: "sales.weekendRevenue",
        type: "number",
        placeholder: "700 000",
        hintKey: "sales.weekendRevenueHint",
        showApproximateNote: true,
      },
    ],
  },
  {
    id: "marketing",
    titleKey: "marketing.title",
    descriptionKey: "marketing.description",
    fieldKeys: [
      {
        id: "marketing_spend",
        metricKey: "marketing_spend",
        labelKey: "marketing.spend",
        type: "number",
        placeholder: "250 000",
        hintKey: "marketing.spendHint",
        showApproximateNote: true,
      },
      {
        id: "ad_revenue",
        metricKey: "ad_revenue",
        labelKey: "marketing.adSales",
        type: "number",
        placeholder: "800 000",
        hintKey: "marketing.adSalesHint",
        showApproximateNote: true,
      },
    ],
  },
  {
    id: "inventory",
    titleKey: "inventory.title",
    descriptionKey: "inventory.description",
    fieldKeys: [
      {
        id: "total_inventory_value",
        metricKey: "total_inventory_value",
        labelKey: "inventory.totalValue",
        type: "number",
        placeholder: "3 500 000",
        hintKey: "inventory.totalValueHint",
        showApproximateNote: true,
      },
      {
        id: "dead_stock_value",
        metricKey: "dead_stock_value",
        labelKey: "inventory.deadStock",
        type: "number",
        placeholder: "1 100 000",
        hintKey: "inventory.deadStockHint",
        showApproximateNote: true,
      },
      {
        id: "sku_count",
        metricKey: "sku_count",
        labelKey: "inventory.skuCount",
        type: "number",
        placeholder: "280",
        hintKey: "inventory.skuCountHint",
        showApproximateNote: true,
      },
    ],
  },
  {
    id: "team",
    titleKey: "team.title",
    descriptionKey: "team.description",
    fieldKeys: [
      {
        id: "employee_count",
        labelKey: "team.employeeCount",
        type: "readonly",
        sourceStore: "company.employeeCount",
      },
      {
        id: "sales_staff_count",
        metricKey: "sales_staff_count",
        labelKey: "team.salesStaff",
        type: "number",
        placeholder: "4",
        hintKey: "team.salesStaffHint",
        showApproximateNote: true,
      },
      {
        id: "employees_left_quarter",
        metricKey: "employees_left_quarter",
        labelKey: "team.employeesLeft",
        type: "number",
        placeholder: "1",
        hintKey: "team.employeesLeftHint",
        showApproximateNote: true,
      },
    ],
  },
];

export const DERIVED_METRIC_LABELS = [
  "gross_margin",
  "net_margin",
  "conversion_rate",
  "cac",
  "roas",
  "repeat_rate",
  "staff_turnover",
] as const;
