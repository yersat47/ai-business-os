"use client";

import { useState, useCallback } from "react";
import { useCompanyStore } from "@/lib/stores/company.store";
import { useHealthStore } from "@/lib/stores/health.store";
import { useProfitStore } from "@/lib/stores/profit.store";
import { hasBusinessMetrics } from "@/lib/utils/has-business-metrics";

export function useBusinessHealth() {
  const [isCalculating, setIsCalculating] = useState(false);
  const company = useCompanyStore((s) => s.company);
  const getMetrics = useCompanyStore((s) => s.getMetrics);
  const setHealthData = useHealthStore((s) => s.setHealthData);
  const setProfitData = useProfitStore((s) => s.setProfitData);
  const lastCalculated = useHealthStore((s) => s.lastCalculated);

  const calculate = useCallback(async () => {
    if (isCalculating) return;

    if (!hasBusinessMetrics(company)) {
      return null;
    }

    setIsCalculating(true);

    try {
      const companyData = getMetrics();

      const [healthRes, profitRes] = await Promise.all([
        fetch("/api/ai/health", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ companyData }),
        }),
        fetch("/api/ai/potential", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ companyData }),
        }),
      ]);

      if (healthRes.status === 503) {
        useHealthStore.getState().recalculate(company);
        useProfitStore.getState().recalculate(company);
        return null;
      }

      if (healthRes.ok) {
        const healthJson = await healthRes.json();
        if (healthJson.health) {
          setHealthData(healthJson.health);
        }
      } else {
        useHealthStore.getState().recalculate(company);
      }

      if (profitRes.ok) {
        const profitJson = await profitRes.json();
        if (profitJson.profit) {
          setProfitData(profitJson.profit);
        }
      } else {
        useProfitStore.getState().recalculate(company);
      }

      return true;
    } catch (error) {
      console.error("Health calculation error:", error);
      useHealthStore.getState().recalculate(company);
      useProfitStore.getState().recalculate(company);
      return null;
    } finally {
      setIsCalculating(false);
    }
  }, [
    company,
    getMetrics,
    isCalculating,
    setHealthData,
    setProfitData,
  ]);

  return {
    calculate,
    isCalculating,
    lastCalculated,
    masterScore: useHealthStore((s) => s.health.masterScore),
  };
}
