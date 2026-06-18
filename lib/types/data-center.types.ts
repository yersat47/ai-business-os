export type DataSectionId =
  | "finance"
  | "sales"
  | "marketing"
  | "inventory"
  | "team";

export type DataFieldType = "number" | "readonly";

export interface DataFieldConfig {
  id: string;
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
      { id: "revenue", labelKey: "finance.revenue", type: "number", placeholder: "2 500 000" },
      { id: "gross_margin", labelKey: "finance.grossMargin", type: "number", placeholder: "50" },
      { id: "net_margin", labelKey: "finance.netMargin", type: "number", placeholder: "15" },
      { id: "monthly_expenses", labelKey: "finance.monthlyExpenses", type: "number", placeholder: "1 800 000" },
      { id: "rent", labelKey: "finance.rent", type: "number", placeholder: "350 000" },
      { id: "payroll", labelKey: "finance.payroll", type: "number", placeholder: "680 000" },
      { id: "cash_reserve_months", labelKey: "finance.cashReserveMonths", type: "number", placeholder: "2" },
    ],
  },
  {
    id: "sales",
    titleKey: "sales.title",
    descriptionKey: "sales.description",
    fieldKeys: [
      { id: "monthly_transactions", labelKey: "sales.monthlyTransactions", type: "number", placeholder: "180" },
      { id: "avg_order_value", labelKey: "sales.avgOrderValue", type: "number", placeholder: "15 000" },
      { id: "conversion_rate", labelKey: "sales.conversionRate", type: "number", placeholder: "28" },
      { id: "upt", labelKey: "sales.upt", type: "number", placeholder: "1.8" },
    ],
  },
  {
    id: "marketing",
    titleKey: "marketing.title",
    descriptionKey: "marketing.description",
    fieldKeys: [
      { id: "ad_spend", labelKey: "marketing.adSpend", type: "number", placeholder: "250 000" },
      { id: "cac", labelKey: "marketing.cac", type: "number", placeholder: "5 000" },
      { id: "roas", labelKey: "marketing.roas", type: "number", placeholder: "3.2" },
      { id: "repeat_rate", labelKey: "marketing.repeatRate", type: "number", placeholder: "35" },
      { id: "new_customers_monthly", labelKey: "marketing.newCustomersMonthly", type: "number", placeholder: "40" },
    ],
  },
  {
    id: "inventory",
    titleKey: "inventory.title",
    descriptionKey: "inventory.description",
    fieldKeys: [
      {
        id: "inventory_value",
        labelKey: "inventory.inventoryValue",
        type: "number",
        placeholder: "3 500 000",
        hintKey: "inventory.inventoryValueHint",
      },
      { id: "sku_count", labelKey: "inventory.skuCount", type: "number", placeholder: "280" },
      { id: "inventory_turnover", labelKey: "inventory.turnover", type: "number", placeholder: "4" },
      { id: "dead_stock_pct", labelKey: "inventory.deadStockPct", type: "number", placeholder: "18" },
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
      { id: "sales_staff_count", labelKey: "team.salesStaffCount", type: "number", placeholder: "4" },
      { id: "staff_turnover", labelKey: "team.staffTurnover", type: "number", placeholder: "25" },
    ],
  },
];
