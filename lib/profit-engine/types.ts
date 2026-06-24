import type { BusinessMetrics } from "@/lib/types/metrics.types";
import type { AgentId } from "@/lib/agents/types";

export type ConfidenceLevel = "high" | "medium" | "low";

export interface BenchmarkMap {
  grossMarginPct: number;
  netMarginPct: number;
  repeatCustomerRate: number;
  cac: number;
  roas: number;
  deadStockPct: number;
  revenueGrowthMom: number;
  cashReserveMonths: number;
  inventoryTurnover: number;
}

export interface ProfitEngineRule {
  id: string;
  name: string;
  requiredInputs: (keyof BusinessMetrics)[];
  optionalInputs?: (keyof BusinessMetrics)[];
  assignedAgent: AgentId;
  detect: (metrics: BusinessMetrics, benchmarks: BenchmarkMap) => boolean;
  calculateImpact: (metrics: BusinessMetrics, benchmarks: BenchmarkMap) => number;
  getRootCauses: (metrics: BusinessMetrics, benchmarks: BenchmarkMap) => string[];
  getRecommendations: (metrics: BusinessMetrics, benchmarks: BenchmarkMap) => string[];
}

export interface RuleResult {
  ruleId: string;
  ruleName: string;
  assignedAgent: AgentId;
  severity: "critical" | "warning" | "info";
  impact: number;
  rootCauses: string[];
  recommendations: string[];
  confidence: ConfidenceLevel;
}

export interface MonthlyProfitPotential {
  gross: number;
  implementationCost: number;
  net: number;
  confidence: ConfidenceLevel;
  breakdown: {
    retention: number;
    aov: number;
    conversion: number;
    inventoryRecovery: number;
    marketingWasteRecovery: number;
    marginRecovery: number;
  };
}

export interface ProfitEngineOutput {
  findings: RuleResult[];
  monthlyProfitPotential: MonthlyProfitPotential;
  strengthsDetected: string[];
  missingDataForRule: Record<string, string[]>;
  dataCompletenessPct: number;
}
