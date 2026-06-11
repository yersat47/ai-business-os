import type { Company } from "@/lib/types/company.types";
import { MOCK_PROFIT } from "@/lib/mock/mock-profit";

export function calculateProfit(company?: Partial<Company>) {
  if (!company?.monthlyRevenue) {
    return { ...MOCK_PROFIT };
  }

  const deadStockRecovery = company.deadStockValue
    ? Math.round(company.deadStockValue * 0.68)
    : MOCK_PROFIT.breakdown[0].amount;

  return {
    ...MOCK_PROFIT,
    monthlyRevenue: company.monthlyRevenue,
    totalRecoverable: deadStockRecovery + 1100000,
    breakdown: MOCK_PROFIT.breakdown.map((item, i) =>
      i === 0 ? { ...item, amount: deadStockRecovery } : item
    ),
  };
}
