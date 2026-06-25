"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NumericInput } from "@/components/ui/NumericInput";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { useHealthStore } from "@/lib/stores/health.store";
import { OnboardingTip } from "./OnboardingTip";
import { RoleAwareHint } from "./RoleAwareHint";

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

export function OnboardingStep4Metrics() {
  const t = useTranslations("wizard.onboarding");
  const t10 = useTranslations("wizard.step10");
  const { wizardData, setStepData, nextStep } = useWizardStore();
  const recalculate = useHealthStore((s) => s.recalculate);
  const [showMetricsForm, setShowMetricsForm] = useState(false);

  const hasMetrics = (wizardData.monthlyRevenue ?? 0) > 0;
  const showForm = showMetricsForm || hasMetrics;

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
          <CurrencyField
            label={t10("monthlyRevenue")}
            value={wizardData.monthlyRevenue}
            onCommit={(v) => setStepData({ monthlyRevenue: v ?? 0 })}
            placeholder="2 500 000"
          />
          <CurrencyField
            label={t10("avgOrderValue")}
            value={wizardData.averageOrderValue}
            onCommit={(v) => setStepData({ averageOrderValue: v ?? 0 })}
            placeholder="15 000"
          />
          <div>
            <Label>{t10("monthlyTransactions")}</Label>
            <div className="mt-1.5">
              <NumericInput
                value={wizardData.monthlyTransactions}
                onCommit={(v) =>
                  setStepData({ monthlyTransactions: v ?? 0 })
                }
                placeholder="180"
                className="font-mono"
              />
            </div>
          </div>

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
