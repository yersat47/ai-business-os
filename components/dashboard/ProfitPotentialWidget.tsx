"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/formatters";
import { useMetricsStore } from "@/lib/stores/metrics.store";
import { useCompanyStore } from "@/lib/stores/company.store";
import { hasBusinessMetrics } from "@/lib/utils/has-business-metrics";

export function ProfitPotentialWidget() {
  const t = useTranslations("dashboard.profit");
  const tDash = useTranslations("dashboard");
  const company = useCompanyStore((s) => s.company);
  const profitOutput = useMetricsStore((s) => s.profitOutput);
  const hasData = hasBusinessMetrics(company) && profitOutput !== null;

  if (!hasData || !profitOutput) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="h-full rounded-2xl border border-border bg-surface p-4 shadow-card md:p-6"
      >
        <h3 className="font-semibold text-lg mb-1">{t("title")}</h3>
        <p className="text-sm text-text-secondary mb-6">{t("subtitle")}</p>
        <p className="text-3xl font-mono font-bold text-text-muted mb-4">—</p>
        <p className="text-text-secondary text-sm mb-4">{tDash("noDataDesc")}</p>
        <Button variant="outline" size="sm" className="min-h-[44px]" asChild>
          <Link href="/data">{tDash("fillData")}</Link>
        </Button>
      </motion.div>
    );
  }

  const { monthlyProfitPotential, findings } = profitOutput;
  const breakdownItems = [
    { key: "retention", amount: monthlyProfitPotential.breakdown.retention },
    { key: "deadStock", amount: monthlyProfitPotential.breakdown.inventoryRecovery },
    { key: "cac", amount: monthlyProfitPotential.breakdown.marketingWasteRecovery },
    { key: "margin", amount: monthlyProfitPotential.breakdown.marginRecovery },
  ].filter((b) => b.amount > 0);

  const maxAmount = Math.max(...breakdownItems.map((b) => b.amount), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="h-full rounded-2xl border border-border bg-surface p-4 shadow-card md:p-6"
    >
      <h3 className="font-semibold text-lg mb-1">{t("title")}</h3>
      <p className="text-sm text-text-secondary mb-4 md:mb-6">{t("subtitle")}</p>
      <CurrencyDisplay amount={monthlyProfitPotential.net} size="lg" animated />
      <p className="text-success text-sm mt-2 mb-6">
        {t("growthPotential", {
          pct:
            company.monthlyRevenue > 0
              ? ((monthlyProfitPotential.net / company.monthlyRevenue) * 100).toFixed(1)
              : "0",
        })}
      </p>
      <div className="space-y-4">
        {breakdownItems.map((item, i) => (
          <div key={item.key}>
            <div className="flex justify-between gap-2 text-sm mb-1">
              <span className="min-w-0 truncate text-text-secondary">
                {t(`breakdown.${item.key}` as "breakdown.deadStock")}
              </span>
              <span className="shrink-0 text-right font-mono text-accent">
                {formatCurrency(item.amount)}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(item.amount / maxAmount) * 100}%` }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <ConfidenceBadge confidence={monthlyProfitPotential.confidence === "high" ? 85 : monthlyProfitPotential.confidence === "medium" ? 65 : 45} />
      </div>
      <p className="text-xs text-text-muted mt-6">
        {t("vsLastMonth")} · {formatCurrency(company.monthlyRevenue)}
        {findings.length > 0 && ` · ${findings.length} ${t("findings")}`}
      </p>
    </motion.div>
  );
}
