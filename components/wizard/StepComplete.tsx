"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { BusinessCompletionScore } from "@/components/onboarding/BusinessCompletionScore";
import { getCompletionFromWizard } from "@/lib/utils/completion-calculator";
import { ShanyrakArc } from "@/components/shared/ShanyrakArc";

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
    <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden relative p-6">
      <ShanyrakArc className="absolute w-[500px] h-[500px] opacity-[0.04] pointer-events-none" />
      <BusinessCompletionScore
        data={completion}
        onGoToDashboard={() => router.push("/dashboard")}
      />
    </div>
  );
}
