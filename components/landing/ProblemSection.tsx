"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Layers, Sparkles } from "lucide-react";

export function ProblemSection() {
  const t = useTranslations("landing.problem");

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 tracking-tight">
          {t("heading")}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-surface/50 backdrop-blur p-8"
          >
            <div className="flex items-center gap-2 text-danger mb-4">
              <Layers className="h-5 w-5" />
              <span className="text-xs uppercase tracking-widest font-medium">
                {t("before.label")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Excel", "Instagram", "WhatsApp", "Kaspi", "1C"].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-lg bg-surface-raised border border-border text-xs text-text-secondary"
                >
                  {tool}
                </span>
              ))}
            </div>
            <p className="text-text-secondary leading-relaxed">
              {t("before.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-accent/30 bg-surface-raised/50 backdrop-blur p-8"
          >
            <div className="flex items-center gap-2 text-accent mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs uppercase tracking-widest font-medium">
                {t("after.label")}
              </span>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-6">
              <span className="text-2xl text-accent">⬡</span>
            </div>
            <p className="text-text-primary leading-relaxed font-medium mb-2">
              {t("after.tagline")}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t("after.description")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
