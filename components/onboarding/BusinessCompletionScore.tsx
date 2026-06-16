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
  onFillNow?: () => void;
  compact?: boolean;
}

export function BusinessCompletionScore({
  data,
  onFillNow,
  compact = false,
}: BusinessCompletionScoreProps) {
  const t = useTranslations("completion");
  const router = useRouter();

  const handleFill = () => {
    if (onFillNow) onFillNow();
    else router.push("/data");
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
      <h2 className="text-lg font-medium text-text-secondary mb-2">
        {t("title")}
      </h2>
      <p className="text-5xl font-mono font-bold text-accent mb-4">
        {data.score}%
      </p>
      <div className="h-3 rounded-full bg-border overflow-hidden mb-8">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${data.score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <ul className="text-left space-y-3 mb-8">
        {data.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between text-sm py-2 border-b border-border/50 last:border-0"
          >
            <span className="flex items-center gap-2">
              {item.complete ? (
                <Check className="h-4 w-4 text-success shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-warning shrink-0" />
              )}
              {t(`items.${item.labelKey}`)}
            </span>
            <span
              className={cn(
                "text-xs",
                item.complete ? "text-success" : "text-text-muted"
              )}
            >
              {item.complete ? t("filled") : t("notFilled")}
            </span>
          </li>
        ))}
      </ul>

      {data.score < 100 && (
        <Button variant="bronze" className="w-full" onClick={handleFill}>
          {t("fillNow")}
        </Button>
      )}
    </motion.div>
  );
}
