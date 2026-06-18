"use client";

import { useLocale, useTranslations } from "next-intl";
import { Camera, Copy, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import type { Employee } from "@/lib/types/employee.types";
import type { Department } from "@/lib/types/employee.types";
import type { UserRole } from "@/lib/types/company.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInitials, formatRelativeTime } from "@/lib/utils/employee-helpers";
import { cn } from "@/lib/utils/cn";

const EDITABLE_ROLES: UserRole[] = [
  "manager",
  "marketer",
  "smm",
  "accountant",
  "salesperson",
  "administrator",
];

interface EmployeeModalProps {
  employee: Employee | null;
  departments: Department[];
  open: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
  onDeactivate: (id: string) => void;
  onRegenerateCode: (id: string) => void;
  onCopyCode: (code: string) => void;
}

export function EmployeeModal({
  employee,
  departments,
  open,
  onClose,
  onSave,
  onDeactivate,
  onRegenerateCode,
  onCopyCode,
}: EmployeeModalProps) {
  const t = useTranslations("employees.modal");
  const tRoles = useTranslations("roles");
  const tDept = useTranslations("employees.departments");
  const locale = useLocale();
  const [draft, setDraft] = useState<Employee | null>(employee);

  useEffect(() => {
    setDraft(employee);
  }, [employee]);

  if (!draft) return null;

  const getDeptName = (dept: Department) =>
    dept.customName ?? tDept(dept.nameKey as "management");

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setDraft({ ...draft, avatarUrl: url });
  };

  const isOwner = draft.systemRole === "owner";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div
                className={cn(
                  "w-20 h-20 rounded-full bg-surface-raised flex items-center justify-center text-2xl font-bold border-2 border-border overflow-hidden",
                  isOwner && "border-accent text-accent"
                )}
              >
                {draft.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={draft.avatarUrl}
                    alt={draft.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(draft.name)
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-accent flex items-center justify-center cursor-pointer hover:bg-accent-light transition-colors">
                <Camera size={12} className="text-background" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-text-muted">{t("fullName")}</Label>
              <Input
                className="mt-1"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <Label className="text-xs text-text-muted">{t("jobTitle")}</Label>
              <Input
                className="mt-1"
                value={draft.jobTitle}
                placeholder={t("jobTitlePlaceholder")}
                onChange={(e) =>
                  setDraft({ ...draft, jobTitle: e.target.value })
                }
              />
            </div>
            <div>
              <Label className="text-xs text-text-muted">{t("department")}</Label>
              <Select
                value={draft.department}
                onValueChange={(v) => setDraft({ ...draft, department: v })}
                disabled={isOwner}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {getDeptName(dept)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-text-muted">{t("systemRole")}</Label>
              <Select
                value={draft.systemRole}
                onValueChange={(v) =>
                  setDraft({ ...draft, systemRole: v as UserRole })
                }
                disabled={isOwner}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {isOwner ? (
                    <SelectItem value="owner">{tRoles("owner")}</SelectItem>
                  ) : (
                    EDITABLE_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {tRoles(role)}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-text-muted">{t("phone")}</Label>
              <Input
                className="mt-1"
                value={draft.phone ?? ""}
                placeholder="+7 777 000 00 00"
                onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs text-text-muted">{t("email")}</Label>
              <Input
                className="mt-1"
                type="email"
                value={draft.email ?? ""}
                placeholder="name@company.kz"
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-raised space-y-2">
            <Label className="text-xs text-text-muted">{t("accessCodeLabel")}</Label>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-lg font-mono font-bold tracking-widest text-accent">
                {draft.accessCode}
              </code>
              <Button
                size="icon"
                variant="outline"
                type="button"
                onClick={() => onCopyCode(draft.accessCode)}
              >
                <Copy size={14} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                type="button"
                onClick={() => onRegenerateCode(draft.id)}
              >
                <RefreshCw size={14} />
              </Button>
            </div>
            <p className="text-xs text-text-muted">{t("accessCodeHint")}</p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="text-sm font-medium">{t("aiAssistant")}</p>
              <p className="text-xs text-text-muted">
                {draft.hasAI && draft.aiAgentName
                  ? t("aiConnected", { agent: draft.aiAgentName })
                  : t("aiNotNeeded")}
              </p>
            </div>
            {draft.hasAI ? (
              <Badge className="bg-accent/20 text-accent border-0">
                {t("aiActive")}
              </Badge>
            ) : (
              <Badge variant="outline">{t("aiNone")}</Badge>
            )}
          </div>

          {draft.lastSeen && (
            <p className="text-xs text-text-muted">
              {t("lastSeen", {
                time: formatRelativeTime(draft.lastSeen, locale),
              })}
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {!isOwner && (
            <Button
              variant="outline"
              type="button"
              className="flex-1"
              onClick={() => {
                onDeactivate(draft.id);
                onClose();
              }}
            >
              {t("deactivate")}
            </Button>
          )}
          <Button
            variant="bronze"
            type="button"
            className="flex-1"
            onClick={() => {
              onSave(draft);
              onClose();
            }}
          >
            {t("save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
