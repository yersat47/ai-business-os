import type { ProfitEngineOutput } from "@/lib/profit-engine/types";
import type { HealthData } from "@/lib/types/health.types";
import type { BusinessMetrics } from "@/lib/types/metrics.types";
import { formatCurrency } from "@/lib/utils/formatters";
import type { AgentMessage } from "@/lib/agents/types";
import { grossMarginPct, repeatCustomerRate, revenueGrowthMom, cac } from "@/lib/profit-engine/formulas";

let messageCounter = 0;
function msg(
  agentId: AgentMessage["agentId"],
  text: string,
  citations: string[],
  actions: string[],
  priority: number
): AgentMessage {
  messageCounter += 1;
  return {
    id: `msg-${messageCounter}`,
    agentId,
    text,
    sourceCitations: citations,
    suggestedActions: actions,
    timestamp: new Date().toISOString(),
    priority,
  };
}

export function analystExplainer(
  health: HealthData,
  profit: ProfitEngineOutput,
  metrics: BusinessMetrics,
  companyName = "Компания"
): AgentMessage {
  const topFinding = profit.findings[0];
  const growth = revenueGrowthMom(metrics);
  const growthText =
    growth !== null
      ? `Выручка ${growth >= 0 ? "выросла" : "снизилась"} на ${Math.abs(growth).toFixed(1)}% к прошлому месяцу.`
      : "Для анализа динамики выручки нужны данные за прошлый месяц.";

  const findingText = topFinding
    ? ` Ключевая находка: ${topFinding.ruleName} — потенциальный эффект ${formatCurrency(topFinding.impact)}.`
    : " Критических утечек прибыли не обнаружено.";

  return msg(
    "analyst",
    `${companyName}: индекс здоровья бизнеса ${health.masterScore}/100 (${health.status}). ${growthText}${findingText} Потенциал восстановления прибыли: ${formatCurrency(profit.monthlyProfitPotential.net)} в месяц.`,
    [`BHS:${health.masterScore}`, `PP:${profit.monthlyProfitPotential.net}`],
    profit.findings.slice(0, 2).map((f) => f.recommendations[0]).filter(Boolean),
    topFinding?.severity === "critical" ? 1 : 3
  );
}

export function marketerExplainer(
  profit: ProfitEngineOutput,
  metrics: BusinessMetrics
): AgentMessage | null {
  const marketingFindings = profit.findings.filter((f) => f.assignedAgent === "marketer");
  if (!marketingFindings.length) return null;

  const f = marketingFindings[0];
  const cacVal = cac(metrics);
  const repeat = repeatCustomerRate(metrics);

  return msg(
    "marketer",
    `Маркетинг: ${f.ruleName}. CAC ${cacVal !== null ? formatCurrency(cacVal) : "—"}, повторные покупки ${repeat !== null ? `${repeat.toFixed(0)}%` : "—"}. Потенциал улучшения: ${formatCurrency(f.impact)}.`,
    [f.ruleId],
    f.recommendations,
    f.severity === "critical" ? 2 : 4
  );
}

export function accountantExplainer(
  profit: ProfitEngineOutput,
  metrics: BusinessMetrics
): AgentMessage | null {
  const finFindings = profit.findings.filter((f) => f.assignedAgent === "accountant");
  if (!finFindings.length) return null;

  const f = finFindings[0];
  const gm = grossMarginPct(metrics);

  return msg(
    "accountant",
    `Финансы: ${f.ruleName}. Валовая маржа ${gm !== null ? `${gm.toFixed(1)}%` : "—"}. Риск: ${formatCurrency(f.impact)}.`,
    [f.ruleId],
    f.recommendations,
    f.severity === "critical" ? 2 : 5
  );
}

export function managerExplainer(profit: ProfitEngineOutput): AgentMessage | null {
  const inv = profit.findings.find((f) => f.assignedAgent === "manager");
  if (!inv) return null;

  return msg(
    "manager",
    `Склад: ${inv.ruleName}. Замороженный капитал в неликвиде требует действий. Потенциал высвобождения: ${formatCurrency(inv.impact)}.`,
    [inv.ruleId],
    inv.recommendations,
    inv.severity === "critical" ? 2 : 5
  );
}
