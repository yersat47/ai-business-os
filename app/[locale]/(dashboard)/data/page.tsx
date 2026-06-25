"use client";

import { useState } from "react";
import { Upload, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { toast } from "@/hooks/use-toast";
import { DataCenterGuided } from "@/components/data/DataCenterGuided";
import { DataHistoryPanel } from "@/components/data/DataHistoryPanel";

const integrations = [
  "Google Sheets",
  "Instagram",
  "Kaspi.kz",
  "Poster POS",
  "1C",
  "WhatsApp",
];

const dataQualityFieldKeys = [
  { key: "monthlyRevenue", provided: true },
  { key: "aov", provided: true },
  { key: "marketingSpend", provided: true },
  { key: "inventoryValue", provided: true },
  { key: "deadStock", provided: true },
  { key: "customerFeedback", provided: false },
  { key: "financialStatements", provided: false },
  { key: "supplierContracts", provided: false },
] as const;

export default function DataPage() {
  const t = useTranslations("data");
  const tCommon = useTranslations("common");
  const [tab, setTab] = useState("metrics");

  const completeness = Math.round(
    (dataQualityFieldKeys.filter((f) => f.provided).length /
      dataQualityFieldKeys.length) *
      100
  );

  return (
    <DashboardShell title={t("title")}>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="no-scrollbar mb-4 w-full justify-start overflow-x-auto">
          <TabsTrigger value="history">{t("tabs.history")}</TabsTrigger>
          <TabsTrigger value="metrics">{t("tabs.metrics")}</TabsTrigger>
          <TabsTrigger value="import">{t("tabs.import")}</TabsTrigger>
          <TabsTrigger value="integrations">{t("tabs.integrations")}</TabsTrigger>
          <TabsTrigger value="quality">{t("tabs.quality")}</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics">
          <DataCenterGuided />
        </TabsContent>

        <TabsContent value="history">
          <DataHistoryPanel
            onMonthSelected={() => setTab("metrics")}
          />
        </TabsContent>

        <TabsContent value="import">
          <div className="rounded-2xl border border-border bg-surface p-4 md:p-8">
            <label
              className="mb-4 flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 text-sm font-medium text-accent md:hidden"
              onClick={() =>
                toast({
                  title: t("toast.importQueued"),
                  description: t("toast.connectSoon"),
                })
              }
            >
              <Upload className="h-5 w-5" />
              {t("import.dropzone")}
              <input type="file" accept=".csv,.xlsx,.xls,image/*" capture="environment" className="sr-only" />
            </label>
            <div
              className="mb-6 hidden cursor-pointer rounded-xl border-2 border-dashed border-border p-12 text-center hover:border-accent md:block"
              onClick={() =>
                toast({
                  title: t("toast.importQueued"),
                  description: t("toast.connectSoon"),
                })
              }
            >
              <Upload className="mx-auto mb-3 h-8 w-8 text-text-muted" />
              <p className="text-text-secondary">{t("import.dropzone")}</p>
            </div>
            <Button
              variant="outline"
              className="min-h-[44px] w-full md:w-auto"
              onClick={() =>
                toast({
                  title: t("import.downloadTemplate"),
                  description: t("toast.connectSoon"),
                })
              }
            >
              <Download className="h-4 w-4 mr-2" />
              {t("import.downloadTemplate")}
            </Button>
            <div className="mt-8">
              <EmptyState
                icon={Upload}
                title={t("import.empty")}
                description={t("import.dropzone")}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="mb-4 rounded-xl border border-info/30 bg-info/5 p-4 text-sm text-text-secondary md:mb-6">
            {t("integrations.banner")}
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {integrations.map((name) => (
              <div
                key={name}
                className="flex min-h-[72px] items-center gap-3 rounded-xl border border-border bg-surface p-4 md:block md:p-6"
              >
                <div className="mb-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-raised text-sm font-bold text-accent md:mb-4 md:h-12 md:w-12">
                  {name.slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 truncate font-medium md:mb-2">{name}</h4>
                  <div className="mb-0 flex items-center gap-2 md:mb-4">
                  <span className="h-2 w-2 rounded-full bg-text-muted" />
                  <span className="text-xs text-text-muted">{tCommon("notConnected")}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-h-[44px] shrink-0 md:w-full"
                  onClick={() =>
                    toast({
                      title: name,
                      description: t("toast.connectSoon"),
                    })
                  }
                >
                  {t("integrations.connect")}
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quality">
          <div className="rounded-2xl border border-border bg-surface p-4 md:p-6">
            <div className="mb-6 text-center md:mb-8">
              <span className="text-4xl font-mono font-bold text-accent md:text-5xl">
                {completeness}%
              </span>
              <p className="text-text-secondary mt-2">{t("quality.completeness")}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-accent" style={{ width: `${completeness}%` }} />
              </div>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border text-text-muted text-left">
                  <th className="pb-3">{t("quality.table.field")}</th>
                  <th className="pb-3">{t("quality.table.status")}</th>
                  <th className="pb-3 text-right">{t("quality.table.add")}</th>
                </tr>
              </thead>
              <tbody>
                {dataQualityFieldKeys.map((row) => {
                  const fieldLabel = t(`fields.${row.key}`);
                  return (
                    <tr key={row.key} className="border-b border-border/50">
                      <td className="py-3">{fieldLabel}</td>
                      <td className="py-3">
                        <Badge variant={row.provided ? "success" : "warning"}>
                          {row.provided ? tCommon("provided") : tCommon("missing")}
                        </Badge>
                      </td>
                      <td className="py-3 text-right">
                        {!row.provided && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setTab("metrics")}
                          >
                            {t("quality.table.add")}
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
