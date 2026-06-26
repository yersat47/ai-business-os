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
import { useHasBusinessMetrics } from "@/hooks/use-has-business-metrics";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShanyrakArc } from "@/components/shared/ShanyrakArc";

interface HealthScoreWidgetProps {
  size?: "compact" | "default" | "hero";
  showPillars?: boolean;
  embedded?: boolean;
}

const statusColors: Record<string, string> = {
  critical: "bg-danger",
  warning: "bg-warning",
  healthy: "bg-success",
  stable: "bg-accent",
  excellent: "bg-success",
};

export function HealthScoreWidget({
  size = "default",
  showPillars = true,
  embedded = false,
}: HealthScoreWidgetProps) {
  const t = useTranslations("dashboard.health");
  const tDash = useTranslations("dashboard");
  const tPillars = useTranslations("health.pillars");
  const tStatus = useTranslations("status");
  const tCommon = useTranslations("common");
  const health = useHealthStore((s) => s.health);
  const company = useCompanyStore((s) => s.company);
  const role = useAuthStore((s) => s.user?.role ?? "owner");
  const visiblePillars = getVisiblePillars(role);
  const hasData = useHasBusinessMetrics();
  const displayScore = hasData ? health.masterScore : null;
  const isHero = size === "hero";
  const ringSize = isHero ? "lg" : size === "compact" ? "sm" : "md";

  const pillars =
    visiblePillars === "all"
      ? health.pillars
      : health.pillars.filter((p) => visiblePillars.includes(p.id));

  const shellClass = embedded
    ? "relative p-0 border-0 shadow-none bg-transparent"
    : "relative overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-card md:p-6";

  if (!hasData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={shellClass}
      >
        <h3 className="font-semibold text-lg mb-4">{t("title")}</h3>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {isHero ? (
            <>
              <div className="md:hidden">
                <ScoreRing score={displayScore} size="md" animated />
              </div>
              <div className="hidden md:block">
                <ScoreRing score={displayScore} size="lg" animated />
              </div>
            </>
          ) : (
            <ScoreRing score={displayScore} size={ringSize} animated={false} />
          )}
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
      className={shellClass}
    >
      {isHero && (
        <ShanyrakArc className="absolute -right-16 -top-16 hidden h-56 w-56 opacity-[0.04] pointer-events-none md:block lg:h-64 lg:w-64" />
      )}
      <div className="flex items-center justify-between mb-4 md:mb-6 relative">
        <h3 className="font-semibold text-base md:text-lg">{t("title")}</h3>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-text-muted" />
          </TooltipTrigger>
          <TooltipContent>{t("tooltip")}</TooltipContent>
        </Tooltip>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {isHero ? (
          <>
            <div className="md:hidden">
              <ScoreRing score={displayScore} size="md" animated />
            </div>
            <div className="hidden md:block">
              <ScoreRing score={displayScore} size="lg" animated />
            </div>
          </>
        ) : (
          <ScoreRing score={displayScore} size={ringSize} animated />
        )}
        <div className="flex-1 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-4 justify-center md:justify-start">
            <span className={`text-sm font-medium ${getStatusColor(health.status)}`}>
              {tStatus(health.status)}
            </span>
            <TrendBadge
              direction={health.trend}
              delta={health.trendDelta}
              label={tCommon("thisMonth")}
            />
          </div>
          {showPillars && (
          <div className="grid grid-cols-2 gap-2 md:block md:space-y-3">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex min-h-[44px] items-center gap-2 rounded-xl border border-border bg-surface-raised px-3 py-2 md:min-h-0 md:gap-3 md:border-0 md:bg-transparent md:p-0"
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${statusColors[pillar.status]} md:hidden`}
                />
                <span className="min-w-0 flex-1 truncate text-xs text-text-secondary md:w-24 md:flex-none">
                  {tPillars(pillar.id)}
                </span>
                <div className="hidden h-1 flex-1 overflow-hidden rounded-full bg-border md:block">
                  <motion.div
                    className={`h-full rounded-full ${statusColors[pillar.status]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pillar.score}%` }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.8 }}
                  />
                </div>
                <span className="font-mono text-xs text-accent md:w-8 md:text-right md:text-text-primary">
                  {pillar.score}
                </span>
                <div className="hidden md:block">
                  <TrendBadge direction={pillar.trend} delta={pillar.delta} />
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
