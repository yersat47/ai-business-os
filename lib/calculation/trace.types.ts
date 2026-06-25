import type { MetricKey } from "@/lib/types/metrics.types";

export type TraceResultFormat =
  | "currency"
  | "percent"
  | "ratio"
  | "months"
  | "number";

export interface CalculationTraceRow {
  id: string;
  status: "computed" | "skipped";
  labelKey: string;
  inputKeys: MetricKey[];
  inputValues: Partial<Record<MetricKey, number>>;
  resultValue?: number;
  resultFormat?: TraceResultFormat;
  severity?: "critical" | "warning" | null;
  missingKeys?: MetricKey[];
}

export interface FormulaTraceResult {
  value: number | null;
  trace: {
    inputs: Partial<Record<MetricKey, number>>;
    labelKey: string;
    resultFormat: TraceResultFormat;
    severity?: "critical" | "warning" | null;
  };
}
