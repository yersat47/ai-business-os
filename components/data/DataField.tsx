"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DataFieldConfig } from "@/lib/types/data-center.types";
import { useCompanyStore } from "@/lib/stores/company.store";
import { useEmployeesStore } from "@/lib/stores/employees.store";
import { useMetricsStore } from "@/lib/stores/metrics.store";
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/utils/formatters";
import { FieldHelp } from "./FieldHelp";

interface DataFieldProps {
  field: DataFieldConfig;
}

function NumericDataInput({
  field,
  metricKey,
}: {
  field: DataFieldConfig;
  metricKey: NonNullable<DataFieldConfig["metricKey"]>;
}) {
  const tData = useTranslations("data");
  const metricValue = useMetricsStore((s) => s.currentMonthMetrics[metricKey]);
  const setMetric = useMetricsStore((s) => s.setMetric);
  const recalculate = useMetricsStore((s) => s.recalculateFromCurrent);

  const [draft, setDraft] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setDraft(
        metricValue !== undefined ? formatCurrencyInput(metricValue) : ""
      );
    }
  }, [metricValue, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    setDraft(
      metricValue !== undefined && metricValue > 0 ? String(metricValue) : ""
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value.replace(/\D/g, ""));
  };

  const handleBlur = () => {
    setIsFocused(false);
    const parsed = draft ? parseCurrencyInput(draft) : undefined;
    setMetric(metricKey, parsed && parsed > 0 ? parsed : undefined);
    recalculate();
    setDraft(parsed ? formatCurrencyInput(parsed) : "");
  };

  const displayValue = isFocused
    ? draft
    : metricValue !== undefined
      ? formatCurrencyInput(metricValue)
      : "";

  return (
    <>
      {field.showApproximateNote && (
        <p className="text-[11px] text-text-muted/80 italic">
          {tData("center.approximateNote")}
        </p>
      )}
      <Input
        type="text"
        inputMode="numeric"
        placeholder={field.placeholder}
        value={displayValue}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        className="min-h-[52px] font-mono text-base"
      />
    </>
  );
}

export function DataField({ field }: DataFieldProps) {
  const t = useTranslations("data.center.fields");
  const tData = useTranslations("data");

  const label = t(field.labelKey as "finance.monthlyRevenue");
  const hint = field.hintKey
    ? t(field.hintKey as "finance.monthlyRevenueHint")
    : undefined;
  const info = field.infoKey
    ? t(field.infoKey as "finance.cogsInfo")
    : undefined;

  const company = useCompanyStore((s) => s.company);
  const employeeCount = useEmployeesStore(
    (s) => s.employees.filter((e) => e.isActive).length
  );

  const readonlyValue =
    field.sourceStore === "company.employeeCount"
      ? String(company.employeeCount || employeeCount || "—")
      : "—";

  if (field.type === "group_header") {
    return (
      <div className="space-y-1.5 rounded-lg border border-border/60 bg-surface-raised/40 p-3 mt-2">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {hint && (
          <p className="text-xs text-text-muted leading-relaxed">{hint}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-start gap-1.5">
        <Label className="text-sm font-normal leading-snug flex-1">
          {label}
        </Label>
        {info && <FieldHelp text={info} className="mt-0.5 shrink-0" />}
      </div>
      {hint && (
        <p className="text-xs text-text-muted leading-relaxed">{hint}</p>
      )}
      {field.type === "readonly" ? (
        <div className="flex min-h-[52px] items-center gap-2 rounded-md border border-border bg-surface-raised px-3 py-2 text-sm">
          <span className="font-mono">{readonlyValue}</span>
          <span className="text-text-muted text-xs">
            ({tData("center.fromProfile")})
          </span>
        </div>
      ) : field.metricKey ? (
        <NumericDataInput field={field} metricKey={field.metricKey} />
      ) : null}
    </div>
  );
}
