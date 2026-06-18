"use client";

import { useTranslations } from "next-intl";
import type { Department, Employee } from "@/lib/types/employee.types";
import { OrgNode } from "./OrgNode";

interface OrgTreeProps {
  owner?: Employee;
  departments: Array<Department & { employees: Employee[] }>;
  onEmployeeClick: (employee: Employee) => void;
  onAddEmployee: (departmentId: string) => void;
  onAddDepartment: () => void;
}

export function OrgTree({
  owner,
  departments,
  onEmployeeClick,
  onAddEmployee,
  onAddDepartment,
}: OrgTreeProps) {
  const t = useTranslations("employees");

  const getDeptName = (dept: Department) =>
    dept.customName ?? t(`departments.${dept.nameKey}` as "departments.management");

  const visibleDepartments = departments.filter(
    (dept) => dept.id !== "management" || dept.employees.length > 0
  );

  return (
    <div className="flex flex-col items-center gap-6 py-8 overflow-x-auto min-h-[400px] w-full">
      {owner && (
        <>
          <OrgNode
            employee={owner}
            isOwner
            onClick={() => onEmployeeClick(owner)}
          />
          <div className="w-px h-8 bg-border" />
        </>
      )}

      <div className="flex gap-8 md:gap-12 items-start justify-center min-w-max px-4">
        {visibleDepartments.map((dept) => (
          <div key={dept.id} className="flex flex-col items-center gap-2">
            <div className="px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-sm font-medium text-accent whitespace-nowrap">
              {getDeptName(dept)}
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex flex-col gap-3 items-center">
              {dept.employees.map((emp) => (
                <OrgNode
                  key={emp.id}
                  employee={emp}
                  onClick={() => onEmployeeClick(emp)}
                />
              ))}
              <button
                type="button"
                onClick={() => onAddEmployee(dept.id)}
                className="w-full min-w-[100px] px-3 py-1.5 rounded-lg border border-dashed border-border text-xs text-text-muted hover:border-accent hover:text-accent transition-colors"
              >
                {t("dept.addToDept")}
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDepartment}
          className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity self-start mt-1"
        >
          <div className="px-4 py-1.5 rounded-full border border-dashed border-border text-sm text-text-secondary whitespace-nowrap">
            {t("dept.addDepartment")}
          </div>
        </button>
      </div>
    </div>
  );
}
