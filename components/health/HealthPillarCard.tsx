"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const t = useTranslations("health.pillars");
  const tStatus = useTranslations("status");

  const label = t(pillar.id);
  const statusLabel = tStatus(pillar.status);

  return (
    <div className="rounded-xl border border-border bg-surface p-3 transition-transform duration-300 md:p-5 md:hover:scale-[1.02]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-[44px] w-full items-center gap-3 text-left md:pointer-events-none md:min-h-0"
        aria-expanded={open}
      >
        <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", statusBarColors[pillar.status])} />
        <h4 className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary">
          {label}
        </h4>
        <span className="rounded-full border border-border px-2 py-1 font-mono text-xs text-accent">
          {pillar.score}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-text-muted transition-transform md:hidden",
            open && "rotate-180"
          )}
        />
      </button>
      <div className="hidden md:mt-3 md:flex md:items-center md:justify-between">
        <div />
        <TrendBadge direction={pillar.trend} delta={pillar.delta} />
      </div>
      <div className="hidden md:mb-3 md:mt-3 md:flex md:items-baseline md:gap-1">
        <span className="text-2xl font-mono font-bold">{pillar.score}</span>
        <span className="text-text-muted text-sm">/ 100</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border md:mb-2 md:mt-0">
        <div
          className={cn("h-full rounded-full", statusBarColors[pillar.status])}
          style={{ width: `${pillar.score}%` }}
        />
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xs text-text-secondary">{statusLabel}</p>
              <TrendBadge direction={pillar.trend} delta={pillar.delta} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="hidden text-xs text-text-secondary md:block">{statusLabel}</p>
    </div>
  );
}
