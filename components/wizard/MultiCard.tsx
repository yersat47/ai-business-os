"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface MultiCardProps {
  selected: boolean;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

export function MultiCard({ selected, onClick, label, disabled }: MultiCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 w-full",
        selected
          ? "border-accent bg-accent/10"
          : "border-border bg-surface hover:border-border-bright",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span className="text-sm font-medium">{label}</span>
      {selected && <Check className="h-4 w-4 text-accent" />}
    </button>
  );
}
