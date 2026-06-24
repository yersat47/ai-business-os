import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BusinessMetrics } from "@/lib/types/metrics.types";
import type { ProfitEngineOutput } from "@/lib/profit-engine/types";
import type { AgentMessage } from "@/lib/agents/types";
import { safeLocalStorage } from "@/lib/stores/safe-storage";
import { runCalculationPipeline } from "@/lib/calculation/pipeline";
import { useHealthStore } from "@/lib/stores/health.store";
import { useFeedbackStore } from "@/lib/stores/feedback.store";
import { useCompanyStore } from "@/lib/stores/company.store";
import { dataCompletenessPct } from "@/lib/profit-engine/formulas";

function currentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function metricsToCompanyPartial(metrics: BusinessMetrics): Record<string, number | boolean> {
  return {
    metricsEntered: true,
    monthlyRevenue: metrics.monthly_revenue ?? 0,
    averageOrderValue:
      metrics.monthly_revenue && metrics.monthly_transactions
        ? metrics.monthly_revenue / metrics.monthly_transactions
        : 0,
    marketingSpend: metrics.marketing_spend ?? 0,
    inventoryValue: metrics.total_inventory_value ?? 0,
    deadStockValue: metrics.dead_stock_value ?? 0,
    cac:
      metrics.marketing_spend && metrics.new_customers_monthly
        ? metrics.marketing_spend / metrics.new_customers_monthly
        : 0,
    repeatPurchaseRate:
      metrics.repeat_customers && metrics.new_customers_monthly
        ? (metrics.repeat_customers /
            (metrics.repeat_customers + metrics.new_customers_monthly)) *
          100
        : 0,
    grossMarginPct:
      metrics.monthly_revenue && metrics.cogs
        ? ((metrics.monthly_revenue - metrics.cogs) / metrics.monthly_revenue) * 100
        : 0,
    netMarginPct:
      metrics.monthly_revenue && metrics.cogs && metrics.monthly_expenses
        ? ((metrics.monthly_revenue - metrics.cogs - metrics.monthly_expenses) /
            metrics.monthly_revenue) *
          100
        : 0,
  };
}

interface MetricsState {
  currentMonthMetrics: BusinessMetrics;
  metricsHistory: Record<string, BusinessMetrics>;
  profitOutput: ProfitEngineOutput | null;
  dataCompletenessPct: number;
  lastSubmittedMonth: string | null;
  setMetric: (key: keyof BusinessMetrics, value: number | undefined) => void;
  setMetrics: (metrics: BusinessMetrics) => void;
  getMetricsForMonth: (monthKey: string) => BusinessMetrics | undefined;
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

      recalculateFromCurrent: () => {
        const { currentMonthMetrics, metricsHistory } = get();
        const monthKey = currentMonthKey();
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
      },

      submitMonth: (monthKey = currentMonthKey()) => {
        const { currentMonthMetrics, metricsHistory } = get();
        const prevKeys = Object.keys(metricsHistory).sort();
        const prevMonth = prevKeys.at(-1);
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
          metricsHistory: { ...metricsHistory, [monthKey]: { ...currentMonthMetrics } },
          profitOutput: result.profitOutput,
          dataCompletenessPct: result.profitOutput.dataCompletenessPct,
          lastSubmittedMonth: monthKey,
        });

        useHealthStore.getState().setHealth(result.health, result.timelineEntry);
        useFeedbackStore.getState().setMessages(result.feedback);
        useCompanyStore.getState().updateCompany(metricsToCompanyPartial(currentMonthMetrics));
      },
    }),
    { name: "ai-bos-metrics", storage: safeLocalStorage }
  )
);
