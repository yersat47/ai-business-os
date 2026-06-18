"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useAgentChat } from "@/hooks/useAgentChat";
import { getSuggestedQuestions } from "@/lib/ai/agents.prompts";
import type { Agent } from "@/lib/types/agents.types";

interface AgentChatProps {
  agent: Agent;
}

export function AgentChat({ agent }: AgentChatProps) {
  const t = useTranslations("agents");
  const tWs = useTranslations("agents.workspace");
  const { messages, isLoading, streamingText, sendMessage, clearChat } =
    useAgentChat(agent.id);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const glowColor = agent.color;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  useEffect(() => {
    clearChat();
  }, [agent.id, clearChat]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const suggestions = getSuggestedQuestions(agent.id);

  return (
    <div className="flex flex-col h-[480px]">
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {messages.length === 0 && !streamingText && (
          <div className="flex gap-3">
            <div
              className="w-8 h-8 rounded-full shrink-0"
              style={{ background: `${glowColor}30` }}
            />
            <div
              className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-[85%] leading-relaxed"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#EDE8E0",
              }}
            >
              {tWs("greeting", { name: agent.name, task: agent.currentTask })}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.role === "assistant" && (
              <div
                className="w-8 h-8 rounded-full shrink-0"
                style={{ background: `${glowColor}30` }}
              />
            )}
            <div
              className="rounded-2xl px-4 py-3 text-sm max-w-[85%] leading-relaxed whitespace-pre-wrap"
              style={{
                background:
                  msg.role === "user"
                    ? "rgba(201,150,58,0.15)"
                    : "rgba(255,255,255,0.06)",
                color: "#EDE8E0",
                borderRadius:
                  msg.role === "user"
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {streamingText && (
          <div className="flex gap-3">
            <div
              className="w-8 h-8 rounded-full shrink-0"
              style={{ background: `${glowColor}30` }}
            />
            <div
              className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-[85%] leading-relaxed whitespace-pre-wrap"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#EDE8E0",
              }}
            >
              {streamingText}
              <span
                className="inline-block w-1 h-4 ml-1 animate-pulse"
                style={{ background: glowColor }}
              />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div
        className="border-t p-4 mt-2"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isLoading}
            placeholder={t("askPlaceholder")}
            className="flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "0.5px solid rgba(255,255,255,0.1)",
              color: "#EDE8E0",
            }}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-5 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-40"
            style={{ background: glowColor, color: "#06060E" }}
          >
            {isLoading ? "..." : "→"}
          </button>
        </div>

        <div className="flex gap-2 mt-2 flex-wrap">
          {suggestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => sendMessage(q)}
              disabled={isLoading}
              className="text-xs px-3 py-1 rounded-full transition-all disabled:opacity-40"
              style={{
                border: "0.5px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
