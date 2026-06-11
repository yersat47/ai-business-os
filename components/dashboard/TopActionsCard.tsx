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
      className="rounded-2xl border border-border bg-surface p-6 shadow-card"
    >
      <h3 className="font-semibold text-lg mb-6">{t("title")}</h3>
      <div className="space-y-6">
        {actions.map((action) => (
          <div
            key={action.id}
            className="group flex gap-3 cursor-pointer"
            onClick={() =>
              toast({
                title: t("queued"),
                description: t("queuedDesc"),
              })
            }
          >
            <div className="h-7 w-7 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold shrink-0">
              {action.priority}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{action.title}</span>
                <Badge
                  variant="outline"
                  className={`text-[10px] ${getEffortColor(action.effort)}`}
                >
                  {tEffort(action.effort.toLowerCase() as "low" | "medium" | "high")}
                </Badge>
                <ArrowRight className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </div>
              <p className="text-xs text-text-secondary mb-2">
                {action.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-success font-mono">
                  {formatCurrency(action.estimatedRecovery)}
                </span>
                <Badge variant="outline" className="text-[10px]">
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
