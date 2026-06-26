import { create } from "zustand";
import type { WizardData } from "@/lib/types/company.types";
import { useAuthStore } from "./auth.store";
import { useCompanyStore } from "./company.store";
import { useHealthStore } from "./health.store";
import { useOnboardingStore } from "./onboarding.store";
import { businessTypeFromSegment } from "@/lib/utils/segment-map";

interface WizardState {
  currentStep: number;
  wizardData: WizardData;
  isComplete: boolean;
  nextStep: () => void;
  prevStep: () => void;
  setStepData: (data: Partial<WizardData>) => void;
  setStep: (step: number) => void;
  completeWizard: () => void;
  reset: () => void;
}

const initialData: WizardData = {
  name: "",
  businessType: "",
  size: "",
  city: "",
  country: "KZ",
  currency: "₸",
  employeeCount: 0,
  selectedRoles: [],
  customRoles: [],
  teamRoles: [],
};

export const useWizardStore = create<WizardState>()((set, get) => ({
  currentStep: 1,
  wizardData: initialData,
  isComplete: false,
  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 6) set({ currentStep: currentStep + 1 });
  },
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) set({ currentStep: currentStep - 1 });
  },
  setStepData: (data) => {
    const { wizardData } = get();
    set({ wizardData: { ...wizardData, ...data } });
  },
  setStep: (step) => set({ currentStep: step }),
  completeWizard: () => {
    const { wizardData } = get();
    const companyStore = useCompanyStore.getState();
    const healthStore = useHealthStore.getState();

    const selectedRoles = wizardData.selectedRoles ?? [];
    const customRoles = wizardData.customRoles ?? [];
    const hasMetrics = (wizardData.monthlyRevenue ?? 0) > 0;
    const segment = useOnboardingStore.getState().segment;
    const ownerRole = wizardData.ownerRole ?? "owner";
    const businessType =
      businessTypeFromSegment(segment) ||
      wizardData.businessType ||
      companyStore.company.businessType;

    const merged = {
      ...companyStore.company,
      ...wizardData,
      id: companyStore.company.id || "company-001",
      name: wizardData.name || companyStore.company.name,
      industry: wizardData.industry || companyStore.company.industry,
      businessType,
      size: wizardData.size || companyStore.company.size || "s2_5",
      city: wizardData.city || companyStore.company.city || "Алматы",
      businessSegment: segment ?? wizardData.businessSegment,
      selectedRoles,
      customRoles,
      teamRoles: [...selectedRoles, ...customRoles],
      metricsEntered: hasMetrics,
      setupComplete: true,
    };

    companyStore.setCompany(merged);
    companyStore.completeSetup();
    healthStore.recalculate(merged);

    const authStore = useAuthStore.getState();
    const userRole = ownerRole;
    if (!authStore.isAuthenticated) {
      const ownerName = wizardData.name?.trim() || "Owner";
      useAuthStore.setState({
        user: {
          name: ownerName,
          email: "demo@aibos.kz",
          role: userRole,
        },
        isAuthenticated: true,
        isLoading: false,
      });
      if (typeof document !== "undefined") {
        document.cookie = "ai-bos-auth=true; path=/; max-age=604800";
      }
    } else {
      authStore.setRole(userRole);
    }

    set({ isComplete: true, currentStep: 6 });
  },
  reset: () => {
    useOnboardingStore.getState().resetSegment();
    set({ currentStep: 1, wizardData: initialData, isComplete: false });
  },
}));
