"use client";

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
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState(
    mockChats[agent.id] ?? [
      {
        role: "agent",
        content: `Hello! I'm ${agent.name}. I'm currently working on: ${agent.currentTask}`,
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
    <div className="flex flex-col h-[400px]">
      <div className="flex-1 overflow-y-auto space-y-4 p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === "user"
                  ? "bg-accent text-background"
                  : "bg-surface-raised border border-border text-text-secondary"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            {agent.name} is typing...
          </div>
        )}
        {showInfo && (
          <div className="rounded-xl border border-info/30 bg-info/5 p-4 text-sm text-text-secondary">
            This feature requires AI connection. Available in the next release.
          </div>
        )}
      </div>
      <div className="flex gap-2 pt-4 border-t border-border">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button variant="bronze" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
}
