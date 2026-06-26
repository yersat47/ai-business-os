import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { KazakhPixelOrnament } from "@/components/decorative/KazakhPixelOrnament";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  showOrnament?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
  showOrnament = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-border bg-surface overflow-hidden",
        className
      )}
    >
      {showOrnament && (
        <KazakhPixelOrnament
          variant="empty"
          className="absolute top-4 left-1/2 -translate-x-1/2"
        />
      )}
      <div className="relative z-10 h-12 w-12 rounded-xl bg-surface-raised border border-border flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-text-muted" />
      </div>
      <h3 className="relative z-10 font-semibold text-text-primary mb-2">{title}</h3>
      <p className="relative z-10 text-sm text-text-secondary max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction} className="relative z-10">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
