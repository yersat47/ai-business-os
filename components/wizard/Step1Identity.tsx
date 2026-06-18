"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { OnboardingTip } from "./OnboardingTip";

export function Step1Identity() {
  const t = useTranslations("wizard.step1");
  const tOnb = useTranslations("wizard.onboarding");
  const { wizardData, setStepData } = useWizardStore();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <OnboardingTip text={tOnb("step1Why")} gain={tOnb("step1Gain")} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            id="name"
            value={wizardData.name ?? ""}
            onChange={(e) => setStepData({ name: e.target.value })}
            className="mt-1.5"
            placeholder={t("namePlaceholder")}
          />
        </div>
        <div>
          <Label htmlFor="tagline">{t("tagline")}</Label>
          <Textarea
            id="tagline"
            value={wizardData.tagline ?? ""}
            onChange={(e) => setStepData({ tagline: e.target.value })}
            className="mt-1.5"
            maxLength={120}
            placeholder={t("taglinePlaceholder")}
          />
          <p className="text-xs text-text-muted mt-1">
            {t("charCount", { count: wizardData.tagline?.length ?? 0 })}
          </p>
        </div>
      </div>
    </div>
  );
}
