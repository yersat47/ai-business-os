import type { ProfitEngineOutput } from "@/lib/profit-engine/types";
import type { HealthData } from "@/lib/types/health.types";
import type { BusinessMetrics } from "@/lib/types/metrics.types";
import type { AgentMessage } from "@/lib/agents/types";
import {
  accountantExplainer,
  analystExplainer,
  managerExplainer,
  marketerExplainer,
} from "@/lib/agents/explainers";

export function generateFeedback(
  profitOutput: ProfitEngineOutput,
  health: HealthData,
  metrics: BusinessMetrics,
  companyName?: string
): AgentMessage[] {
  const messages: AgentMessage[] = [
    analystExplainer(health, profitOutput, metrics, companyName),
  ];

  const marketer = marketerExplainer(profitOutput, metrics);
  if (marketer) messages.push(marketer);

  const accountant = accountantExplainer(profitOutput, metrics);
  if (accountant) messages.push(accountant);

  const manager = managerExplainer(profitOutput);
  if (manager) messages.push(manager);

  return messages.sort((a, b) => a.priority - b.priority);
}
