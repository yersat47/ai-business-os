export interface ProfitBreakdownItem {
  category: string;
  categoryKey?: string;
  amount: number;
  confidence: number;
}

export interface ProfitData {
  totalRecoverable: number;
  currency: string;
  period: string;
  breakdown: ProfitBreakdownItem[];
  monthlyRevenue: number;
  potentialRevenue: number;
  growthPotentialPct: number;
}
