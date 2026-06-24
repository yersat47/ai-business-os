import type { BusinessMetrics } from "@/lib/types/metrics.types";
import { dataCompletenessPct } from "@/lib/profit-engine/formulas";

export function confidenceMultiplier(metrics: BusinessMetrics): number {
  const pct = dataCompletenessPct(metrics);
  if (pct >= 80) return 1;
  if (pct >= 50) return 0.92;
  return 0.85;
}

export function confidenceLabel(metrics: BusinessMetrics): "high" | "medium" | "low" {
  const pct = dataCompletenessPct(metrics);
  if (pct >= 80) return "high";
  if (pct >= 50) return "medium";
  return "low";
}
