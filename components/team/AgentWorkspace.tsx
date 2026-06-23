"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AgentChatMock } from "./AgentChatMock";
import type { Agent } from "@/lib/types/agents.types";
import { toast } from "@/hooks/use-toast";
import { useMockAgent } from "@/hooks/use-mock-translations";

const insightKeys: Record<string, string[]> = {
  marketer: ["cacOptimization", "clearanceRoi"],
  analyst: ["deadStockPattern"],
};

const taskKeys = ["clearancePlan", "adAnalysis"] as const;

interface AgentWorkspaceProps {
  agent: Agent | null;
  open: boolean;
  onClose: () => void;
}

export function AgentWorkspace({ agent, open, onClose }: AgentWorkspaceProps) {
  const t = useTranslations("agents.workspace");
  const tMock = useTranslations("mock");
  const tCommon = useTranslations("common");
  const localized = useMockAgent(agent?.id ?? "ceo");

  if (!agent) return null;

  const keys = insightKeys[agent.id] ?? ["overview"];
  const insightNs = insightKeys[agent.id] ? `insights.${agent.id}` : "insights.default";

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <span className="text-3xl" style={{ color: agent.color }}>
              {agent.icon}
            </span>
            <div>
              <SheetTitle>{localized.name}</SheetTitle>
              <p className="text-sm text-text-secondary">{localized.role}</p>
            </div>
          </div>
        </SheetHeader>
        <Tabs defaultValue="chat" className="mt-6">
          <TabsList className="w-full">
            <TabsTrigger value="chat" className="flex-1">{t("chat")}</TabsTrigger>
            <TabsTrigger value="insights" className="flex-1">{t("insights")}</TabsTrigger>
            <TabsTrigger value="tasks" className="flex-1">{t("tasks")}</TabsTrigger>
          </TabsList>
          <TabsContent value="chat">
            <AgentChatMock agent={agent} />
          </TabsContent>
          <TabsContent value="insights" className="space-y-4">
            {keys.map((key) => (
              <div
                key={key}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <h4 className="font-medium mb-2">
                  {tMock(`${insightNs}.${key}.title`)}
                </h4>
                <p className="text-sm text-text-secondary mb-3">
                  {key === "overview"
                    ? tMock("insights.default.overview.body", {
                        agentName: localized.name,
                        specialty: localized.specialty.join(", "),
                      })
                    : tMock(`${insightNs}.${key}.body`)}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="accent">{tCommon("confidence", { pct: 85 })}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toast({
                        title: t("actionCreated"),
                        description: t("actionCreatedDesc"),
                      })
                    }
                  >
                    {t("takeAction")}
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="tasks" className="space-y-3">
            {taskKeys.map((taskKey) => {
              const status = tMock(`tasks.${taskKey}.status`) as string;
              const priority = tMock(`tasks.${taskKey}.priority`) as string;
              return (
                <div
                  key={taskKey}
                  className="rounded-xl border border-border p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-sm">
                      {tMock(`tasks.${taskKey}.title`)}
                    </p>
                    <p className="text-xs text-text-muted">
                      {tMock(`taskStatus.${status}`)} ·{" "}
                      {tMock(`taskPriority.${priority}`)} · {t("due")}{" "}
                      {tMock(`tasks.${taskKey}.due`)}
                    </p>
                  </div>
                  <Badge variant={status === "inProgress" ? "accent" : "outline"}>
                    {tMock(`taskStatus.${status}`)}
                  </Badge>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
