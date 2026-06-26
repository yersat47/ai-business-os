"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HealthPillarCard } from "@/components/health/HealthPillarCard";
import { useHealthStore } from "@/lib/stores/health.store";

export function HealthPillarsGrid() {
  const t = useTranslations("health");
  const health = useHealthStore((s) => s.health);

  return (
    <section>
      <h3 className="mb-4 font-semibold text-base md:text-lg">
        {t("title")}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {health.pillars.map((pillar, i) => (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <HealthPillarCard pillar={pillar} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
