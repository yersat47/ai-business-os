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
import { SalesHeatmapWidget } from "@/components/widgets/SalesHeatmapWidget";
import { AITeamMiniCard } from "@/components/dashboard/AITeamMiniCard";
import { DataCompletenessCard } from "@/components/dashboard/DataCompletenessCard";
import { MonthlyPerformanceChart } from "@/components/dashboard/MonthlyPerformanceChart";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { RoleDashboardView } from "@/components/dashboard/RoleDashboardView";
import { BusinessCompletionScore } from "@/components/onboarding/BusinessCompletionScore";
import { EmptyState } from "@/components/shared/EmptyState";
import { KazakhPixelOrnament } from "@/components/decorative/KazakhPixelOrnament";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCompanyStore } from "@/lib/stores/company.store";
import { getCompletionFromWizard } from "@/lib/utils/completion-calculator";
import { mockMonthlyData } from "@/lib/mock/mock-monthly-performance";

const quickActionKeys = [
  "updateNumbers",
  "reviewRisks",
  "checkBriefing",
] as const;

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const company = useCompanyStore((s) => s.company);

  const completion = getCompletionFromWizard({
    name: company.name,
    businessType: company.businessType,
    selectedRoles: company.selectedRoles,
    customRoles: company.customRoles,
    teamRoles: company.teamRoles,
    employeeCount: company.employeeCount,
    monthlyRevenue: company.monthlyRevenue,
  });

  return (
    <DashboardShell title={t("title")}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 md:space-y-6"
      >
        <RoleDashboardView />

        {completion.score < 100 && (
          <BusinessCompletionScore data={completion} compact />
        )}

        <div className="grid gap-4 lg:grid-cols-5 lg:gap-6">
          <div className="lg:col-span-3">
            <HealthScoreWidget />
          </div>
          <div className="lg:col-span-2">
            <ProfitPotentialWidget />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2">
            <MonthlyPerformanceChart
              data={mockMonthlyData}
              title={t("chart.title")}
              primaryLabel={t("chart.primaryLabel")}
              secondaryLabel={t("chart.secondaryLabel")}
            />
          </div>
          <CalendarWidget />
        </div>

        <KazakhPixelOrnament variant="divider" className="w-full" />

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <ExecutiveBriefing />
          <AITeamMiniCard />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
          <TopRisksCard />
          <TopActionsCard />
        </div>

        <SalesHeatmapWidget />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
          <DataCompletenessCard />
          <EmptyState
            icon={Clock}
            title={t("activity.title")}
            description={t("activity.description")}
            actionLabel={t("activity.action")}
            onAction={() => router.push("/team")}
            showOrnament
          />
          <div className="rounded-2xl border border-border bg-surface p-4 shadow-card md:p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              {t("quickActions.title")}
            </h3>
            <div className="space-y-2">
              {quickActionKeys.map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  className="min-h-[44px] w-full justify-start"
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
