"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Copy, RefreshCw } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getRoleBadgeColor } from "@/lib/utils/permissions";
import type { UserRole } from "@/lib/types/company.types";
import { cn } from "@/lib/utils/cn";
import { toast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  jobTitle: string;
  role: UserRole;
  dept: string;
  agent: string;
  added: string;
  accessCode: string;
  status: "active" | "deactivated";
}

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "KZ-";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

const initialEmployees: Employee[] = [
  { id: "1", name: "Aigerim Bekova", jobTitle: "Владелец", role: "owner", dept: "Management", agent: "AI CEO", added: "Jan 2026", accessCode: "KZ-A3F9", status: "active" },
  { id: "2", name: "Marat Seitkali", jobTitle: "Менеджер", role: "manager", dept: "Operations", agent: "AI Manager", added: "Feb 2026", accessCode: "KZ-B7K2", status: "active" },
  { id: "3", name: "Dana Nurlanovna", jobTitle: "Маркетолог", role: "marketer", dept: "Marketing", agent: "AI Marketer", added: "Feb 2026", accessCode: "KZ-M4P1", status: "active" },
  { id: "4", name: "Aziz Dulatov", jobTitle: "SMM-специалист", role: "smm", dept: "Marketing", agent: "AI SMM", added: "Mar 2026", accessCode: "KZ-S8N3", status: "active" },
  { id: "5", name: "Kamila Omarova", jobTitle: "Бухгалтер", role: "accountant", dept: "Finance", agent: "AI Accountant", added: "Jan 2026", accessCode: "KZ-F2R6", status: "active" },
];

const systemRoles: UserRole[] = [
  "owner", "manager", "marketer", "smm", "accountant", "salesperson", "administrator",
];

const departments = ["Management", "Operations", "Marketing", "Finance", "Sales", "Admin", "Warehouse"];

export default function EmployeesPage() {
  const t = useTranslations("employees");
  const tRoles = useTranslations("roles");
  const [employees, setEmployees] = useState(initialEmployees);
  const [addOpen, setAddOpen] = useState(false);
  const [profile, setProfile] = useState<Employee | null>(null);
  const [newEmp, setNewEmp] = useState({
    name: "",
    jobTitle: "",
    department: departments[0],
    systemRole: "salesperson" as UserRole,
  });
  const [customDept, setCustomDept] = useState("");

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: t("codeCopied") });
  };

  const regenerateCode = (id: string) => {
    setEmployees((list) =>
      list.map((e) =>
        e.id === id ? { ...e, accessCode: generateCode() } : e
      )
    );
    toast({ title: t("codeRegenerated") });
  };

  const handleAdd = () => {
    if (!newEmp.name || !newEmp.jobTitle) return;
    const emp: Employee = {
      id: String(Date.now()),
      name: newEmp.name,
      jobTitle: newEmp.jobTitle,
      role: newEmp.systemRole,
      dept: customDept || newEmp.department,
      agent: "AI Analyst",
      added: "Jun 2026",
      accessCode: generateCode(),
      status: "active",
    };
    setEmployees([...employees, emp]);
    setAddOpen(false);
    setNewEmp({ name: "", jobTitle: "", department: departments[0], systemRole: "salesperson" });
    setCustomDept("");
    toast({ title: t("employeeAdded") });
  };

  return (
    <DashboardShell title={t("title")}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">{t("title")}</h2>
          <Badge variant="accent" className="mt-2">
            {t("memberCount", { count: employees.length })}
          </Badge>
        </div>
        <Button variant="bronze" onClick={() => setAddOpen(true)}>
          {t("invite")}
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-muted text-left bg-surface-raised">
                <th className="p-4 font-medium">{t("table.name")}</th>
                <th className="p-4 font-medium">{t("table.jobTitle")}</th>
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
                  onClick={() => setProfile(emp)}
                >
                  <td className="p-4 font-medium">{emp.name}</td>
                  <td className="p-4 text-text-secondary">{emp.jobTitle}</td>
                  <td className="p-4">
                    <Badge variant="outline" className={cn("capitalize", getRoleBadgeColor(emp.role))}>
                      {tRoles(emp.role)}
                    </Badge>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <button
                      type="button"
                      className="font-mono text-xs text-accent hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyCode(emp.accessCode);
                      }}
                    >
                      {emp.accessCode}
                    </button>
                  </td>
                  <td className="p-4">
                    <Badge variant={emp.status === "active" ? "success" : "outline"}>
                      {emp.status === "active" ? t("active") : t("deactivated")}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("addEmployee")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>{t("form.name")}</Label>
              <Input className="mt-1" value={newEmp.name} onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })} />
            </div>
            <div>
              <Label>{t("form.jobTitle")}</Label>
              <Input className="mt-1" placeholder={t("form.jobTitlePlaceholder")} value={newEmp.jobTitle} onChange={(e) => setNewEmp({ ...newEmp, jobTitle: e.target.value })} />
            </div>
            <div>
              <Label>{t("form.department")}</Label>
              <Select value={newEmp.department} onValueChange={(v) => setNewEmp({ ...newEmp, department: v })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input className="mt-2" placeholder={t("form.customDepartment")} value={customDept} onChange={(e) => setCustomDept(e.target.value)} />
            </div>
            <div>
              <Label>{t("form.systemRole")}</Label>
              <Select value={newEmp.systemRole} onValueChange={(v) => setNewEmp({ ...newEmp, systemRole: v as UserRole })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {systemRoles.map((r) => <SelectItem key={r} value={r}>{tRoles(r)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button variant="bronze" className="w-full" onClick={handleAdd}>{t("form.submit")}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={!!profile} onOpenChange={() => setProfile(null)}>
        <SheetContent>
          <SheetHeader><SheetTitle>{profile?.name}</SheetTitle></SheetHeader>
          {profile && (
            <div className="mt-6 space-y-4 text-sm">
              <div><span className="text-text-muted">{t("form.jobTitle")}</span><p>{profile.jobTitle}</p></div>
              <div><span className="text-text-muted">{t("table.department")}</span><p>{profile.dept}</p></div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-accent">{profile.accessCode}</span>
                <Button variant="ghost" size="icon" onClick={() => copyCode(profile.accessCode)}><Copy className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => regenerateCode(profile.id)}><RefreshCw className="h-4 w-4" /></Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardShell>
  );
}
