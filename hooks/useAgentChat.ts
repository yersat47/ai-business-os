"use client";

import { useState, useCallback } from "react";
import { useCompanyStore } from "@/lib/stores/company.store";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function useAgentChat(agentId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const getAIContext = useCompanyStore((s) => s.getAIContext);

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim() || isLoading) return;

      const userMessage: Message = { role: "user", content: userText.trim() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);
      setStreamingText("");
      setError(null);

      try {
        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agentId,
            messages: updatedMessages,
            companyData: getAIContext(),
          }),
        });

        if (response.status === 503) {
          throw new Error("API_KEY_MISSING");
        }

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setStreamingText(fullText);
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: fullText },
        ]);
        setStreamingText("");
      } catch (err) {
        const message =
          err instanceof Error && err.message === "API_KEY_MISSING"
            ? "AI не настроен. Добавьте ANTHROPIC_API_KEY в .env.local"
            : "Произошла ошибка. Попробуйте ещё раз.";
        setError(message);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: message },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [agentId, messages, isLoading, getAIContext]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setStreamingText("");
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    streamingText,
    error,
    sendMessage,
    clearChat,
  };
}
