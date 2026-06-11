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
        return !!wizardData.businessType;
      case 3:
        return !!wizardData.size;
      case 4:
        return !!wizardData.city?.trim();
      case 5:
        return (wizardData.salesChannels?.length ?? 0) > 0;
      case 6:
        return (wizardData.currentTools?.length ?? 0) > 0;
      case 7:
        return (wizardData.employeeCount ?? 0) >= 1;
      case 8:
        return (wizardData.strategicGoals?.length ?? 0) >= 1;
      case 9:
        return (wizardData.mainProblems?.length ?? 0) >= 1;
      case 10:
      case 11:
        return true;
      default:
        return true;
    }
  })();

  const handleContinue = () => {
    if (currentStep === 10 && wizardData.monthlyRevenue) {
      recalculate(wizardData);
    }
    if (currentStep === 11) {
      nextStep();
      return;
    }
    nextStep();
  };

  return <WizardShell canContinue={canContinue} onContinue={handleContinue} />;
}
