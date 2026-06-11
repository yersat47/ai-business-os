"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

interface ConfidenceBadgeProps {
  confidence: number;
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const t = useTranslations("common");
  const variant =
    confidence >= 80 ? "success" : confidence >= 60 ? "warning" : "default";
  return (
    <Badge variant={variant} className="font-mono text-[10px]">
      {t("confidence", { pct: confidence })}
    </Badge>
  );
}
