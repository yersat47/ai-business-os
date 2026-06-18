const SIZE_EMPLOYEE_MAP: Record<string, number> = {
  solo: 1,
  s2_5: 3,
  s6_15: 10,
  s16_30: 20,
  s31_50: 40,
  s50plus: 55,
};

export function employeeCountFromSize(size: string): number {
  return SIZE_EMPLOYEE_MAP[size] ?? 0;
}

export const BUSINESS_TYPE_KEYS = [
  "fashionRetail",
  "beautyAndSpa",
  "foodAndCafe",
  "ecommerce",
  "services",
  "wholesale",
  "other",
] as const;

export type BusinessTypeKey = (typeof BUSINESS_TYPE_KEYS)[number];

export const SIZE_KEYS = [
  "solo",
  "s2_5",
  "s6_15",
  "s16_30",
  "s31_50",
  "s50plus",
] as const;

export type SizeKey = (typeof SIZE_KEYS)[number];

export const MAIN_ROLE_IDS = [
  "manager",
  "marketer",
  "accountant",
  "smm",
  "salesperson",
  "administrator",
] as const;

export type MainRoleId = (typeof MAIN_ROLE_IDS)[number];
