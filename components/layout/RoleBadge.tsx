"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { getRoleBadgeColor } from "@/lib/utils/permissions";
import type { UserRole } from "@/lib/types/company.types";
import { cn } from "@/lib/utils/cn";

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const t = useTranslations("roles");

  return (
    <Badge
      variant="outline"
      className={cn("capitalize border", getRoleBadgeColor(role), className)}
    >
      {t(role)}
    </Badge>
  );
}
