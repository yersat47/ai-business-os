import type { MetricKey } from "@/lib/types/metrics.types";

export type AdviceImpact = "high" | "medium" | "low";
export type IntegrationSource = "kaspi" | "instagram" | "manual";

export interface MissingField {
  field_key: MetricKey;
  display_name: string;
  impact_on_advice_quality: AdviceImpact;
  integration_source?: IntegrationSource;
}

export interface QuickWin {
  field_key: MetricKey;
  display_name: string;
  estimated_time_to_add_minutes: number;
}

export interface DataCompletenessResult {
  overall_percent: number; // 0–100
  missing_fields: MissingField[];
  quick_wins: QuickWin[];
}

