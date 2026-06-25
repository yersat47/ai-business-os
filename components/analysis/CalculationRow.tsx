"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CalculationTraceRow } from "@/lib/calculation/trace.types";
import type { MetricKey } from "@/lib/types/metrics.types";
import { formatCurrency } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";

interface CalculationRowProps {
  row: CalculationTraceRow;
}

function formatMetricValue(value: number, key: MetricKey): string {
  const currencyKeys: MetricKey[] = [
    "monthly_revenue",
    "revenue_prior_month",
    "cogs",
    "monthly_rent",
    "monthly_payroll",
    "other_monthly_expenses",
    "cash_on_hand",
    "marketing_spend",
    "ad_revenue",
    "dead_stock_value",
    "total_inventory_value",
  ];
  if (currencyKeys.includes(key)) return formatCurrency(value);
  return value.toLocaleString("en-US");
}

function formatResult(
  value: number,
  format: CalculationTraceRow["resultFormat"],
  monthsLabel: string
): string {
  switch (format) {
    case "currency":
      return formatCurrency(value);
    case "percent":
      return `${value.toFixed(1)}%`;
    case "months":
      return `${value.toFixed(1)} ${monthsLabel}`;
    case "ratio":
      return `${value.toFixed(2)}×`;
    default:
      return value.toLocaleString("en-US");
  }
}

export function CalculationRow({ row }: CalculationRowProps) {
  const t = useTranslations("data.analysis");
  const tMetrics = useTranslations("data.analysis.metrics");

  const inputParts = row.inputKeys
    .filter((key) => row.inputValues[key] !== undefined)
    .map((key) => `${tMetrics(key)}: ${formatMetricValue(row.inputValues[key]!, key)}`);

  if (row.status === "skipped") {
    const missingLabels = (row.missingKeys ?? []).map((key) => tMetrics(key));
    return (
      <div className="flex flex-col gap-2 rounded-xl border border-border/60 bg-surface-raised/50 p-3 md:flex-row md:items-center md:gap-4 md:p-4">
        <div className="min-w-0 flex-1 text-sm text-text-muted">
          {inputParts.length > 0 ? inputParts.join(", ") : t("notCalculated")}
        </div>
        <ArrowRight className="hidden h-4 w-4 shrink-0 text-text-muted md:block" />
        <div className="min-w-0 flex-1 text-sm text-warning">
          {t("skippedLabel", { fields: missingLabels.join(", ") })}
        </div>
      </div>
    );
  }

  const severityLabel =
    row.severity === "critical"
      ? t("severityCritical")
      : row.severity === "warning"
        ? t("severityWarning")
        : null;

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-3 md:flex-row md:items-center md:gap-4 md:p-4">
      <div className="min-w-0 flex-1 text-sm text-text-secondary">
        {inputParts.join(", ")}
      </div>
      <ArrowRight className="hidden h-4 w-4 shrink-0 text-accent md:block" />
      <div
        className={cn(
          "min-w-0 flex-1 text-sm font-medium",
          row.severity === "critical" && "text-danger",
          row.severity === "warning" && "text-warning",
          !row.severity && "text-text-primary"
        )}
      >
        {t(row.labelKey)}: {formatResult(row.resultValue!, row.resultFormat, t("monthsUnit"))}
        {severityLabel && (
          <span className="ml-1 text-xs uppercase tracking-wide">({severityLabel})</span>
        )}
      </div>
    </div>
  );
}
