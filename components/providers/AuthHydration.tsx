"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useCompanyStore } from "@/lib/stores/company.store";

export function AuthHydration() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isSetupComplete = useCompanyStore((s) => s.isSetupComplete);

  useEffect(() => {
    if (isAuthenticated) {
      document.cookie = "ai-bos-auth=true; path=/; max-age=604800";
    }
    if (isSetupComplete) {
      document.cookie = "ai-bos-setup=true; path=/; max-age=604800";
    }
  }, [isAuthenticated, isSetupComplete]);

  return null;
}
