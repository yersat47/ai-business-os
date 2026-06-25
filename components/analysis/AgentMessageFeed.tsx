"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { AgentMessage } from "@/lib/agents/types";
import { MOCK_AGENTS } from "@/lib/mock/mock-agents";

const AGENT_META = Object.fromEntries(
  MOCK_AGENTS.map((a) => [a.id, { icon: a.icon, color: a.color, name: a.name }])
);

interface AgentMessageFeedProps {
  messages: AgentMessage[];
}

export function AgentMessageFeed({ messages }: AgentMessageFeedProps) {
  const t = useTranslations("data.analysis");

  if (messages.length === 0) {
    return (
      <p className="text-sm text-text-muted">{t("noAgentMessages")}</p>
    );
  }

  const sorted = [...messages].sort((a, b) => a.priority - b.priority);

  return (
    <div className="space-y-4">
      {sorted.map((message) => {
        const meta = AGENT_META[message.agentId];
        return (
          <div
            key={message.id}
            className="rounded-xl border border-border bg-surface p-4 md:p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg text-lg"
                style={{
                  backgroundColor: `${meta?.color ?? "#C9923A"}20`,
                  color: meta?.color ?? "#C9923A",
                }}
              >
                {meta?.icon ?? "⬡"}
              </span>
              <div>
                <p className="font-medium text-text-primary">
                  {meta?.name ?? message.agentId}
                </p>
                <p className="text-xs text-text-muted">
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-text-secondary">
              {message.text}
            </p>
            {message.suggestedActions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {message.suggestedActions.map((action, i) => (
                  <Badge
                    key={`${message.id}-action-${i}`}
                    variant="outline"
                    className="border-accent/30 text-accent"
                  >
                    {action}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
