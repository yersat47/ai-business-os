import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Company } from "@/lib/types/company.types";
import { MOCK_COMPANY } from "@/lib/mock/mock-company";
import { getCompletionFromWizard } from "@/lib/utils/completion-calculator";

interface CompanyState {
  company: Company;
  isSetupComplete: boolean;
  setCompany: (data: Company) => void;
  updateCompany: (partial: Partial<Company>) => void;
  completeSetup: () => void;
  getAIContext: () => Record<string, string | number>;
  getMetrics: () => Record<string, string | number | undefined>;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set, get) => ({
      company: MOCK_COMPANY,
      isSetupComplete: MOCK_COMPANY.setupComplete,
      setCompany: (data) =>
        set({ company: data, isSetupComplete: data.setupComplete }),
      updateCompany: (partial) => {
        const { company } = get();
        set({ company: { ...company, ...partial } });
      },
      completeSetup: () => {
        const { company } = get();
        set({
          company: { ...company, setupComplete: true },
          isSetupComplete: true,
        });
        if (typeof document !== "undefined") {
          document.cookie = "ai-bos-setup=true; path=/; max-age=604800";
        }
      },
      getMetrics: () => {
        const c = get().company;
        return {
          name: c.name,
          businessType: c.businessType,
          city: c.city,
          monthlyRevenue: c.monthlyRevenue,
          averageOrderValue: c.averageOrderValue,
          marketingSpend: c.marketingSpend,
          inventoryValue: c.inventoryValue,
          deadStockValue: c.deadStockValue,
          grossMarginPct: c.grossMarginPct,
          netMarginPct: c.netMarginPct,
          cac: c.cac,
          repeatPurchaseRate: c.repeatPurchaseRate,
          employeeCount: c.employeeCount,
        };
      },
      getAIContext: () => {
        const c = get().company;
        const { useHealthStore } = require("./health.store") as typeof import("./health.store");
        const health = useHealthStore.getState().health;
        const completion = getCompletionFromWizard({
          name: c.name,
          businessType: c.businessType,
          selectedRoles: c.selectedRoles,
          customRoles: c.customRoles,
          teamRoles: c.teamRoles,
          employeeCount: c.employeeCount,
          monthlyRevenue: c.monthlyRevenue,
        });

        const missing = completion.items
          .filter((item) => !item.complete)
          .map((item) => item.labelKey)
          .join(", ");

        const monthlyExpenses =
          (c.marketingSpend ?? 0) +
          Math.round((c.monthlyRevenue ?? 0) * 0.15);

        return {
          company_name: c.name ?? "Компания",
          business_type: c.businessType ?? "не указан",
          revenue: c.monthlyRevenue ?? 0,
          employee_count: c.employeeCount ?? 0,
          avg_order_value: c.averageOrderValue ?? 0,
          margin: c.grossMarginPct ?? 0,
          net_margin: c.netMarginPct ?? 0,
          expenses: monthlyExpenses,
          cash_reserve: c.netMarginPct
            ? Math.max(1, Math.round(c.netMarginPct / 10))
            : 0,
          payroll: Math.round((c.monthlyRevenue ?? 0) * 0.2),
          rent: Math.round((c.monthlyRevenue ?? 0) * 0.08),
          ad_spend: c.marketingSpend ?? 0,
          cac: c.cac ?? 0,
          roas: c.marketingSpend
            ? Math.round(((c.monthlyRevenue ?? 0) / c.marketingSpend) * 10) / 10
            : 0,
          repeat_rate: c.repeatPurchaseRate ?? 0,
          new_customers: c.averageOrderValue
            ? Math.round((c.monthlyRevenue ?? 0) / c.averageOrderValue)
            : 0,
          conversion_rate: 3.5,
          upt: 1.4,
          inventory_value: c.inventoryValue ?? 0,
          dead_stock: c.inventoryValue
            ? Math.round(
                ((c.deadStockValue ?? 0) / c.inventoryValue) * 100
              )
            : 0,
          city: c.city ?? "Алматы",
          completion_score: completion.score,
          missing_sections: missing || "нет данных",
          integrations: c.currentTools?.join(", ") || "нет",
          health_score: health.masterScore ?? 0,
        };
      },
    }),
    { name: "ai-bos-company" }
  )
);
