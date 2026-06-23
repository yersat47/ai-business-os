"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Agent } from "@/lib/types/agents.types";
import { useMockAgent } from "@/hooks/use-mock-translations";

interface AgentCardProps {
  agent: Agent;
  onOpen: (agent: Agent) => void;
}

export function AgentCard({ agent, onOpen }: AgentCardProps) {
  const t = useTranslations("agents.workspace");
  const tCommon = useTranslations("common");
  const localized = useMockAgent(agent.id);

  return (
    <div className="rounded-2xl border border-border bg-surface/80 backdrop-blur p-6 hover:border-border-bright hover:scale-[1.01] transition-all duration-300">
      <div className="text-5xl mb-4" style={{ color: agent.color }}>
        {agent.icon}
      </div>
      <h3 className="font-bold text-lg">{localized.name}</h3>
      <p className="text-sm text-text-secondary mb-2">{localized.role}</p>
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2 w-2 rounded-full bg-success" />
        <span className="text-xs text-success">{tCommon("active")}</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-4">
        {localized.specialty.map((s) => (
          <Badge key={s} variant="outline" className="text-[10px]">
            {s}
          </Badge>
        ))}
      </div>
      <p className="text-xs text-text-muted italic mb-2">{localized.currentTask}</p>
      <p className="text-[10px] text-text-muted mb-4">
        {t("lastActive", { time: localized.lastActivity })}
      </p>
      <Button variant="outline" className="w-full" onClick={() => onOpen(agent)}>
        {t("openWorkspace")}
      </Button>
    </div>
  );
}
