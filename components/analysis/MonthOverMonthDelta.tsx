"use client";

import { useTranslations } from "next-intl";
import { TrendBadge } from "@/components/shared/TrendBadge";
import type { AnalysisReport } from "@/lib/types/analysis-report.types";
import { grossMarginPct, netMarginPct } from "@/lib/profit-engine/formulas";
import { formatCurrency } from "@/lib/utils/formatters";

interface MonthOverMonthDeltaProps {
  report: AnalysisReport;
}

function pctDelta(current: number, prior: number): number {
  if (prior <= 0) return 0;
  return ((current - prior) / prior) * 100;
}

function ptsDelta(current: number | null, prior: number | null): number {
  if (current === null || prior === null) return 0;
  return Math.round((current - prior) * 10) / 10;
}

export function MonthOverMonthDelta({ report }: MonthOverMonthDeltaProps) {
  const t = useTranslations("data.analysis");

  if (!report.prevMetrics) return null;

  const currentRevenue = report.metrics.monthly_revenue ?? 0;
  const prevRevenue = report.prevRevenue ?? 0;
  const revenueDelta = pctDelta(currentRevenue, prevRevenue);

  const currentGm = grossMarginPct(report.metrics);
  const prevGm = report.prevGrossMargin;
  const gmDelta = ptsDelta(currentGm, prevGm);

  const currentNm = netMarginPct(report.metrics);
  const prevNm = report.prevNetMargin;
  const nmDelta = ptsDelta(currentNm, prevNm);

  const healthBefore = report.prevHealthScore ?? 0;
  const healthAfter = report.health.masterScore;
  const healthDelta = healthAfter - healthBefore;

  const cards = [
    {
      id: "health",
      label: t("delta.healthScore"),
      before: healthBefore,
      after: healthAfter,
      delta: healthDelta,
      format: "score" as const,
    },
    {
      id: "revenue",
      label: t("delta.revenue"),
      before: prevRevenue,
      after: currentRevenue,
      delta: revenueDelta,
      format: "currency" as const,
    },
    {
      id: "grossMargin",
      label: t("delta.grossMargin"),
      before: prevGm,
      after: currentGm,
      delta: gmDelta,
      format: "percent" as const,
    },
    {
      id: "netMargin",
      label: t("delta.netMargin"),
      before: prevNm,
      after: currentNm,
      delta: nmDelta,
      format: "percent" as const,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cards.map((card) => {
        const direction =
          card.delta > 0 ? "up" : card.delta < 0 ? "down" : "flat";
        const beforeText =
          card.format === "currency"
            ? formatCurrency(card.before as number)
            : card.format === "percent"
              ? card.before !== null
                ? `${(card.before as number).toFixed(1)}%`
                : "—"
              : String(card.before);
        const afterText =
          card.format === "currency"
            ? formatCurrency(card.after as number)
            : card.format === "percent"
              ? card.after !== null
                ? `${(card.after as number).toFixed(1)}%`
                : "—"
              : String(card.after);

        return (
          <div
            key={card.id}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <p className="mb-2 text-xs text-text-muted">{card.label}</p>
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-sm text-text-secondary">
                <span>{beforeText}</span>
                <span className="mx-1 text-text-muted">→</span>
                <span className="font-medium text-text-primary">{afterText}</span>
              </div>
              <TrendBadge
                direction={direction}
                delta={
                  card.format === "percent"
                    ? Math.abs(card.delta)
                    : Math.abs(Math.round(card.delta))
                }
                label={
                  card.format === "percent"
                    ? t("delta.pts")
                    : card.format === "currency"
                      ? "%"
                      : undefined
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
