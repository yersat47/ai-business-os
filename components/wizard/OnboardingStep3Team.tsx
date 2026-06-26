"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { OnboardingTip } from "./OnboardingTip";
import { MAIN_ROLE_IDS } from "@/lib/utils/wizard-helpers";
import type { UserRole } from "@/lib/types/company.types";
import { cn } from "@/lib/utils/cn";

const OWNER_ROLE_OPTIONS: UserRole[] = [
  "owner",
  "manager",
  "marketer",
  "smm",
  "accountant",
  "salesperson",
  "administrator",
];

export function OnboardingStep3Team() {
  const t = useTranslations("wizard.onboarding");
  const t7 = useTranslations("wizard.step7");
  const tRoles = useTranslations("roles");
  const { wizardData, setStepData } = useWizardStore();
  const [customRole, setCustomRole] = useState("");

  const selectedRoles = wizardData.selectedRoles ?? [];
  const customRoles = wizardData.customRoles ?? [];
  const ownerRole = wizardData.ownerRole;

  const toggleRole = (roleId: string) => {
    const next = selectedRoles.includes(roleId)
      ? selectedRoles.filter((r) => r !== roleId)
      : [...selectedRoles, roleId];
    setStepData({ selectedRoles: next });
  };

  const addCustomRole = () => {
    const trimmed = customRole.trim();
    if (!trimmed || customRoles.includes(trimmed)) return;
    setStepData({ customRoles: [...customRoles, trimmed] });
    setCustomRole("");
  };

  const removeCustomRole = (role: string) => {
    setStepData({ customRoles: customRoles.filter((r) => r !== role) });
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t7("title")}</h2>
      <OnboardingTip text={t("step3Why")} gain={t("step3Gain")} />

      <div className="mt-6">
        <Label className="mb-3 block text-base font-medium">
          {t("ownerRoleQuestion")}
        </Label>
        <p className="mb-3 text-sm text-text-secondary">{t("ownerRoleHint")}</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {OWNER_ROLE_OPTIONS.map((roleId) => (
            <button
              key={roleId}
              type="button"
              onClick={() => setStepData({ ownerRole: roleId })}
              className={cn(
                "min-h-[44px] rounded-xl border px-3 py-2 text-sm transition-all",
                ownerRole === roleId
                  ? "border-accent bg-accent/10 text-accent font-medium"
                  : "border-border bg-surface hover:border-border-bright text-text-secondary"
              )}
            >
              {tRoles(roleId)}
            </button>
          ))}
        </div>
      </div>

      {ownerRole && (
        <div className="mt-8 animate-in slide-in-from-top-2 duration-200">
          <Label className="mb-1 block text-base font-medium">
            {t("teamRolesQuestion")}
          </Label>
          <p className="mb-3 text-sm text-text-muted">{t7("inviteHint")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MAIN_ROLE_IDS.map((roleId) => (
              <label
                key={roleId}
                className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:border-accent transition-colors"
              >
                <Checkbox
                  checked={selectedRoles.includes(roleId)}
                  onCheckedChange={() => toggleRole(roleId)}
                />
                <span className="text-sm">{tRoles(roleId)}</span>
              </label>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm text-text-muted mb-2">{t7("customRolesQuestion")}</p>
            <div className="flex gap-2">
              <Input
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                placeholder={t7("customRolePlaceholder")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomRole();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addCustomRole}>
                {t7("addRole")}
              </Button>
            </div>
            {customRoles.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {customRoles.map((role) => (
                  <Badge key={role} variant="outline" className="gap-1 pr-1">
                    {role}
                    <button
                      type="button"
                      onClick={() => removeCustomRole(role)}
                      className="ml-1 hover:text-danger"
                      aria-label={t7("removeRole")}
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Button
            type="button"
            variant="ghost"
            className="mt-4 text-text-muted"
            onClick={() => setStepData({ selectedRoles: [], customRoles: [] })}
          >
            {t("skipTeamForNow")}
          </Button>
        </div>
      )}
    </div>
  );
}
