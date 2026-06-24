import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HealthData } from "@/lib/types/health.types";
import type { Company } from "@/lib/types/company.types";
import type { HealthTimelineEntry } from "@/lib/types/metrics.types";
import type { BusinessMetrics } from "@/lib/types/metrics.types";
import { EMPTY_HEALTH } from "@/lib/mock/empty-health";
import { safeLocalStorage } from "./safe-storage";

function companyToMetrics(company: Partial<Company> & { monthlyTransactions?: number }): BusinessMetrics {
  return {
    monthly_revenue: company.monthlyRevenue,
    monthly_transactions: company.monthlyTransactions,
    marketing_spend: company.marketingSpend,
    total_inventory_value: company.inventoryValue,
    dead_stock_value: company.deadStockValue,
    cogs: company.monthlyRevenue && company.grossMarginPct
      ? company.monthlyRevenue * (1 - company.grossMarginPct / 100)
      : undefined,
  };
}

interface HealthState {
  health: HealthData;
  healthTimeline: HealthTimelineEntry[];
  healthTrend: number[];
  lastCalculated: string | null;
  setHealth: (health: HealthData, timelineEntry?: HealthTimelineEntry) => void;
  recalculate: (companyData?: Partial<Company>) => void;
}

export const useHealthStore = create<HealthState>()(
  persist(
    (set, get) => ({
      health: { ...EMPTY_HEALTH },
      healthTimeline: [],
      healthTrend: [],
      lastCalculated: null,

      setHealth: (health, timelineEntry) => {
        const trend = [...get().healthTrend, health.masterScore].slice(-6);
        set({
          health,
          healthTimeline: timelineEntry
            ? [...get().healthTimeline, timelineEntry]
            : get().healthTimeline,
          healthTrend: trend,
          lastCalculated: new Date().toISOString(),
        });
      },

      recalculate: (companyData) => {
        if (!companyData) return;
        void import("./metrics.store").then(({ useMetricsStore }) => {
          const store = useMetricsStore.getState();
          const merged = { ...store.currentMonthMetrics, ...companyToMetrics(companyData) };
          store.setMetrics(merged);
          store.recalculateFromCurrent();
        });
      },
    }),
    {
      name: "ai-bos-health",
      storage: safeLocalStorage,
      partialize: (state) => ({
        health: state.health,
        healthTimeline: state.healthTimeline,
        healthTrend: state.healthTrend,
        lastCalculated: state.lastCalculated,
      }),
    }
  )
);
