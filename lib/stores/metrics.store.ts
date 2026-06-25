import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BusinessMetrics } from "@/lib/types/metrics.types";
import type { ProfitEngineOutput } from "@/lib/profit-engine/types";
import { safeLocalStorage } from "@/lib/stores/safe-storage";
import { runCalculationPipeline } from "@/lib/calculation/pipeline";
import { useHealthStore } from "@/lib/stores/health.store";
import { useFeedbackStore } from "@/lib/stores/feedback.store";
import { useCompanyStore } from "@/lib/stores/company.store";
import {
  dataCompletenessPct,
  grossMarginPct,
  netMarginPct,
  averageOrderValue,
  cac,
  repeatCustomerRate,
} from "@/lib/profit-engine/formulas";
import type { AnalysisReport } from "@/lib/types/analysis-report.types";

function currentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function metricsToCompanyPartial(metrics: BusinessMetrics): Record<string, number | boolean> {
  return {
    metricsEntered: true,
    monthlyRevenue: metrics.monthly_revenue ?? 0,
    averageOrderValue: averageOrderValue(metrics) ?? 0,
    marketingSpend: metrics.marketing_spend ?? 0,
    inventoryValue: metrics.total_inventory_value ?? 0,
    deadStockValue: metrics.dead_stock_value ?? 0,
    cac: cac(metrics) ?? 0,
    repeatPurchaseRate: repeatCustomerRate(metrics) ?? 0,
    grossMarginPct: grossMarginPct(metrics) ?? 0,
    netMarginPct: netMarginPct(metrics) ?? 0,
  };
}

interface MetricsState {
  currentMonthMetrics: BusinessMetrics;
  metricsHistory: Record<string, BusinessMetrics>;
  profitOutput: ProfitEngineOutput | null;
  dataCompletenessPct: number;
  lastSubmittedMonth: string | null;
  latestReport: AnalysisReport | null;
  editingMonthKey: string | null;
  setMetric: (key: keyof BusinessMetrics, value: number | undefined) => void;
  setMetrics: (metrics: BusinessMetrics) => void;
  getMetricsForMonth: (monthKey: string) => BusinessMetrics | undefined;
  loadMonth: (monthKey: string) => void;
  clearEditingMonth: () => void;
  getActiveMonthKey: () => string;
  submitMonth: (monthKey?: string) => void;
  recalculateFromCurrent: () => void;
}

export const useMetricsStore = create<MetricsState>()(
  persist(
    (set, get) => ({
      currentMonthMetrics: {},
      metricsHistory: {},
      profitOutput: null,
      dataCompletenessPct: 0,
      lastSubmittedMonth: null,
      latestReport: null,
      editingMonthKey: null,

      setMetric: (key, value) => {
        set((state) => {
          const next = { ...state.currentMonthMetrics };
          if (value === undefined) delete next[key];
          else next[key] = value;
          return {
            currentMonthMetrics: next,
            dataCompletenessPct: dataCompletenessPct(next),
          };
        });
      },

      setMetrics: (metrics) => {
        set({
          currentMonthMetrics: metrics,
          dataCompletenessPct: dataCompletenessPct(metrics),
        });
      },

      getMetricsForMonth: (monthKey) => get().metricsHistory[monthKey],

      getActiveMonthKey: () => get().editingMonthKey ?? currentMonthKey(),

      loadMonth: (monthKey) => {
        const stored = get().metricsHistory[monthKey];
        set({
          editingMonthKey: monthKey,
          currentMonthMetrics: stored ? { ...stored } : {},
          dataCompletenessPct: dataCompletenessPct(stored ?? {}),
        });
        get().recalculateFromCurrent();
      },

      clearEditingMonth: () => {
        const monthKey = currentMonthKey();
        const stored = get().metricsHistory[monthKey];
        set({
          editingMonthKey: null,
          currentMonthMetrics: stored ? { ...stored } : get().currentMonthMetrics,
        });
      },

      recalculateFromCurrent: () => {
        const { currentMonthMetrics, metricsHistory } = get();
        const monthKey = get().getActiveMonthKey();
        const prevMonth = Object.keys(metricsHistory).sort().at(-1);
        const prevMetrics = prevMonth ? metricsHistory[prevMonth] : undefined;
        const prevScore =
          useHealthStore.getState().healthTimeline.at(-1)?.masterScoreAfter ?? null;

        const result = runCalculationPipeline(
          currentMonthMetrics,
          monthKey,
          prevMetrics,
          prevScore
        );

        set({
          profitOutput: result.profitOutput,
          dataCompletenessPct: result.profitOutput.dataCompletenessPct,
        });

        useHealthStore.getState().setHealth(result.health);
        useFeedbackStore.getState().setMessages(result.feedback);

        if (currentMonthMetrics.monthly_revenue) {
          useCompanyStore.getState().updateCompany(metricsToCompanyPartial(currentMonthMetrics));
        }
      },

      submitMonth: (monthKey?) => {
        const activeKey = monthKey ?? get().getActiveMonthKey();
        const { currentMonthMetrics, metricsHistory } = get();
        const prevKeys = Object.keys(metricsHistory)
          .filter((k) => k !== activeKey)
          .sort();
        const prevMonth = prevKeys.at(-1);
        const prevMetrics = prevMonth ? metricsHistory[prevMonth] : undefined;
        const prevScore =
          useHealthStore.getState().healthTimeline.at(-1)?.masterScoreAfter ?? null;

        const result = runCalculationPipeline(
          currentMonthMetrics,
          activeKey,
          prevMetrics,
          prevScore
        );

        const report: AnalysisReport = {
          monthKey: activeKey,
          generatedAt: result.timelineEntry.date,
          metrics: { ...currentMonthMetrics },
          traces: result.traces,
          profitOutput: result.profitOutput,
          health: result.health,
          feedback: result.feedback,
          timelineEntry: result.timelineEntry,
          prevMetrics,
          prevHealthScore: prevScore,
          prevGrossMargin: prevMetrics ? grossMarginPct(prevMetrics) : null,
          prevNetMargin: prevMetrics ? netMarginPct(prevMetrics) : null,
          prevRevenue: prevMetrics?.monthly_revenue ?? null,
        };

        set({
          metricsHistory: { ...metricsHistory, [activeKey]: { ...currentMonthMetrics } },
          profitOutput: result.profitOutput,
          dataCompletenessPct: result.profitOutput.dataCompletenessPct,
          lastSubmittedMonth: activeKey,
          latestReport: report,
          editingMonthKey: null,
        });

        useHealthStore.getState().setHealth(result.health, result.timelineEntry);
        useFeedbackStore.getState().setMessages(result.feedback);
        useCompanyStore.getState().updateCompany(metricsToCompanyPartial(currentMonthMetrics));
      },
    }),
    { name: "ai-bos-metrics", storage: safeLocalStorage }
  )
);
