"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useWizardStore } from "@/lib/stores/wizard.store";

const roles = [
  { id: "Owner", disabled: true },
  { id: "Manager" },
  { id: "Marketer / SMM" },
  { id: "Accountant" },
  { id: "Sales staff" },
  { id: "Administrator" },
  { id: "Warehouse staff" },
];

export function Step7Employees() {
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
      <h2 className="text-2xl font-bold mb-2">Your Team</h2>
      <p className="text-text-secondary mb-8">Tell us about your team structure.</p>
      <div className="space-y-6">
        <div>
          <Label htmlFor="employees">Employee count</Label>
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
          <Label className="mb-3 block">Roles in your company</Label>
          <div className="space-y-3">
            {roles.map((role) => (
              <label
                key={role.id}
                className="flex items-center gap-3 text-sm cursor-pointer"
              >
                <Checkbox
                  checked={teamRoles.includes(role.id)}
                  disabled={role.disabled}
                  onCheckedChange={() => toggleRole(role.id)}
                />
                {role.id}
              </label>
            ))}
          </div>
          <p className="text-xs text-text-muted mt-4">
            You can invite team members after setup.
          </p>
        </div>
      </div>
    </div>
  );
}
