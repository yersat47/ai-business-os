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

export function OnboardingStep3Team() {
  const t = useTranslations("wizard.onboarding");
  const t7 = useTranslations("wizard.step7");
  const tRoles = useTranslations("roles");
  const { wizardData, setStepData } = useWizardStore();
  const [customRole, setCustomRole] = useState("");

  const selectedRoles = wizardData.selectedRoles ?? [];
  const customRoles = wizardData.customRoles ?? [];

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
        <Label className="mb-3 block">{t7("roles")}</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MAIN_ROLE_IDS.map((roleId) => {
            const isSelected = selectedRoles.includes(roleId);
            return (
              <label
                key={roleId}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  isSelected ? "" : "border-border hover:border-accent"
                }`}
                style={{
                  background: isSelected
                    ? "rgba(201,150,58,0.15)"
                    : "transparent",
                  borderColor: isSelected ? "#C9963A" : undefined,
                  color: isSelected ? "#C9963A" : undefined,
                }}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleRole(roleId)}
                />
                <span className="text-sm">{tRoles(roleId)}</span>
              </label>
            );
          })}
        </div>
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

      <p className="text-xs text-text-muted mt-6">{t7("inviteHint")}</p>
    </div>
  );
}
