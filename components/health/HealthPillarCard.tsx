"use client";

import { TrendBadge } from "@/components/shared/TrendBadge";
import { Badge } from "@/components/ui/badge";
import type { PillarScore } from "@/lib/types/health.types";
import { cn } from "@/lib/utils/cn";

const borderColors: Record<string, string> = {
  critical: "border-l-danger bg-danger/5",
  warning: "border-l-warning bg-warning/5",
  healthy: "border-l-accent",
  stable: "border-l-accent",
  excellent: "border-l-success",
};

const mockMetrics: Record<string, string[]> = {
  financial: ["Net margin: 11%", "Cash runway: 4.2 months"],
  sales: ["Monthly revenue: ₸8.45M", "AOV: ₸24,500"],
  customer: ["Repeat rate: 28%", "NPS estimate: 42"],
  inventory: ["Dead stock: ₸1.1M", "Turnover: 2.1x"],
  marketing: ["CAC: ₸4,800", "ROAS: 2.4x"],
  team: ["Retention: 92%", "Productivity: High"],
  operations: ["Fulfillment: 98%", "Return rate: 4%"],
  aiReadiness: ["Data coverage: 34%", "Integrations: 0"],
};

const mockAlerts: Record<string, string> = {
  inventory: "₸1.1M dead stock over 90 days",
  marketing: "CAC 60% above benchmark",
  financial: "Net margin below industry target",
  aiReadiness: "Low data coverage limits AI accuracy",
};

interface HealthPillarCardProps {
  pillar: PillarScore;
}

export function HealthPillarCard({ pillar }: HealthPillarCardProps) {
  const metrics = mockMetrics[pillar.id] ?? [];
  const alert = mockAlerts[pillar.id];

  return (
    <div
      className={cn(
        "rounded-2xl border border-border p-6 border-l-4",
        borderColors[pillar.status]
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold">{pillar.label}</h4>
          <span className="text-3xl font-mono font-bold">{pillar.score}</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge
            variant={
              pillar.status === "critical"
                ? "danger"
                : pillar.status === "warning"
                  ? "warning"
                  : "accent"
            }
          >
            {pillar.status}
          </Badge>
          <TrendBadge direction={pillar.trend} delta={pillar.delta} />
        </div>
      </div>
      <ul className="text-xs text-text-secondary space-y-1 mb-3">
        {metrics.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      {alert && (
        <p className="text-xs text-warning border-t border-border pt-3">
          ⚠ {alert}
        </p>
      )}
    </div>
  );
}
