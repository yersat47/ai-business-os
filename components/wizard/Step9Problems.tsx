"use client";

import { useWizardStore } from "@/lib/stores/wizard.store";
import { MultiCard } from "./MultiCard";

const problems = [
  "Too much unsold inventory",
  "High customer acquisition cost",
  "Low net margin",
  "Weak online presence",
  "Team management issues",
  "Cash flow problems",
  "No clear customer data",
  "Inconsistent sales",
];

export function Step9Problems() {
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
      <h2 className="text-2xl font-bold mb-2">Business Challenges</h2>
      <p className="text-text-secondary mb-2">
        What are your biggest challenges right now?
      </p>
      <p className="text-xs text-text-muted mb-8">
        Be honest. AI Business OS is here to fix these, not judge them.
      </p>
      <div className="grid gap-3">
        {problems.map((problem) => (
          <MultiCard
            key={problem}
            label={problem}
            selected={selected.includes(problem)}
            disabled={!selected.includes(problem) && selected.length >= 3}
            onClick={() => toggle(problem)}
          />
        ))}
      </div>
    </div>
  );
}
