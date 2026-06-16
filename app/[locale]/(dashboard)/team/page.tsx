"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { YurtRoom } from "@/components/team/YurtRoom";
import { AgentChatMock } from "@/components/team/AgentChatMock";
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
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">{t("title")}</h2>
              <p className="text-text-secondary mt-2">{t("yurt.subtitle")}</p>
              <Badge variant="success" className="mt-3">
                {t("badge", { count: MOCK_AGENTS.length })}
              </Badge>
            </div>
            <YurtRoom
              agents={MOCK_AGENTS}
              selectedId={null}
              onSelect={setSelectedAgent}
            />
            <p className="text-center text-sm text-text-muted mt-6">
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
            className="max-w-4xl mx-auto"
          >
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => setSelectedAgent(null)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("yurt.backToRoom")}
            </Button>

            <div className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="flex flex-col items-center text-center">
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

              <div className="rounded-2xl border border-border bg-surface p-6">
                <Tabs defaultValue="chat">
                  <TabsList className="w-full mb-4">
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
                    <p className="text-sm text-text-secondary p-4 rounded-xl bg-surface-raised border border-border">
                      {selectedAgent.currentTask}
                    </p>
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
