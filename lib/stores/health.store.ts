import { create } from "zustand";
import type { HealthData } from "@/lib/types/health.types";
import type { Company } from "@/lib/types/company.types";
import { calculateHealth } from "@/lib/utils/health-calculator";
import { MOCK_COMPANY } from "@/lib/mock/mock-company";

interface HealthState {
  health: HealthData;
  lastCalculated: number | null;
  isAIGenerated: boolean;
  recalculate: (companyData?: Partial<Company>) => void;
  setHealthData: (health: HealthData) => void;
}

const initialCompany = MOCK_COMPANY;

export const useHealthStore = create<HealthState>()((set) => ({
  health: calculateHealth(initialCompany),
  lastCalculated: null,
  isAIGenerated: false,
  recalculate: (companyData) => {
    const health = calculateHealth(companyData);
    set({
      health,
      lastCalculated: Date.now(),
      isAIGenerated: false,
    });
  },
  setHealthData: (health) =>
    set({
      health,
      lastCalculated: Date.now(),
      isAIGenerated: true,
    }),
}));
