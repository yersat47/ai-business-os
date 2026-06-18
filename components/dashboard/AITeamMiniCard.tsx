"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_AGENTS } from "@/lib/mock/mock-agents";

export function AITeamMiniCard() {
  const t = useTranslations("dashboard.aiTeam");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border border-border bg-surface p-6 shadow-card h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{t("title")}</h3>
        <Badge variant="success">{t("active", { count: MOCK_AGENTS.length })}</Badge>
      </div>
      <div className="space-y-3 flex-1">
        {MOCK_AGENTS.map((agent) => (
          <div key={agent.id} className="flex items-center gap-2 text-sm">
            <span
              className="text-lg shrink-0"
              style={{ color: agent.color }}
            >
              {agent.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="font-medium truncate">{agent.name}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
              </div>
              <p className="text-[10px] text-text-muted truncate">
                {agent.currentTask}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full mt-4" asChild>
        <Link href="/team">{t("openTeam")}</Link>
      </Button>
    </motion.div>
  );
}
