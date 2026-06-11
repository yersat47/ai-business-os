"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { MultiCard } from "./MultiCard";

const tools = [
  { value: "Excel / Google Sheets", key: "excelSheets" },
  { value: "WhatsApp", key: "whatsapp" },
  { value: "Instagram", key: "instagram" },
  { value: "1C Accounting", key: "accounting1c" },
  { value: "Poster POS", key: "posterPos" },
  { value: "Bitrix24", key: "bitrix24" },
  { value: "Other CRM", key: "otherCrm" },
  { value: "No tools — just starting", key: "noTools" },
] as const;

export function Step6Tools() {
  const t = useTranslations("wizard.step6");
  const { wizardData, setStepData } = useWizardStore();
  const selected = wizardData.currentTools ?? [];

  const toggle = (tool: string) => {
    const next = selected.includes(tool)
      ? selected.filter((item) => item !== tool)
      : [...selected, tool];
    setStepData({ currentTools: next });
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <p className="text-text-secondary mb-8">{t("subtitle")}</p>
      <div className="grid gap-3">
        {tools.map((tool) => (
          <MultiCard
            key={tool.value}
            label={t(tool.key)}
            selected={selected.includes(tool.value)}
            onClick={() => toggle(tool.value)}
          />
        ))}
      </div>
    </div>
  );
}
