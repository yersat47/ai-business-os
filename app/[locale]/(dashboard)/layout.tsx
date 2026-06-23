"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useCompanyStore } from "@/lib/stores/company.store";
import { useStoreHydration } from "@/hooks/use-store-hydration";

function hasCookie(name: string) {
  return typeof document !== "undefined" && document.cookie.includes(`${name}=true`);
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const hydrated = useStoreHydration();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isSetupComplete = useCompanyStore((s) => s.isSetupComplete);

  useEffect(() => {
    if (!hydrated) return;

    const canAccess =
      isAuthenticated ||
      isSetupComplete ||
      hasCookie("ai-bos-auth") ||
      hasCookie("ai-bos-setup");

    if (!canAccess) {
      router.push("/login");
    }
  }, [hydrated, isAuthenticated, isSetupComplete, router]);

  if (!hydrated) {
    return null;
  }

  return <>{children}</>;
}
