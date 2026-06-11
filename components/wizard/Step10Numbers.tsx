"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWizardStore } from "@/lib/stores/wizard.store";
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/utils/formatters";

function CurrencyField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value?: number;
  onChange: (v: number) => void;
  placeholder: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative mt-1.5">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
          ₸
        </span>
        <Input
          className="pl-8 font-mono"
          value={value ? formatCurrencyInput(value) : ""}
          onChange={(e) => onChange(parseCurrencyInput(e.target.value))}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export function Step10Numbers() {
  const { wizardData, setStepData } = useWizardStore();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">Business Numbers</h2>
      <p className="text-text-secondary mb-2">
        Share your key numbers. This powers your Health Score.
      </p>
      <p className="text-xs text-text-muted mb-8">
        Approximate is fine. You can update anytime.
      </p>
      <div className="space-y-4">
        <CurrencyField
          label="Monthly Revenue (₸)"
          value={wizardData.monthlyRevenue}
          onChange={(v) => setStepData({ monthlyRevenue: v })}
          placeholder="8,450,000"
        />
        <CurrencyField
          label="Average Order Value (₸)"
          value={wizardData.averageOrderValue}
          onChange={(v) => setStepData({ averageOrderValue: v })}
          placeholder="24,500"
        />
        <CurrencyField
          label="Monthly Marketing Spend (₸)"
          value={wizardData.marketingSpend}
          onChange={(v) => setStepData({ marketingSpend: v })}
          placeholder="620,000"
        />
        <CurrencyField
          label="Inventory Value (₸)"
          value={wizardData.inventoryValue}
          onChange={(v) => setStepData({ inventoryValue: v })}
          placeholder="4,200,000"
        />
        <div>
          <Label>Number of employees</Label>
          <Input
            type="number"
            className="mt-1.5"
            value={wizardData.employeeCount ?? ""}
            onChange={(e) =>
              setStepData({ employeeCount: parseInt(e.target.value, 10) || 0 })
            }
            placeholder="14"
          />
        </div>
      </div>
      <div className="mt-6 p-4 rounded-xl bg-surface-raised border border-border text-sm text-text-secondary">
        🔒 Your data is private. We never share it.
      </div>
    </div>
  );
}
