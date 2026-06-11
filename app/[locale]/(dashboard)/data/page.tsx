"use client";

import { useState } from "react";
import { Upload, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { useCompanyStore } from "@/lib/stores/company.store";
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/utils/formatters";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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
  { key: null, label: "Customer Feedback", provided: false },
  { key: null, label: "Financial Statements", provided: false },
  { key: null, label: "Supplier Contracts", provided: false },
] as const;

function CurrencyInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <div className="relative mt-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
          ₸
        </span>
        <Input
          className="pl-8 font-mono text-sm"
          value={value ? formatCurrencyInput(value) : ""}
          onChange={(e) => onChange(parseCurrencyInput(e.target.value))}
        />
      </div>
    </div>
  );
}

export default function DataPage() {
  const t = useTranslations("data");
  const tCommon = useTranslations("common");
  const company = useCompanyStore((s) => s.company);
  const updateCompany = useCompanyStore((s) => s.updateCompany);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("metrics");

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSaving(false);
    toast({
      title: t("toast.updated"),
      description: t("toast.updatedDesc", { score: 74 }),
    });
  };

  const completeness = Math.round(
    (dataQualityFieldKeys.filter((f) => f.provided).length /
      dataQualityFieldKeys.length) *
      100
  );

  return (
    <DashboardShell title={t("title")}>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="metrics">{t("tabs.metrics")}</TabsTrigger>
          <TabsTrigger value="import">{t("tabs.import")}</TabsTrigger>
          <TabsTrigger value="integrations">{t("tabs.integrations")}</TabsTrigger>
          <TabsTrigger value="quality">{t("tabs.quality")}</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics">
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-8">
            <h3 className="font-semibold text-lg">
              {t("metricsTitle", { month: "June 2026" })}
            </h3>

            <div>
              <h4 className="text-sm font-medium text-accent mb-4 uppercase tracking-widest">
                {t("sections.revenue")}
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <CurrencyInput
                  label={t("fields.monthlyRevenue")}
                  value={company.monthlyRevenue}
                  onChange={(v) => updateCompany({ monthlyRevenue: v })}
                />
                <CurrencyInput
                  label={t("fields.aov")}
                  value={company.averageOrderValue}
                  onChange={(v) => updateCompany({ averageOrderValue: v })}
                />
                <div>
                  <Label className="text-xs">{t("fields.transactions")}</Label>
                  <Input className="mt-1 font-mono" defaultValue="344" />
                </div>
                <div>
                  <Label className="text-xs">New customers</Label>
                  <Input className="mt-1 font-mono" defaultValue="129" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-accent mb-4 uppercase tracking-widest">
                {t("sections.inventory")}
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <CurrencyInput
                  label={t("fields.inventoryValue")}
                  value={company.inventoryValue}
                  onChange={(v) => updateCompany({ inventoryValue: v })}
                />
                <CurrencyInput
                  label={t("fields.deadStock")}
                  value={company.deadStockValue}
                  onChange={(v) => updateCompany({ deadStockValue: v })}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-accent mb-4 uppercase tracking-widest">
                {t("sections.marketing")}
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <CurrencyInput
                  label={t("fields.marketingSpend")}
                  value={company.marketingSpend}
                  onChange={(v) => updateCompany({ marketingSpend: v })}
                />
                <CurrencyInput
                  label={t("fields.adSpend")}
                  value={420000}
                  onChange={() => {}}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-accent mb-4 uppercase tracking-widest">
                {t("sections.finance")}
              </h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <CurrencyInput label={t("fields.operatingCosts")} value={3200000} onChange={() => {}} />
                <CurrencyInput label="Rent" value={450000} onChange={() => {}} />
                <CurrencyInput label="Salaries" value={1800000} onChange={() => {}} />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-accent mb-4 uppercase tracking-widest">
                {t("sections.team")}
              </h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs">{t("fields.employeeCount")}</Label>
                  <Input
                    className="mt-1"
                    value={company.employeeCount}
                    onChange={(e) =>
                      updateCompany({
                        employeeCount: parseInt(e.target.value, 10) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs">New hires</Label>
                  <Input className="mt-1" defaultValue="1" />
                </div>
                <div>
                  <Label className="text-xs">Departures</Label>
                  <Input className="mt-1" defaultValue="0" />
                </div>
              </div>
            </div>

            <Button
              variant="bronze"
              className="w-full"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t("saveRecalculate")
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="import">
          <div className="rounded-2xl border border-border bg-surface p-8">
            <div
              className="border-2 border-dashed border-border rounded-xl p-12 text-center mb-6 cursor-pointer hover:border-accent"
              onClick={() =>
                toast({
                  title: t("toast.importQueued"),
                  description: t("toast.connectSoon"),
                })
              }
            >
              <Upload className="h-8 w-8 text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">{t("import.dropzone")}</p>
            </div>
            <Button
              variant="outline"
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
          <div className="rounded-xl border border-info/30 bg-info/5 p-4 mb-6 text-sm text-text-secondary">
            {t("integrations.banner")}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((name) => (
              <div
                key={name}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <div className="h-12 w-12 rounded-lg bg-surface-raised flex items-center justify-center text-sm font-bold text-accent mb-4">
                  {name.slice(0, 2)}
                </div>
                <h4 className="font-medium mb-2">{name}</h4>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-2 w-2 rounded-full bg-text-muted" />
                  <span className="text-xs text-text-muted">{tCommon("notConnected")}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
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
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="text-center mb-8">
              <span className="text-5xl font-mono font-bold text-accent">
                {completeness}%
              </span>
              <p className="text-text-secondary mt-2">{t("quality.completeness")}</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-muted text-left">
                  <th className="pb-3">{t("quality.table.field")}</th>
                  <th className="pb-3">{t("quality.table.status")}</th>
                  <th className="pb-3 text-right">{t("quality.table.add")}</th>
                </tr>
              </thead>
              <tbody>
                {dataQualityFieldKeys.map((row) => {
                  const fieldLabel =
                    row.key !== null ? t(`fields.${row.key}`) : row.label;
                  return (
                    <tr key={fieldLabel} className="border-b border-border/50">
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
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
