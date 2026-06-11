export type HealthStatus =
  | "excellent"
  | "healthy"
  | "stable"
  | "warning"
  | "critical";

export type TrendDirection = "up" | "down" | "flat";

export interface PillarScore {
  id: string;
  label: string;
  score: number;
  weight: number;
  status: HealthStatus;
  trend: TrendDirection;
  delta: number;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  severity: HealthStatus;
  impact: number;
  agent: string;
  pillar: string;
}

export interface Action {
  id: string;
  title: string;
  description: string;
  priority: number;
  estimatedRecovery: number;
  effort: string;
  agent: string;
  agentColor: string;
}

export interface HealthData {
  masterScore: number;
  trend: TrendDirection;
  trendDelta: number;
  status: HealthStatus;
  statusColor: HealthStatus;
  dataCompleteness: number;
  pillars: PillarScore[];
  topRisks: Risk[];
  topActions: Action[];
}
