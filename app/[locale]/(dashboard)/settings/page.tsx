"use client";

import { useTranslations } from "next-intl";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeSettings } from "@/components/layout/ThemeSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useCompanyStore } from "@/lib/stores/company.store";
import { MOCK_AGENTS } from "@/lib/mock/mock-agents";
import type { UserRole } from "@/lib/types/company.types";
import { toast } from "@/hooks/use-toast";

const roles: UserRole[] = [
  "owner",
  "manager",
  "marketer",
  "accountant",
  "salesperson",
  "smm",
  "administrator",
];

const notificationKeys = [
  "dailyBriefing",
  "healthAlerts",
  "profitOpportunities",
  "teamUpdates",
] as const;

const planKeys = ["starter", "pro", "enterprise"] as const;
const planFeatureKeys = ["f1", "f2", "f3"] as const;

export default function SettingsPage() {
  const t = useTranslations("settings");
  const tLang = useTranslations("language");
  const tRoles = useTranslations("roles");
  const tCommon = useTranslations("common");
  const user = useAuthStore((s) => s.user);
  const setRole = useAuthStore((s) => s.setRole);
  const company = useCompanyStore((s) => s.company);
  const updateCompany = useCompanyStore((s) => s.updateCompany);

  const save = () =>
    toast({ title: t("saved"), description: t("savedDesc") });

  return (
    <DashboardShell title={t("title")}>
      <div className="mb-6 max-w-lg space-y-6 md:mb-8 md:space-y-8">
        <div>
          <h3 className="font-semibold mb-4">{tLang("title")}</h3>
          <LanguageSwitcher variant="full" />
        </div>
        <ThemeSettings />
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="no-scrollbar mb-4 w-full justify-start overflow-x-auto">
          <TabsTrigger value="profile">{t("tabs.profile")}</TabsTrigger>
          <TabsTrigger value="company">{t("tabs.company")}</TabsTrigger>
          <TabsTrigger value="ai-team">{t("tabs.aiTeam")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("tabs.notifications")}</TabsTrigger>
          <TabsTrigger value="billing">{t("tabs.billing")}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="max-w-lg space-y-4 rounded-2xl border border-border bg-surface p-4 md:p-6">
            <div>
              <Label>{t("profile.name")}</Label>
              <Input className="mt-1.5 min-h-[52px] text-base" defaultValue={user?.name ?? "Ersat"} />
            </div>
            <div>
              <Label>{t("profile.email")}</Label>
              <Input
                className="mt-1.5 min-h-[52px] text-base"
                defaultValue={user?.email ?? "ersat@urbanmode.kz"}
              />
            </div>
            <div>
              <Label>{t("profile.role")}</Label>
              <Input
                className="mt-1.5 min-h-[52px] text-base"
                value={tRoles("owner")}
                readOnly
                disabled
              />
            </div>
            <div>
              <Label>{t("profile.viewAsRole")}</Label>
              <Select
                value={user?.role ?? "owner"}
                onValueChange={(v) => setRole(v as UserRole)}
              >
                <SelectTrigger className="mt-1.5 min-h-[52px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {tRoles(r)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-text-muted mt-1">
                {t("profile.viewAsHint")}
              </p>
            </div>
            <Button variant="bronze" className="min-h-[52px] w-full sm:w-auto" onClick={save}>
              {tCommon("saveChanges")}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="company">
          <div className="max-w-lg space-y-4 rounded-2xl border border-border bg-surface p-4 md:p-6">
            <div>
              <Label>{t("company.name")}</Label>
              <Input
                className="mt-1.5 min-h-[52px] text-base"
                value={company.name}
                onChange={(e) => updateCompany({ name: e.target.value })}
              />
            </div>
            <div>
              <Label>{t("company.industry")}</Label>
              <Input
                className="mt-1.5 min-h-[52px] text-base"
                value={company.industry}
                onChange={(e) => updateCompany({ industry: e.target.value })}
              />
            </div>
            <div>
              <Label>{t("company.city")}</Label>
              <Input
                className="mt-1.5 min-h-[52px] text-base"
                value={company.city}
                onChange={(e) => updateCompany({ city: e.target.value })}
              />
            </div>
            <div>
              <Label>{t("company.salesChannels")}</Label>
              <p className="text-sm text-text-secondary mt-2">
                {company.salesChannels.join(", ")}
              </p>
            </div>
            <Button variant="bronze" className="min-h-[52px] w-full sm:w-auto" onClick={save}>
              {tCommon("saveChanges")}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="ai-team">
          <div className="max-w-lg space-y-3 rounded-2xl border border-border bg-surface p-4 md:space-y-4 md:p-6">
            <p className="text-sm text-text-secondary mb-4">
              {t("aiTeam.deactivateHint")}
            </p>
            {MOCK_AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="flex min-h-[56px] items-center justify-between gap-3 rounded-xl border border-border p-3 md:p-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span style={{ color: agent.color }}>{agent.icon}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{agent.name}</p>
                    <p className="truncate text-xs text-text-muted">{agent.role}</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="max-w-lg space-y-2 rounded-2xl border border-border bg-surface p-4 md:space-y-4 md:p-6">
            {notificationKeys.map((key) => (
              <div
                key={key}
                className="flex min-h-[56px] items-center justify-between gap-3 border-b border-border/40 py-2 last:border-0"
              >
                <span className="text-sm">{t(`notifications.${key}`)}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-4 md:flex-row md:items-center md:justify-between md:p-6">
              <div>
                <p className="font-semibold">{t("billing.currentPlan")}</p>
                <p className="text-sm text-text-secondary mt-1">
                  {t("billing.trialAccess")}
                </p>
              </div>
              <Button
                variant="bronze"
                className="min-h-[52px] w-full md:w-auto"
                onClick={() =>
                  toast({
                    title: t("billing.upgradeToast"),
                    description: t("billing.upgradeToastDesc"),
                  })
                }
              >
                {t("billing.upgrade")}
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {planKeys.map((planKey) => (
                <div
                  key={planKey}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <h4 className="font-semibold">{t(`billing.plans.${planKey}.name`)}</h4>
                  <p className="text-accent font-mono mt-1 mb-4">
                    {t(`billing.plans.${planKey}.price`)}
                  </p>
                  <ul className="space-y-2">
                    {planFeatureKeys.map((fKey) => (
                      <li key={fKey} className="text-sm text-text-secondary flex items-center gap-2">
                        <Badge variant="accent" className="h-1.5 w-1.5 p-0 rounded-full" />
                        {t(`billing.plans.${planKey}.${fKey}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
