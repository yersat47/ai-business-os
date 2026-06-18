import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser, UserRole } from "@/lib/types/company.types";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const name = email.split("@")[0] || "Ersat";
        const user: AuthUser = {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          email,
          role: "owner",
        };
        if (typeof document !== "undefined") {
          document.cookie = "ai-bos-auth=true; path=/; max-age=604800";
        }
        set({ user, isAuthenticated: true, isLoading: false });
      },
      setRole: (role: UserRole) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, role } });
        }
      },
      logout: () => {
        if (typeof document !== "undefined") {
          document.cookie =
            "ai-bos-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: "ai-bos-auth" }
  )
);
