"use client";

import { Activity, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useHealthStore } from "@/lib/stores/health.store";
import { useCompanyStore } from "@/lib/stores/company.store";
import { useProfitStore } from "@/lib/stores/profit.store";
import { hasBusinessMetrics } from "@/lib/utils/has-business-metrics";
import { formatCurrency } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";

function healthColor(score: number) {
  if (score >= 70) return "text-success";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

function HealthBadge({ score }: { score: number }) {
  const t = useTranslations("topbar");
  const color = healthColor(score);

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Activity size={14} className={color} />
      <span className="text-text-muted">{t("health")}:</span>
      <span className={cn("font-semibold tabular-nums", color)}>{score}</span>
    </div>
  );
}

function ProfitBadge({ amount, showDemo }: { amount: number; showDemo?: boolean }) {
  const t = useTranslations("topbar");
  const tCommon = useTranslations("common");

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <TrendingUp size={14} className="text-accent" />
      <span className="text-text-muted">{t("potential")}:</span>
      <span className="font-semibold text-accent tabular-nums">
        +{formatCurrency(amount, "₸", true)}
      </span>
      {showDemo && (
        <span className="text-[10px] text-text-muted/60">({tCommon("demo")})</span>
      )}
    </div>
  );
}

function NoDataIndicator() {
  const t = useTranslations("topbar");

  return (
    <div className="flex items-center gap-1.5 text-sm text-text-muted/80">
      <Activity size={14} />
      <span>{t("noData")}</span>
      <Link href="/data" className="text-accent text-xs underline ml-1 hover:text-accent-light">
        {t("fillData")}
      </Link>
    </div>
  );
}

export function TopBarIndicators() {
  const health = useHealthStore((s) => s.health);
  const company = useCompanyStore((s) => s.company);
  const profit = useProfitStore((s) => s.profit);
  const isAIGenerated = useProfitStore((s) => s.isAIGenerated);
  const hasData = hasBusinessMetrics(company);

  if (!hasData) {
    return <NoDataIndicator />;
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
      <HealthBadge score={health.masterScore} />
      <span className="text-border text-text-muted hidden sm:inline">·</span>
      <ProfitBadge
        amount={profit.totalRecoverable}
        showDemo={!isAIGenerated}
      />
    </div>
  );
}
