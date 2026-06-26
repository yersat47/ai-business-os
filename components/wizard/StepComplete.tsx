"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { BusinessCompletionScore } from "@/components/onboarding/BusinessCompletionScore";
import { KazakhPixelOrnament } from "@/components/decorative/KazakhPixelOrnament";
import { getCompletionFromWizard } from "@/lib/utils/completion-calculator";

export function StepComplete() {
  const router = useRouter();
  const { wizardData, completeWizard } = useWizardStore();

  useEffect(() => {
    completeWizard();
  }, [completeWizard]);

  const completion = getCompletionFromWizard({
    name: wizardData.name,
    businessType: wizardData.businessType,
    selectedRoles: wizardData.selectedRoles,
    customRoles: wizardData.customRoles,
    monthlyRevenue: wizardData.monthlyRevenue,
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-6">
      <KazakhPixelOrnament
        variant="hero"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <BusinessCompletionScore
        data={completion}
        onGoToDashboard={() => router.push("/dashboard")}
      />
    </div>
  );
}
