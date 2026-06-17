"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { Button } from "@/components/ui/button";
import { MOCK_PROFIT } from "@/lib/mock/mock-profit";
import { formatCurrency } from "@/lib/utils/formatters";
import { useCompanyStore } from "@/lib/stores/company.store";
import { hasBusinessMetrics } from "@/lib/utils/has-business-metrics";

export function ProfitPotentialWidget() {
  const t = useTranslations("dashboard.profit");
  const tDash = useTranslations("dashboard");
  const company = useCompanyStore((s) => s.company);
  const hasData = hasBusinessMetrics(company);

  if (!hasData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-border bg-surface p-6 shadow-card h-full"
      >
        <h3 className="font-semibold text-lg mb-1">{t("title")}</h3>
        <p className="text-sm text-text-secondary mb-6">{t("subtitle")}</p>
        <p className="text-3xl font-mono font-bold text-text-muted mb-4">—</p>
        <p className="text-text-secondary text-sm mb-4">{tDash("noDataDesc")}</p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/data">{tDash("fillData")}</Link>
        </Button>
      </motion.div>
    );
  }

  const maxAmount = Math.max(...MOCK_PROFIT.breakdown.map((b) => b.amount));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="rounded-2xl border border-border bg-surface p-6 shadow-card h-full"
    >
      <h3 className="font-semibold text-lg mb-1">{t("title")}</h3>
      <p className="text-sm text-text-secondary mb-6">{t("subtitle")}</p>
      <CurrencyDisplay
        amount={MOCK_PROFIT.totalRecoverable}
        size="lg"
        animated
      />
      <p className="text-success text-sm mt-2 mb-6">
        {t("growthPotential", { pct: MOCK_PROFIT.growthPotentialPct })}
      </p>
      <div className="space-y-4">
        {MOCK_PROFIT.breakdown.map((item, i) => (
          <div key={item.category}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">
                {item.categoryKey
                  ? t(`breakdown.${item.categoryKey}` as "breakdown.deadStock")
                  : item.category}
              </span>
              <span className="font-mono text-accent">
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
            <div className="mt-1">
              <ConfidenceBadge confidence={item.confidence} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-text-muted mt-6">
        {t("vsLastMonth")} · {formatCurrency(company.monthlyRevenue || MOCK_PROFIT.monthlyRevenue)}
      </p>
    </motion.div>
  );
}
