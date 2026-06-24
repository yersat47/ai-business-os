import type { HealthStatus } from "@/lib/types/health.types";

export function scoreToStatus(score: number): HealthStatus {
  if (score >= 90) return "excellent";
  if (score >= 80) return "healthy";
  if (score >= 70) return "stable";
  if (score >= 60) return "warning";
  return "critical";
}

export function statusColor(status: HealthStatus): HealthStatus {
  return status;
}
