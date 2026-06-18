"use client";

import type { Employee } from "@/lib/types/employee.types";
import { getInitials } from "@/lib/utils/employee-helpers";
import { cn } from "@/lib/utils/cn";

interface OrgNodeProps {
  employee: Employee;
  isOwner?: boolean;
  onClick?: () => void;
}

export function OrgNode({ employee, isOwner, onClick }: OrgNodeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 cursor-pointer group bg-transparent border-0 p-0"
    >
      <div
        className={cn(
          "rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all overflow-hidden",
          isOwner
            ? "w-16 h-16 border-accent bg-accent/20 text-accent"
            : "w-12 h-12 border-border bg-surface-raised group-hover:border-accent"
        )}
      >
        {employee.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={employee.avatarUrl}
            alt={employee.name}
            className="w-full h-full object-cover"
          />
        ) : (
          getInitials(employee.name)
        )}
      </div>
      <span className="text-xs font-medium text-center max-w-[88px] leading-tight text-text-primary">
        {employee.name}
      </span>
      <span className="text-[10px] text-text-muted text-center max-w-[88px] leading-tight">
        {employee.jobTitle}
      </span>
      {employee.hasAI && (
        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent">
          AI ✓
        </span>
      )}
    </button>
  );
}
