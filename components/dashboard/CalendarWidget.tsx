"use client";

import { useMemo, useState } from "react";
import { DayPicker, type DayButtonProps } from "react-day-picker";
import { ru } from "date-fns/locale";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { COLORS, RADIUS } from "@/lib/design/tokens";
import { useMetricsStore } from "@/lib/stores/metrics.store";
import {
  averageDailySalesForMonth,
  DAY_STATUS_COLORS,
  estimateDailySales,
  getDayColorStatus,
  type DayColorStatus,
} from "@/lib/calendar/daily-sales-status";
import "./calendar-widget.css";

const WEEKDAY_LABELS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function ColoredDayButton(props: DayButtonProps) {
  const { day, modifiers, className, style, ...buttonProps } = props;
  const metrics = useMetricsStore((s) => s.currentMonthMetrics);
  const today = useMemo(() => new Date(), []);

  const daySales = estimateDailySales(day.date, metrics, today);
  const avg = averageDailySalesForMonth(metrics, day.date);
  const status = getDayColorStatus(daySales, avg);
  const color = DAY_STATUS_COLORS[status];
  const isEstimated = daySales !== null && avg > 0;

  const button = (
    <button
      {...buttonProps}
      type="button"
      className={className}
      style={{
        ...style,
        color: modifiers.outside ? COLORS.text.tertiary : color,
        opacity: modifiers.outside ? 0.5 : 1,
        textShadow:
          status !== "neutral" && !modifiers.outside
            ? `0 0 8px ${color}55`
            : undefined,
        fontWeight: status === "green" ? 600 : undefined,
      }}
    />
  );

  if (isEstimated && !modifiers.outside) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent className="max-w-[200px] text-xs">
          Оценочно по распределению будни/выходные
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}

const LEGEND: { status: DayColorStatus; labelKey: string }[] = [
  { status: "green", labelKey: "good" },
  { status: "amber", labelKey: "okay" },
  { status: "red", labelKey: "critical" },
];

export function CalendarWidget() {
  const t = useTranslations("dashboard.calendar");
  const [selected, setSelected] = useState<Date>(new Date());
  const [collapsed, setCollapsed] = useState(false);
  const [month, setMonth] = useState<Date>(new Date());

  return (
    <div
      className="calendar-card"
      style={{
        background: COLORS.bg.card,
        borderRadius: RADIUS.lg,
        padding: 20,
        border: `1px solid ${COLORS.bg.borderSubtle}`,
        minWidth: 280,
        maxWidth: 320,
      }}
    >
      <div className="calendar-header">
        <h3 style={{ fontSize: 16, fontWeight: 500, color: COLORS.text.primary }}>
          {t("title")}
        </h3>
        <button
          type="button"
          className="calendar-collapse"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? t("expand") : t("collapse")}
        >
          <ChevronDown
            size={16}
            style={{
              color: COLORS.text.secondary,
              transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>
      </div>
      <div
        style={{
          height: 1,
          background: COLORS.bg.borderSubtle,
          marginBottom: 16,
        }}
      />

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="calendar-body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(day) => day && setSelected(day)}
              month={month}
              onMonthChange={setMonth}
              locale={ru}
              weekStartsOn={1}
              showOutsideDays
              formatters={{
                formatWeekdayName: (date) => {
                  const d = date.getDay();
                  return WEEKDAY_LABELS[d === 0 ? 6 : d - 1];
                },
              }}
              classNames={{
                root: "calendar-root",
                months: "calendar-months",
                month: "calendar-month",
                month_caption: "calendar-month-caption",
                caption_label: "calendar-month-label",
                nav: "calendar-nav",
                button_previous: "calendar-nav-button",
                button_next: "calendar-nav-button",
                weekdays: "calendar-weekdays",
                weekday: "calendar-weekday",
                week: "calendar-week",
                day: "calendar-day-cell",
                day_button: "calendar-day",
                selected: "selected",
                today: "today",
                outside: "outside",
                disabled: "disabled",
              }}
              components={{
                Chevron: ({ orientation }) =>
                  orientation === "left" ? (
                    <ChevronLeft size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ),
                DayButton: ColoredDayButton,
              }}
            />

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-text-secondary">
              {LEGEND.map(({ status, labelKey }) => (
                <span key={status} className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: DAY_STATUS_COLORS[status] }}
                  />
                  {t(`legend.${labelKey}`)}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
