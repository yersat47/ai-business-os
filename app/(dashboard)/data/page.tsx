"use client";

import { useState } from "react";
import { Upload, Download } from "lucide-react";
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

const dataQualityFields = [
  { field: "Monthly Revenue", provided: true },
  { field: "Average Order Value", provided: true },
  { field: "Marketing Spend", provided: true },
  { field: "Inventory Value", provided: true },
  { field: "Dead Stock Value", provided: true },
  { field: "Customer Feedback", provided: false },
  { field: "Financial Statements", provided: false },
  { field: "Supplier Contracts", provided: false },
];

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
  const company = useCompanyStore((s) => s.company);
  const updateCompany = useCompanyStore((s) => s.updateCompany);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("metrics");

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSaving(false);
    toast({
      title: "Health Score updated",
      description: "Health Score updated: 74/100",
    });
  };

  const completeness = Math.round(
    (dataQualityFields.filter((f) => f.provided).length /
      dataQualityFields.length) *
      100
  );

  return (
    <DashboardShell title="Data Center">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="metrics">Monthly Metrics</TabsTrigger>
          <TabsTrigger value="import">Import Data</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="quality">Data Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics">
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-8">
            <h3 className="font-semibold text-lg">June 2026 — Business Numbers</h3>

            <div>
              <h4 className="text-sm font-medium text-accent mb-4 uppercase tracking-widest">
                Revenue
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <CurrencyInput
                  label="Monthly Revenue"
                  value={company.monthlyRevenue}
                  onChange={(v) => updateCompany({ monthlyRevenue: v })}
                />
                <CurrencyInput
                  label="Average Order Value"
                  value={company.averageOrderValue}
                  onChange={(v) => updateCompany({ averageOrderValue: v })}
                />
                <div>
                  <Label className="text-xs">Number of transactions</Label>
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
                Inventory
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <CurrencyInput
                  label="Total inventory value"
                  value={company.inventoryValue}
                  onChange={(v) => updateCompany({ inventoryValue: v })}
                />
                <CurrencyInput
                  label="Dead stock value"
                  value={company.deadStockValue}
                  onChange={(v) => updateCompany({ deadStockValue: v })}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-accent mb-4 uppercase tracking-widest">
                Marketing
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <CurrencyInput
                  label="Total marketing spend"
                  value={company.marketingSpend}
                  onChange={(v) => updateCompany({ marketingSpend: v })}
                />
                <CurrencyInput
                  label="Instagram ad spend"
                  value={420000}
                  onChange={() => {}}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-accent mb-4 uppercase tracking-widest">
                Finance
              </h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <CurrencyInput label="Total expenses" value={3200000} onChange={() => {}} />
                <CurrencyInput label="Rent" value={450000} onChange={() => {}} />
                <CurrencyInput label="Salaries" value={1800000} onChange={() => {}} />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-accent mb-4 uppercase tracking-widest">
                Team
              </h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs">Active employees</Label>
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
                "Save & Recalculate Health Score"
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
                  title: "Import",
                  description: "CSV import available in the next release.",
                })
              }
            >
              <Upload className="h-8 w-8 text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">
                Drag and drop CSV or Excel files
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  title: "Template",
                  description: "Download template available in the next release.",
                })
              }
            >
              <Download className="h-4 w-4 mr-2" />
              Download template
            </Button>
            <div className="mt-8">
              <EmptyState
                icon={Upload}
                title="No imports yet"
                description="Import your sales, inventory, or financial data to power the Health Score."
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="rounded-xl border border-info/30 bg-info/5 p-4 mb-6 text-sm text-text-secondary">
            Integrations are coming in a future release. Enter data manually for
            now.
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
                  <span className="text-xs text-text-muted">Not connected</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    toast({
                      title: name,
                      description: "Coming in Phase 9",
                    })
                  }
                >
                  Connect
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
              <p className="text-text-secondary mt-2">Data Completeness</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-muted text-left">
                  <th className="pb-3">Data Point</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {dataQualityFields.map((row) => (
                  <tr key={row.field} className="border-b border-border/50">
                    <td className="py-3">{row.field}</td>
                    <td className="py-3">
                      <Badge variant={row.provided ? "success" : "warning"}>
                        {row.provided ? "Provided" : "Missing"}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      {!row.provided && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setTab("metrics")}
                        >
                          Add
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
