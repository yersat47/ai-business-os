"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { RadioCard } from "./RadioCard";

const sizes = [
  { value: "Solo (just me)", key: "solo" },
  { value: "2–5 people", key: "s2_5" },
  { value: "6–15 people", key: "s6_15" },
  { value: "16–30 people", key: "s16_30" },
  { value: "31–50 people", key: "s31_50" },
  { value: "50+ people", key: "s50plus" },
] as const;

export function Step3Size() {
  const t = useTranslations("wizard.step3");
  const { wizardData, setStepData } = useWizardStore();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <p className="text-text-secondary mb-8">{t("subtitle")}</p>
      <div className="grid gap-3">
        {sizes.map((size) => (
          <RadioCard
            key={size.value}
            label={t(size.key)}
            selected={wizardData.size === size.value}
            onClick={() => setStepData({ size: size.value })}
          />
        ))}
      </div>
    </div>
  );
}
