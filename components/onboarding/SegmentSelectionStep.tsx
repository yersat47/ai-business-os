"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { COLORS, RADIUS } from "@/lib/design/tokens";
import { SEGMENTS } from "@/lib/types/segment.types";
import { useOnboardingStore } from "@/lib/stores/onboarding.store";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { businessTypeFromSegment } from "@/lib/utils/segment-map";
import { OnboardingTip } from "@/components/wizard/OnboardingTip";

export function SegmentSelectionStep() {
  const t = useTranslations("wizard.segment");
  const locale = useLocale();
  const segment = useOnboardingStore((s) => s.segment);
  const setSegment = useOnboardingStore((s) => s.setSegment);
  const setStepData = useWizardStore((s) => s.setStepData);

  const handleSelect = (id: "fashion_retail") => {
    setSegment(id);
    const businessType = businessTypeFromSegment(id);
    if (businessType) {
      setStepData({ businessType, employeeCount: 3, size: "s2_5" });
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="mb-2 text-2xl font-bold">{t("title")}</h2>
      <p className="mb-2 text-text-secondary">{t("subtitle")}</p>
      <OnboardingTip text={t("why")} gain={t("gain")} />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {SEGMENTS.map((item) => {
          const isActive = item.status === "active";
          const isSelected = segment === "fashion_retail" && item.id === "fashion_retail";
          const Icon = item.icon;
          const title = locale === "kk" ? item.titleKk : item.title;

          const card = (
            <motion.div
              key={item.id}
              whileHover={isActive ? { scale: 1.02 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => {
                if (isActive) handleSelect("fashion_retail");
              }}
              style={{
                background: isSelected
                  ? COLORS.bg.cardHover
                  : COLORS.bg.card,
                borderRadius: RADIUS.lg,
                border: isSelected
                  ? `2px solid ${COLORS.accent.bronze}`
                  : `1px solid ${COLORS.bg.border}`,
                boxShadow: isSelected
                  ? `0 0 24px ${COLORS.accent.bronzeGlow}`
                  : undefined,
                opacity: isActive ? 1 : 0.5,
                cursor: isActive ? "pointer" : "not-allowed",
                pointerEvents: isActive ? "auto" : "none",
                padding: 20,
                position: "relative",
              }}
              className="transition-colors hover:border-accent/50"
            >
              {isSelected && (
                <CheckCircle2
                  className="absolute right-3 top-3"
                  size={22}
                  style={{ color: COLORS.accent.bronze }}
                />
              )}
              {!isActive && item.eta && (
                <span
                  className="absolute right-3 top-3 rounded-full px-2 py-1 text-[11px] font-medium"
                  style={{
                    background: COLORS.accent.bronzeMuted,
                    color: COLORS.accent.bronze,
                  }}
                >
                  {t("comingSoonBadge", { eta: item.eta })}
                </span>
              )}
              <Icon
                size={32}
                style={{
                  color: COLORS.accent.bronze,
                  opacity: isActive ? 1 : 0.5,
                  marginBottom: 12,
                }}
              />
              <h3
                className="mb-1 font-semibold"
                style={{ color: COLORS.text.primary }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: COLORS.text.secondary }}>
                {item.description}
              </p>
            </motion.div>
          );

          if (!isActive) {
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <div style={{ pointerEvents: "auto" }}>{card}</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[240px]">
                  {t("comingSoonTooltip", { title })}
                </TooltipContent>
              </Tooltip>
            );
          }

          return card;
        })}
      </div>
    </div>
  );
}
