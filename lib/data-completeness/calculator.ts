import type { BusinessMetrics, MetricKey } from "@/lib/types/metrics.types";
import { dataCompletenessPct } from "@/lib/profit-engine/formulas";
import type { DataCompletenessResult, MissingField, QuickWin } from "@/lib/data-completeness/types";

const FIELD_CATALOG: Record<MetricKey, Omit<MissingField, "field_key"> & { quickWinMinutes: number }> = {
  monthly_revenue: {
    display_name: "Выручка за месяц",
    impact_on_advice_quality: "high",
    integration_source: "manual",
    quickWinMinutes: 2,
  },
  revenue_prior_month: {
    display_name: "Выручка за прошлый месяц",
    impact_on_advice_quality: "medium",
    integration_source: "manual",
    quickWinMinutes: 2,
  },
  monthly_transactions: {
    display_name: "Количество покупок за месяц",
    impact_on_advice_quality: "medium",
    integration_source: "manual",
    quickWinMinutes: 3,
  },
  store_visitors: {
    display_name: "Трафик (посетители магазина)",
    impact_on_advice_quality: "high",
    integration_source: "manual",
    quickWinMinutes: 3,
  },
  repeat_customers: {
    display_name: "Повторные клиенты за месяц",
    impact_on_advice_quality: "medium",
    integration_source: "manual",
    quickWinMinutes: 3,
  },
  new_customers_monthly: {
    display_name: "Новые клиенты за месяц",
    impact_on_advice_quality: "medium",
    integration_source: "manual",
    quickWinMinutes: 3,
  },
  items_per_purchase: {
    display_name: "Товаров в среднем в чеке",
    impact_on_advice_quality: "low",
    integration_source: "manual",
    quickWinMinutes: 2,
  },
  cogs: {
    display_name: "Закупочная стоимость (COGS)",
    impact_on_advice_quality: "high",
    integration_source: "manual",
    quickWinMinutes: 5,
  },
  marketing_spend: {
    display_name: "Расходы на рекламу (Instagram и др.)",
    impact_on_advice_quality: "high",
    integration_source: "instagram",
    quickWinMinutes: 4,
  },
  ad_revenue: {
    display_name: "Выручка с рекламы",
    impact_on_advice_quality: "medium",
    integration_source: "instagram",
    quickWinMinutes: 4,
  },
  dead_stock_value: {
    display_name: "Залежалый товар (стоимость)",
    impact_on_advice_quality: "medium",
    integration_source: "manual",
    quickWinMinutes: 4,
  },
  total_inventory_value: {
    display_name: "Общий товарный запас (стоимость)",
    impact_on_advice_quality: "medium",
    integration_source: "manual",
    quickWinMinutes: 4,
  },
  cash_on_hand: {
    display_name: "Денег в кассе / на счету",
    impact_on_advice_quality: "high",
    integration_source: "manual",
    quickWinMinutes: 3,
  },
  monthly_rent: {
    display_name: "Аренда в месяц",
    impact_on_advice_quality: "high",
    integration_source: "manual",
    quickWinMinutes: 3,
  },
  monthly_payroll: {
    display_name: "Зарплаты в месяц",
    impact_on_advice_quality: "high",
    integration_source: "manual",
    quickWinMinutes: 4,
  },
  other_monthly_expenses: {
    display_name: "Прочие расходы в месяц",
    impact_on_advice_quality: "medium",
    integration_source: "manual",
    quickWinMinutes: 4,
  },
  sku_count: {
    display_name: "SKU (кол-во позиций)",
    impact_on_advice_quality: "low",
    integration_source: "manual",
    quickWinMinutes: 3,
  },
  sales_staff_count: {
    display_name: "Сотрудников в продажах",
    impact_on_advice_quality: "low",
    integration_source: "manual",
    quickWinMinutes: 2,
  },
  employees_left_quarter: {
    display_name: "Уволилось за квартал",
    impact_on_advice_quality: "low",
    integration_source: "manual",
    quickWinMinutes: 2,
  },
  weekday_revenue: {
    display_name: "Выручка в будни",
    impact_on_advice_quality: "low",
    integration_source: "manual",
    quickWinMinutes: 3,
  },
  weekend_revenue: {
    display_name: "Выручка в выходные",
    impact_on_advice_quality: "low",
    integration_source: "manual",
    quickWinMinutes: 3,
  },
};

function isFilled(metrics: BusinessMetrics, key: MetricKey): boolean {
  const v = metrics[key];
  return v !== undefined && v > 0;
}

function impactRank(impact: MissingField["impact_on_advice_quality"]): number {
  return impact === "high" ? 3 : impact === "medium" ? 2 : 1;
}

export function calculateDataCompleteness(metrics: BusinessMetrics): DataCompletenessResult {
  const overall_percent = dataCompletenessPct(metrics);

  const missing_fields: MissingField[] = (Object.keys(FIELD_CATALOG) as MetricKey[])
    .filter((k) => !isFilled(metrics, k))
    .map((k) => ({
      field_key: k,
      display_name: FIELD_CATALOG[k].display_name,
      impact_on_advice_quality: FIELD_CATALOG[k].impact_on_advice_quality,
      integration_source: FIELD_CATALOG[k].integration_source,
    }))
    .sort((a, b) => impactRank(b.impact_on_advice_quality) - impactRank(a.impact_on_advice_quality));

  const quick_wins: QuickWin[] = missing_fields
    .slice()
    .sort((a, b) => {
      const aMeta = FIELD_CATALOG[a.field_key];
      const bMeta = FIELD_CATALOG[b.field_key];
      const impact = impactRank(b.impact_on_advice_quality) - impactRank(a.impact_on_advice_quality);
      if (impact !== 0) return impact;
      return aMeta.quickWinMinutes - bMeta.quickWinMinutes;
    })
    .slice(0, 3)
    .map((f) => ({
      field_key: f.field_key,
      display_name: f.display_name,
      estimated_time_to_add_minutes: FIELD_CATALOG[f.field_key].quickWinMinutes,
    }));

  return { overall_percent, missing_fields, quick_wins };
}

