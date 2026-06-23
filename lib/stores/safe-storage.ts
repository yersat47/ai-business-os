import { createJSONStorage, type StateStorage } from "zustand/middleware";

function createSafeStateStorage(): StateStorage {
  return {
    getItem: (name) => {
      if (typeof window === "undefined") return null;

      const value = window.localStorage.getItem(name);
      if (!value) return null;

      try {
        JSON.parse(value);
        return value;
      } catch {
        window.localStorage.removeItem(name);
        return null;
      }
    },
    setItem: (name, value) => {
      window.localStorage.setItem(name, value);
    },
    removeItem: (name) => {
      window.localStorage.removeItem(name);
    },
  };
}

export const safeLocalStorage = createJSONStorage(() => createSafeStateStorage());
