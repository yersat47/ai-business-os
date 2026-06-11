"use client";

import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { HealthScoreWidget } from "@/components/dashboard/HealthScoreWidget";
import { ProfitPotentialWidget } from "@/components/dashboard/ProfitPotentialWidget";
import { ExecutiveBriefing } from "@/components/dashboard/ExecutiveBriefing";
import { TopRisksCard } from "@/components/dashboard/TopRisksCard";
import { TopActionsCard } from "@/components/dashboard/TopActionsCard";
import { AITeamMiniCard } from "@/components/dashboard/AITeamMiniCard";
import { DataCompletenessCard } from "@/components/dashboard/DataCompletenessCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <HealthScoreWidget />
          </div>
          <div className="lg:col-span-2">
            <ProfitPotentialWidget />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <ExecutiveBriefing />
          <AITeamMiniCard />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <TopRisksCard />
          <TopActionsCard />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <DataCompletenessCard />
          <EmptyState
            icon={Clock}
            title="Recent Activity"
            description="Your team's latest actions and AI agent updates will appear here."
            actionLabel="View AI Team"
            onAction={() => window.location.assign("/team")}
          />
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                "Update monthly numbers",
                "Review top risks",
                "Check AI briefing",
              ].map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() =>
                    toast({
                      title: action,
                      description: "Navigating to the relevant section.",
                    })
                  }
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
