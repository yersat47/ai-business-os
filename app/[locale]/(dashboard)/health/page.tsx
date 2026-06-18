"use client";

import { useTranslations } from "next-intl";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { HealthScoreWidget } from "@/components/dashboard/HealthScoreWidget";
import { HealthPillarCard } from "@/components/health/HealthPillarCard";
import { AlertBanner } from "@/components/health/AlertBanner";
import { useHealthStore } from "@/lib/stores/health.store";
import { toast } from "@/hooks/use-toast";

export default function HealthPage() {
  const t = useTranslations("health");
  const health = useHealthStore((s) => s.health);
  const topRisks = health.topRisks.slice(0, 2);

  return (
    <DashboardShell title={t("title")}>
      <div className="space-y-8 max-w-4xl">
        <p className="text-sm text-text-secondary">{t("subtitle")}</p>

        <HealthScoreWidget expanded />

        <div className="grid sm:grid-cols-2 gap-4">
          {health.pillars.map((pillar) => (
            <HealthPillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>

        {topRisks.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t("alerts", { count: topRisks.length })}
            </h3>
            <div className="space-y-3">
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
      </div>
    </DashboardShell>
  );
}
