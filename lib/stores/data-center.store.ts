import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DataSectionId } from "@/lib/types/data-center.types";
import { DATA_SECTION_CONFIGS } from "@/lib/types/data-center.types";
import { useMetricsStore } from "./metrics.store";
import { safeLocalStorage } from "./safe-storage";

interface DataCenterState {
  completedSections: DataSectionId[];
  markSectionComplete: (sectionId: DataSectionId) => void;
  isSectionComplete: (sectionId: DataSectionId) => boolean;
  getCompletedCount: () => number;
  getTotalSections: () => number;
  saveSection: (sectionId: DataSectionId) => void;
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

      saveSection: (sectionId) => {
        useMetricsStore.getState().recalculateFromCurrent();
        if (!sectionHasValues(sectionId)) return;
        get().markSectionComplete(sectionId);
      },
    }),
    { name: "ai-bos-data-center", storage: safeLocalStorage }
  )
);
