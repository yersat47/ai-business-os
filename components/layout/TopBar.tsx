"use client";

import { Menu, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RoleBadge } from "./RoleBadge";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { TopBarIndicators } from "./TopBarIndicators";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useCompanyStore } from "@/lib/stores/company.store";
import { useRouter } from "@/i18n/navigation";
import { glass } from "@/lib/glass.styles";

interface TopBarProps {
  onMenuClick?: () => void;
}

function Logo() {
  const t = useTranslations("common");

  return (
    <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
      <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
        <span className="text-accent text-sm">⬡</span>
      </div>
      <span className="hidden sm:inline font-semibold text-sm text-text-primary">
        {t("brand")}
      </span>
    </Link>
  );
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const company = useCompanyStore((s) => s.company);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header
      className="h-14 sticky top-0 z-50"
      style={glass.topbar}
    >
      <div className="flex items-center justify-between h-full px-4 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden shrink-0"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Logo />
          <span className="hidden lg:inline text-sm text-text-muted truncate max-w-[140px]">
            {company.name}
          </span>
        </div>

        <div className="flex items-center justify-center flex-1 min-w-0 px-2">
          <TopBarIndicators />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher variant="compact" />
          <ThemeToggle />
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {(user?.name ?? "E").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            {user && <RoleBadge role={user.role} />}
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
