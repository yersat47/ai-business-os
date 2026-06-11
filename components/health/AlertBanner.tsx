import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Risk } from "@/lib/types/health.types";
import { cn } from "@/lib/utils/cn";

const severityStyles: Record<string, string> = {
  critical: "border-danger/30 bg-danger/5",
  warning: "border-warning/30 bg-warning/5",
};

interface AlertBannerProps {
  risk: Risk;
  onViewAction?: () => void;
}

export function AlertBanner({ risk, onViewAction }: AlertBannerProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-4",
        severityStyles[risk.severity]
      )}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              risk.severity === "critical" ? "bg-danger" : "bg-warning"
            )}
          />
          <span className="font-medium">{risk.title}</span>
          <Badge variant="outline" className="text-[10px]">
            {risk.agent}
          </Badge>
        </div>
        <p className="text-sm text-text-secondary">{risk.description}</p>
      </div>
      <Button variant="outline" size="sm" onClick={onViewAction}>
        View action →
      </Button>
    </div>
  );
}
