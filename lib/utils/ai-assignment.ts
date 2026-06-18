import type { Employee } from "@/lib/types/employee.types";
import type { UserRole } from "@/lib/types/company.types";

const AI_ROLES: Record<UserRole, string> = {
  owner: "AI Analyst",
  manager: "AI Manager",
  marketer: "AI Marketer",
  smm: "AI SMM",
  accountant: "AI Accountant",
  administrator: "AI Administrator",
  salesperson: "AI Manager",
};

const OPERATIONAL_KEYWORDS = [
  "массажист",
  "повар",
  "курьер",
  "уборщик",
  "охранник",
  "водитель",
  "грузчик",
  "кассир",
  "официант",
  "бариста",
  "массажшы",
  "аспаз",
  "жеткізуші",
  "тазалаушы",
  "күзетші",
  "жүргізуші",
  "кассир",
  "дәміші",
  "massage",
  "courier",
  "cashier",
  "waiter",
  "barista",
  "cook",
  "chef",
  "driver",
];

function isOperationalJobTitle(jobTitle: string): boolean {
  const titleLower = jobTitle.toLowerCase();
  return OPERATIONAL_KEYWORDS.some((kw) => titleLower.includes(kw));
}

function determineAIForCustomRole(jobTitle: string): boolean {
  return !isOperationalJobTitle(jobTitle);
}

export function getAIAssignment(
  employee: Pick<Employee, "jobTitle" | "systemRole">,
  _businessType?: string
): { hasAI: boolean; agentName: string | null } {
  if (isOperationalJobTitle(employee.jobTitle)) {
    return { hasAI: false, agentName: null };
  }

  const agentName = AI_ROLES[employee.systemRole];
  if (agentName) {
    return { hasAI: true, agentName };
  }

  const hasAI = determineAIForCustomRole(employee.jobTitle);
  return { hasAI, agentName: hasAI ? "AI Analyst" : null };
}

export function enrichEmployeeWithAI<T extends Pick<Employee, "jobTitle" | "systemRole">>(
  employee: T,
  businessType?: string
): T & { hasAI: boolean; aiAgentName: string | null } {
  const { hasAI, agentName } = getAIAssignment(employee, businessType);
  return { ...employee, hasAI, aiAgentName: agentName };
}
