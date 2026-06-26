"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { KazakhPixelOrnament } from "@/components/decorative/KazakhPixelOrnament";
import { HealthScoreWidget } from "./HealthScoreWidget";
import { ProfitPotentialWidget } from "./ProfitPotentialWidget";
import { ExecutiveBriefing } from "./ExecutiveBriefing";

export function HeroBriefingSection() {
  const t = useTranslations("dashboard.hero");

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-card md:p-8"
    >
      <KazakhPixelOrnament
        variant="corner"
        className="pointer-events-none absolute right-2 top-2"
      />

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <HealthScoreWidget size="hero" showPillars={false} embedded />
        </div>
        <div className="lg:col-span-4">
          <ProfitPotentialWidget size="hero" embedded />
        </div>
        <div className="lg:col-span-4 flex flex-col justify-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-accent">
            {t("analystLabel")}
          </p>
          <ExecutiveBriefing variant="hero" />
        </div>
      </div>
    </motion.section>
  );
}
