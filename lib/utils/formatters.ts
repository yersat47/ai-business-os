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

export function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[^\d]/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
}

export function formatCurrencyInput(value: number): string {
  if (!value) return "";
  return value.toLocaleString("en-US");
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    excellent: "Excellent",
    healthy: "Healthy",
    stable: "Stable",
    warning: "Needs Attention",
    critical: "Critical",
  };
  return labels[status] ?? status;
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
