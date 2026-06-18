"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScoreRing } from "@/components/shared/ScoreRing";
import { TrendBadge } from "@/components/shared/TrendBadge";
import { Button } from "@/components/ui/button";
import { useHealthStore } from "@/lib/stores/health.store";
import { useCompanyStore } from "@/lib/stores/company.store";
import { useAuthStore } from "@/lib/stores/auth.store";
import { getVisiblePillars } from "@/lib/utils/permissions";
import { getStatusColor } from "@/lib/utils/formatters";
import { hasBusinessMetrics } from "@/lib/utils/has-business-metrics";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShanyrakArc } from "@/components/shared/ShanyrakArc";

interface HealthScoreWidgetProps {
  expanded?: boolean;
}

const statusColors: Record<string, string> = {
  critical: "bg-danger",
  warning: "bg-warning",
  healthy: "bg-success",
  stable: "bg-accent",
  excellent: "bg-success",
};

export function HealthScoreWidget({ expanded = false }: HealthScoreWidgetProps) {
  const t = useTranslations("dashboard.health");
  const tDash = useTranslations("dashboard");
  const tPillars = useTranslations("health.pillars");
  const tStatus = useTranslations("status");
  const tCommon = useTranslations("common");
  const health = useHealthStore((s) => s.health);
  const company = useCompanyStore((s) => s.company);
  const role = useAuthStore((s) => s.user?.role ?? "owner");
  const visiblePillars = getVisiblePillars(role);
  const hasData = hasBusinessMetrics(company);
  const displayScore = hasData ? health.masterScore : null;

  const pillars =
    visiblePillars === "all"
      ? health.pillars
      : health.pillars.filter((p) => visiblePillars.includes(p.id));

  if (!hasData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl border border-border bg-surface p-6 shadow-card"
      >
        <h3 className="font-semibold text-lg mb-4">{t("title")}</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ScoreRing score={null} size={expanded ? "lg" : "md"} animated={false} />
          <div className="flex-1 text-center md:text-left">
            <p className="text-warning text-sm font-medium mb-2">
              ⚠️ {tDash("noData")}
            </p>
            <p className="text-text-secondary text-sm mb-4">{tDash("noDataDesc")}</p>
            <Button variant="bronze" size="sm" asChild>
              <Link href="/data">{tDash("fillData")}</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl border border-border bg-surface p-6 shadow-card overflow-hidden"
    >
      {expanded && (
        <ShanyrakArc className="absolute -top-20 -right-20 w-64 h-64 opacity-[0.04] pointer-events-none" />
      )}
      <div className="flex items-center justify-between mb-6 relative">
        <h3 className="font-semibold text-lg">{t("title")}</h3>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-text-muted" />
          </TooltipTrigger>
          <TooltipContent>{t("tooltip")}</TooltipContent>
        </Tooltip>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <ScoreRing
          score={displayScore}
          size={expanded ? "lg" : "md"}
          animated
        />
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <span className={`text-sm font-medium ${getStatusColor(health.status)}`}>
              {tStatus(health.status)}
            </span>
            <TrendBadge
              direction={health.trend}
              delta={health.trendDelta}
              label={tCommon("thisMonth")}
            />
          </div>
          <div className="space-y-3">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="text-xs text-text-secondary w-24 truncate">
                  {tPillars(pillar.id)}
                </span>
                <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${statusColors[pillar.status]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pillar.score}%` }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.8 }}
                  />
                </div>
                <span className="font-mono text-xs w-8 text-right">
                  {pillar.score}
                </span>
                <TrendBadge direction={pillar.trend} delta={pillar.delta} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
