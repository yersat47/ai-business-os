"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Brain,
  Users,
  UserCircle,
  Database,
  Settings,
  ChevronLeft,
  ChevronRight,
  Hexagon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuthStore } from "@/lib/stores/auth.store";
import { canAccess } from "@/lib/utils/permissions";
import { MOCK_BRAIN } from "@/lib/mock/mock-brain";
import { Button } from "@/components/ui/button";

const navItems = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { id: "health", label: "Business Health", href: "/health", icon: Activity },
  { id: "brain", label: "Company Brain", href: "/brain", icon: Brain },
  { id: "team", label: "AI Team", href: "/team", icon: Hexagon },
  { id: "employees", label: "Employees", href: "/employees", icon: Users },
  { id: "data", label: "Data Center", href: "/data", icon: Database },
  { id: "settings", label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const role = user?.role ?? "owner";

  const visibleItems = navItems.filter((item) => canAccess(role, item.id));

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onMobileClose}
        />
      )}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 h-screen bg-sidebar border-r border-border flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
              <span className="text-accent text-sm">⬡</span>
            </div>
            {!collapsed && (
              <span className="font-semibold text-sm text-text-primary">
                AI Business OS
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {visibleItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                  active
                    ? "bg-accent/10 text-accent border-l-2 border-accent"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-raised"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          {!collapsed && (
            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>Company Brain</span>
                <span>{MOCK_BRAIN.coveragePct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all"
                  style={{ width: `${MOCK_BRAIN.coveragePct}%` }}
                />
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
              <UserCircle className="h-4 w-4 text-accent" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-medium text-text-primary truncate">
                  {user?.name ?? "Ersat"} · Owner
                </p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full hidden md:flex"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Collapse
              </>
            )}
          </Button>
        </div>
      </aside>
    </>
  );
}
