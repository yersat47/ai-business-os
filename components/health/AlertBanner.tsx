"use client";

import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Risk } from "@/lib/types/health.types";
import { cn } from "@/lib/utils/cn";

const severityStyles: Record<string, string> = {
  critical: "border-danger/30 bg-danger/5",
  warning: "border-warning/30 bg-warning/5",
};

interface AlertBannerProps {
  risk: Risk;
  onViewAction?: () => void;
}

export function AlertBanner({ risk, onViewAction }: AlertBannerProps) {
  const t = useTranslations("health");
  const tMock = useTranslations("mock.risks");

  return (
    <div
      className={cn(
        "flex min-h-[56px] items-center gap-3 rounded-xl border p-3 md:flex-row md:gap-4 md:p-4",
        severityStyles[risk.severity]
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2 md:mb-1">
          <span
            className={cn(
              "h-2 w-2 shrink-0 rounded-full",
              risk.severity === "critical" ? "bg-danger" : "bg-warning"
            )}
          />
          <span className="truncate text-sm font-medium md:text-base">
            {tMock(`${risk.id}.title`)}
          </span>
          <Badge variant="outline" className="hidden text-[10px] sm:inline-flex">
            {tMock(`${risk.id}.agent`)}
          </Badge>
        </div>
        <p className="hidden text-sm text-text-secondary md:block">
          {tMock(`${risk.id}.description`)}
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="hidden min-h-[44px] shrink-0 md:inline-flex"
        onClick={onViewAction}
      >
        {t("viewAction")}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="min-h-[44px] min-w-[44px] shrink-0 md:hidden"
        onClick={onViewAction}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
