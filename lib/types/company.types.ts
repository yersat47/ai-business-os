export type UserRole =
  | "owner"
  | "manager"
  | "marketer"
  | "smm"
  | "accountant"
  | "salesperson"
  | "administrator";

export interface Company {
  id: string;
  name: string;
  industry: string;
  businessType: string;
  size: string;
  city: string;
  country: string;
  currency: string;
  salesChannels: string[];
  currentTools: string[];
  employeeCount: number;
  monthlyRevenue: number;
  averageOrderValue: number;
  marketingSpend: number;
  inventoryValue: number;
  deadStockValue: number;
  grossMarginPct: number;
  netMarginPct: number;
  cac: number;
  repeatPurchaseRate: number;
  positioning: string;
  targetAudience: string;
  toneOfVoice: string;
  competitors: string[];
  strategicGoals: string[];
  mainProblems: string[];
  setupComplete: boolean;
  metricsEntered?: boolean;
  tagline?: string;
  teamRoles?: string[];
  selectedRoles?: string[];
  customRoles?: string[];
  businessSegment?: string;
}

export interface WizardData extends Partial<Company> {
  step?: number;
  brainSeeded?: boolean;
  monthlyTransactions?: number;
  ownerRole?: UserRole;
}

export interface EmployeeRecord {
  id: string;
  name: string;
  jobTitle: string;
  department: string;
  systemRole: UserRole;
  accessCode: string;
  status: "active" | "deactivated";
  addedAt: string;
}

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
}
