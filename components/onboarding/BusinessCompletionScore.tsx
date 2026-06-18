"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import type { CompletionData } from "@/lib/utils/completion-calculator";
import { cn } from "@/lib/utils/cn";

interface BusinessCompletionScoreProps {
  data: CompletionData;
  onGoToDashboard?: () => void;
  compact?: boolean;
}

function CircularProgress({ value, size = 128 }: { value: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        className="text-border"
        strokeWidth={8}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        className="text-accent"
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
}

export function BusinessCompletionScore({
  data,
  onGoToDashboard,
  compact = false,
}: BusinessCompletionScoreProps) {
  const t = useTranslations("completion");
  const router = useRouter();

  const handleDashboard = () => {
    if (onGoToDashboard) onGoToDashboard();
    else router.push("/dashboard");
  };

  if (compact) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-secondary">
            {t("title")}
          </span>
          <span className="font-mono font-bold text-accent text-lg">
            {data.score}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${data.score}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border bg-surface p-8 max-w-lg w-full mx-auto text-center"
    >
      <h2 className="text-2xl font-bold mb-6">{t("businessReady")}</h2>

      <div className="relative w-32 h-32 mx-auto mb-8">
        <CircularProgress value={data.score} size={128} />
        <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-accent">
          {data.score}%
        </span>
      </div>

      <ul className="text-left space-y-0 mb-8 max-w-sm mx-auto">
        {data.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between py-2 border-b border-border text-sm"
          >
            <span>{t(`items.${item.labelKey}`)}</span>
            {item.complete ? (
              <span className="text-success text-sm flex items-center gap-1">
                <Check className="h-3.5 w-3.5" />
                {t("filled")}
              </span>
            ) : (
              <span className="text-warning text-sm flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5" />
                {t("notFilled")}
              </span>
            )}
          </li>
        ))}
      </ul>

      <Button variant="bronze" className="w-full" onClick={handleDashboard}>
        {t("goToDashboard")}
      </Button>
    </motion.div>
  );
}
