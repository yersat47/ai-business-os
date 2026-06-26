"use client";

import { WizardShell } from "@/components/wizard/WizardShell";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { useOnboardingStore } from "@/lib/stores/onboarding.store";
import { useHealthStore } from "@/lib/stores/health.store";

export default function CreateCompanyPage() {
  const { currentStep, wizardData, nextStep } = useWizardStore();
  const segment = useOnboardingStore((s) => s.segment);
  const recalculate = useHealthStore((s) => s.recalculate);

  const canContinue = (() => {
    switch (currentStep) {
      case 1:
        return !!wizardData.name?.trim();
      case 2:
        return segment !== null;
      case 3:
        return (
          !!wizardData.businessType &&
          !!wizardData.size &&
          !!wizardData.city?.trim()
        );
      case 4: {
        const roleCount =
          (wizardData.selectedRoles?.length ?? 0) +
          (wizardData.customRoles?.length ?? 0);
        return roleCount > 0;
      }
      case 5:
      case 6:
        return true;
      default:
        return true;
    }
  })();

  const handleContinue = () => {
    if (currentStep === 5 && wizardData.monthlyRevenue) {
      recalculate(wizardData);
    }
    nextStep();
  };

  return <WizardShell canContinue={canContinue} onContinue={handleContinue} />;
}
