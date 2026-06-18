"use client";

import { cn } from "@/lib/utils/cn";

interface RadioCardProps {
  selected: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
}

export function RadioCard({ selected, onClick, label, icon }: RadioCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 w-full",
        selected
          ? "border-accent bg-accent/10 text-text-primary"
          : "border-border bg-surface hover:border-border-bright"
      )}
    >
      {icon && <span className="text-accent shrink-0">{icon}</span>}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
