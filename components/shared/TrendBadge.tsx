import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface TrendBadgeProps {
  direction: "up" | "down" | "flat";
  delta: number;
  label?: string;
}

export function TrendBadge({ direction, delta, label }: TrendBadgeProps) {
  const Icon =
    direction === "up" ? ArrowUp : direction === "down" ? ArrowDown : Minus;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        direction === "up" && "text-success",
        direction === "down" && "text-danger",
        direction === "flat" && "text-text-muted"
      )}
    >
      <Icon className="h-3 w-3" />
      {delta !== 0 && (
        <span>
          {direction === "up" ? "+" : direction === "down" ? "" : ""}
          {delta}
        </span>
      )}
      {label && <span className="text-text-secondary">{label}</span>}
    </span>
  );
}
