"use client";

import { useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileMoreSheet } from "./MobileMoreSheet";
import { useAuthStore } from "@/lib/stores/auth.store";

interface DashboardShellProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardShell({ children, title }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const role = useAuthStore((s) => s.user?.role ?? "owner");

  return (
    <div className="flex min-h-screen relative">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <TopBar onMenuClick={() => setMobileNavOpen(true)} />
        <main
          className="flex-1 overflow-auto px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-4 md:px-6 md:pt-6 lg:pb-6 lg:pl-6 lg:pr-6 relative z-10"
          aria-label={title}
        >
          {children}
        </main>
      </div>
      <MobileBottomNav role={role} currentPath={pathname} />
      <MobileMoreSheet
        role={role}
        currentPath={pathname}
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        includePrimary
      />
    </div>
  );
}
