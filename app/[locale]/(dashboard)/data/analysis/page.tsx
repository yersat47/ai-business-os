"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { DataAnalysisReport } from "@/components/analysis/DataAnalysisReport";
import { useMetricsStore } from "@/lib/stores/metrics.store";

export default function DataAnalysisPage() {
  const t = useTranslations("data.analysis");
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const latestReport = useMetricsStore((s) => s.latestReport);

  useEffect(() => {
    if (useMetricsStore.persist.hasHydrated()) {
      setReady(true);
      return;
    }
    return useMetricsStore.persist.onFinishHydration(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready && !latestReport) {
      router.replace("/data");
    }
  }, [ready, latestReport, router]);

  if (!ready || !latestReport) {
    return (
      <DashboardShell title={t("pageTitle")}>
        <div className="flex min-h-[40vh] items-center justify-center text-text-muted">
          {t("loading")}
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title={t("pageTitle")}>
      <DataAnalysisReport report={latestReport} />
    </DashboardShell>
  );
}
