"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useHealthStore } from "@/lib/stores/health.store";
import { useMetricsStore } from "@/lib/stores/metrics.store";
import { calculateDataCompleteness } from "@/lib/data-completeness/calculator";

export function DataCompletenessCard() {
  const t = useTranslations("dashboard.dataCompleteness");
  const completeness = useHealthStore((s) => s.health.dataCompleteness);
  const metrics = useMetricsStore((s) => s.currentMonthMetrics);

  if (completeness >= 90) return null;

  const result = calculateDataCompleteness(metrics);

  const headlineKey =
    completeness >= 60
      ? "headline.mid"
      : completeness >= 30
        ? "headline.low"
        : "headline.veryLow";

  const bodyKey =
    completeness >= 60
      ? "body.mid"
      : completeness >= 30
        ? "body.low"
        : "body.veryLow";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-2xl border border-border bg-surface p-4 shadow-card md:p-6"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-lg">{t("title")}</h3>
          <p className="text-sm text-text-secondary">{t(headlineKey, { percent: completeness })}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-accent">{completeness}%</div>
        </div>
      </div>

      <div className="h-2 rounded-full bg-border overflow-hidden mb-4">
        <div
          className="h-full bg-accent rounded-full"
          style={{ width: `${completeness}%` }}
        />
      </div>

      <p className="text-sm text-text-secondary mb-3">
        {t(bodyKey, { count: result.missing_fields.length })}
      </p>

      <div className="rounded-xl border border-border bg-card/40 p-3 mb-4">
        <div className="text-xs font-semibold text-text-muted mb-2">
          {t("quickWins.title")}
        </div>
        <ul className="space-y-2">
          {result.quick_wins.map((f) => (
            <li key={f.field_key} className="flex items-center justify-between gap-3">
              <span className="text-sm text-text-secondary">{f.display_name}</span>
              <span className="text-xs text-text-muted">
                {t("quickWins.time", { minutes: f.estimated_time_to_add_minutes })}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Button variant="outline" size="sm" className="min-h-[44px] w-full sm:w-auto" asChild>
        <Link href="/data">{t("cta")}</Link>
      </Button>
    </motion.div>
  );
}
