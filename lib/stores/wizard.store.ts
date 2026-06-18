import { create } from "zustand";
import type { WizardData } from "@/lib/types/company.types";
import { useCompanyStore } from "./company.store";
import { useHealthStore } from "./health.store";

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

    const merged = {
      ...companyStore.company,
      ...wizardData,
      id: companyStore.company.id || "company-001",
      name: wizardData.name || companyStore.company.name,
      industry: wizardData.industry || companyStore.company.industry,
      businessType: wizardData.businessType || companyStore.company.businessType,
      size: wizardData.size || companyStore.company.size,
      selectedRoles,
      customRoles,
      teamRoles: [...selectedRoles, ...customRoles],
      metricsEntered: hasMetrics,
      setupComplete: true,
    };

    companyStore.setCompany(merged);
    companyStore.completeSetup();
    healthStore.recalculate(merged);
    set({ isComplete: true, currentStep: 6 });
  },
  reset: () =>
    set({ currentStep: 1, wizardData: initialData, isComplete: false }),
}));
