"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { useHealthStore } from "@/lib/stores/health.store";
import { OnboardingTip } from "./OnboardingTip";
import { RoleAwareHint } from "./RoleAwareHint";
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/utils/formatters";

function NumericField({
  label,
  value,
  onChange,
  placeholder,
  prefix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  prefix?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className={prefix ? "relative mt-1.5" : "mt-1.5"}>
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
            {prefix}
          </span>
        )}
        <Input
          className={prefix ? "pl-8 font-mono" : "font-mono"}
          inputMode="numeric"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export function OnboardingStep4Metrics() {
  const t = useTranslations("wizard.onboarding");
  const t10 = useTranslations("wizard.step10");
  const { wizardData, setStepData, nextStep } = useWizardStore();
  const recalculate = useHealthStore((s) => s.recalculate);
  const [showMetricsForm, setShowMetricsForm] = useState(false);

  const hasMetrics = (wizardData.monthlyRevenue ?? 0) > 0;
  const showForm = showMetricsForm || hasMetrics;

  const revenueStr =
    wizardData.monthlyRevenue && wizardData.monthlyRevenue > 0
      ? formatCurrencyInput(wizardData.monthlyRevenue)
      : "";
  const aovStr =
    wizardData.averageOrderValue && wizardData.averageOrderValue > 0
      ? formatCurrencyInput(wizardData.averageOrderValue)
      : "";
  const transactionsStr =
    wizardData.monthlyTransactions && wizardData.monthlyTransactions > 0
      ? String(wizardData.monthlyTransactions)
      : "";

  const handleSaveMetrics = () => {
    recalculate(wizardData);
    setStepData({ metricsEntered: true });
    nextStep();
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("step4Title")}</h2>
      <OnboardingTip text={t("step4Why")} gain={t("step4Gain")} />
      <RoleAwareHint
        section="financial"
        selectedRoles={wizardData.selectedRoles}
      />

      {!showForm && (
        <div className="rounded-xl border border-warning/30 bg-warning/5 p-5 mt-6">
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            ⚠️ {t("emptyMetricsWarning")}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="bronze"
              size="sm"
              type="button"
              onClick={() => setShowMetricsForm(true)}
            >
              {t("fillNow")}
            </Button>
            <Button variant="ghost" size="sm" type="button" onClick={nextStep}>
              {t("fillLater")}
            </Button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="mt-6 space-y-4 animate-in slide-in-from-top-2">
          <NumericField
            label={t10("monthlyRevenue")}
            value={revenueStr}
            onChange={(v) =>
              setStepData({ monthlyRevenue: parseCurrencyInput(v) })
            }
            placeholder="2 500 000"
            prefix="₸"
          />
          <NumericField
            label={t10("avgOrderValue")}
            value={aovStr}
            onChange={(v) =>
              setStepData({ averageOrderValue: parseCurrencyInput(v) })
            }
            placeholder="15 000"
            prefix="₸"
          />
          <NumericField
            label={t10("monthlyTransactions")}
            value={transactionsStr}
            onChange={(v) =>
              setStepData({
                monthlyTransactions: parseInt(v.replace(/\D/g, ""), 10) || 0,
              })
            }
            placeholder="180"
          />

          <div className="p-3 rounded-lg bg-surface-raised border border-border text-sm">
            {t10("employeeCountFromSettings")}{" "}
            <strong>{wizardData.employeeCount || "—"}</strong>
            <span className="text-text-muted ml-2">
              ({t10("employeeCountHint")})
            </span>
          </div>

          <Button variant="bronze" type="button" onClick={handleSaveMetrics}>
            {t10("saveAndContinue")}
          </Button>
        </div>
      )}

      {showForm && (
        <div className="mt-6 p-4 rounded-xl bg-surface-raised border border-border text-sm text-text-secondary">
          {t10("privacyNote")}
        </div>
      )}
    </div>
  );
}
