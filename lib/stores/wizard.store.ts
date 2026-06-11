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
  name: "Urban Mode",
  businessType: "Retail + Online",
  size: "16-30",
  city: "Astana",
  country: "KZ",
  currency: "₸",
  salesChannels: ["Instagram Shop", "Physical Store", "Kaspi.kz"],
  currentTools: ["Excel / Google Sheets", "WhatsApp", "Instagram", "Kaspi"],
  employeeCount: 14,
  teamRoles: ["Owner", "Manager", "Marketer / SMM", "Accountant"],
  strategicGoals: ["Increase repeat purchases", "Reduce dead stock"],
  mainProblems: ["Too much unsold inventory", "High customer acquisition cost"],
};

export const useWizardStore = create<WizardState>()((set, get) => ({
  currentStep: 1,
  wizardData: initialData,
  isComplete: false,
  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 12) set({ currentStep: currentStep + 1 });
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

    const merged = {
      ...companyStore.company,
      ...wizardData,
      id: companyStore.company.id || "urban-mode-001",
      name: wizardData.name || "Urban Mode",
      industry: wizardData.industry || "Fashion Retail",
      businessType: wizardData.businessType || "Retail + Online",
      size: wizardData.size || "11-30",
      setupComplete: true,
      salesChannels:
        wizardData.salesChannels?.map((c) =>
          c.replace("Instagram Shop", "Instagram").replace("Kaspi.kz", "Kaspi")
        ) ?? companyStore.company.salesChannels,
      currentTools:
        wizardData.currentTools?.map((t) =>
          t.replace("Excel / Google Sheets", "Excel")
        ) ?? companyStore.company.currentTools,
    };

    companyStore.setCompany(merged);
    companyStore.completeSetup();
    healthStore.recalculate(merged);
    set({ isComplete: true, currentStep: 12 });
  },
  reset: () =>
    set({ currentStep: 1, wizardData: initialData, isComplete: false }),
}));
