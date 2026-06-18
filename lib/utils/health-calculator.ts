import type { Company } from "@/lib/types/company.types";
import type { HealthData } from "@/lib/types/health.types";
import { MOCK_HEALTH } from "@/lib/mock/mock-health";
import { EMPTY_HEALTH } from "@/lib/mock/empty-health";
import { hasBusinessMetrics } from "@/lib/utils/has-business-metrics";

function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function adjustPillar(
  baseScore: number,
  adjustment: number
): number {
  return clamp(baseScore + adjustment);
}

export function calculateHealth(company?: Partial<Company>): HealthData {
  if (!company || !hasBusinessMetrics(company)) {
    return { ...EMPTY_HEALTH };
  }

  if (!company.monthlyRevenue) {
    return { ...EMPTY_HEALTH };
  }

  const deadStockRatio =
    company.deadStockValue && company.inventoryValue
      ? company.deadStockValue / company.inventoryValue
      : 0.26;

  const marginScore = company.netMarginPct
    ? clamp(company.netMarginPct * 4)
    : 68;

  const inventoryScore = clamp(100 - deadStockRatio * 150);
  const marketingScore = company.cac
    ? clamp(100 - (company.cac - 3000) / 50)
    : 61;

  const pillars = MOCK_HEALTH.pillars.map((pillar) => {
    let score = pillar.score;
    switch (pillar.id) {
      case "financial":
        score = adjustPillar(marginScore, 0);
        break;
      case "inventory":
        score = adjustPillar(inventoryScore, 0);
        break;
      case "marketing":
        score = adjustPillar(marketingScore, 0);
        break;
      case "sales":
        score = company.monthlyRevenue
          ? adjustPillar(75, (company.monthlyRevenue - 8000000) / 500000)
          : pillar.score;
        break;
      default:
        break;
    }
    return { ...pillar, score };
  });

  const masterScore = clamp(
    pillars.reduce((sum, p) => sum + p.score * p.weight, 0)
  );

  let status: HealthData["status"] = "stable";
  if (masterScore >= 80) status = "healthy";
  else if (masterScore >= 70) status = "stable";
  else if (masterScore >= 55) status = "warning";
  else status = "critical";

  return {
    ...MOCK_HEALTH,
    masterScore,
    status,
    statusColor: status === "stable" ? "warning" : status,
    pillars,
  };
}
