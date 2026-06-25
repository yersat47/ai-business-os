"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/cn";

export interface CalendarDay {
  date: string;
  status?: "filled" | "partial" | "empty";
  dots?: { color: string; label: string }[];
  isToday?: boolean;
}

export interface MonthCalendarProps {
  month: string;
  days: CalendarDay[];
  onDayClick?: (date: string) => void;
  onMonthChange?: (month: string) => void;
  mode: "completeness" | "content";
  selectedDate?: string | null;
}

const WEEKDAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

const STATUS_BG: Record<string, string> = {
  filled: "bg-success/15",
  partial: "bg-warning/15",
  empty: "",
};

function parseMonth(month: string) {
  const [year, monthNum] = month.split("-").map(Number);
  return { year, monthNum };
}

function formatMonthTitle(month: string, locale: string) {
  const { year, monthNum } = parseMonth(month);
  const date = new Date(year, monthNum - 1, 1);
  return date.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
    month: "long",
    year: "numeric",
  });
}

export function MonthCalendar({
  month,
  days,
  onDayClick,
  onMonthChange,
  mode,
  selectedDate,
}: MonthCalendarProps) {
  const t = useTranslations("widgets.calendar");
  const locale =
    typeof document !== "undefined" ? document.documentElement.lang || "ru" : "ru";

  const { year, monthNum } = parseMonth(month);
  const firstWeekday = (new Date(year, monthNum - 1, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthNum, 0).getDate();

  const dayMap = useMemo(
    () => Object.fromEntries(days.map((d) => [d.date, d])),
    [days]
  );

  const cells: (CalendarDay | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = `${month}-${String(d).padStart(2, "0")}`;
    cells.push(dayMap[date] ?? { date });
  }

  const shiftMonth = (delta: number) => {
    const date = new Date(year, monthNum - 1 + delta, 1);
    const next = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    onMonthChange?.(next);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="rounded-xl border border-border bg-surface p-3 md:p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent/40 hover:text-accent"
            aria-label={t("prevMonth")}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h3 className="text-sm font-semibold capitalize text-text-primary md:text-base">
            {formatMonthTitle(month, locale)}
          </h3>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent/40 hover:text-accent"
            aria-label={t("nextMonth")}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-1 grid grid-cols-7 gap-px text-center text-[10px] text-text-muted md:text-xs">
          {WEEKDAY_KEYS.map((key) => (
            <div key={key} className="py-1 font-medium">
              {t(`weekdays.${key}`)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px rounded-lg border border-border bg-border overflow-hidden">
          {cells.map((cell, idx) => {
            if (!cell) {
              return <div key={`empty-${idx}`} className="min-h-[44px] bg-surface" />;
            }

            const dayNum = new Date(cell.date).getDate();
            const statusClass =
              mode === "completeness" && cell.status
                ? STATUS_BG[cell.status]
                : "";
            const isSelected = selectedDate === cell.date;

            return (
              <button
                key={cell.date}
                type="button"
                onClick={() => onDayClick?.(cell.date)}
                className={cn(
                  "relative flex min-h-[44px] flex-col items-center justify-start bg-surface px-0.5 py-1 text-xs transition-colors hover:bg-surface-raised",
                  statusClass,
                  cell.isToday && "ring-1 ring-inset ring-accent",
                  isSelected && "bg-accent/10"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[11px] md:text-xs",
                    cell.isToday ? "text-accent font-semibold" : "text-text-secondary"
                  )}
                >
                  {dayNum}
                </span>
                {mode === "content" && cell.dots && cell.dots.length > 0 && (
                  <div className="mt-auto flex flex-wrap justify-center gap-0.5 pb-0.5">
                    {cell.dots.map((dot, i) => (
                      <Tooltip key={`${cell.date}-dot-${i}`}>
                        <TooltipTrigger asChild>
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: dot.color }}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[200px] text-xs">
                          {dot.label}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {mode === "completeness" && (
          <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-text-muted md:text-xs">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-success/30" />
              {t("legend.filled")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-warning/30" />
              {t("legend.partial")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm border border-border" />
              {t("legend.empty")}
            </span>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
