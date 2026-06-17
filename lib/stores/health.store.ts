import { create } from "zustand";
import type { HealthData } from "@/lib/types/health.types";
import type { Company } from "@/lib/types/company.types";
import { calculateHealth } from "@/lib/utils/health-calculator";
import { useCompanyStore } from "./company.store";

interface HealthState {
  health: HealthData;
  lastCalculated: string | null;
  recalculate: (companyData?: Partial<Company>) => void;
}

const initialCompany = useCompanyStore.getState().company;

export const useHealthStore = create<HealthState>()((set) => ({
  health: calculateHealth(initialCompany),
  lastCalculated: null,
  recalculate: (companyData) => {
    const health = calculateHealth(companyData);
    set({ health, lastCalculated: new Date().toISOString() });
  },
}));
