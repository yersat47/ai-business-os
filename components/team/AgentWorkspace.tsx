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
import { AgentChat } from "./AgentChat";
import type { Agent } from "@/lib/types/agents.types";
import { toast } from "@/hooks/use-toast";

const mockInsights: Record<string, { title: string; body: string; confidence: number }[]> = {
  marketer: [
    {
      title: "CAC Optimization Opportunity",
      body: "Narrowing Instagram targeting could reduce CAC by 35% within 14 days.",
      confidence: 78,
    },
    {
      title: "Clearance Campaign ROI",
      body: "Dead stock clearance at 30-50% discount projects ₸750K recovery.",
      confidence: 85,
    },
  ],
  analyst: [
    {
      title: "Dead Stock Pattern",
      body: "78% of dead stock is from Spring 2025 collection — size M and L overrepresented.",
      confidence: 92,
    },
  ],
};

const mockTasks = [
  { title: "Build clearance campaign plan", status: "in progress", priority: "High", due: "Jun 5" },
  { title: "Analyze Q1 ad performance", status: "pending", priority: "Medium", due: "Jun 8" },
];

interface AgentWorkspaceProps {
  agent: Agent | null;
  open: boolean;
  onClose: () => void;
}

export function AgentWorkspace({ agent, open, onClose }: AgentWorkspaceProps) {
  const t = useTranslations("agents.workspace");
  const tCommon = useTranslations("common");

  if (!agent) return null;

  const insights = mockInsights[agent.id] ?? [
    {
      title: "Business Overview",
      body: `${agent.name} is monitoring your ${agent.specialty.join(", ")} metrics.`,
      confidence: 75,
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <span className="text-3xl" style={{ color: agent.color }}>
              {agent.icon}
            </span>
            <div>
              <SheetTitle>{agent.name}</SheetTitle>
              <p className="text-sm text-text-secondary">{agent.role}</p>
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
            <AgentChat agent={agent} />
          </TabsContent>
          <TabsContent value="insights" className="space-y-4">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <h4 className="font-medium mb-2">{insight.title}</h4>
                <p className="text-sm text-text-secondary mb-3">{insight.body}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="accent">{tCommon("confidence", { pct: insight.confidence })}</Badge>
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
            {mockTasks.map((task, i) => (
              <div
                key={i}
                className="rounded-xl border border-border p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-sm">{task.title}</p>
                  <p className="text-xs text-text-muted">
                    {task.status} · {task.priority} · {t("due")} {task.due}
                  </p>
                </div>
                <Badge variant={task.status === "in progress" ? "accent" : "outline"}>
                  {task.status}
                </Badge>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
