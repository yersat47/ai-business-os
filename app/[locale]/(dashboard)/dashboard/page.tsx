"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { HeroBriefingSection } from "@/components/dashboard/HeroBriefingSection";
import { TopRisksCard } from "@/components/dashboard/TopRisksCard";
import { TopActionsCard } from "@/components/dashboard/TopActionsCard";
import { MonthlyPerformanceChart } from "@/components/dashboard/MonthlyPerformanceChart";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { SalesHeatmapWidget } from "@/components/widgets/SalesHeatmapWidget";
import { HealthPillarsGrid } from "@/components/dashboard/HealthPillarsGrid";
import { DataCompletenessCard } from "@/components/dashboard/DataCompletenessCard";
import { BusinessCompletionScore } from "@/components/onboarding/BusinessCompletionScore";
import { EmptyState } from "@/components/shared/EmptyState";
import { useCompanyStore } from "@/lib/stores/company.store";
import { getCompletionFromWizard } from "@/lib/utils/completion-calculator";
import { mockMonthlyData } from "@/lib/mock/mock-monthly-performance";

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
        {completion.score < 100 && (
          <BusinessCompletionScore data={completion} compact />
        )}

        <HeroBriefingSection />

        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
          <TopRisksCard />
          <TopActionsCard />
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8">
            <MonthlyPerformanceChart
              data={mockMonthlyData}
              title={t("chart.title")}
              primaryLabel={t("chart.primaryLabel")}
              secondaryLabel={t("chart.secondaryLabel")}
            />
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <CalendarWidget />
          </div>
        </div>

        <SalesHeatmapWidget linkToFinding />

        <HealthPillarsGrid />

        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
          <DataCompletenessCard />
          <EmptyState
            icon={Clock}
            title={t("activity.title")}
            description={t("activity.description")}
            actionLabel={t("activity.action")}
            onAction={() => router.push("/team")}
            showOrnament
          />
        </div>
      </motion.div>
    </DashboardShell>
  );
}
