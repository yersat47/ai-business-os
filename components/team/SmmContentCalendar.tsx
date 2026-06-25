"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { MonthCalendar, type CalendarDay } from "@/components/widgets/MonthCalendar";
import {
  MOCK_SMM_OUTPUT,
  SMM_CONTENT_COLORS,
} from "@/lib/mock/mock-smm";
import {
  daysInMonth,
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

export function SmmContentCalendar() {
  const t = useTranslations("widgets.smmCalendar");
  const [calendarMonth, setCalendarMonth] = useState(currentMonthKey());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const postsByDate = useMemo(() => {
    const map = new Map<string, typeof MOCK_SMM_OUTPUT.posting_schedule>();
    for (const post of MOCK_SMM_OUTPUT.posting_schedule) {
      if (!post.date.startsWith(calendarMonth)) continue;
      const list = map.get(post.date) ?? [];
      list.push(post);
      map.set(post.date, list);
    }
    return map;
  }, [calendarMonth]);

  const days: CalendarDay[] = useMemo(() => {
    const { year, month } = parseMonthKey(calendarMonth);
    const count = daysInMonth(year, month);
    const today = todayIso();

    return Array.from({ length: count }, (_, i) => {
      const day = i + 1;
      const date = `${calendarMonth}-${String(day).padStart(2, "0")}`;
      const posts = postsByDate.get(date) ?? [];
      return {
        date,
        isToday: date === today,
        dots: posts.map((post) => ({
          color: SMM_CONTENT_COLORS[post.type],
          label: post.label,
        })),
      };
    });
  }, [calendarMonth, postsByDate]);

  const selectedPosts = selectedDate ? postsByDate.get(selectedDate) ?? [] : [];

  return (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-sm md:text-base">{t("title")}</h4>
        <p className="text-xs text-text-muted">{t("subtitle")}</p>
      </div>

      <MonthCalendar
        month={calendarMonth}
        days={days}
        mode="content"
        selectedDate={selectedDate}
        onMonthChange={(month) => {
          setCalendarMonth(month);
          setSelectedDate(null);
        }}
        onDayClick={(date) => {
          const posts = postsByDate.get(date);
          if (posts && posts.length > 0) {
            setSelectedDate(date);
          } else {
            setSelectedDate(null);
          }
        }}
      />

      {selectedDate && selectedPosts.length > 0 && (
        <div className="rounded-xl border border-border bg-surface-raised p-4 animate-in fade-in duration-200">
          <p className="text-sm font-medium">{t("postsForDay")}</p>
          <p className="mb-3 text-xs text-text-muted">{selectedDate}</p>
          <div className="space-y-3">
            {selectedPosts.map((post) => (
              <div key={`${post.date}-${post.label}`} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: SMM_CONTENT_COLORS[post.type] }}
                  />
                  <span className="text-sm font-medium">{post.label}</span>
                  <span className="text-[10px] uppercase text-text-muted">
                    {t(`types.${post.type}`)}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-text-secondary">
                  {post.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 text-[10px] text-text-muted">
        {(["product", "story", "reel", "promo"] as const).map((type) => (
          <span key={type} className="inline-flex items-center gap-1">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: SMM_CONTENT_COLORS[type] }}
            />
            {t(`types.${type}`)}
          </span>
        ))}
      </div>
    </div>
  );
}
