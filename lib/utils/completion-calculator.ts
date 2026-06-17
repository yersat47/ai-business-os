export interface CompletionItem {
  id: string;
  labelKey: string;
  complete: boolean;
}

export interface CompletionData {
  score: number;
  items: CompletionItem[];
}

interface CompletionInput {
  hasProfile: boolean;
  hasBusinessType: boolean;
  hasTeam: boolean;
  hasMetrics: boolean;
  hasBrain: boolean;
}

export function calculateWizardCompletion(
  input: CompletionInput
): CompletionData {
  const items: CompletionItem[] = [
    {
      id: "profile",
      labelKey: "profile",
      complete: input.hasProfile,
    },
    {
      id: "businessType",
      labelKey: "businessType",
      complete: input.hasBusinessType,
    },
    {
      id: "team",
      labelKey: "team",
      complete: input.hasTeam,
    },
    {
      id: "metrics",
      labelKey: "metrics",
      complete: input.hasMetrics,
    },
    {
      id: "brain",
      labelKey: "brain",
      complete: input.hasBrain,
    },
  ];

  const doneCount = items.filter((i) => i.complete).length;
  const score = Math.round((doneCount / items.length) * 100);

  return { score, items };
}

export function getCompletionFromWizard(wizardData: {
  name?: string;
  businessType?: string;
  selectedRoles?: string[];
  customRoles?: string[];
  teamRoles?: string[];
  employeeCount?: number;
  monthlyRevenue?: number;
}): CompletionData {
  const explicitTeam =
    (wizardData.selectedRoles?.length ?? 0) +
    (wizardData.customRoles?.length ?? 0);
  const legacyTeam = wizardData.teamRoles?.length ?? 0;
  const hasTeam =
    explicitTeam > 0 || legacyTeam > 0 || (wizardData.employeeCount ?? 0) > 0;

  return calculateWizardCompletion({
    hasProfile: !!wizardData.name?.trim(),
    hasBusinessType: !!wizardData.businessType,
    hasTeam,
    hasMetrics: (wizardData.monthlyRevenue ?? 0) > 0,
    hasBrain: false,
  });
}

// Legacy weighted calculator for dashboard use
export interface LegacyCompletionItem {
  id: string;
  labelKey: string;
  complete: boolean;
  weight: number;
}

export interface LegacyCompletionData {
  score: number;
  items: LegacyCompletionItem[];
}

interface LegacyCompletionInput {
  hasProfile: boolean;
  hasEmployees: boolean;
  hasMetrics: boolean;
  hasBrain: boolean;
  hasIntegrations: boolean;
}

export function calculateCompletion(
  input: LegacyCompletionInput
): LegacyCompletionData {
  const items: LegacyCompletionItem[] = [
    {
      id: "profile",
      labelKey: "profile",
      complete: input.hasProfile,
      weight: 25,
    },
    {
      id: "employees",
      labelKey: "employees",
      complete: input.hasEmployees,
      weight: 20,
    },
    {
      id: "metrics",
      labelKey: "metrics",
      complete: input.hasMetrics,
      weight: 25,
    },
    {
      id: "brain",
      labelKey: "brain",
      complete: input.hasBrain,
      weight: 20,
    },
    {
      id: "integrations",
      labelKey: "integrations",
      complete: input.hasIntegrations,
      weight: 10,
    },
  ];

  const score = items.reduce(
    (sum, item) => sum + (item.complete ? item.weight : 0),
    0
  );

  return { score, items };
}
