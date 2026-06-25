import type { BusinessMetrics, MetricKey } from "@/lib/types/metrics.types";
import type { CalculationTraceRow } from "@/lib/calculation/trace.types";
import { FORMULA_MANIFEST } from "@/lib/calculation/formulaManifest";

function hasValue(metrics: BusinessMetrics, key: MetricKey): boolean {
  return metrics[key] !== undefined && Number.isFinite(metrics[key]);
}

function missingKeys(
  metrics: BusinessMetrics,
  requiredKeys: MetricKey[]
): MetricKey[] {
  return requiredKeys.filter((key) => !hasValue(metrics, key));
}

export function collectCalculationTraces(
  metrics: BusinessMetrics
): CalculationTraceRow[] {
  return FORMULA_MANIFEST.map((formula) => {
    const missing = missingKeys(metrics, formula.requiredKeys);
    const result = formula.compute(metrics);

    if (missing.length > 0 || result.value === null) {
      return {
        id: formula.id,
        status: "skipped" as const,
        labelKey: formula.labelKey,
        inputKeys: formula.requiredKeys,
        inputValues: result.trace.inputs,
        missingKeys: missing.length > 0 ? missing : formula.requiredKeys,
      };
    }

    return {
      id: formula.id,
      status: "computed" as const,
      labelKey: formula.labelKey,
      inputKeys: Object.keys(result.trace.inputs) as MetricKey[],
      inputValues: result.trace.inputs,
      resultValue: result.value,
      resultFormat: result.trace.resultFormat,
      severity: result.trace.severity ?? null,
    };
  });
}
