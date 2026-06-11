"use client";

import { useWizardStore } from "@/lib/stores/wizard.store";
import { MultiCard } from "./MultiCard";

const goals = [
  "Increase revenue",
  "Reduce expenses",
  "Expand to new cities",
  "Increase repeat purchases",
  "Build a strong team",
  "Launch online store",
  "Improve margins",
  "Reduce dead stock",
];

export function Step8Goals() {
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
      <h2 className="text-2xl font-bold mb-2">Business Goals</h2>
      <p className="text-text-secondary mb-2">What are your top 3 business goals?</p>
      <p className="text-xs text-text-muted mb-8">
        Choose 1–3. This helps AI agents focus on what matters most.
      </p>
      <div className="grid gap-3">
        {goals.map((goal) => (
          <MultiCard
            key={goal}
            label={goal}
            selected={selected.includes(goal)}
            disabled={!selected.includes(goal) && selected.length >= 3}
            onClick={() => toggle(goal)}
          />
        ))}
      </div>
    </div>
  );
}
