"use client";

import { motion } from "framer-motion";
import type { Agent } from "@/lib/types/agents.types";
import { cn } from "@/lib/utils/cn";

interface AgentAvatarProps {
  agent: Agent;
  selected?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const sizes = {
  sm: "h-16 w-16 text-2xl",
  md: "h-24 w-24 text-4xl",
  lg: "h-32 w-32 text-5xl",
};

export function AgentAvatar({
  agent,
  selected = false,
  size = "md",
  onClick,
}: AgentAvatarProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      animate={{
        scale: selected ? 1.08 : 1,
      }}
      whileHover={{ scale: selected ? 1.08 : 1.04 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-full flex items-center justify-center border-2 transition-all duration-300",
        sizes[size],
        selected
          ? "border-accent shadow-[0_0_24px_rgba(201,150,58,0.4)] bg-accent/10"
          : "border-border bg-surface-raised hover:border-border-bright"
      )}
      style={
        selected
          ? { boxShadow: `0 0 32px ${agent.color}40` }
          : undefined
      }
    >
      <span className="select-none">{agent.avatarSymbol}</span>
      {selected && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-accent/50"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
