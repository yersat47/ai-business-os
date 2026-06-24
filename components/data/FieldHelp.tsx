"use client";

import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FieldHelpProps {
  text: string;
  className?: string;
}

export function FieldHelp({ text, className }: FieldHelpProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        className={className}
        aria-label="Подробнее"
      >
        <HelpCircle size={14} className="text-text-muted hover:text-accent" />
      </TooltipTrigger>
      <TooltipContent className="max-w-sm p-3">
        <p className="text-xs leading-relaxed">{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}
