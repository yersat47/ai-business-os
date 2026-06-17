import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DataSectionId } from "@/lib/types/data-center.types";
import { DATA_SECTION_CONFIGS } from "@/lib/types/data-center.types";
import { useCompanyStore } from "./company.store";
import { useHealthStore } from "./health.store";

type SectionValues = Record<string, string>;

interface DataCenterState {
  sectionValues: Record<DataSectionId, SectionValues>;
  completedSections: DataSectionId[];
  setFieldValue: (sectionId: DataSectionId, fieldId: string, value: string) => void;
  getFieldValue: (sectionId: DataSectionId, fieldId: string) => string;
  isSectionComplete: (sectionId: DataSectionId) => boolean;
  saveSection: (sectionId: DataSectionId) => void;
  getCompletedCount: () => number;
  getTotalSections: () => number;
}

function parseNum(value: string): number {
  const cleaned = value.replace(/\s/g, "").replace(",", ".");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function syncSectionToCompany(sectionId: DataSectionId, values: SectionValues) {
  const companyStore = useCompanyStore.getState();
  const partial: Record<string, number | boolean> = { metricsEntered: true };

  switch (sectionId) {
    case "finance":
      if (values.revenue) partial.monthlyRevenue = parseNum(values.revenue);
      if (values.gross_margin) partial.grossMarginPct = parseNum(values.gross_margin);
      if (values.net_margin) partial.netMarginPct = parseNum(values.net_margin);
      break;
    case "sales":
      if (values.avg_order_value) partial.averageOrderValue = parseNum(values.avg_order_value);
      break;
    case "marketing":
      if (values.ad_spend) partial.marketingSpend = parseNum(values.ad_spend);
      if (values.cac) partial.cac = parseNum(values.cac);
      if (values.repeat_rate) partial.repeatPurchaseRate = parseNum(values.repeat_rate);
      break;
    case "inventory":
      if (values.inventory_value) partial.inventoryValue = parseNum(values.inventory_value);
      if (values.dead_stock_pct && values.inventory_value) {
        partial.deadStockValue =
          (parseNum(values.inventory_value) * parseNum(values.dead_stock_pct)) / 100;
      }
      break;
    case "team":
      break;
  }

  companyStore.updateCompany(partial);
  const updated = useCompanyStore.getState().company;
  useHealthStore.getState().recalculate(updated);
}

function isSectionFilled(sectionId: DataSectionId, values: SectionValues): boolean {
  const config = DATA_SECTION_CONFIGS.find((s) => s.id === sectionId);
  if (!config) return false;
  const editableFields = config.fieldKeys.filter((f) => f.type !== "readonly");
  if (editableFields.length === 0) return true;
  return editableFields.some((f) => (values[f.id] ?? "").trim().length > 0);
}

const emptySections = (): Record<DataSectionId, SectionValues> => ({
  finance: {},
  sales: {},
  marketing: {},
  inventory: {},
  team: {},
});

export const useDataCenterStore = create<DataCenterState>()(
  persist(
    (set, get) => ({
      sectionValues: emptySections(),
      completedSections: [],

      setFieldValue: (sectionId, fieldId, value) => {
        set((state) => ({
          sectionValues: {
            ...state.sectionValues,
            [sectionId]: {
              ...state.sectionValues[sectionId],
              [fieldId]: value,
            },
          },
        }));
      },

      getFieldValue: (sectionId, fieldId) => {
        return get().sectionValues[sectionId]?.[fieldId] ?? "";
      },

      isSectionComplete: (sectionId) => {
        return get().completedSections.includes(sectionId);
      },

      saveSection: (sectionId) => {
        const values = get().sectionValues[sectionId];
        if (!isSectionFilled(sectionId, values)) return;

        syncSectionToCompany(sectionId, values);
        set((state) => ({
          completedSections: state.completedSections.includes(sectionId)
            ? state.completedSections
            : [...state.completedSections, sectionId],
        }));
      },

      getCompletedCount: () => get().completedSections.length,

      getTotalSections: () => DATA_SECTION_CONFIGS.length,
    }),
    { name: "ai-bos-data-center" }
  )
);
