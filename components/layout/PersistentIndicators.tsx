"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Activity, TrendingUp } from "lucide-react";
import { useHealthStore } from "@/lib/stores/health.store";
import { useCompanyStore } from "@/lib/stores/company.store";
import { hasBusinessMetrics } from "@/lib/utils/has-business-metrics";
import { MOCK_PROFIT } from "@/lib/mock/mock-profit";
import { formatCurrency } from "@/lib/utils/formatters";
import { Link } from "@/i18n/navigation";

export function PersistentIndicators() {
  const pathname = usePathname();
  const t = useTranslations("indicators");
  const health = useHealthStore((s) => s.health);
  const company = useCompanyStore((s) => s.company);
  const hasData = hasBusinessMetrics(company);

  const isDashboard =
    pathname.endsWith("/dashboard") || pathname.match(/\/(ru|kk|en)\/?$/);

  if (isDashboard) return null;

  return (
    <AnimatePresence>
      <motion.div
        layoutId="persistent-indicators"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-40 md:left-60"
      >
        <div className="mx-4 mb-4 rounded-2xl border border-border bg-surface/95 backdrop-blur-md shadow-card px-4 py-3 flex items-center justify-center gap-6">
          <Link
            href="/health"
            className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
          >
            <Activity className="h-4 w-4 text-accent" />
            <span className="text-text-secondary">{t("health")}:</span>
            <span className="font-mono font-bold text-text-primary">
              {hasData ? health.masterScore : "—"}
            </span>
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
          >
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-text-secondary">{t("potential")}:</span>
            <span className="font-mono font-bold text-accent">
              {hasData ? `+${formatCurrency(MOCK_PROFIT.totalRecoverable)}` : "—"}
            </span>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
