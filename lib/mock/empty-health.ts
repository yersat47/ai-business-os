import type { HealthData } from "@/lib/types/health.types";

const pillarIds = [
  "financial",
  "sales",
  "customer",
  "inventory",
  "marketing",
  "team",
  "operations",
  "aiReadiness",
] as const;

const emptyPillars = pillarIds.map((id) => ({
  id,
  label: id,
  score: 0,
  weight:
    id === "financial"
      ? 0.3
      : id === "sales"
        ? 0.25
        : id === "customer"
          ? 0.15
          : id === "inventory"
            ? 0.1
            : id === "marketing"
              ? 0.08
              : id === "team"
                ? 0.07
                : id === "operations"
                  ? 0.03
                  : 0.02,
  status: "warning" as const,
  trend: "flat" as const,
  delta: 0,
}));

export const EMPTY_HEALTH: HealthData = {
  masterScore: 0,
  trend: "flat",
  trendDelta: 0,
  status: "warning",
  statusColor: "warning",
  dataCompleteness: 0,
  pillars: emptyPillars,
  topRisks: [],
  topActions: [],
};
