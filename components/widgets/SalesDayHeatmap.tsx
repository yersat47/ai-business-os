"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import type {
  DayOfWeekId,
  SalesDayCell,
} from "@/lib/types/sales-heatmap.types";
import { getWeekendShareCaption } from "@/lib/sales/heatmap";
import { cn } from "@/lib/utils/cn";

const DAY_ORDER: DayOfWeekId[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
];

export interface SalesDayHeatmapProps {
  data?: SalesDayCell[];
  hourly?: number[][];
  weekendSharePct?: number | null;
  ruleTriggered?: boolean;
  hasData?: boolean;
  isEstimated?: boolean;
  compact?: boolean;
  linkToFinding?: boolean;
}

function intensityColor(share: number): string {
  const t = Math.max(0, Math.min(1, share));
  const r = Math.round(30 + t * (201 - 30));
  const g = Math.round(30 + t * (146 - 30));
  const b = Math.round(34 + t * (58 - 34));
  return `rgb(${r}, ${g}, ${b})`;
}

export function SalesDayHeatmap({
  data = [],
  hourly,
  weekendSharePct = null,
  ruleTriggered = false,
  hasData = false,
  isEstimated = false,
  compact = false,
  linkToFinding = false,
}: SalesDayHeatmapProps) {
  const t = useTranslations("widgets.heatmap");
  const tDash = useTranslations("dashboard.heatmap");

  const cells = useMemo(() => {
    if (hourly && hourly.length === 7) {
      const dayIds = DAY_ORDER;
      return dayIds.map((day, i) => ({
        day,
        value: hourly[i].reduce((sum, h) => sum + h, 0),
        estimated: false,
      }));
    }
    return data;
  }, [data, hourly]);

  const heatmapData = useMemo(
    () => ({
      cells,
      weekendSharePct,
      ruleTriggered,
      hasData: hasData || cells.length > 0,
      isEstimated,
    }),
    [cells, weekendSharePct, ruleTriggered, hasData, isEstimated]
  );

  const total = cells.reduce((sum, c) => sum + c.value, 0);

  if (!heatmapData.hasData) {
    return (
      <div
        className={cn(
          "rounded-xl border border-border bg-surface p-4 text-center md:p-6",
          compact && "p-3"
        )}
      >
        <p className="mb-3 text-sm text-text-secondary">{t("emptyPrompt")}</p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/data">{t("fillData")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border bg-surface p-4 md:p-5",
        compact && "p-3",
        linkToFinding && ruleTriggered
          ? "border-warning/50 ring-1 ring-warning/20"
          : "border-border"
      )}
      id={linkToFinding && ruleTriggered ? "weekday-heatmap" : undefined}
    >
      <h3 className={cn("mb-3 font-semibold", compact ? "text-sm" : "text-base")}>
        {t("title")}
      </h3>

      {linkToFinding && ruleTriggered && (
        <a
          href="#finding-pe-rev-002"
          className="mb-3 inline-block text-xs text-warning hover:underline"
        >
          {tDash("seeFindingAbove")}
        </a>
      )}

      <div className="grid grid-cols-7 gap-1.5 md:gap-2">
        {DAY_ORDER.map((dayId) => {
          const cell = cells.find((c) => c.day === dayId);
          const share = total > 0 && cell ? cell.value / total : 0;
          return (
            <div key={dayId} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-text-muted md:text-xs">
                {t(`days.${dayId}`)}
              </span>
              <div
                className="flex h-10 w-full items-center justify-center rounded-md border border-border/50 md:h-12"
                style={{ backgroundColor: intensityColor(share) }}
                title={
                  cell
                    ? `${Math.round(share * 100)}%`
                    : undefined
                }
              >
                {cell && (
                  <span className="text-[10px] font-mono text-text-primary/80">
                    {Math.round(share * 100)}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div
          className="h-2 flex-1 rounded-full"
          style={{
            background:
              "linear-gradient(to right, #1E1E22, #C9923A)",
          }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-text-muted md:text-xs">
        <span>{t("legendLess")}</span>
        <span>{t("legendMore")}</span>
      </div>

      {isEstimated && (
        <p className="mt-2 text-[10px] italic text-text-muted md:text-xs">
          {t("estimatedNote")}
        </p>
      )}

      <p
        className={cn(
          "mt-2 text-xs leading-relaxed md:text-sm",
          ruleTriggered ? "text-warning" : "text-text-secondary"
        )}
      >
        {getWeekendShareCaption(heatmapData, t)}
      </p>
    </div>
  );
}
