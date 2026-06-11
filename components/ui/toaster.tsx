"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils/cn";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "rounded-xl border p-4 shadow-card animate-in slide-in-from-bottom-2",
            t.variant === "destructive"
              ? "border-danger/50 bg-surface text-danger"
              : "border-border bg-surface-raised text-text-primary"
          )}
          onClick={() => dismiss(t.id)}
        >
          {t.title && <p className="font-semibold text-sm">{t.title}</p>}
          {t.description && (
            <p className="text-sm text-text-secondary mt-1">{t.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
