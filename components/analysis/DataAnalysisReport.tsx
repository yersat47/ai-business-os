"use client";

import { CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { HealthPillarCard } from "@/components/health/HealthPillarCard";
import { CalculationRow } from "@/components/analysis/CalculationRow";
import { MonthOverMonthDelta } from "@/components/analysis/MonthOverMonthDelta";
import { AgentMessageFeed } from "@/components/analysis/AgentMessageFeed";
import type { AnalysisReport } from "@/lib/types/analysis-report.types";

interface DataAnalysisReportProps {
  report: AnalysisReport;
}

function formatMonthKey(monthKey: string, locale: string): string {
  const [year, month] = monthKey.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
    month: "long",
    year: "numeric",
  });
}

export function DataAnalysisReport({ report }: DataAnalysisReportProps) {
  const t = useTranslations("data.analysis");
  const locale = useLocale();

  const computedTraces = report.traces.filter((r) => r.status === "computed");
  const skippedTraces = report.traces.filter((r) => r.status === "skipped");
  const displayTraces = [...computedTraces, ...skippedTraces];

  const generatedAt = new Date(report.generatedAt).toLocaleString();

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-8">
      <header className="rounded-2xl border border-border bg-surface p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-text-primary md:text-2xl">
              {t("headerTitle")}
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              {t("headerMonth", { month: formatMonthKey(report.monthKey, locale) })}
            </p>
            <p className="mt-0.5 text-xs text-text-muted">
              {t("headerTimestamp", { time: generatedAt })}
            </p>
          </div>
        </div>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold">{t("calculatedTitle")}</h2>
        <div className="space-y-2">
          {displayTraces.length > 0 ? (
            displayTraces.map((row) => <CalculationRow key={row.id} row={row} />)
          ) : (
            <p className="text-sm text-text-muted">{t("noCalculations")}</p>
          )}
        </div>
      </section>

      {report.prevMetrics && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">{t("deltaTitle")}</h2>
          <MonthOverMonthDelta report={report} />
        </section>
      )}

      <section>
        <h2 className="mb-4 text-lg font-semibold">{t("aiFindingsTitle")}</h2>
        <AgentMessageFeed messages={report.feedback} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">{t("healthPillarsTitle")}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {report.health.pillars.map((pillar) => (
            <HealthPillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </section>

      <div className="sticky bottom-[calc(5rem+env(safe-area-inset-bottom))] z-10 flex flex-col gap-3 rounded-2xl border border-border bg-surface/95 p-4 backdrop-blur md:static md:flex-row md:border-0 md:bg-transparent md:p-0">
        <Button variant="bronze" className="min-h-[48px] flex-1" asChild>
          <Link href="/dashboard">{t("goToDashboard")}</Link>
        </Button>
        <Button variant="outline" className="min-h-[48px] flex-1" asChild>
          <Link href="/data">{t("fillMoreData")}</Link>
        </Button>
      </div>
    </div>
  );
}
