"use client";

import { useTranslations } from "next-intl";
import type { Employee } from "@/lib/types/employee.types";
import type { Department } from "@/lib/types/employee.types";
import { Badge } from "@/components/ui/badge";
import { getRoleBadgeColor } from "@/lib/utils/permissions";
import { cn } from "@/lib/utils/cn";

interface EmployeeTableViewProps {
  employees: Employee[];
  departments: Department[];
  onEmployeeClick: (employee: Employee) => void;
  onCopyCode: (code: string) => void;
}

export function EmployeeTableView({
  employees,
  departments,
  onEmployeeClick,
  onCopyCode,
}: EmployeeTableViewProps) {
  const t = useTranslations("employees");
  const tRoles = useTranslations("roles");

  const getDeptName = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    if (!dept) return deptId;
    return dept.customName ?? t(`departments.${dept.nameKey}` as "departments.management");
  };

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-text-muted text-left bg-surface-raised">
              <th className="p-4 font-medium">{t("table.name")}</th>
              <th className="p-4 font-medium">{t("table.jobTitle")}</th>
              <th className="p-4 font-medium">{t("table.department")}</th>
              <th className="p-4 font-medium">{t("table.role")}</th>
              <th className="p-4 font-medium hidden md:table-cell">{t("table.accessCode")}</th>
              <th className="p-4 font-medium">{t("table.status")}</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="border-b border-border/50 hover:bg-surface-raised cursor-pointer transition-colors"
                onClick={() => onEmployeeClick(emp)}
              >
                <td className="p-4 font-medium">{emp.name}</td>
                <td className="p-4 text-text-secondary">{emp.jobTitle}</td>
                <td className="p-4 text-text-secondary">{getDeptName(emp.department)}</td>
                <td className="p-4">
                  <Badge
                    variant="outline"
                    className={cn(getRoleBadgeColor(emp.systemRole))}
                  >
                    {tRoles(emp.systemRole)}
                  </Badge>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <button
                    type="button"
                    className="font-mono text-xs text-accent hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCopyCode(emp.accessCode);
                    }}
                  >
                    {emp.accessCode}
                  </button>
                </td>
                <td className="p-4">
                  <Badge variant={emp.isActive ? "success" : "outline"}>
                    {emp.isActive ? t("active") : t("deactivated")}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
