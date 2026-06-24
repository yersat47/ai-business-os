"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { useHealthStore } from "@/lib/stores/health.store";
import { formatCurrency } from "@/lib/utils/formatters";

const severityDot: Record<string, string> = {
  critical: "bg-danger",
  warning: "bg-warning",
};

export function TopRisksCard() {
  const t = useTranslations("dashboard.risks");
  const tMock = useTranslations("mock.risks");
  const tPillars = useTranslations("health.pillars");
  const risks = useHealthStore((s) => s.health.topRisks);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-2xl border border-border bg-surface p-4 shadow-card md:p-6"
    >
      <h3 className="mb-4 font-semibold text-base md:mb-6 md:text-lg">{t("title")}</h3>
      <div className="space-y-3 md:space-y-6">
        {risks.map((risk) => (
          <div
            key={risk.id}
            className="space-y-2 rounded-xl border border-border bg-surface-raised p-3 md:border-0 md:bg-transparent md:p-0"
          >
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${severityDot[risk.severity]}`}
              />
              <span className="truncate text-sm font-medium">
                {tMock(`${risk.id}.title`)}
              </span>
              <span className="font-mono text-xs text-danger">
                {formatCurrency(risk.impact)}
              </span>
              <Badge variant="outline" className="col-start-2 w-fit text-[10px]">
                {tPillars(risk.pillar)}
              </Badge>
            </div>
            <p className="line-clamp-2 pl-4 text-xs text-text-secondary md:line-clamp-none">
              {tMock(`${risk.id}.description`)}
            </p>
            <Badge variant="info" className="ml-4 text-[10px]">
              {tMock(`${risk.id}.agent`)}
            </Badge>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
