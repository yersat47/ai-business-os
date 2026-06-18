import type { UserRole } from "@/lib/types/company.types";

export type SystemRole = UserRole;

export interface Employee {
  id: string;
  name: string;
  jobTitle: string;
  department: string;
  systemRole: SystemRole;
  phone?: string;
  email?: string;
  accessCode: string;
  avatarUrl?: string;
  hasAI: boolean;
  aiAgentName?: string | null;
  lastSeen?: string;
  isActive: boolean;
}

export interface Department {
  id: string;
  nameKey: string;
  customName?: string;
}

export type EmployeeViewMode = "tree" | "grid" | "table";
