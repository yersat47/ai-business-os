"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { UserRole } from "@/lib/types/company.types";
import { cn } from "@/lib/utils/cn";
import { MobileMoreSheet } from "./MobileMoreSheet";
import {
  getMobilePrimaryItems,
  isNavItemActive,
} from "./mobile-nav-config";

interface MobileBottomNavProps {
  role: UserRole;
  currentPath: string;
}

export function MobileBottomNav({ role, currentPath }: MobileBottomNavProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const t = useTranslations("sidebar");
  const tCommon = useTranslations("common");
  const primaryItems = getMobilePrimaryItems(role);
  const moreActive = primaryItems.every(
    (item) => !isNavItemActive(currentPath, item.href)
  );

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-50 block border-t border-[rgba(201,146,58,0.15)] bg-[#0A0A0F]/95 px-2 pb-[env(safe-area-inset-bottom)] pt-1 backdrop-blur lg:hidden">
        <div className="grid h-16 grid-cols-5 items-center">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const active = isNavItemActive(currentPath, item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-xl px-1"
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    active ? "text-[#C9923A]" : "text-zinc-500"
                  )}
                />
                <span
                  className={cn(
                    "max-w-full truncate text-[10px] leading-none transition-colors",
                    active ? "text-[#C9923A]" : "text-zinc-600"
                  )}
                >
                  {t(item.key)}
                </span>
                {active && (
                  <motion.span
                    layoutId="mobile-bottom-nav-dot"
                    className="absolute bottom-1 h-1 w-1 rounded-full bg-[#C9923A]"
                  />
                )}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className="relative flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-xl px-1"
            aria-label="More navigation"
          >
            <Menu
              className={cn(
                "h-5 w-5 transition-colors",
                moreActive ? "text-[#C9923A]" : "text-zinc-500"
              )}
            />
            <span
              className={cn(
                "text-[10px] leading-none transition-colors",
                moreActive ? "text-[#C9923A]" : "text-zinc-600"
              )}
            >
              {tCommon("more")}
            </span>
            {moreActive && (
              <motion.span
                layoutId="mobile-bottom-nav-dot"
                className="absolute bottom-1 h-1 w-1 rounded-full bg-[#C9923A]"
              />
            )}
          </button>
        </div>
      </nav>
      <MobileMoreSheet
        role={role}
        currentPath={currentPath}
        open={moreOpen}
        onOpenChange={setMoreOpen}
      />
    </>
  );
}
