"use client";

import { WizardShell } from "@/components/wizard/WizardShell";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { useHealthStore } from "@/lib/stores/health.store";

export default function CreateCompanyPage() {
  const { currentStep, wizardData, nextStep } = useWizardStore();
  const recalculate = useHealthStore((s) => s.recalculate);

  const canContinue = (() => {
    switch (currentStep) {
      case 1:
        return !!wizardData.name?.trim();
      case 2:
        return (
          !!wizardData.businessType &&
          !!wizardData.size &&
          !!wizardData.city?.trim()
        );
      case 3: {
        const roleCount =
          (wizardData.selectedRoles?.length ?? 0) +
          (wizardData.customRoles?.length ?? 0);
        return roleCount > 0;
      }
      case 4:
      case 5:
        return true;
      default:
        return true;
    }
  })();

  const handleContinue = () => {
    if (currentStep === 4 && wizardData.monthlyRevenue) {
      recalculate(wizardData);
    }
    nextStep();
  };

  return <WizardShell canContinue={canContinue} onContinue={handleContinue} />;
}
