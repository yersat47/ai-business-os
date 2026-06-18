"use client";

import { useTranslations } from "next-intl";
import type { Employee } from "@/lib/types/employee.types";
import type { Department } from "@/lib/types/employee.types";
import { Badge } from "@/components/ui/badge";
import { getRoleBadgeColor } from "@/lib/utils/permissions";
import { getInitials } from "@/lib/utils/employee-helpers";
import { cn } from "@/lib/utils/cn";

interface EmployeeGridViewProps {
  employees: Employee[];
  departments: Department[];
  onEmployeeClick: (employee: Employee) => void;
}

export function EmployeeGridView({
  employees,
  departments,
  onEmployeeClick,
}: EmployeeGridViewProps) {
  const t = useTranslations("employees");
  const tRoles = useTranslations("roles");

  const getDeptName = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    if (!dept) return deptId;
    return dept.customName ?? t(`departments.${dept.nameKey}` as "departments.management");
  };

  const activeEmployees = employees.filter((e) => e.isActive);

  if (activeEmployees.length === 0) {
    return (
      <p className="text-center text-text-muted py-16">{t("grid.empty")}</p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {activeEmployees.map((emp) => (
        <button
          key={emp.id}
          type="button"
          onClick={() => onEmployeeClick(emp)}
          className="rounded-2xl border border-border bg-surface p-5 text-left hover:border-accent/40 hover:scale-[1.02] transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center text-sm font-semibold border-2 shrink-0 overflow-hidden",
                emp.systemRole === "owner"
                  ? "border-accent bg-accent/20 text-accent"
                  : "border-border bg-surface-raised"
              )}
            >
              {emp.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={emp.avatarUrl}
                  alt={emp.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(emp.name)
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <p className="font-medium truncate">{emp.name}</p>
              <p className="text-xs text-text-secondary truncate">{emp.jobTitle}</p>
              <p className="text-xs text-text-muted truncate">
                {getDeptName(emp.department)}
              </p>
              <Badge
                variant="outline"
                className={cn("text-xs", getRoleBadgeColor(emp.systemRole))}
              >
                {tRoles(emp.systemRole)}
              </Badge>
              <p className="font-mono text-xs text-accent">{emp.accessCode}</p>
              {emp.hasAI && emp.aiAgentName && (
                <p className="text-xs text-text-secondary">{emp.aiAgentName}</p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
