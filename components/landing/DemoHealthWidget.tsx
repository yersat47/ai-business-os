"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/shared/ScoreRing";
import { MOCK_HEALTH } from "@/lib/mock/mock-health";

export function DemoHealthWidget() {
  const t = useTranslations("landing.demo");

  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-surface p-8 text-center"
        >
          <Badge variant="accent" className="mb-4">{t("badge")}</Badge>
          <h2 className="text-2xl font-bold mb-2">{t("heading")}</h2>
          <p className="text-text-secondary text-sm mb-8">{t("demoLabel")}</p>
          <div className="flex justify-center mb-6">
            <ScoreRing score={MOCK_HEALTH.masterScore} size="md" animated />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {MOCK_HEALTH.topRisks.map((risk) => (
              <Badge
                key={risk.id}
                variant={risk.severity === "critical" ? "danger" : "warning"}
              >
                {risk.title}
              </Badge>
            ))}
          </div>
          <Button variant="bronze" asChild>
            <Link href="/register">{t("ctaButton")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
