"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useWizardStore } from "@/lib/stores/wizard.store";

const roles = [
  { id: "Owner", key: "owner", disabled: true },
  { id: "Manager", key: "manager" },
  { id: "Marketer / SMM", key: "marketerSmm" },
  { id: "Accountant", key: "accountant" },
  { id: "Sales staff", key: "salesStaff" },
  { id: "Administrator", key: "administrator" },
  { id: "Warehouse staff", key: "warehouseStaff" },
] as const;

export function Step7Employees() {
  const t = useTranslations("wizard.step7");
  const { wizardData, setStepData } = useWizardStore();
  const teamRoles = wizardData.teamRoles ?? ["Owner"];

  const toggleRole = (role: string) => {
    if (role === "Owner") return;
    const next = teamRoles.includes(role)
      ? teamRoles.filter((r) => r !== role)
      : [...teamRoles, role];
    setStepData({ teamRoles: next });
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <p className="text-text-secondary mb-8">{t("subtitle")}</p>
      <div className="space-y-6">
        <div>
          <Label htmlFor="employees">{t("employeeCount")}</Label>
          <Input
            id="employees"
            type="number"
            min={1}
            value={wizardData.employeeCount ?? 14}
            onChange={(e) =>
              setStepData({ employeeCount: parseInt(e.target.value, 10) || 1 })
            }
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="mb-3 block">{t("roles")}</Label>
          <div className="space-y-3">
            {roles.map((role) => (
              <label
                key={role.id}
                className="flex items-center gap-3 text-sm cursor-pointer"
              >
                <Checkbox
                  checked={teamRoles.includes(role.id)}
                  disabled={"disabled" in role && role.disabled}
                  onCheckedChange={() => toggleRole(role.id)}
                />
                {t(role.key)}
              </label>
            ))}
          </div>
          <p className="text-xs text-text-muted mt-4">{t("inviteHint")}</p>
        </div>
      </div>
    </div>
  );
}
