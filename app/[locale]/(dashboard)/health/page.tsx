"use client";

import { useTranslations } from "next-intl";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { HealthScoreWidget } from "@/components/dashboard/HealthScoreWidget";
import { HealthPillarCard } from "@/components/health/HealthPillarCard";
import { AlertBanner } from "@/components/health/AlertBanner";
import { HealthTrendChart } from "@/components/health/HealthTrendChart";
import { useHealthStore } from "@/lib/stores/health.store";
import { toast } from "@/hooks/use-toast";

export default function HealthPage() {
  const t = useTranslations("health");
  const health = useHealthStore((s) => s.health);
  const topRisks = health.topRisks.slice(0, 2);

  return (
    <DashboardShell title={t("title")}>
      <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
        <p className="text-sm text-text-secondary">{t("subtitle")}</p>

        {topRisks.length > 0 && (
          <div>
            <h3 className="mb-3 font-semibold text-base md:mb-4 md:text-lg">
              {t("alerts", { count: topRisks.length })}
            </h3>
            <div className="space-y-2 md:space-y-3">
              {topRisks.map((risk) => (
                <AlertBanner
                  key={risk.id}
                  risk={risk}
                  onViewAction={() =>
                    toast({
                      title: risk.title,
                      description: t("viewActionDesc"),
                    })
                  }
                />
              ))}
            </div>
          </div>
        )}

        <HealthScoreWidget expanded />

        <div className="rounded-2xl border border-border bg-surface p-4 shadow-card md:p-6">
          <h3 className="mb-4 font-semibold text-base md:text-lg">
            {t("trend")}
          </h3>
          <HealthTrendChart />
        </div>

        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {health.pillars.map((pillar) => (
            <HealthPillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
