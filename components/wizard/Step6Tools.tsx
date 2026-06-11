"use client";

import { useWizardStore } from "@/lib/stores/wizard.store";
import { MultiCard } from "./MultiCard";

const tools = [
  "Excel / Google Sheets",
  "WhatsApp",
  "Instagram",
  "1C Accounting",
  "Poster POS",
  "Bitrix24",
  "Other CRM",
  "No tools — just starting",
];

export function Step6Tools() {
  const { wizardData, setStepData } = useWizardStore();
  const selected = wizardData.currentTools ?? [];

  const toggle = (tool: string) => {
    const next = selected.includes(tool)
      ? selected.filter((t) => t !== tool)
      : [...selected, tool];
    setStepData({ currentTools: next });
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">Current Tools</h2>
      <p className="text-text-secondary mb-8">What tools do you use today?</p>
      <div className="grid gap-3">
        {tools.map((tool) => (
          <MultiCard
            key={tool}
            label={tool}
            selected={selected.includes(tool)}
            onClick={() => toggle(tool)}
          />
        ))}
      </div>
    </div>
  );
}
