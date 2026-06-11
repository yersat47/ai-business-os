"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { MultiCard } from "./MultiCard";

const channels = [
  { value: "Instagram Shop", key: "instagramShop" },
  { value: "Physical Store", key: "physicalStore" },
  { value: "Kaspi.kz", key: "kaspi" },
  { value: "Own Website", key: "ownWebsite" },
  { value: "WhatsApp Sales", key: "whatsappSales" },
  { value: "Wildberries", key: "wildberries" },
  { value: "Other", key: "other" },
] as const;

export function Step5SalesChannels() {
  const t = useTranslations("wizard.step5");
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
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <p className="text-text-secondary mb-8">{t("subtitle")}</p>
      <div className="grid gap-3">
        {channels.map((ch) => (
          <MultiCard
            key={ch.value}
            label={t(ch.key)}
            selected={selected.includes(ch.value)}
            onClick={() => toggle(ch.value)}
          />
        ))}
      </div>
    </div>
  );
}
