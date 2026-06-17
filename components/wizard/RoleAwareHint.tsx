"use client";

import { Info } from "lucide-react";
import { useTranslations } from "next-intl";

const roleSectionMap: Record<
  string,
  { roleIds: string[]; messageKey: string }
> = {
  marketing: {
    roleIds: ["marketer"],
    messageKey: "marketer",
  },
  financial: {
    roleIds: ["accountant"],
    messageKey: "accountant",
  },
  operations: {
    roleIds: ["manager"],
    messageKey: "manager",
  },
  sales: {
    roleIds: ["salesperson"],
    messageKey: "salesperson",
  },
  social: {
    roleIds: ["smm"],
    messageKey: "smm",
  },
  brain: {
    roleIds: ["administrator"],
    messageKey: "administrator",
  },
  integrations: {
    roleIds: ["administrator"],
    messageKey: "administrator",
  },
};

interface RoleAwareHintProps {
  section: keyof typeof roleSectionMap;
  selectedRoles?: string[];
}

export function RoleAwareHint({
  section,
  selectedRoles = [],
}: RoleAwareHintProps) {
  const t = useTranslations("onboarding.roleHint");
  const tRoles = useTranslations("roles");
  const config = roleSectionMap[section];
  if (!config) return null;

  const matchedRoleId = config.roleIds.find((id) => selectedRoles.includes(id));
  if (!matchedRoleId) return null;

  return (
    <div className="flex gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20 text-sm text-text-secondary mt-4">
      <Info size={16} className="text-accent shrink-0 mt-0.5" />
      <p>{t(config.messageKey, { role: tRoles(matchedRoleId) })}</p>
    </div>
  );
}
