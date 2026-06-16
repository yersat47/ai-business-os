"use client";

import { useTranslations } from "next-intl";

const roleMap: Record<
  string,
  { triggerRoles: string[]; messageKey: string }
> = {
  marketing: {
    triggerRoles: ["Marketer / SMM", "Маркетолог", "Marketer"],
    messageKey: "marketer",
  },
  financial: {
    triggerRoles: ["Accountant", "Бухгалтер"],
    messageKey: "accountant",
  },
  operations: {
    triggerRoles: ["Manager", "Менеджер"],
    messageKey: "manager",
  },
  sales: {
    triggerRoles: ["Sales staff", "Продавец", "Salesperson"],
    messageKey: "salesperson",
  },
  social: {
    triggerRoles: ["Marketer / SMM", "SMM"],
    messageKey: "smm",
  },
  brain: {
    triggerRoles: ["Administrator", "Администратор"],
    messageKey: "administrator",
  },
  integrations: {
    triggerRoles: ["Administrator", "Администратор"],
    messageKey: "administrator",
  },
};

interface RoleAwareHintProps {
  section: keyof typeof roleMap;
  teamRoles?: string[];
}

export function RoleAwareHint({ section, teamRoles = [] }: RoleAwareHintProps) {
  const t = useTranslations("onboarding.roleHint");
  const config = roleMap[section];
  if (!config) return null;

  const matched = config.triggerRoles.find((r) => teamRoles.includes(r));
  if (!matched) return null;

  return (
    <div className="rounded-xl border border-info/20 bg-info/5 p-4 mt-4 text-sm text-text-secondary">
      💡 {t(config.messageKey, { role: matched })}
    </div>
  );
}
