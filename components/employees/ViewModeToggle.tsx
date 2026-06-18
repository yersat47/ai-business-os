"use client";

import { useTranslations } from "next-intl";
import { LayoutGrid, Network, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EmployeeViewMode } from "@/lib/types/employee.types";
import { cn } from "@/lib/utils/cn";

interface ViewModeToggleProps {
  viewMode: EmployeeViewMode;
  onChange: (mode: EmployeeViewMode) => void;
}

export function ViewModeToggle({ viewMode, onChange }: ViewModeToggleProps) {
  const t = useTranslations("employees.views");

  const modes: { id: EmployeeViewMode; icon: typeof Network; label: string }[] = [
    { id: "tree", icon: Network, label: t("tree") },
    { id: "grid", icon: LayoutGrid, label: t("grid") },
    { id: "table", icon: Table, label: t("table") },
  ];

  return (
    <div className="flex gap-1 rounded-lg border border-border bg-surface-raised p-1">
      {modes.map(({ id, icon: Icon, label }) => (
        <Button
          key={id}
          size="sm"
          variant={viewMode === id ? "default" : "ghost"}
          className={cn(
            "h-10 min-w-[40px] px-2 sm:h-8 sm:px-3",
            viewMode === id && "bg-accent text-background hover:bg-accent-light"
          )}
          onClick={() => onChange(id)}
        >
          <Icon size={14} className="sm:mr-1.5" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  );
}
