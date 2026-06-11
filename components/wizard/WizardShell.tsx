"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./StepIndicator";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { Step1Identity } from "./Step1Identity";
import { Step2BusinessType } from "./Step2BusinessType";
import { Step3Size } from "./Step3Size";
import { Step4City } from "./Step4City";
import { Step5SalesChannels } from "./Step5SalesChannels";
import { Step6Tools } from "./Step6Tools";
import { Step7Employees } from "./Step7Employees";
import { Step8Goals } from "./Step8Goals";
import { Step9Problems } from "./Step9Problems";
import { Step10Numbers } from "./Step10Numbers";
import { Step11DNA } from "./Step11DNA";
import { StepComplete } from "./StepComplete";

const stepComponents: Record<number, React.ComponentType> = {
  1: Step1Identity,
  2: Step2BusinessType,
  3: Step3Size,
  4: Step4City,
  5: Step5SalesChannels,
  6: Step6Tools,
  7: Step7Employees,
  8: Step8Goals,
  9: Step9Problems,
  10: Step10Numbers,
  11: Step11DNA,
  12: StepComplete,
};

interface WizardShellProps {
  canContinue: boolean;
  onContinue?: () => void;
}

export function WizardShell({ canContinue, onContinue }: WizardShellProps) {
  const { currentStep, prevStep, nextStep, wizardData } = useWizardStore();
  const StepComponent = stepComponents[currentStep];
  const progress = Math.round(((currentStep - 1) / 11) * 100);

  const handleContinue = () => {
    if (onContinue) onContinue();
    else nextStep();
  };

  if (currentStep === 12) {
    return <StepComplete />;
  }

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:block w-[280px] border-r border-border p-6 bg-sidebar">
        <StepIndicator currentStep={currentStep} />
      </aside>
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Setting up</p>
            <p className="font-semibold">{wizardData.name || "Your company"}</p>
          </div>
          <span className="text-sm font-mono text-accent">{progress}%</span>
        </div>
        <div className="flex-1 p-6 md:p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {StepComponent && <StepComponent />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="border-t border-border px-6 py-4 flex justify-between">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            ← Back
          </Button>
          <Button
            variant="bronze"
            onClick={handleContinue}
            disabled={!canContinue}
          >
            Continue →
          </Button>
        </div>
      </div>
    </div>
  );
}
