import type { BusinessMetrics } from "@/lib/types/metrics.types";
import type { HealthData, PillarScore, Risk, Action } from "@/lib/types/health.types";
import type { ProfitEngineOutput } from "@/lib/profit-engine/types";
import { dataCompletenessPct } from "@/lib/profit-engine/formulas";
import { confidenceMultiplier } from "@/lib/health-system/confidence";
import { scoreToStatus } from "@/lib/health-system/scoreBands";
import {
  ALL_PILLAR_CALCULATORS,
  calculateAiReadinessPillar,
  type PillarResult,
} from "@/lib/health-system/pillars";
import { EMPTY_HEALTH } from "@/lib/mock/empty-health";

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

const AGENT_COLORS: Record<string, string> = {
  analyst: "#C9923A",
  marketer: "#C9923A",
  accountant: "#3498DB",
  manager: "#2ECC71",
};

function toPillarScore(result: PillarResult, prevScore?: number): PillarScore {
  return {
    id: result.id,
    label: PILLAR_LABELS[result.id] ?? result.id,
    score: result.score,
    weight: result.weight,
    status: result.status,
    trend: prevScore === undefined ? "flat" : result.score > prevScore ? "up" : result.score < prevScore ? "down" : "flat",
    delta: prevScore === undefined ? 0 : result.score - prevScore,
  };
}

function findingsToRisks(output: ProfitEngineOutput): Risk[] {
  return output.findings.slice(0, 3).map((f, i) => ({
    id: `risk-${f.ruleId}`,
    title: f.ruleName,
    description: f.rootCauses[0] ?? "",
    severity: f.severity === "info" ? "warning" : f.severity,
    impact: f.impact,
    agent: `AI ${f.assignedAgent}`,
    pillar: f.ruleId.includes("INV") ? "inventory" : f.ruleId.includes("MKT") ? "marketing" : f.ruleId.includes("FIN") || f.ruleId.includes("CASH") ? "financial" : "sales",
  }));
}

function findingsToActions(output: ProfitEngineOutput): Action[] {
  return output.findings.slice(0, 3).map((f, i) => ({
    id: `action-${f.ruleId}`,
    title: f.recommendations[0] ?? f.ruleName,
    description: f.recommendations[1] ?? "",
    priority: i + 1,
    estimatedRecovery: f.impact,
    effort: f.impact >= 500_000 ? "Medium" : "Low",
    agent: `AI ${f.assignedAgent}`,
    agentColor: AGENT_COLORS[f.assignedAgent] ?? "#C9923A",
  }));
}

export function calculateMasterHealth(
  metrics: BusinessMetrics,
  profitOutput: ProfitEngineOutput,
  prevPillarScores?: Record<string, number>
): HealthData {
  const completeness = dataCompletenessPct(metrics);
  if (completeness < 20 || !metrics.monthly_revenue) {
    return { ...EMPTY_HEALTH, dataCompleteness: completeness };
  }

  const pillarResults = [
    ...ALL_PILLAR_CALCULATORS.map((fn) => fn(metrics)),
    calculateAiReadinessPillar(completeness),
  ];

  const rawMaster = pillarResults.reduce((sum, p) => sum + p.score * p.weight, 0);
  const masterScore = Math.round(rawMaster * confidenceMultiplier(metrics));

  const pillars = pillarResults.map((p) =>
    toPillarScore(p, prevPillarScores?.[p.id])
  );

  const trendDelta = pillars.reduce((sum, p) => sum + p.delta * p.weight, 0);
  const status = scoreToStatus(masterScore);

  return {
    masterScore,
    trend: trendDelta > 1 ? "up" : trendDelta < -1 ? "down" : "flat",
    trendDelta: Math.round(Math.abs(trendDelta)),
    status,
    statusColor: status === "stable" ? "warning" : status,
    dataCompleteness: completeness,
    pillars,
    topRisks: findingsToRisks(profitOutput),
    topActions: findingsToActions(profitOutput),
  };
}
