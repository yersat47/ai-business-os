"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Agent } from "@/lib/types/agents.types";

const mockChats: Record<string, { role: string; content: string }[]> = {
  marketer: [
    {
      role: "agent",
      content:
        "I've analyzed your Instagram ad performance for May. Your CAC is ₸4,800 — 60% above the fashion retail benchmark of ₸3,000. Main issue: broad targeting on Story Ads. Recommendation: narrow to 25–32, Astana/Almaty, interest: fashion. Expected CAC reduction: 35%.",
    },
    { role: "user", content: "What's the first step?" },
    {
      role: "agent",
      content:
        "Create a new ad set targeting the above audience, pause the current broad campaign, and run for 14 days. I'll monitor results and report back.",
    },
  ],
  ceo: [
    {
      role: "agent",
      content:
        "Urban Mode is in stable health at 74/100. Your top priority this week should be dead stock clearance — ₸750K recoverable with a 30-day campaign.",
    },
  ],
};

interface AgentChatMockProps {
  agent: Agent;
}

export function AgentChatMock({ agent }: AgentChatMockProps) {
  const t = useTranslations("agents");
  const tWs = useTranslations("agents.workspace");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState(
    mockChats[agent.id] ?? [
      {
        role: "agent",
        content: tWs("greeting", { name: agent.name, task: agent.currentTask }),
      },
    ]
  );
  const [showInfo, setShowInfo] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", content: input }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setShowInfo(true);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-260px)] min-h-[420px] flex-col md:h-[400px] md:min-h-0">
      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-2xl px-4 py-3 text-[15px] leading-relaxed md:text-sm ${
                msg.role === "user"
                  ? "max-w-[80%] bg-[#C9923A]/20 text-text-primary md:bg-accent md:text-background"
                  : "max-w-[85%] bg-zinc-900 text-text-secondary md:border md:border-border md:bg-surface-raised"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            {tWs("typing", { name: agent.name })}
          </div>
        )}
        {showInfo && (
          <div className="rounded-xl border border-info/30 bg-info/5 p-4 text-sm text-text-secondary">
            {tWs("aiConnection")}
          </div>
        )}
      </div>
      <div className="sticky bottom-0 flex gap-2 border-t border-border bg-surface pt-3 md:pt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("askPlaceholder")}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="min-h-[44px] text-base"
        />
        <Button variant="bronze" onClick={handleSend} className="min-h-[44px] min-w-[44px] px-4">
          {t("send")}
        </Button>
      </div>
    </div>
  );
}
