"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import {
  AlertTriangle,
  DollarSign,
  Megaphone,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DATA_SECTION_CONFIGS } from "@/lib/types/data-center.types";
import { useDataCenterStore } from "@/lib/stores/data-center.store";
import { useMetricsStore } from "@/lib/stores/metrics.store";
import { DataSection } from "./DataSection";
import { toast } from "@/hooks/use-toast";

const sectionIcons: Record<string, React.ReactNode> = {
  finance: <DollarSign size={18} />,
  sales: <ShoppingBag size={18} />,
  marketing: <Megaphone size={18} />,
  inventory: <Package size={18} />,
  team: <Users size={18} />,
};

export function DataCenterGuided() {
  const t = useTranslations("data.center");
  const tData = useTranslations("data");
  const router = useRouter();

  const completedCount = useDataCenterStore((s) => s.getCompletedCount());
  const totalSections = useDataCenterStore((s) => s.getTotalSections());
  const dataCompletenessPct = useMetricsStore((s) => s.dataCompletenessPct);
  const submitMonth = useMetricsStore((s) => s.submitMonth);
  const hasRevenue = useMetricsStore((s) => !!s.currentMonthMetrics.monthly_revenue);

  const fillPercent = dataCompletenessPct;

  const handleSubmitAll = () => {
    submitMonth();
    toast({
      title: tData("submitSuccess"),
      description: tData("submitSuccessDesc"),
    });
    router.push("/data/analysis");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center gap-3 rounded-xl border border-border bg-surface-raised p-4 md:mb-6 md:gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1">
            <span>{t("progressLabel")}</span>
            <span className="font-medium">
              {t("progressCount", { done: completedCount, total: totalSections })}
            </span>
          </div>
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>
        <div className="text-2xl font-bold text-accent tabular-nums">
          {fillPercent}%
        </div>
      </div>

      {fillPercent < 50 && (
        <div className="flex gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20 text-sm mb-6">
          <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
          <p className="text-text-secondary">{t("limitedModeWarning")}</p>
        </div>
      )}

      <div className="space-y-3">
        {DATA_SECTION_CONFIGS.map((config) => (
          <DataSection
            key={config.id}
            config={config}
            icon={sectionIcons[config.id]}
          />
        ))}
      </div>

      <div className="mt-6 sticky bottom-[calc(5rem+env(safe-area-inset-bottom))] z-10 md:static">
        <Button
          variant="bronze"
          className="min-h-[48px] w-full"
          onClick={handleSubmitAll}
          disabled={!hasRevenue}
        >
          {tData("submitMonth")}
        </Button>
        <p className="text-xs text-text-muted text-center mt-2">
          {tData("submitMonthHint")}
        </p>
      </div>
    </div>
  );
}
