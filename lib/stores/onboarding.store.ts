import { create } from "zustand";

export type BusinessSegment = "fashion_retail";

interface OnboardingState {
  segment: BusinessSegment | null;
  setSegment: (segment: BusinessSegment) => void;
  resetSegment: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  segment: null,
  setSegment: (segment) => set({ segment }),
  resetSegment: () => set({ segment: null }),
}));
