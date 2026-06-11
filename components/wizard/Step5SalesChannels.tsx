"use client";

import { useWizardStore } from "@/lib/stores/wizard.store";
import { MultiCard } from "./MultiCard";

const channels = [
  "Instagram Shop",
  "Physical Store",
  "Kaspi.kz",
  "Own Website",
  "WhatsApp Sales",
  "Wildberries",
  "Other",
];

export function Step5SalesChannels() {
  const { wizardData, setStepData } = useWizardStore();
  const selected = wizardData.salesChannels ?? [];

  const toggle = (channel: string) => {
    const next = selected.includes(channel)
      ? selected.filter((c) => c !== channel)
      : [...selected, channel];
    setStepData({ salesChannels: next });
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">Sales Channels</h2>
      <p className="text-text-secondary mb-8">Where do you sell? Select all that apply.</p>
      <div className="grid gap-3">
        {channels.map((ch) => (
          <MultiCard
            key={ch}
            label={ch}
            selected={selected.includes(ch)}
            onClick={() => toggle(ch)}
          />
        ))}
      </div>
    </div>
  );
}
