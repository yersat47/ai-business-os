import { create } from "zustand";
import type { Company } from "@/lib/types/company.types";
import type { HealthData } from "@/lib/types/health.types";
import { MOCK_HEALTH } from "@/lib/mock/mock-health";
import { calculateHealth } from "@/lib/utils/health-calculator";

interface HealthState {
  health: HealthData;
  lastCalculated: string | null;
  recalculate: (companyData?: Partial<Company>) => void;
}

export const useHealthStore = create<HealthState>()((set) => ({
  health: MOCK_HEALTH,
  lastCalculated: null,
  recalculate: (companyData) => {
    const health = calculateHealth(companyData);
    set({ health, lastCalculated: new Date().toISOString() });
  },
}));
