"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { MultiCard } from "./MultiCard";

const problems = [
  { value: "Too much unsold inventory", key: "unsoldInventory" },
  { value: "High customer acquisition cost", key: "highAcquisitionCost" },
  { value: "Low net margin", key: "lowMargin" },
  { value: "Weak online presence", key: "weakOnlinePresence" },
  { value: "Team management issues", key: "teamManagement" },
  { value: "Cash flow problems", key: "cashFlow" },
  { value: "No clear customer data", key: "noCustomerData" },
  { value: "Inconsistent sales", key: "inconsistentSales" },
] as const;

export function Step9Problems() {
  const t = useTranslations("wizard.step9");
  const { wizardData, setStepData } = useWizardStore();
  const selected = wizardData.mainProblems ?? [];

  const toggle = (problem: string) => {
    if (selected.includes(problem)) {
      setStepData({ mainProblems: selected.filter((p) => p !== problem) });
    } else if (selected.length < 3) {
      setStepData({ mainProblems: [...selected, problem] });
    }
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <p className="text-text-secondary mb-2">{t("subtitle")}</p>
      <p className="text-xs text-text-muted mb-8">{t("hint")}</p>
      <div className="grid gap-3">
        {problems.map((problem) => (
          <MultiCard
            key={problem.value}
            label={t(problem.key)}
            selected={selected.includes(problem.value)}
            disabled={!selected.includes(problem.value) && selected.length >= 3}
            onClick={() => toggle(problem.value)}
          />
        ))}
      </div>
    </div>
  );
}
