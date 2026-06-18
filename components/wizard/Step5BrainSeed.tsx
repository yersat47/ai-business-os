"use client";

import { Brain } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { RoleAwareHint } from "./RoleAwareHint";

const brainItemKeys = ["documents", "processes", "decisions", "rules"] as const;

export function Step5BrainSeed() {
  const t = useTranslations("wizard.brainInfo");
  const { wizardData, nextStep } = useWizardStore();

  return (
    <div className="max-w-lg mx-auto text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
        <Brain className="text-accent" size={28} />
      </div>

      <div>
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="text-text-secondary mt-2">{t("subtitle")}</p>
      </div>

      <RoleAwareHint section="brain" selectedRoles={wizardData.selectedRoles} />

      <div className="grid grid-cols-2 gap-3 text-left">
        {brainItemKeys.map((key) => (
          <div
            key={key}
            className="p-3 rounded-lg border border-border bg-surface"
          >
            <span className="text-xl">{t(`items.${key}.icon`)}</span>
            <p className="font-medium mt-1 text-sm">{t(`items.${key}.title`)}</p>
            <p className="text-xs text-text-muted">{t(`items.${key}.desc`)}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-text-muted">{t("addLater")}</p>

      <Button variant="bronze" type="button" onClick={nextStep}>
        {t("continue")}
      </Button>
    </div>
  );
}
