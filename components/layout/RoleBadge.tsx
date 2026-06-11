import { Badge } from "@/components/ui/badge";
import { getRoleBadgeColor } from "@/lib/utils/permissions";
import type { UserRole } from "@/lib/types/company.types";
import { cn } from "@/lib/utils/cn";

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
}

const roleLabels: Record<UserRole, string> = {
  owner: "Owner",
  manager: "Manager",
  marketer: "Marketer",
  smm: "SMM",
  accountant: "Accountant",
  salesperson: "Salesperson",
  administrator: "Administrator",
};

export function RoleBadge({ role, className }: RoleBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("capitalize border", getRoleBadgeColor(role), className)}
    >
      {roleLabels[role]}
    </Badge>
  );
}
