"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { glass } from "@/lib/glass.styles";
import { StepIndicator } from "./StepIndicator";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { Step1Identity } from "./Step1Identity";
import { OnboardingStep2Business } from "./OnboardingStep2Business";
import { OnboardingStep3Team } from "./OnboardingStep3Team";
import { OnboardingStep4Metrics } from "./OnboardingStep4Metrics";
import { Step5BrainSeed } from "./Step5BrainSeed";
import { StepComplete } from "./StepComplete";

const stepComponents: Record<number, React.ComponentType> = {
  1: Step1Identity,
  2: OnboardingStep2Business,
  3: OnboardingStep3Team,
  4: OnboardingStep4Metrics,
  5: Step5BrainSeed,
  6: StepComplete,
};

interface WizardShellProps {
  canContinue: boolean;
  onContinue?: () => void;
}

export function WizardShell({ canContinue, onContinue }: WizardShellProps) {
  const t = useTranslations("wizard.shell");
  const { currentStep, prevStep, nextStep, wizardData } = useWizardStore();
  const StepComponent = stepComponents[currentStep];
  const progress = Math.round(((currentStep - 1) / 5) * 100);

  const handleContinue = () => {
    if (onContinue) onContinue();
    else nextStep();
  };

  if (currentStep === 6) {
    return <StepComplete />;
  }

  return (
    <div className="flex min-h-screen">
      <aside
        className="hidden w-[280px] border-r border-border/50 p-6 lg:block"
        style={glass.sidebar}
      >
        <StepIndicator currentStep={currentStep} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div
          className="border-b border-border/50 px-4 py-4 md:px-6 flex items-center justify-between"
          style={glass.topbar}
        >
          <div>
            <p className="text-sm text-text-secondary">{t("settingUp")}</p>
            <p className="font-semibold">{wizardData.name || t("yourCompany")}</p>
          </div>
          <span className="text-sm font-mono text-accent">{progress}%</span>
        </div>
        <div className="h-1 bg-border lg:hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex-1 overflow-auto px-4 pb-28 pt-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {StepComponent && <StepComponent />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-border bg-[#0A0A0F]/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:static md:justify-between md:bg-transparent md:px-6 md:py-4 md:pb-4">
          <Button
            variant="ghost"
            className="min-h-[52px] flex-1 md:flex-none"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            {t("back")}
          </Button>
          <Button
            variant="bronze"
            className="min-h-[52px] flex-1 md:flex-none"
            onClick={handleContinue}
            disabled={!canContinue}
          >
            {t("continue")}
          </Button>
        </div>
      </div>
    </div>
  );
}
