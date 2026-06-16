"use client";

import { useTranslations } from "next-intl";
import { useAuthStore } from "@/lib/stores/auth.store";
import type { UserRole } from "@/lib/types/company.types";
import { Badge } from "@/components/ui/badge";

const roleMetricValues: Record<UserRole, Record<string, string>> = {
  owner: { healthScore: "72", profitPotential: "+₸1.2M", allKpis: "8/12" },
  manager: { conversion: "3.2%", teamPerformance: "87%", inventory: "₸4.8M" },
  marketer: { cac: "₸2,400", roas: "4.1x", retention: "68%" },
  smm: { engagement: "5.8%", storyViews: "12.4K", dmConversion: "2.1%" },
  accountant: { grossMargin: "58%", cashReserve: "₸890K", breakeven: "₸1.1M" },
  salesperson: { personalRevenue: "₸420K", dailyTarget: "78%", upt: "1.6" },
  administrator: { dataCompleteness: "72%", missingFields: "14", tasks: "6" },
};

const roleConfig: Record<
  UserRole,
  { titleKey: string; metrics: string[]; agent: string }
> = {
  owner: {
    titleKey: "owner",
    metrics: ["healthScore", "profitPotential", "allKpis"],
    agent: "AI Analyst",
  },
  manager: {
    titleKey: "manager",
    metrics: ["conversion", "teamPerformance", "inventory"],
    agent: "AI Manager",
  },
  marketer: {
    titleKey: "marketer",
    metrics: ["cac", "roas", "retention"],
    agent: "AI Marketer",
  },
  smm: {
    titleKey: "smm",
    metrics: ["engagement", "storyViews", "dmConversion"],
    agent: "AI SMM",
  },
  accountant: {
    titleKey: "accountant",
    metrics: ["grossMargin", "cashReserve", "breakeven"],
    agent: "AI Accountant",
  },
  salesperson: {
    titleKey: "salesperson",
    metrics: ["personalRevenue", "dailyTarget", "upt"],
    agent: "AI Manager",
  },
  administrator: {
    titleKey: "administrator",
    metrics: ["dataCompleteness", "missingFields", "tasks"],
    agent: "AI Administrator",
  },
};

export function RoleDashboardView() {
  const t = useTranslations("roleDashboard");
  const role = useAuthStore((s) => s.user?.role ?? "owner");
  const config = roleConfig[role];

  return (
    <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{t(`titles.${config.titleKey}`)}</h3>
        <Badge variant="accent">{config.agent}</Badge>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {config.metrics.map((metric) => (
          <div
            key={metric}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <p className="text-xs text-text-muted mb-1">
              {t(`metrics.${metric}`)}
            </p>
            <p className="font-mono font-bold text-lg text-accent">
              {roleMetricValues[role][metric] ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
