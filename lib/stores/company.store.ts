import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Company } from "@/lib/types/company.types";
import { MOCK_COMPANY } from "@/lib/mock/mock-company";

interface CompanyState {
  company: Company;
  isSetupComplete: boolean;
  setCompany: (data: Company) => void;
  updateCompany: (partial: Partial<Company>) => void;
  completeSetup: () => void;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set, get) => ({
      company: MOCK_COMPANY,
      isSetupComplete: MOCK_COMPANY.setupComplete,
      setCompany: (data) =>
        set({ company: data, isSetupComplete: data.setupComplete }),
      updateCompany: (partial) => {
        const { company } = get();
        set({ company: { ...company, ...partial } });
      },
      completeSetup: () => {
        const { company } = get();
        set({
          company: { ...company, setupComplete: true },
          isSetupComplete: true,
        });
        if (typeof document !== "undefined") {
          document.cookie = "ai-bos-setup=true; path=/; max-age=604800";
        }
      },
    }),
    { name: "ai-bos-company" }
  )
);
