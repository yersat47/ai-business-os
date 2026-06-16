"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { useCompanyStore } from "@/lib/stores/company.store";
import { BusinessCompletionScore } from "@/components/onboarding/BusinessCompletionScore";
import { getCompletionFromWizard } from "@/lib/utils/completion-calculator";
import { ShanyrakArc } from "@/components/shared/ShanyrakArc";

export function StepComplete() {
  const router = useRouter();
  const { wizardData, completeWizard } = useWizardStore();
  const company = useCompanyStore((s) => s.company);

  useEffect(() => {
    completeWizard();
  }, [completeWizard]);

  const completion = getCompletionFromWizard({
    name: wizardData.name || company.name,
    businessType: wizardData.businessType,
    employeeCount: wizardData.employeeCount,
    monthlyRevenue: wizardData.monthlyRevenue,
    brainSeeded: wizardData.brainSeeded,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden relative">
      <ShanyrakArc className="absolute w-[500px] h-[500px] opacity-[0.04] pointer-events-none" />
      <BusinessCompletionScore
        data={completion}
        onFillNow={() => router.push("/data")}
      />
    </div>
  );
}
