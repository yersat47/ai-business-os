"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  UserCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuthStore } from "@/lib/stores/auth.store";
import { canAccess } from "@/lib/utils/permissions";
import { MOCK_BRAIN } from "@/lib/mock/mock-brain";
import { Button } from "@/components/ui/button";
import { glass } from "@/lib/glass.styles";
import { DASHBOARD_NAV_ITEMS, isNavItemActive } from "./mobile-nav-config";

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
  const t = useTranslations("sidebar");
  const tCommon = useTranslations("common");
  const tRoles = useTranslations("roles");
  const user = useAuthStore((s) => s.user);
  const role = user?.role ?? "owner";

  const visibleItems = DASHBOARD_NAV_ITEMS.filter((item) => canAccess(role, item.id));

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 hidden h-screen flex-col transition-all duration-300 lg:sticky lg:flex",
          collapsed ? "w-16" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={glass.sidebar}
      >
        <div className="p-4 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
              <span className="text-accent text-sm">⬡</span>
            </div>
            {!collapsed && (
              <span className="font-semibold text-sm text-text-primary">
                {tCommon("brand")}
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {visibleItems.map((item) => {
            const active = isNavItemActive(pathname, item.href);
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
                {!collapsed && <span>{t(item.key)}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          {!collapsed && (
            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>{t("brainCoverage")}</span>
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
                  {user?.name ?? "Ersat"} · {tRoles(role)}
                </p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full hidden lg:flex"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-1" />
                {tCommon("collapse")}
              </>
            )}
          </Button>
        </div>
      </aside>
    </>
  );
}
