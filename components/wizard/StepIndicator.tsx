"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";

interface StepIndicatorProps {
  currentStep: number;
}

const stepKeys = ["1", "2", "3", "4", "5", "6", "7"] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const t = useTranslations("wizard.onboardingSteps");

  return (
    <div className="space-y-1">
      {stepKeys.map((key, index) => {
        const num = index + 1;
        const isComplete = currentStep > num;
        const isActive = currentStep === num;
        return (
          <div
            key={key}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors border-l-2",
              isActive && "border-accent bg-accent/5 text-accent",
              isComplete && "border-accent/50 text-text-secondary",
              !isActive && !isComplete && "border-transparent text-text-muted"
            )}
          >
            <span
              className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center text-xs shrink-0",
                isComplete && "bg-accent/20 text-accent",
                isActive && "bg-accent text-background font-bold",
                !isActive && !isComplete && "bg-surface-raised"
              )}
            >
              {isComplete ? <Check className="h-3 w-3" /> : num}
            </span>
            <span className="truncate">{t(key)}</span>
          </div>
        );
      })}
    </div>
  );
}
