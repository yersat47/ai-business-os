"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { useHealthStore } from "@/lib/stores/health.store";
import { useFeedbackStore } from "@/lib/stores/feedback.store";
import { formatCurrency } from "@/lib/utils/formatters";

export function ExecutiveBriefing() {
  const t = useTranslations("dashboard.briefing");
  const tCommon = useTranslations("common");
  const health = useHealthStore((s) => s.health);
  const analystMessage = useFeedbackStore((s) =>
    s.messages.find((m) => m.agentId === "analyst")
  );

  const briefing =
    analystMessage?.text ??
    (health.masterScore > 0
      ? t("emptyWithScore", { score: health.masterScore })
      : t("empty"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border border-border bg-surface p-4 shadow-card border-l-4 border-l-accent md:p-6 lg:col-span-2"
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-semibold text-base md:text-lg">{t("title")}</h3>
        <span className="text-xs text-text-muted">{tCommon("today")}</span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
          ⬡
        </div>
        <span className="font-medium text-accent">{t("agentName")}</span>
      </div>
      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-text-secondary md:mb-6 md:line-clamp-none">
        {briefing}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {health.topActions.map((action) => (
          <Badge
            key={action.id}
            variant="outline"
            className="max-w-full cursor-default truncate border-accent/30 text-accent"
          >
            {action.title} · {formatCurrency(action.estimatedRecovery)}
          </Badge>
        ))}
      </div>
      <Link href="/team" className="inline-flex min-h-[44px] items-center text-sm text-accent hover:underline">
        {t("viewTeam")}
      </Link>
    </motion.div>
  );
}
