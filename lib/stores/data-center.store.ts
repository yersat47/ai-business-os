import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DataSectionId } from "@/lib/types/data-center.types";
import { DATA_SECTION_CONFIGS } from "@/lib/types/data-center.types";
import type { MetricKey } from "@/lib/types/metrics.types";
import { useMetricsStore } from "./metrics.store";
import { safeLocalStorage } from "./safe-storage";

interface DataCenterState {
  completedSections: DataSectionId[];
  markSectionComplete: (sectionId: DataSectionId) => void;
  isSectionComplete: (sectionId: DataSectionId) => boolean;
  getCompletedCount: () => number;
  getTotalSections: () => number;
  setFieldValue: (sectionId: DataSectionId, fieldId: string, value: string) => void;
  getFieldValue: (sectionId: DataSectionId, fieldId: string) => string;
  saveSection: (sectionId: DataSectionId) => void;
}

function parseNum(value: string): number | undefined {
  const cleaned = value.replace(/\s/g, "").replace(",", ".");
  if (!cleaned.trim()) return undefined;
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : undefined;
}

function findMetricKey(sectionId: DataSectionId, fieldId: string): MetricKey | undefined {
  const section = DATA_SECTION_CONFIGS.find((s) => s.id === sectionId);
  return section?.fieldKeys.find((f) => f.id === fieldId)?.metricKey;
}

function sectionHasValues(sectionId: DataSectionId): boolean {
  const metrics = useMetricsStore.getState().currentMonthMetrics;
  const section = DATA_SECTION_CONFIGS.find((s) => s.id === sectionId);
  if (!section) return false;
  return section.fieldKeys.some((f) => {
    if (!f.metricKey) return false;
    const val = metrics[f.metricKey];
    return val !== undefined && val > 0;
  });
}

export const useDataCenterStore = create<DataCenterState>()(
  persist(
    (set, get) => ({
      completedSections: [],

      markSectionComplete: (sectionId) =>
        set((state) => ({
          completedSections: state.completedSections.includes(sectionId)
            ? state.completedSections
            : [...state.completedSections, sectionId],
        })),

      isSectionComplete: (sectionId) => get().completedSections.includes(sectionId),

      getCompletedCount: () => get().completedSections.length,

      getTotalSections: () => DATA_SECTION_CONFIGS.length,

      setFieldValue: (sectionId, fieldId, value) => {
        const metricKey = findMetricKey(sectionId, fieldId);
        if (!metricKey) return;
        useMetricsStore.getState().setMetric(metricKey, parseNum(value));
        useMetricsStore.getState().recalculateFromCurrent();
      },

      getFieldValue: (sectionId, fieldId) => {
        const metricKey = findMetricKey(sectionId, fieldId);
        if (!metricKey) return "";
        const val = useMetricsStore.getState().currentMonthMetrics[metricKey];
        return val !== undefined ? String(val) : "";
      },

      saveSection: (sectionId) => {
        if (!sectionHasValues(sectionId)) return;
        get().markSectionComplete(sectionId);
      },
    }),
    { name: "ai-bos-data-center", storage: safeLocalStorage }
  )
);
