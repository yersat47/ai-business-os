"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useHealthStore } from "@/lib/stores/health.store";
import { formatCurrency } from "@/lib/utils/formatters";

export function ExecutiveBriefing() {
  const health = useHealthStore((s) => s.health);

  const briefing = `Urban Mode is in Stable health at ${health.masterScore}/100, improving by ${health.trendDelta} points since last month. Your strongest area is Team Performance (83). Critical attention required: ₸1.1M in dead stock is your biggest drag on inventory health. Marketing CAC at ₸4,800 is 60% above industry benchmark. Recommended focus this week: launch clearance campaign to recover ₸750K and start referral program to cut CAC.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border border-border bg-surface p-6 shadow-card border-l-4 border-l-accent md:col-span-2"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">AI Executive Briefing</h3>
        <span className="text-xs text-text-muted">Today, 09:00</span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
          ⬡
        </div>
        <span className="font-medium text-accent">AI CEO</span>
      </div>
      <p className="text-text-secondary text-sm leading-relaxed mb-6">
        {briefing}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {health.topActions.map((action) => (
          <Badge
            key={action.id}
            variant="outline"
            className="border-accent/30 text-accent cursor-default"
          >
            {action.title} · {formatCurrency(action.estimatedRecovery)}
          </Badge>
        ))}
      </div>
      <Link href="/team" className="text-sm text-accent hover:underline">
        Read full briefing →
      </Link>
    </motion.div>
  );
}
