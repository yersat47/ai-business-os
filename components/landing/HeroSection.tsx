"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { KazakhPixelOrnament } from "@/components/decorative/KazakhPixelOrnament";

export function HeroSection() {
  const t = useTranslations("landing.hero");
  const words = t("heading").split(" ");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      <KazakhPixelOrnament
        variant="hero"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
      />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("description")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="bronze" size="lg" asChild>
            <Link href="/register">{t("startFree")}</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#demo">{t("seeHowItWorks")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
