"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Employee, EmployeeViewMode } from "@/lib/types/employee.types";
import type { UserRole } from "@/lib/types/company.types";
import { useEmployeesStore } from "@/lib/stores/employees.store";
import { OrgTree } from "@/components/employees/OrgTree";
import { EmployeeGridView } from "@/components/employees/EmployeeGridView";
import { EmployeeTableView } from "@/components/employees/EmployeeTableView";
import { EmployeeModal } from "@/components/employees/EmployeeModal";
import { ViewModeToggle } from "@/components/employees/ViewModeToggle";
import { toast } from "@/hooks/use-toast";

const ADD_ROLES: UserRole[] = [
  "manager",
  "marketer",
  "smm",
  "accountant",
  "salesperson",
  "administrator",
];

export default function EmployeesPage() {
  const t = useTranslations("employees");
  const tRoles = useTranslations("roles");
  const tDept = useTranslations("employees.departments");

  const employees = useEmployeesStore((s) => s.employees);
  const departments = useEmployeesStore((s) => s.departments);
  const addEmployee = useEmployeesStore((s) => s.addEmployee);
  const updateEmployee = useEmployeesStore((s) => s.updateEmployee);
  const deactivateEmployee = useEmployeesStore((s) => s.deactivateEmployee);
  const regenerateCode = useEmployeesStore((s) => s.regenerateCode);
  const addDepartment = useEmployeesStore((s) => s.addDepartment);
  const getOwner = useEmployeesStore((s) => s.getOwner);
  const getDepartmentsWithEmployees = useEmployeesStore(
    (s) => s.getDepartmentsWithEmployees
  );

  const [viewMode, setViewMode] = useState<EmployeeViewMode>("tree");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [addDeptOpen, setAddDeptOpen] = useState(false);
  const [addDeptId, setAddDeptId] = useState<string>("operations");
  const [newDeptName, setNewDeptName] = useState("");
  const [newEmp, setNewEmp] = useState({
    name: "",
    jobTitle: "",
    department: "operations",
    systemRole: "salesperson" as UserRole,
    phone: "",
    email: "",
  });

  const owner = getOwner();
  const departmentsWithEmployees = getDepartmentsWithEmployees();
  const activeCount = employees.filter((e) => e.isActive).length;

  const openEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: t("codeCopied") });
  };

  const handleRegenerateCode = (id: string) => {
    regenerateCode(id);
    const updated = useEmployeesStore.getState().employees.find((e) => e.id === id);
    if (updated && selectedEmployee?.id === id) {
      setSelectedEmployee(updated);
    }
    toast({ title: t("codeRegenerated") });
  };

  const handleSaveEmployee = (employee: Employee) => {
    updateEmployee(employee.id, employee);
    toast({ title: t("employeeSaved") });
  };

  const openAddEmployee = (departmentId: string) => {
    setAddDeptId(departmentId);
    setNewEmp((prev) => ({ ...prev, department: departmentId }));
    setAddOpen(true);
  };

  const handleAddEmployee = () => {
    if (!newEmp.name.trim() || !newEmp.jobTitle.trim()) return;
    addEmployee({
      name: newEmp.name.trim(),
      jobTitle: newEmp.jobTitle.trim(),
      department: addDeptId || newEmp.department,
      systemRole: newEmp.systemRole,
      phone: newEmp.phone || undefined,
      email: newEmp.email || undefined,
    });
    setAddOpen(false);
    setNewEmp({
      name: "",
      jobTitle: "",
      department: "operations",
      systemRole: "salesperson",
      phone: "",
      email: "",
    });
    toast({ title: t("employeeAdded") });
  };

  const handleAddDepartment = () => {
    if (!newDeptName.trim()) return;
    addDepartment(newDeptName.trim());
    setNewDeptName("");
    setAddDeptOpen(false);
    toast({ title: t("dept.created") });
  };

  const getDeptLabel = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    if (!dept) return deptId;
    return dept.customName ?? tDept(dept.nameKey as "management");
  };

  return (
    <DashboardShell title={t("title")}>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center md:mb-8">
        <div>
          <h2 className="text-xl font-bold md:text-2xl">{t("title")}</h2>
          <Badge variant="accent" className="mt-2">
            {t("memberCount", { count: activeCount })}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
          <Button variant="bronze" className="min-h-[44px] flex-1 sm:flex-none" onClick={() => openAddEmployee("operations")}>
            {t("invite")}
          </Button>
        </div>
      </div>

      <div className="min-h-[420px] overflow-hidden rounded-2xl border border-border bg-surface">
        {viewMode === "tree" && (
          <OrgTree
            owner={owner}
            departments={departmentsWithEmployees.filter(
              (d) => d.id !== "management"
            )}
            onEmployeeClick={openEmployee}
            onAddEmployee={openAddEmployee}
            onAddDepartment={() => setAddDeptOpen(true)}
          />
        )}
        {viewMode === "grid" && (
          <div className="p-3 md:p-6">
            <EmployeeGridView
              employees={employees}
              departments={departments}
              onEmployeeClick={openEmployee}
            />
          </div>
        )}
        {viewMode === "table" && (
          <EmployeeTableView
            employees={employees}
            departments={departments}
            onEmployeeClick={openEmployee}
            onCopyCode={copyCode}
          />
        )}
      </div>

      <EmployeeModal
        employee={selectedEmployee}
        departments={departments}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedEmployee(null);
        }}
        onSave={handleSaveEmployee}
        onDeactivate={deactivateEmployee}
        onRegenerateCode={handleRegenerateCode}
        onCopyCode={copyCode}
      />

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("addEmployee")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>{t("form.name")}</Label>
              <Input
                className="mt-1 min-h-[52px] text-base"
                value={newEmp.name}
                onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
              />
            </div>
            <div>
              <Label>{t("form.jobTitle")}</Label>
              <Input
                className="mt-1 min-h-[52px] text-base"
                placeholder={t("form.jobTitlePlaceholder")}
                value={newEmp.jobTitle}
                onChange={(e) =>
                  setNewEmp({ ...newEmp, jobTitle: e.target.value })
                }
              />
            </div>
            <div>
              <Label>{t("form.department")}</Label>
              <Select
                value={addDeptId}
                onValueChange={(v) => {
                  setAddDeptId(v);
                  setNewEmp({ ...newEmp, department: v });
                }}
              >
                <SelectTrigger className="mt-1 min-h-[52px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {getDeptLabel(dept.id)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t("form.systemRole")}</Label>
              <Select
                value={newEmp.systemRole}
                onValueChange={(v) =>
                  setNewEmp({ ...newEmp, systemRole: v as UserRole })
                }
              >
                <SelectTrigger className="mt-1 min-h-[52px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ADD_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {tRoles(role)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="bronze" className="min-h-[52px] w-full" onClick={handleAddEmployee}>
              {t("form.submit")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={addDeptOpen} onOpenChange={setAddDeptOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("dept.newTitle")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>{t("dept.nameLabel")}</Label>
              <Input
                className="mt-1 min-h-[52px] text-base"
                value={newDeptName}
                placeholder={t("dept.namePlaceholder")}
                onChange={(e) => setNewDeptName(e.target.value)}
              />
            </div>
            <Button variant="bronze" className="min-h-[52px] w-full" onClick={handleAddDepartment}>
              {t("dept.create")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
