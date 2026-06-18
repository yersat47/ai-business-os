import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Database,
  Heart,
  Home,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import type { UserRole } from "@/lib/types/company.types";

export interface MobileNavItem {
  id: string;
  key: "dashboard" | "health" | "brain" | "team" | "employees" | "data" | "settings";
  href: string;
  icon: LucideIcon;
}

export const DASHBOARD_NAV_ITEMS: MobileNavItem[] = [
  { id: "dashboard", key: "dashboard", href: "/dashboard", icon: Home },
  { id: "health", key: "health", href: "/health", icon: Heart },
  { id: "brain", key: "brain", href: "/brain", icon: Brain },
  { id: "team", key: "team", href: "/team", icon: Users },
  { id: "employees", key: "employees", href: "/employees", icon: UserRound },
  { id: "data", key: "data", href: "/data", icon: Database },
  { id: "settings", key: "settings", href: "/settings", icon: Settings },
];

export const MOBILE_NAV_CONFIG: Record<UserRole, string[]> = {
  owner: ["dashboard", "health", "brain", "team"],
  manager: ["dashboard", "health", "employees", "data"],
  marketer: ["dashboard", "health", "team", "data"],
  smm: ["dashboard", "health", "team"],
  salesperson: ["dashboard", "health", "team", "data"],
  accountant: ["dashboard", "health", "data", "team"],
  administrator: ["dashboard", "employees", "settings"],
};

export function getMobilePrimaryItems(role: UserRole) {
  const ids = MOBILE_NAV_CONFIG[role] ?? MOBILE_NAV_CONFIG.owner;
  return ids
    .map((id) => DASHBOARD_NAV_ITEMS.find((item) => item.id === id))
    .filter((item): item is MobileNavItem => Boolean(item));
}

export function isNavItemActive(currentPath: string, href: string) {
  return currentPath === href || currentPath.startsWith(`${href}/`);
}
