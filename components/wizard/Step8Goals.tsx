"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { MultiCard } from "./MultiCard";

const goals = [
  { value: "Increase revenue", key: "increaseRevenue" },
  { value: "Reduce expenses", key: "reduceExpenses" },
  { value: "Expand to new cities", key: "expandCities" },
  { value: "Increase repeat purchases", key: "repeatPurchases" },
  { value: "Build a strong team", key: "buildTeam" },
  { value: "Launch online store", key: "launchOnlineStore" },
  { value: "Improve margins", key: "improveMargins" },
  { value: "Reduce dead stock", key: "reduceDeadStock" },
] as const;

export function Step8Goals() {
  const t = useTranslations("wizard.step8");
  const { wizardData, setStepData } = useWizardStore();
  const selected = wizardData.strategicGoals ?? [];

  const toggle = (goal: string) => {
    if (selected.includes(goal)) {
      setStepData({ strategicGoals: selected.filter((g) => g !== goal) });
    } else if (selected.length < 3) {
      setStepData({ strategicGoals: [...selected, goal] });
    }
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <p className="text-text-secondary mb-2">{t("subtitle")}</p>
      <p className="text-xs text-text-muted mb-8">{t("hint")}</p>
      <div className="grid gap-3">
        {goals.map((goal) => (
          <MultiCard
            key={goal.value}
            label={t(goal.key)}
            selected={selected.includes(goal.value)}
            disabled={!selected.includes(goal.value) && selected.length >= 3}
            onClick={() => toggle(goal.value)}
          />
        ))}
      </div>
    </div>
  );
}
