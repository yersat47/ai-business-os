"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { MOCK_BRAIN } from "@/lib/mock/mock-brain";
import { useHealthStore } from "@/lib/stores/health.store";

export function DataCompletenessCard() {
  const t = useTranslations("dashboard.brain");
  const completeness = useHealthStore((s) => s.health.dataCompleteness);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-2xl border border-border bg-surface p-6 shadow-card"
    >
      <h3 className="font-semibold text-lg mb-4">{t("title")}</h3>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-mono font-bold text-accent">
          {MOCK_BRAIN.coveragePct}%
        </span>
        <span className="text-sm text-text-secondary mb-1">{t("populated")}</span>
      </div>
      <div className="h-2 rounded-full bg-border overflow-hidden mb-4">
        <div
          className="h-full bg-accent rounded-full"
          style={{ width: `${MOCK_BRAIN.coveragePct}%` }}
        />
      </div>
      <p className="text-warning text-sm mb-3">
        {t("missingAreas", { count: MOCK_BRAIN.missingAreas.length })}
      </p>
      <ul className="text-xs text-text-secondary space-y-1 mb-4">
        {MOCK_BRAIN.missingAreas.slice(0, 3).map((area) => (
          <li key={area}>• {area}</li>
        ))}
      </ul>
      <p className="text-xs text-text-muted mb-4">
        Data completeness: {completeness}%
      </p>
      <Button variant="outline" size="sm" asChild>
        <Link href="/data">{t("completeBrain")}</Link>
      </Button>
    </motion.div>
  );
}
