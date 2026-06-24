import type { BusinessMetrics } from "@/lib/types/metrics.types";
import type {
  BenchmarkMap,
  ProfitEngineOutput,
  RuleResult,
} from "@/lib/profit-engine/types";
import { FASHION_BENCHMARKS } from "@/lib/profit-engine/benchmarks.fashion";
import { dataCompletenessPct } from "@/lib/profit-engine/formulas";
import { ALL_PROFIT_RULES } from "@/lib/profit-engine/rules";
import { calculateProfitPotential } from "@/lib/profit-engine/profitPotential";

function hasInputs(
  metrics: BusinessMetrics,
  keys: (keyof BusinessMetrics)[]
): boolean {
  return keys.every(
    (key) => metrics[key] !== undefined && Number.isFinite(metrics[key])
  );
}

function toRuleResult(
  rule: (typeof ALL_PROFIT_RULES)[number],
  metrics: BusinessMetrics,
  benchmarks: BenchmarkMap
): RuleResult {
  const impact = rule.calculateImpact(metrics, benchmarks);
  return {
    ruleId: rule.id,
    ruleName: rule.name,
    assignedAgent: rule.assignedAgent,
    severity: impact >= 500_000 ? "critical" : impact >= 200_000 ? "warning" : "info",
    impact,
    rootCauses: rule.getRootCauses(metrics, benchmarks),
    recommendations: rule.getRecommendations(metrics, benchmarks),
    confidence: "high",
  };
}

export function runProfitEngine(
  metrics: BusinessMetrics,
  benchmarks: BenchmarkMap = FASHION_BENCHMARKS
): ProfitEngineOutput {
  const missingDataForRule: Record<string, string[]> = {};
  const findings: RuleResult[] = [];
  const strengthsDetected: string[] = [];

  for (const rule of ALL_PROFIT_RULES) {
    if (!hasInputs(metrics, rule.requiredInputs)) {
      missingDataForRule[rule.id] = rule.requiredInputs.filter(
        (key) => metrics[key] === undefined
      ) as string[];
      continue;
    }

    if (rule.detect(metrics, benchmarks)) {
      findings.push(toRuleResult(rule, metrics, benchmarks));
    } else {
      strengthsDetected.push(rule.name);
    }
  }

  findings.sort((a, b) => b.impact - a.impact);

  return {
    findings,
    monthlyProfitPotential: calculateProfitPotential(metrics, findings, benchmarks),
    strengthsDetected,
    missingDataForRule,
    dataCompletenessPct: dataCompletenessPct(metrics),
  };
}
