"use client";

import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
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

const quickActionKeys = [
  "updateNumbers",
  "reviewRisks",
  "checkBriefing",
] as const;

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const router = useRouter();

  return (
    <DashboardShell title={t("title")}>
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
            title={t("activity.title")}
            description={t("activity.description")}
            actionLabel={t("activity.action")}
            onAction={() => router.push("/team")}
          />
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              {t("quickActions.title")}
            </h3>
            <div className="space-y-2">
              {quickActionKeys.map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() =>
                    toast({
                      title: t(`quickActions.${key}`),
                      description: t("quickActions.navigateDesc"),
                    })
                  }
                >
                  {t(`quickActions.${key}`)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
