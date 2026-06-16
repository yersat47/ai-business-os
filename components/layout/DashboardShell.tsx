"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { PersistentIndicators } from "./PersistentIndicators";
import { ShanyrakArc } from "@/components/shared/ShanyrakArc";

interface DashboardShellProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardShell({ children, title }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <div className="flex min-h-screen bg-background relative">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 relative">
        {isDashboard && (
          <ShanyrakArc className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] pointer-events-none -z-0" />
        )}
        <TopBar title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6 overflow-auto pb-24 relative z-10">
          {children}
        </main>
        <PersistentIndicators />
      </div>
    </div>
  );
}
