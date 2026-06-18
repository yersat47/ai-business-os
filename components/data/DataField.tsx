"use client";

import { useTranslations } from "next-intl";
import { HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { DataFieldConfig } from "@/lib/types/data-center.types";
import { useCompanyStore } from "@/lib/stores/company.store";
import { useEmployeesStore } from "@/lib/stores/employees.store";

interface DataFieldProps {
  field: DataFieldConfig;
  value: string;
  onChange: (value: string) => void;
}

export function DataField({ field, value, onChange }: DataFieldProps) {
  const t = useTranslations("data.center.fields");
  const tData = useTranslations("data");

  const label = t(field.labelKey as "finance.revenue");
  const hint = field.hintKey
    ? t(field.hintKey as "inventory.inventoryValueHint")
    : undefined;

  const company = useCompanyStore((s) => s.company);
  const employeeCount = useEmployeesStore(
    (s) => s.employees.filter((e) => e.isActive).length
  );

  const readonlyValue =
    field.sourceStore === "company.employeeCount"
      ? String(company.employeeCount || employeeCount || "—")
      : "—";

  return (
    <div>
      <div className="flex items-center gap-1 mb-1">
        <Label className="text-sm font-normal">{label}</Label>
        {hint && (
          <Tooltip>
            <TooltipTrigger type="button">
              <HelpCircle size={13} className="text-text-muted" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">{hint}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      {field.type === "readonly" ? (
        <div className="flex min-h-[52px] items-center gap-2 rounded-md border border-border bg-surface-raised px-3 py-2 text-sm">
          <span className="font-mono">{readonlyValue}</span>
          <span className="text-text-muted text-xs">
            ({tData("center.fromProfile")})
          </span>
        </div>
      ) : (
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[52px] font-mono text-base"
        />
      )}
    </div>
  );
}
