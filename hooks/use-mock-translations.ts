"use client";

import { useTranslations } from "next-intl";

export function useMockAgent(agentId: string) {
  const t = useTranslations("mock.agents");

  return {
    name: t(`${agentId}.name`),
    role: t(`${agentId}.role`),
    description: t(`${agentId}.description`),
    currentTask: t(`${agentId}.currentTask`),
    lastActivity: t(`${agentId}.lastActivity`),
    specialty: t.raw(`${agentId}.specialty`) as string[],
  };
}

export function useMockRisk(riskId: string) {
  const t = useTranslations("mock.risks");
  return {
    title: t(`${riskId}.title`),
    description: t(`${riskId}.description`),
    agent: t(`${riskId}.agent`),
  };
}

export function useMockAction(actionId: string) {
  const t = useTranslations("mock.actions");
  return {
    title: t(`${actionId}.title`),
    description: t(`${actionId}.description`),
    agent: t(`${actionId}.agent`),
  };
}
