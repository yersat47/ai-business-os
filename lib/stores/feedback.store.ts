import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AgentMessage } from "@/lib/agents/types";
import { safeLocalStorage } from "@/lib/stores/safe-storage";

interface FeedbackState {
  messages: AgentMessage[];
  setMessages: (messages: AgentMessage[]) => void;
  addMessage: (message: AgentMessage) => void;
  getMessagesForAgent: (agentId: AgentMessage["agentId"]) => AgentMessage[];
  clear: () => void;
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set, get) => ({
      messages: [],
      setMessages: (messages) => set({ messages }),
      addMessage: (message) =>
        set((state) => ({ messages: [message, ...state.messages] })),
      getMessagesForAgent: (agentId) =>
        get().messages.filter((m) => m.agentId === agentId),
      clear: () => set({ messages: [] }),
    }),
    { name: "ai-bos-feedback", storage: safeLocalStorage }
  )
);
