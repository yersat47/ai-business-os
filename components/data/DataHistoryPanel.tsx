"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { MonthCalendar, type CalendarDay } from "@/components/widgets/MonthCalendar";
import { useMetricsStore } from "@/lib/stores/metrics.store";
import {
  daysInMonth,
  monthCompletenessStatus,
  parseMonthKey,
} from "@/lib/calendar/month-utils";

function currentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function todayIso(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

interface DataHistoryPanelProps {
  onMonthSelected?: (monthKey: string) => void;
}

export function DataHistoryPanel({ onMonthSelected }: DataHistoryPanelProps) {
  const t = useTranslations("data.history");
  const router = useRouter();
  const [calendarMonth, setCalendarMonth] = useState(currentMonthKey());
  const metricsHistory = useMetricsStore((s) => s.metricsHistory);
  const loadMonth = useMetricsStore((s) => s.loadMonth);
  const editingMonthKey = useMetricsStore((s) => s.editingMonthKey);

  const days: CalendarDay[] = useMemo(() => {
    const { year, month } = parseMonthKey(calendarMonth);
    const count = daysInMonth(year, month);
    const monthMetrics = metricsHistory[calendarMonth];
    const status = monthCompletenessStatus(monthMetrics);
    const today = todayIso();

    return Array.from({ length: count }, (_, i) => {
      const day = i + 1;
      const date = `${calendarMonth}-${String(day).padStart(2, "0")}`;
      return {
        date,
        status,
        isToday: date === today,
      };
    });
  }, [calendarMonth, metricsHistory]);

  const handleDayClick = (date: string) => {
    const monthKey = date.slice(0, 7);
    loadMonth(monthKey);
    onMonthSelected?.(monthKey);
    router.push("/data");
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{t("title")}</h3>
        <p className="mt-1 text-sm text-text-secondary">{t("description")}</p>
      </div>

      {editingMonthKey && (
        <p className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-accent">
          {t("editingMonth", { month: editingMonthKey })}
        </p>
      )}

      <MonthCalendar
        month={calendarMonth}
        days={days}
        mode="completeness"
        onMonthChange={setCalendarMonth}
        onDayClick={handleDayClick}
      />
    </div>
  );
}
