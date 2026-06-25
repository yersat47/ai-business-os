"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumericInput } from "@/components/ui/NumericInput";
import { useWizardStore } from "@/lib/stores/wizard.store";

function CurrencyField({
  label,
  value,
  onCommit,
  placeholder,
}: {
  label: string;
  value?: number;
  onCommit: (v: number | undefined) => void;
  placeholder: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative mt-1.5">
        <span className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-text-muted text-sm">
          ₸
        </span>
        <NumericInput
          value={value}
          onCommit={onCommit}
          placeholder={placeholder}
          className="pl-8 font-mono"
        />
      </div>
    </div>
  );
}

export function Step10Numbers() {
  const t = useTranslations("wizard.step10");
  const { wizardData, setStepData } = useWizardStore();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <p className="text-text-secondary mb-2">{t("subtitle")}</p>
      <p className="text-xs text-text-muted mb-8">{t("hint")}</p>
      <div className="space-y-4">
        <CurrencyField
          label={t("monthlyRevenue")}
          value={wizardData.monthlyRevenue}
          onCommit={(v) => setStepData({ monthlyRevenue: v ?? 0 })}
          placeholder="8,450,000"
        />
        <CurrencyField
          label={t("avgOrderValue")}
          value={wizardData.averageOrderValue}
          onCommit={(v) => setStepData({ averageOrderValue: v ?? 0 })}
          placeholder="24,500"
        />
        <CurrencyField
          label={t("marketingSpend")}
          value={wizardData.marketingSpend}
          onCommit={(v) => setStepData({ marketingSpend: v ?? 0 })}
          placeholder="620,000"
        />
        <CurrencyField
          label={t("inventoryValue")}
          value={wizardData.inventoryValue}
          onCommit={(v) => setStepData({ inventoryValue: v ?? 0 })}
          placeholder="4,200,000"
        />
        <div>
          <Label>{t("employeeCount")}</Label>
          <Input
            type="number"
            className="mt-1.5"
            value={wizardData.employeeCount ?? ""}
            onChange={(e) =>
              setStepData({ employeeCount: parseInt(e.target.value, 10) || 0 })
            }
            placeholder="14"
          />
        </div>
      </div>
      <div className="mt-6 p-4 rounded-xl bg-surface-raised border border-border text-sm text-text-secondary">
        {t("privacyNote")}
      </div>
    </div>
  );
}
