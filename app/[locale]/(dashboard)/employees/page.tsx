"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getRoleBadgeColor } from "@/lib/utils/permissions";
import type { UserRole } from "@/lib/types/company.types";
import { cn } from "@/lib/utils/cn";

const employees = [
  { name: "Aigerim Bekova", role: "owner" as UserRole, dept: "Management", agent: "AI CEO", added: "Jan 2026" },
  { name: "Marat Seitkali", role: "manager" as UserRole, dept: "Operations", agent: "AI Manager", added: "Feb 2026" },
  { name: "Dana Nurlanovna", role: "marketer" as UserRole, dept: "Marketing", agent: "AI Marketer", added: "Feb 2026" },
  { name: "Aziz Dulatov", role: "smm" as UserRole, dept: "Marketing", agent: "AI SMM", added: "Mar 2026" },
  { name: "Kamila Omarova", role: "accountant" as UserRole, dept: "Finance", agent: "AI Accountant", added: "Jan 2026" },
  { name: "Timur Askarov", role: "salesperson" as UserRole, dept: "Sales", agent: "AI Analyst", added: "Apr 2026" },
  { name: "Aliya Dzhaksybekova", role: "salesperson" as UserRole, dept: "Sales", agent: "AI Analyst", added: "Apr 2026" },
  { name: "Nurzhan Bekurov", role: "administrator" as UserRole, dept: "Admin", agent: "AI Admin", added: "May 2026" },
];

export default function EmployeesPage() {
  const t = useTranslations("employees");
  const tRoles = useTranslations("roles");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [profile, setProfile] = useState<(typeof employees)[0] | null>(null);

  return (
    <DashboardShell title={t("title")}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">{t("title")}</h2>
          <Badge variant="accent" className="mt-2">
            {t("memberCount", { count: 14 })}
          </Badge>
        </div>
        <Button variant="bronze" onClick={() => setInviteOpen(true)}>
          {t("invite")}
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-muted text-left bg-surface-raised">
                <th className="p-4 font-medium">{t("table.name")}</th>
                <th className="p-4 font-medium">{t("table.role")}</th>
                <th className="p-4 font-medium">{t("table.status")}</th>
                <th className="p-4 font-medium hidden md:table-cell">{t("table.department")}</th>
                <th className="p-4 font-medium hidden lg:table-cell">{t("table.aiAgent")}</th>
                <th className="p-4 font-medium hidden lg:table-cell">{t("table.added")}</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp.name}
                  className="border-b border-border/50 hover:bg-surface-raised cursor-pointer transition-colors"
                  onClick={() => setProfile(emp)}
                >
                  <td className="p-4 font-medium">{emp.name}</td>
                  <td className="p-4">
                    <Badge
                      variant="outline"
                      className={cn("capitalize", getRoleBadgeColor(emp.role))}
                    >
                      {tRoles(emp.role)}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="success">{t("table.active")}</Badge>
                  </td>
                  <td className="p-4 hidden md:table-cell text-text-secondary">
                    {emp.dept}
                  </td>
                  <td className="p-4 hidden lg:table-cell text-text-secondary">
                    {emp.agent}
                  </td>
                  <td className="p-4 hidden lg:table-cell text-text-muted">
                    {emp.added}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("invite")}</DialogTitle>
          </DialogHeader>
          <p className="text-text-secondary text-sm mb-4">
            {t("inviteDialog.description")}
          </p>
          <div className="rounded-xl bg-surface-raised border border-accent/30 p-6 text-center">
            <span className="text-3xl font-mono font-bold text-accent tracking-widest">
              URBAN1
            </span>
          </div>
          <p className="text-xs text-text-muted text-center">
            {t("inviteDialog.expiry")}
          </p>
        </DialogContent>
      </Dialog>

      <Sheet open={!!profile} onOpenChange={() => setProfile(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{profile?.name}</SheetTitle>
          </SheetHeader>
          {profile && (
            <div className="mt-6 space-y-4 text-sm">
              <div>
                <span className="text-text-muted">{t("profile.role")}</span>
                <p>{tRoles(profile.role)}</p>
              </div>
              <div>
                <span className="text-text-muted">{t("profile.department")}</span>
                <p>{profile.dept}</p>
              </div>
              <div>
                <span className="text-text-muted">{t("profile.aiAgent")}</span>
                <p>{profile.agent}</p>
              </div>
              <div>
                <span className="text-text-muted">{t("profile.joined")}</span>
                <p>{profile.added}</p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardShell>
  );
}
