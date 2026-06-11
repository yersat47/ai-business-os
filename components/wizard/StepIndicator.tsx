import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const steps = [
  { num: 1, label: "Company Identity" },
  { num: 2, label: "Business Type" },
  { num: 3, label: "Company Size" },
  { num: 4, label: "Location" },
  { num: 5, label: "Sales Channels" },
  { num: 6, label: "Current Tools" },
  { num: 7, label: "Your Team" },
  { num: 8, label: "Business Goals" },
  { num: 9, label: "Challenges" },
  { num: 10, label: "Business Numbers" },
  { num: 11, label: "Company DNA" },
  { num: 12, label: "Complete" },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="space-y-1">
      {steps.map((step) => {
        const isComplete = currentStep > step.num;
        const isActive = currentStep === step.num;
        return (
          <div
            key={step.num}
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
              {isComplete ? <Check className="h-3 w-3" /> : step.num}
            </span>
            <span className="truncate">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
