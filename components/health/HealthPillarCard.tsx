"use client";

import { useTranslations } from "next-intl";
import { TrendBadge } from "@/components/shared/TrendBadge";
import type { PillarScore } from "@/lib/types/health.types";
import { cn } from "@/lib/utils/cn";

const statusBarColors: Record<string, string> = {
  critical: "bg-danger",
  warning: "bg-warning",
  healthy: "bg-success",
  stable: "bg-accent",
  excellent: "bg-success",
};

interface HealthPillarCardProps {
  pillar: PillarScore;
}

export function HealthPillarCard({ pillar }: HealthPillarCardProps) {
  const t = useTranslations("health.pillars");
  const tStatus = useTranslations("status");

  const label = t(pillar.id);
  const statusLabel = tStatus(pillar.status);

  return (
    <div className="rounded-xl border border-border bg-surface p-5 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-sm text-text-primary">{label}</h4>
        <TrendBadge direction={pillar.trend} delta={pillar.delta} />
      </div>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-mono font-bold">{pillar.score}</span>
        <span className="text-text-muted text-sm">/ 100</span>
      </div>
      <div className="h-1.5 rounded-full bg-border overflow-hidden mb-2">
        <div
          className={cn("h-full rounded-full", statusBarColors[pillar.status])}
          style={{ width: `${pillar.score}%` }}
        />
      </div>
      <p className="text-xs text-text-secondary">{statusLabel}</p>
    </div>
  );
}
