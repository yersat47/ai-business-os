"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { AgentCard } from "@/components/team/AgentCard";
import { AgentWorkspace } from "@/components/team/AgentWorkspace";
import { MOCK_AGENTS } from "@/lib/mock/mock-agents";
import type { Agent } from "@/lib/types/agents.types";
import { Badge } from "@/components/ui/badge";

export default function TeamPage() {
  const t = useTranslations("agents");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  const handleOpen = (agent: Agent) => {
    setSelectedAgent(agent);
    setWorkspaceOpen(true);
  };

  return (
    <DashboardShell title={t("title")}>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{t("title")}</h2>
          <Badge variant="success">{t("badge", { count: MOCK_AGENTS.length })}</Badge>
        </div>
        <p className="text-text-secondary mt-2">{t("subtitle")}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_AGENTS.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onOpen={handleOpen} />
        ))}
      </div>
      <AgentWorkspace
        agent={selectedAgent}
        open={workspaceOpen}
        onClose={() => setWorkspaceOpen(false)}
      />
    </DashboardShell>
  );
}
