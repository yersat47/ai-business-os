"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFeedbackStore } from "@/lib/stores/feedback.store";
import { MOCK_AGENTS } from "@/lib/mock/mock-agents";

const AGENT_ICONS: Record<string, string> = Object.fromEntries(
  MOCK_AGENTS.map((a) => [a.id, a.icon])
);

const AGENT_COLORS: Record<string, string> = Object.fromEntries(
  MOCK_AGENTS.map((a) => [a.id, a.color])
);

export function AITeamMiniCard() {
  const t = useTranslations("dashboard.aiTeam");
  const messages = useFeedbackStore((s) => s.messages);

  const feed =
    messages.length > 0
      ? messages.slice(0, 4).map((m) => ({
          id: m.id,
          agentId: m.agentId,
          text: m.text.slice(0, 80) + (m.text.length > 80 ? "…" : ""),
        }))
      : MOCK_AGENTS.slice(0, 4).map((a) => ({
          id: a.id,
          agentId: a.id,
          text: a.currentTask,
        }));

  const activeCount = messages.length > 0 ? messages.length : MOCK_AGENTS.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex h-full flex-col rounded-2xl border border-border bg-surface p-4 shadow-card md:p-6"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-base md:text-lg">{t("title")}</h3>
        <Badge variant="success">{t("active", { count: activeCount })}</Badge>
      </div>
      <div className="space-y-3 flex-1">
        {feed.map((item) => (
          <div key={item.id} className="flex min-h-[44px] items-center gap-2 text-sm">
            <span
              className="text-lg shrink-0"
              style={{ color: AGENT_COLORS[item.agentId] ?? "#C9923A" }}
            >
              {AGENT_ICONS[item.agentId] ?? "⬡"}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="font-medium truncate capitalize">{item.agentId}</span>
                {messages.length > 0 && (
                  <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                )}
              </div>
              <p className="text-[10px] text-text-muted truncate">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="mt-4 min-h-[44px] w-full" asChild>
        <Link href="/team">{t("openTeam")}</Link>
      </Button>
    </motion.div>
  );
}
