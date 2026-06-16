"use client";

import { useTranslations } from "next-intl";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { OnboardingTip } from "./OnboardingTip";
import { RoleAwareHint } from "./RoleAwareHint";
import { toast } from "@/hooks/use-toast";

export function Step5BrainSeed() {
  const t = useTranslations("wizard.brainSeed");
  const { wizardData, setStepData } = useWizardStore();

  const handleUpload = () => {
    setStepData({ brainSeeded: true });
    toast({
      title: t("uploadSuccess"),
      description: t("uploadSuccessDesc"),
    });
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <p className="text-text-secondary mb-2">{t("subtitle")}</p>
      <OnboardingTip text={t("why")} gain={t("gain")} />

      <RoleAwareHint section="brain" teamRoles={wizardData.teamRoles} />

      <div
        className="mt-8 border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-accent transition-colors cursor-pointer"
        onClick={handleUpload}
      >
        <Upload className="h-8 w-8 text-text-muted mx-auto mb-3" />
        <p className="text-sm text-text-secondary mb-4">{t("dropzone")}</p>
        <Button variant="bronze" type="button" onClick={handleUpload}>
          {t("uploadBtn")}
        </Button>
      </div>

      {wizardData.brainSeeded && (
        <p className="mt-4 text-sm text-success text-center">
          ✓ {t("seeded")}
        </p>
      )}

      <p className="mt-6 text-xs text-text-muted text-center">{t("skipHint")}</p>
    </div>
  );
}
