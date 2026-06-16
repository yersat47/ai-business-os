"use client";

import { useTranslations } from "next-intl";
import { Step7Employees } from "./Step7Employees";
import { OnboardingTip } from "./OnboardingTip";

export function OnboardingStep3Team() {
  const t = useTranslations("wizard.onboarding");

  return (
    <div>
      <OnboardingTip text={t("step3Why")} gain={t("step3Gain")} />
      <Step7Employees />
    </div>
  );
}
