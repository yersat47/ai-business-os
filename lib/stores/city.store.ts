import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CityStore {
  selectedCity: string;
  setCity: (id: string) => void;
}

export const useCityStore = create<CityStore>()(
  persist(
    (set) => ({
      selectedCity: "almaty",
      setCity: (id) => set({ selectedCity: id }),
    }),
    { name: "city-preference" }
  )
);
