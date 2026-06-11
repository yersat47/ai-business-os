"use client";

import { useWizardStore } from "@/lib/stores/wizard.store";
import { RadioCard } from "./RadioCard";

const sizes = [
  "Solo (just me)",
  "2–5 people",
  "6–15 people",
  "16–30 people",
  "31–50 people",
  "50+ people",
];

export function Step3Size() {
  const { wizardData, setStepData } = useWizardStore();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">Company Size</h2>
      <p className="text-text-secondary mb-8">How many people work in your company?</p>
      <div className="grid gap-3">
        {sizes.map((size) => (
          <RadioCard
            key={size}
            label={size}
            selected={wizardData.size === size}
            onClick={() => setStepData({ size })}
          />
        ))}
      </div>
    </div>
  );
}
