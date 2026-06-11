"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      const cookie = document.cookie.includes("ai-bos-auth=true");
      if (!cookie) router.push("/login");
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
}
