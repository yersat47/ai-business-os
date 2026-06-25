"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { YurtRoom } from "@/components/team/YurtRoom";
import { AgentChatMock } from "@/components/team/AgentChatMock";
import { SmmContentCalendar } from "@/components/team/SmmContentCalendar";
import { AgentAvatar } from "@/components/team/AgentAvatar";
import { MOCK_AGENTS } from "@/lib/mock/mock-agents";
import type { Agent } from "@/lib/types/agents.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TeamPage() {
  const t = useTranslations("agents");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <DashboardShell title={t("title")}>
      <AnimatePresence mode="wait">
        {!selectedAgent ? (
          <motion.div
            key="room"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4 text-center md:mb-6">
              <h2 className="text-xl font-bold md:text-2xl">{t("title")}</h2>
              <p className="mt-2 text-sm text-text-secondary md:text-base">{t("yurt.subtitle")}</p>
              <Badge variant="success" className="mt-3">
                {t("badge", { count: MOCK_AGENTS.length })}
              </Badge>
            </div>
            <div className="no-scrollbar -mx-4 mb-4 flex gap-3 overflow-x-auto px-4 pb-2 md:hidden">
              {MOCK_AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => setSelectedAgent(agent)}
                  className="flex h-[88px] min-w-[80px] flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-surface p-2"
                >
                  <AgentAvatar agent={agent} size="sm" />
                  <span className="line-clamp-2 text-center text-[10px] leading-tight text-text-secondary">
                    {agent.name}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                </button>
              ))}
            </div>
            <YurtRoom
              agents={MOCK_AGENTS}
              selectedId={null}
              onSelect={setSelectedAgent}
            />
            <p className="mt-4 text-center text-sm text-text-muted md:mt-6">
              {t("yurt.hint")}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="workspace"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-4xl"
          >
            <Button
              variant="ghost"
              className="mb-4 min-h-[44px] md:mb-6"
              onClick={() => setSelectedAgent(null)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("yurt.backToRoom")}
            </Button>

            <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-8">
              <div className="hidden flex-col items-center text-center md:flex">
                <AgentAvatar agent={selectedAgent} selected size="lg" />
                <h3 className="font-bold text-lg mt-4">{selectedAgent.name}</h3>
                <p className="text-sm text-text-secondary">{selectedAgent.role}</p>
                <p className="text-xs text-accent mt-1">
                  {selectedAgent.avatarAnimal}
                </p>
                <Badge variant="success" className="mt-3">
                  {t("active")}
                </Badge>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-3 md:p-6">
                <div className="mb-3 flex items-center gap-3 rounded-xl border border-border bg-surface-raised p-3 md:hidden">
                  <AgentAvatar agent={selectedAgent} selected size="sm" />
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{selectedAgent.name}</h3>
                    <p className="truncate text-xs text-text-secondary">{selectedAgent.role}</p>
                  </div>
                </div>
                <Tabs defaultValue="chat">
                  <TabsList className="no-scrollbar mb-4 w-full overflow-x-auto">
                    <TabsTrigger value="chat" className="flex-1">
                      {t("workspace.chat")}
                    </TabsTrigger>
                    <TabsTrigger value="insights" className="flex-1">
                      {t("workspace.insights")}
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="flex-1">
                      {t("workspace.tasks")}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="chat">
                    <AgentChatMock agent={selectedAgent} />
                  </TabsContent>
                  <TabsContent value="insights">
                    {selectedAgent.id === "smm" ? (
                      <div className="space-y-4">
                        <div className="rounded-xl border border-border bg-surface-raised p-4">
                          <p className="text-sm text-text-secondary">
                            {selectedAgent.currentTask}
                          </p>
                        </div>
                        <SmmContentCalendar />
                      </div>
                    ) : (
                      <p className="text-sm text-text-secondary p-4 rounded-xl bg-surface-raised border border-border">
                        {selectedAgent.currentTask}
                      </p>
                    )}
                  </TabsContent>
                  <TabsContent value="tasks">
                    <p className="text-sm text-text-secondary">
                      {t("workspace.tasksPlaceholder")}
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}
