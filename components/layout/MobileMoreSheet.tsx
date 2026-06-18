"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { UserRole } from "@/lib/types/company.types";
import { canAccess } from "@/lib/utils/permissions";
import {
  DASHBOARD_NAV_ITEMS,
  getMobilePrimaryItems,
  isNavItemActive,
} from "./mobile-nav-config";
import { cn } from "@/lib/utils/cn";

interface MobileMoreSheetProps {
  role: UserRole;
  currentPath: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  includePrimary?: boolean;
}

export function MobileMoreSheet({
  role,
  currentPath,
  open,
  onOpenChange,
  includePrimary = false,
}: MobileMoreSheetProps) {
  const t = useTranslations("sidebar");
  const tCommon = useTranslations("common");
  const primaryIds = new Set(getMobilePrimaryItems(role).map((item) => item.id));
  const items = DASHBOARD_NAV_ITEMS.filter(
    (item) =>
      canAccess(role, item.id) && (includePrimary || !primaryIds.has(item.id))
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[60vh] overflow-y-auto px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-6"
      >
        <SheetHeader className="mb-4 text-left">
          <SheetTitle>{tCommon("more")}</SheetTitle>
        </SheetHeader>
        <div className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isNavItemActive(currentPath, item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "flex min-h-[56px] items-center gap-3 rounded-2xl border border-border bg-surface-raised px-4 text-sm transition-colors",
                  active ? "text-accent" : "text-text-secondary"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1">{t(item.key)}</span>
                <ChevronRight className="h-4 w-4 text-text-muted" />
              </Link>
            );
          })}
          {items.length === 0 && (
            <p className="rounded-2xl border border-border bg-surface-raised p-4 text-sm text-text-muted">
              {tCommon("noData")}
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
