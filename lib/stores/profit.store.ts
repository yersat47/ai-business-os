import { create } from "zustand";
import type { ProfitData } from "@/lib/types/profit.types";
import { MOCK_PROFIT } from "@/lib/mock/mock-profit";
import { calculateProfit } from "@/lib/utils/profit-calculator";
import type { Company } from "@/lib/types/company.types";

interface ProfitState {
  profit: ProfitData;
  lastCalculated: number | null;
  isAIGenerated: boolean;
  setProfitData: (data: ProfitData) => void;
  recalculate: (company?: Partial<Company>) => void;
}

export const useProfitStore = create<ProfitState>()((set) => ({
  profit: MOCK_PROFIT,
  lastCalculated: null,
  isAIGenerated: false,
  setProfitData: (data) =>
    set({
      profit: data,
      lastCalculated: Date.now(),
      isAIGenerated: true,
    }),
  recalculate: (company) =>
    set({
      profit: calculateProfit(company),
      lastCalculated: Date.now(),
      isAIGenerated: false,
    }),
}));
