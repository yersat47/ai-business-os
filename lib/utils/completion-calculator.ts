export interface CompletionItem {
  id: string;
  labelKey: string;
  complete: boolean;
  weight: number;
}

export interface CompletionData {
  score: number;
  items: CompletionItem[];
}

interface CompletionInput {
  hasProfile: boolean;
  hasEmployees: boolean;
  hasMetrics: boolean;
  hasBrain: boolean;
  hasIntegrations: boolean;
}

export function calculateCompletion(input: CompletionInput): CompletionData {
  const items: CompletionItem[] = [
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

export function getCompletionFromWizard(wizardData: {
  name?: string;
  businessType?: string;
  employeeCount?: number;
  monthlyRevenue?: number;
  brainSeeded?: boolean;
}): CompletionData {
  return calculateCompletion({
    hasProfile: !!(wizardData.name && wizardData.businessType),
    hasEmployees: (wizardData.employeeCount ?? 0) > 0,
    hasMetrics: (wizardData.monthlyRevenue ?? 0) > 0,
    hasBrain: !!wizardData.brainSeeded,
    hasIntegrations: false,
  });
}
