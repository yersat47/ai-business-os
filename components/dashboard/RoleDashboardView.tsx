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

const roleAgentIds: Record<UserRole, string> = {
  owner: "analyst",
  manager: "manager",
  marketer: "marketer",
  smm: "smm",
  accountant: "accountant",
  salesperson: "manager",
  administrator: "analyst",
};

const roleConfig: Record<
  UserRole,
  { titleKey: string; metrics: string[] }
> = {
  owner: {
    titleKey: "owner",
    metrics: ["healthScore", "profitPotential", "allKpis"],
  },
  manager: {
    titleKey: "manager",
    metrics: ["conversion", "teamPerformance", "inventory"],
  },
  marketer: {
    titleKey: "marketer",
    metrics: ["cac", "roas", "retention"],
  },
  smm: {
    titleKey: "smm",
    metrics: ["engagement", "storyViews", "dmConversion"],
  },
  accountant: {
    titleKey: "accountant",
    metrics: ["grossMargin", "cashReserve", "breakeven"],
  },
  salesperson: {
    titleKey: "salesperson",
    metrics: ["personalRevenue", "dailyTarget", "upt"],
  },
  administrator: {
    titleKey: "administrator",
    metrics: ["dataCompleteness", "missingFields", "tasks"],
  },
};

export function RoleDashboardView() {
  const t = useTranslations("roleDashboard");
  const tAgents = useTranslations("mock.agents");
  const tRoleDash = useTranslations("mock.roleDashboard");
  const role = useAuthStore((s) => s.user?.role ?? "owner");
  const config = roleConfig[role];
  const agentId = roleAgentIds[role];
  const agentLabel =
    role === "administrator"
      ? tRoleDash("administrator")
      : tAgents(`${agentId}.name`);

  return (
    <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h3 className="font-semibold text-sm md:text-base">{t(`titles.${config.titleKey}`)}</h3>
        <Badge variant="accent">{agentLabel}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3">
        {config.metrics.map((metric) => (
          <div
            key={metric}
            className="min-h-[72px] rounded-xl border border-border bg-surface p-3 md:p-4"
          >
            <p className="text-xs text-text-muted mb-1">
              {t(`metrics.${metric}`)}
            </p>
            <p className="truncate font-mono font-bold text-base text-accent md:text-lg">
              {roleMetricValues[role][metric] ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
