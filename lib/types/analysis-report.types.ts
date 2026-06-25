import type { AgentMessage } from "@/lib/agents/types";
import type { CalculationTraceRow } from "@/lib/calculation/trace.types";
import type { ProfitEngineOutput } from "@/lib/profit-engine/types";
import type { HealthData } from "@/lib/types/health.types";
import type { BusinessMetrics, HealthTimelineEntry } from "@/lib/types/metrics.types";

export interface AnalysisReport {
  monthKey: string;
  generatedAt: string;
  metrics: BusinessMetrics;
  traces: CalculationTraceRow[];
  profitOutput: ProfitEngineOutput;
  health: HealthData;
  feedback: AgentMessage[];
  timelineEntry: HealthTimelineEntry;
  prevMetrics?: BusinessMetrics;
  prevHealthScore: number | null;
  prevGrossMargin: number | null;
  prevNetMargin: number | null;
  prevRevenue: number | null;
}
