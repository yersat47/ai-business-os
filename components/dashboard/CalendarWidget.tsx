"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ru } from "date-fns/locale";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { COLORS, RADIUS } from "@/lib/design/tokens";
import "./calendar-widget.css";

const WEEKDAY_LABELS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function CalendarWidget() {
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
          Календарь
        </h3>
        <button
          type="button"
          className="calendar-collapse"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Развернуть" : "Свернуть"}
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
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
