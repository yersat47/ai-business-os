import type { ProfitData } from "@/lib/types/profit.types";

export const MOCK_PROFIT: ProfitData = {
  totalRecoverable: 1850000,
  currency: "₸",
  period: "per month",
  breakdown: [
    { category: "Dead Stock Recovery", categoryKey: "deadStock", amount: 750000, confidence: 85 },
    { category: "CAC Optimization", categoryKey: "cacOptimization", amount: 480000, confidence: 70 },
    { category: "Margin Improvement", categoryKey: "marginImprovement", amount: 420000, confidence: 65 },
    { category: "Repeat Purchase Uplift", categoryKey: "repeatPurchase", amount: 200000, confidence: 60 },
  ],
  monthlyRevenue: 8450000,
  potentialRevenue: 10300000,
  growthPotentialPct: 21.9,
};
