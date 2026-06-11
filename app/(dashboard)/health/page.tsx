"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { HealthScoreWidget } from "@/components/dashboard/HealthScoreWidget";
import { HealthPillarCard } from "@/components/health/HealthPillarCard";
import { HealthTrendChart } from "@/components/health/HealthTrendChart";
import { AlertBanner } from "@/components/health/AlertBanner";
import { useHealthStore } from "@/lib/stores/health.store";
import { useAuthStore } from "@/lib/stores/auth.store";
import { getVisiblePillars } from "@/lib/utils/permissions";
import type { UserRole } from "@/lib/types/company.types";
import { toast } from "@/hooks/use-toast";

const roles: UserRole[] = [
  "owner",
  "manager",
  "marketer",
  "accountant",
  "salesperson",
  "smm",
  "administrator",
];

export default function HealthPage() {
  const health = useHealthStore((s) => s.health);
  const user = useAuthStore((s) => s.user);
  const setRole = useAuthStore((s) => s.setRole);
  const role = user?.role ?? "owner";
  const visiblePillars = getVisiblePillars(role);

  const pillars =
    visiblePillars === "all"
      ? health.pillars
      : health.pillars.filter((p) => visiblePillars.includes(p.id));

  return (
    <DashboardShell title="Business Health">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            Showing: {role} view
            {visiblePillars !== "all" && ` (${pillars.length} pillars)`}
          </p>
          <Select
            value={role}
            onValueChange={(v) => setRole(v as UserRole)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="View as role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((r) => (
                <SelectItem key={r} value={r}>
                  View as {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <HealthScoreWidget expanded />

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="font-semibold mb-4">6-Month Trend</h3>
          <HealthTrendChart />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar) => (
            <HealthPillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">
            Active Alerts ({health.topRisks.length})
          </h3>
          <div className="space-y-3">
            {health.topRisks.map((risk) => (
              <AlertBanner
                key={risk.id}
                risk={risk}
                onViewAction={() =>
                  toast({
                    title: risk.title,
                    description: "Viewing recommended action for this risk.",
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
