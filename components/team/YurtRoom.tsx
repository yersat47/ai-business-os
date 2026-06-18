"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShanyrakArc } from "@/components/shared/ShanyrakArc";
import { AgentAvatar } from "./AgentAvatar";
import type { Agent } from "@/lib/types/agents.types";

interface YurtRoomProps {
  agents: Agent[];
  selectedId: string | null;
  onSelect: (agent: Agent) => void;
}

const positions = [
  "top-[12%] left-[50%] -translate-x-1/2",
  "top-[28%] left-[18%]",
  "top-[28%] right-[18%]",
  "top-[58%] left-[22%]",
  "top-[58%] right-[22%]",
  "bottom-[8%] left-[50%] -translate-x-1/2",
];

export function YurtRoom({ agents, selectedId, onSelect }: YurtRoomProps) {
  const t = useTranslations("agents.yurt");

  return (
    <div className="relative mx-auto aspect-square min-h-[340px] w-full max-w-2xl sm:min-h-[420px]">
      <ShanyrakArc className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" />

      <div className="absolute inset-[15%] rounded-full border border-accent/10" />
      <div className="absolute inset-[25%] rounded-full border border-accent/5" />

      <p className="absolute left-0 right-0 top-0 text-center text-[10px] uppercase tracking-widest text-text-muted sm:text-xs">
        {t("roomLabel")}
      </p>

      {agents.map((agent, i) => (
        <motion.div
          key={agent.id}
          className={`absolute ${positions[i] ?? positions[0]} flex flex-col items-center gap-1.5 sm:gap-2`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
        >
          <AgentAvatar
            agent={agent}
            selected={selectedId === agent.id}
            size="md"
            onClick={() => onSelect(agent)}
          />
          <span
            className={`max-w-[68px] text-center text-[10px] font-medium leading-tight sm:max-w-[90px] sm:text-xs ${
              selectedId === agent.id ? "text-accent" : "text-text-secondary"
            }`}
          >
            {agent.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
