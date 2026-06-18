"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { useHealthStore } from "@/lib/stores/health.store";
import { formatCurrency, getEffortColor } from "@/lib/utils/formatters";
import { toast } from "@/hooks/use-toast";

export function TopActionsCard() {
  const t = useTranslations("dashboard.actions");
  const tEffort = useTranslations("mock.effort");
  const actions = useHealthStore((s) => s.health.topActions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl border border-border bg-surface p-4 shadow-card md:p-6"
    >
      <h3 className="mb-4 font-semibold text-base md:mb-6 md:text-lg">{t("title")}</h3>
      <div className="space-y-2 md:space-y-6">
        {actions.map((action) => (
          <div
            key={action.id}
            className="group flex min-h-[56px] cursor-pointer items-center gap-3 rounded-xl border border-border bg-surface-raised p-3 md:min-h-0 md:items-start md:border-0 md:bg-transparent md:p-0"
            onClick={() =>
              toast({
                title: t("queued"),
                description: t("queuedDesc"),
              })
            }
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent md:h-7 md:w-7">
              {action.priority}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="truncate text-sm font-medium">{action.title}</span>
                <Badge
                  variant="outline"
                  className={`hidden shrink-0 text-[10px] sm:inline-flex ${getEffortColor(action.effort)}`}
                >
                  {tEffort(action.effort.toLowerCase() as "low" | "medium" | "high")}
                </Badge>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-text-muted md:opacity-0 md:transition-opacity md:group-hover:opacity-100" />
              </div>
              <p className="mb-2 hidden text-xs text-text-secondary sm:block">
                {action.description}
              </p>
              <div className="flex min-w-0 items-center gap-2">
                <span className="text-xs text-success font-mono">
                  {formatCurrency(action.estimatedRecovery)}
                </span>
                <Badge variant="outline" className="hidden text-[10px] sm:inline-flex">
                  {action.agent}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
