import type { UserRole } from "@/lib/types/company.types";

export const ROLE_NAV: Record<UserRole, string[]> = {
  owner: [
    "dashboard",
    "health",
    "brain",
    "team",
    "employees",
    "data",
    "settings",
  ],
  manager: ["dashboard", "health", "brain", "team", "employees", "data"],
  marketer: ["dashboard", "health", "team", "data"],
  smm: ["dashboard", "team"],
  accountant: ["dashboard", "health", "team", "data"],
  salesperson: ["dashboard", "health", "team", "data"],
  administrator: ["dashboard", "employees", "settings"],
};

export const ROLE_PILLARS: Record<UserRole, string[] | "all"> = {
  owner: "all",
  manager: "all",
  marketer: ["marketing"],
  smm: [],
  accountant: ["financial", "sales"],
  salesperson: ["sales", "customer"],
  administrator: [],
};

export function canAccess(role: UserRole, resource: string): boolean {
  const allowed = ROLE_NAV[role] ?? [];
  return allowed.includes(resource);
}

export function getVisiblePillars(role: UserRole): string[] | "all" {
  return ROLE_PILLARS[role] ?? "all";
}

export function getRoleBadgeColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    owner: "bg-accent/20 text-accent border-accent/30",
    manager: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    marketer: "bg-info/20 text-info border-info/30",
    smm: "bg-info/20 text-info border-info/30",
    accountant: "bg-success/20 text-success border-success/30",
    salesperson: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    administrator: "bg-text-muted/20 text-text-secondary border-border",
  };
  return colors[role];
}
