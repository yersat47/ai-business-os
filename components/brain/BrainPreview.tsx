"use client";

import { useTranslations } from "next-intl";
import { ScoreRing } from "@/components/shared/ScoreRing";
import { BrainCoverageBar } from "./BrainCoverageBar";
import { MOCK_BRAIN } from "@/lib/mock/mock-brain";

export function BrainPreview() {
  const t = useTranslations("mock.brain");

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col items-center">
        <ScoreRing score={MOCK_BRAIN.coveragePct} size="lg" animated />
        <p className="text-text-secondary mt-4">
          {t("coverageLabel", { pct: MOCK_BRAIN.coveragePct })}
        </p>
      </div>
      <div className="space-y-4">
        {MOCK_BRAIN.categories.map((cat) => (
          <BrainCoverageBar
            key={cat.id}
            label={t(`categories.${cat.id}`)}
            count={cat.count}
            pct={cat.pct}
          />
        ))}
      </div>
    </div>
  );
}
