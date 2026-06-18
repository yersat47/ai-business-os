import type { HealthData, HealthStatus } from "@/lib/types/health.types";
import type { ProfitData } from "@/lib/types/profit.types";
import { MOCK_HEALTH } from "@/lib/mock/mock-health";

export interface AIHealthPillar {
  score: number;
  status: string;
  insight: string;
}

export interface AIHealthResponse {
  masterScore: number;
  pillars: Record<string, AIHealthPillar>;
  topRecommendations: string[];
  profitPotential: number;
}

export interface AIProfitResponse {
  totalRecoverable: number;
  growthPotentialPct: number;
  potentialRevenue: number;
  breakdown: Array<{
    category: string;
    categoryKey?: string;
    amount: number;
    confidence: number;
  }>;
}

const PILLAR_WEIGHTS: Record<string, number> = {
  financial: 0.3,
  sales: 0.25,
  customer: 0.15,
  inventory: 0.1,
  marketing: 0.08,
  team: 0.07,
  operations: 0.03,
  aiReadiness: 0.02,
};

const PILLAR_LABELS: Record<string, string> = {
  financial: "Financial",
  sales: "Sales",
  customer: "Customer",
  inventory: "Inventory",
  marketing: "Marketing",
  team: "Team",
  operations: "Operations",
  aiReadiness: "AI Readiness",
};

function mapStatus(status: string): HealthStatus {
  switch (status) {
    case "excellent":
      return "excellent";
    case "good":
      return "healthy";
    case "warning":
      return "warning";
    case "critical":
      return "critical";
    default:
      return "stable";
  }
}

function masterStatus(score: number): HealthStatus {
  if (score >= 85) return "excellent";
  if (score >= 70) return "healthy";
  if (score >= 55) return "stable";
  if (score >= 40) return "warning";
  return "critical";
}

export function mapAIHealthToHealthData(ai: AIHealthResponse): HealthData {
  const pillars = Object.entries(ai.pillars).map(([id, pillar]) => ({
    id,
    label: PILLAR_LABELS[id] ?? id,
    score: Math.max(0, Math.min(100, Math.round(pillar.score))),
    weight: PILLAR_WEIGHTS[id] ?? 0.05,
    status: mapStatus(pillar.status),
    trend: "flat" as const,
    delta: 0,
  }));

  const masterScore = Math.max(
    0,
    Math.min(100, Math.round(ai.masterScore))
  );

  const status = masterStatus(masterScore);

  return {
    ...MOCK_HEALTH,
    masterScore,
    status,
    statusColor: status,
    trend: "flat",
    trendDelta: 0,
    dataCompleteness: MOCK_HEALTH.dataCompleteness,
    pillars: pillars.length > 0 ? pillars : MOCK_HEALTH.pillars,
    topRisks: ai.topRecommendations.slice(0, 3).map((rec, i) => ({
      id: `ai-risk-${i}`,
      title: rec.slice(0, 80),
      description: rec,
      severity: "warning" as HealthStatus,
      impact: 0,
      agent: "AI Analyst",
      pillar: pillars[i]?.id ?? "financial",
    })),
    topActions: ai.topRecommendations.slice(0, 3).map((rec, i) => ({
      id: `ai-action-${i}`,
      title: rec.slice(0, 80),
      description: rec,
      priority: i + 1,
      estimatedRecovery: 0,
      effort: "medium",
      agent: "AI Analyst",
      agentColor: "#C9963A",
    })),
  };
}

export function mapAIProfitToProfitData(
  ai: AIProfitResponse,
  monthlyRevenue: number
): ProfitData {
  return {
    totalRecoverable: ai.totalRecoverable,
    currency: "₸",
    period: "per month",
    breakdown: ai.breakdown,
    monthlyRevenue,
    potentialRevenue: ai.potentialRevenue,
    growthPotentialPct: ai.growthPotentialPct,
  };
}

export function parseAIJson<T>(text: string): T {
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean) as T;
}
