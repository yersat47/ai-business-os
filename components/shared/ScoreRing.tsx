"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface ScoreRingProps {
  score: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  animated?: boolean;
  showLabel?: boolean;
}

const sizes = {
  sm: { diameter: 80, stroke: 6, fontSize: "text-xl" },
  md: { diameter: 140, stroke: 8, fontSize: "text-4xl" },
  lg: { diameter: 200, stroke: 10, fontSize: "text-5xl" },
};

export function ScoreRing({
  score,
  size = "md",
  color = "#C9923A",
  animated = true,
  showLabel = true,
}: ScoreRingProps) {
  const t = useTranslations("common");
  const { diameter, stroke, fontSize } = sizes[size];
  const radius = (diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);
  const [offset, setOffset] = useState(animated ? circumference : circumference - (score / 100) * circumference);

  useEffect(() => {
    if (!animated) return;
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(score * eased);
      setDisplayScore(current);
      setOffset(circumference - (current / 100) * circumference);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [score, animated, circumference]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={diameter} height={diameter} className="-rotate-90">
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={animated ? { strokeDashoffset: circumference } : undefined}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-mono font-bold tabular-nums", fontSize)}>
            {displayScore}
          </span>
          <span className="text-text-muted text-xs font-mono">{t("of100")}</span>
        </div>
      )}
    </div>
  );
}
