"use client";

import { useMemo } from "react";
import { useMetricsStore } from "@/lib/stores/metrics.store";
import { buildSalesDayHeatmapData } from "@/lib/sales/heatmap";
import { SalesDayHeatmap } from "@/components/widgets/SalesDayHeatmap";

interface SalesHeatmapWidgetProps {
  compact?: boolean;
}

export function SalesHeatmapWidget({ compact }: SalesHeatmapWidgetProps) {
  const metrics = useMetricsStore((s) => s.currentMonthMetrics);
  const heatmap = useMemo(() => buildSalesDayHeatmapData(metrics), [metrics]);

  return (
    <SalesDayHeatmap
      data={heatmap.cells}
      weekendSharePct={heatmap.weekendSharePct}
      ruleTriggered={heatmap.ruleTriggered}
      hasData={heatmap.hasData}
      isEstimated={heatmap.isEstimated}
      compact={compact}
    />
  );
}
