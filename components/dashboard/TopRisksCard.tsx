"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useHealthStore } from "@/lib/stores/health.store";
import { formatCurrency } from "@/lib/utils/formatters";

const severityDot: Record<string, string> = {
  critical: "bg-danger",
  warning: "bg-warning",
};

export function TopRisksCard() {
  const risks = useHealthStore((s) => s.health.topRisks);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-2xl border border-border bg-surface p-6 shadow-card"
    >
      <h3 className="font-semibold text-lg mb-6">Top Risks</h3>
      <div className="space-y-6">
        {risks.map((risk) => (
          <div key={risk.id} className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`h-2 w-2 rounded-full ${severityDot[risk.severity]}`}
              />
              <span className="font-medium text-sm">{risk.title}</span>
              <Badge variant="outline" className="text-[10px]">
                {risk.pillar}
              </Badge>
              <span className="font-mono text-xs text-danger ml-auto">
                {formatCurrency(risk.impact)}
              </span>
            </div>
            <p className="text-xs text-text-secondary pl-4">{risk.description}</p>
            <Badge variant="info" className="ml-4 text-[10px]">
              {risk.agent}
            </Badge>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
