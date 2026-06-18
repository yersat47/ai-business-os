"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TrendingDown, Gauge, Network, Hexagon } from "lucide-react";

const pillarKeys = [
  { key: "profitEngine" as const, icon: TrendingDown },
  { key: "healthSystem" as const, icon: Gauge },
  { key: "companyBrain" as const, icon: Network },
  { key: "aiTeam" as const, icon: Hexagon },
];

export function PillarsSection() {
  const t = useTranslations("landing.pillars");

  return (
    <section className="py-24 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 tracking-tight">
          {t("heading")}
        </h2>
        <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {pillarKeys.map((pillar, i) => (
            <motion.div
              key={pillar.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-surface p-6 hover:border-border-bright hover:scale-[1.01] transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <pillar.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t(`${pillar.key}.title`)}</h3>
              <p className="text-text-secondary text-sm">{t(`${pillar.key}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
