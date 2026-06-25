import type { ProfitEngineOutput } from "@/lib/profit-engine/types";
import type { AgentMessage } from "@/lib/agents/types";
import type { HealthData } from "@/lib/types/health.types";
import type { HealthTimelineEntry } from "@/lib/types/metrics.types";
import { runProfitEngine } from "@/lib/profit-engine/engine";
import { calculateMasterHealth } from "@/lib/health-system/masterScore";
import { generateFeedback } from "@/lib/agents/generateFeedback";
import type { BusinessMetrics } from "@/lib/types/metrics.types";
import { collectCalculationTraces } from "@/lib/calculation/collectTraces";
import type { CalculationTraceRow } from "@/lib/calculation/trace.types";

export interface CalculationResult {
  profitOutput: ProfitEngineOutput;
  health: HealthData;
  feedback: AgentMessage[];
  timelineEntry: HealthTimelineEntry;
  traces: CalculationTraceRow[];
}

export function runCalculationPipeline(
  metrics: BusinessMetrics,
  monthKey: string,
  prevMetrics?: BusinessMetrics,
  prevMasterScore?: number | null
): CalculationResult {
  const profitOutput = runProfitEngine(metrics);

  let prevPillarScores: Record<string, number> | undefined;
  if (prevMetrics) {
    const prevProfit = runProfitEngine(prevMetrics);
    const prevHealth = calculateMasterHealth(prevMetrics, prevProfit);
    prevPillarScores = Object.fromEntries(
      prevHealth.pillars.map((p) => [p.id, p.score])
    );
  }

  const health = calculateMasterHealth(metrics, profitOutput, prevPillarScores);
  const feedback = generateFeedback(profitOutput, health, metrics);

  const timelineEntry: HealthTimelineEntry = {
    monthKey,
    date: new Date().toISOString(),
    masterScoreBefore: prevMasterScore ?? null,
    masterScoreAfter: health.masterScore,
    delta: prevMasterScore !== null && prevMasterScore !== undefined
      ? health.masterScore - prevMasterScore
      : 0,
    linkedPillars: health.pillars
      .filter((p) => p.status === "critical" || p.status === "warning")
      .map((p) => p.id),
  };

  const traces = collectCalculationTraces(metrics);

  return { profitOutput, health, feedback, timelineEntry, traces };
}
