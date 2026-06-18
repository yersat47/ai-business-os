import type { Department, Employee } from "@/lib/types/employee.types";
import { enrichEmployeeWithAI } from "@/lib/utils/ai-assignment";

export const DEFAULT_DEPARTMENTS: Department[] = [
  { id: "management", nameKey: "management" },
  { id: "operations", nameKey: "operations" },
  { id: "marketing", nameKey: "marketing" },
  { id: "finance", nameKey: "finance" },
  { id: "sales", nameKey: "sales" },
];

const rawEmployees: Omit<Employee, "hasAI" | "aiAgentName">[] = [
  {
    id: "1",
    name: "Ерсат Нуров",
    jobTitle: "Генеральный директор",
    department: "management",
    systemRole: "owner",
    phone: "+7 777 100 00 01",
    email: "ersat@urbanmode.kz",
    accessCode: "KZ-0001",
    lastSeen: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    isActive: true,
  },
  {
    id: "2",
    name: "Марат Сейткали",
    jobTitle: "Менеджер",
    department: "operations",
    systemRole: "manager",
    phone: "+7 777 200 00 02",
    email: "marat@urbanmode.kz",
    accessCode: "KZ-B7K2",
    lastSeen: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    isActive: true,
  },
  {
    id: "3",
    name: "Айгерим Касымова",
    jobTitle: "Маркетолог",
    department: "marketing",
    systemRole: "marketer",
    phone: "+7 777 300 00 03",
    email: "aigerim@urbanmode.kz",
    accessCode: "KZ-A3F9",
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isActive: true,
  },
  {
    id: "4",
    name: "Азиз Дулатов",
    jobTitle: "SMM-специалист",
    department: "marketing",
    systemRole: "smm",
    phone: "+7 777 400 00 04",
    email: "aziz@urbanmode.kz",
    accessCode: "KZ-S8N3",
    lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
  },
  {
    id: "5",
    name: "Камила Омарова",
    jobTitle: "Бухгалтер",
    department: "finance",
    systemRole: "accountant",
    phone: "+7 777 500 00 05",
    email: "kamila@urbanmode.kz",
    accessCode: "KZ-F2R6",
    lastSeen: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    isActive: true,
  },
  {
    id: "6",
    name: "Дана Нурланова",
    jobTitle: "Продавец-консультант",
    department: "sales",
    systemRole: "salesperson",
    phone: "+7 777 600 00 06",
    email: "dana@urbanmode.kz",
    accessCode: "KZ-P4R7",
    lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    isActive: true,
  },
];

export const mockEmployees: Employee[] = rawEmployees.map((emp) =>
  enrichEmployeeWithAI(emp, "Retail + Online")
);
