export function formatCurrency(
  amount: number,
  currency = "₸",
  compact = false
): string {
  if (compact && amount >= 1_000_000) {
    return `${currency} ${(amount / 1_000_000).toFixed(1)}M`;
  }
  return `${currency} ${amount.toLocaleString("en-US")}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

/** Compact axis labels: 1000 → "1K", 1500000 → "1.5M" */
export function formatCompact(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    const n = value / 1_000_000;
    return `${n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)}M`;
  }
  if (abs >= 1_000) {
    const n = value / 1_000;
    return `${n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)}K`;
  }
  return String(Math.round(value));
}

export function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[^\d]/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
}

export function formatCurrencyInput(value: number): string {
  if (!value) return "";
  return value.toLocaleString("en-US");
}

const STATUS_KEYS = [
  "excellent",
  "healthy",
  "stable",
  "warning",
  "critical",
] as const;

export type StatusKey = (typeof STATUS_KEYS)[number];

export function getStatusLabel(status: string): string {
  const labels: Record<StatusKey, string> = {
    excellent: "Excellent",
    healthy: "Healthy",
    stable: "Stable",
    warning: "Needs Attention",
    critical: "Critical",
  };
  return labels[status as StatusKey] ?? status;
}

export function getStatusLabelTranslated(
  status: string,
  t: (key: StatusKey) => string
): string {
  if (STATUS_KEYS.includes(status as StatusKey)) {
    return t(status as StatusKey);
  }
  return status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    excellent: "text-success",
    healthy: "text-success",
    stable: "text-text-secondary",
    warning: "text-warning",
    critical: "text-danger",
  };
  return colors[status] ?? "text-text-secondary";
}

export function getEffortColor(effort: string): string {
  const colors: Record<string, string> = {
    Low: "bg-success/20 text-success border-success/30",
    Medium: "bg-warning/20 text-warning border-warning/30",
    High: "bg-danger/20 text-danger border-danger/30",
  };
  return colors[effort] ?? "bg-surface-raised text-text-secondary";
}
