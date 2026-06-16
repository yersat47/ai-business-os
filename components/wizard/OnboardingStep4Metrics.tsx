"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { OnboardingTip } from "./OnboardingTip";
import { RoleAwareHint } from "./RoleAwareHint";
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/utils/formatters";

function CurrencyField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value?: number;
  onChange: (v: number) => void;
  placeholder: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative mt-1.5">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
          ₸
        </span>
        <Input
          className="pl-8 font-mono"
          inputMode="numeric"
          value={value ? formatCurrencyInput(value) : ""}
          onChange={(e) => onChange(parseCurrencyInput(e.target.value))}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export function OnboardingStep4Metrics() {
  const t = useTranslations("wizard.onboarding");
  const t10 = useTranslations("wizard.step10");
  const { wizardData, setStepData } = useWizardStore();
  const [skipped, setSkipped] = useState(false);

  const hasMetrics = (wizardData.monthlyRevenue ?? 0) > 0;

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("step4Title")}</h2>
      <OnboardingTip text={t("step4Why")} gain={t("step4Gain")} />
      <RoleAwareHint section="financial" teamRoles={wizardData.teamRoles} />

      {!hasMetrics && !skipped && (
        <div className="rounded-xl border border-warning/30 bg-warning/5 p-5 mt-6 mb-6">
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            ⚠️ {t("emptyMetricsWarning")}
          </p>
          <div className="flex gap-2">
            <Button variant="bronze" size="sm" type="button">
              {t("fillNow")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => setSkipped(true)}
            >
              {t("continueLater")}
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <CurrencyField
          label={t10("monthlyRevenue")}
          value={wizardData.monthlyRevenue}
          onChange={(v) => setStepData({ monthlyRevenue: v })}
          placeholder="8,450,000"
        />
        <CurrencyField
          label={t10("avgOrderValue")}
          value={wizardData.averageOrderValue}
          onChange={(v) => setStepData({ averageOrderValue: v })}
          placeholder="24,500"
        />
        <CurrencyField
          label={t10("marketingSpend")}
          value={wizardData.marketingSpend}
          onChange={(v) => setStepData({ marketingSpend: v })}
          placeholder="620,000"
        />
        <CurrencyField
          label={t10("inventoryValue")}
          value={wizardData.inventoryValue}
          onChange={(v) => setStepData({ inventoryValue: v })}
          placeholder="4,200,000"
        />
        <div>
          <Label>{t10("employeeCount")}</Label>
          <Input
            inputMode="numeric"
            className="mt-1.5 font-mono"
            value={wizardData.employeeCount ?? ""}
            onChange={(e) =>
              setStepData({
                employeeCount: parseInt(e.target.value, 10) || 0,
              })
            }
            placeholder="14"
          />
        </div>
      </div>
      <div className="mt-6 p-4 rounded-xl bg-surface-raised border border-border text-sm text-text-secondary">
        {t10("privacyNote")}
      </div>
    </div>
  );
}
