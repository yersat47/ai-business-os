"use client";

import { Bell, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RoleBadge } from "./RoleBadge";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useCompanyStore } from "@/lib/stores/company.store";
import { useRouter } from "@/i18n/navigation";

interface TopBarProps {
  title: string;
  onMenuClick?: () => void;
}

export function TopBar({ title, onMenuClick }: TopBarProps) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const company = useCompanyStore((s) => s.company);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium text-text-primary">{title}</h1>
      </div>

      <div className="hidden sm:flex items-center gap-2">
        <Badge variant="accent">{company.name}</Badge>
        <Badge variant="outline">{company.industry}</Badge>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitcher variant="compact" />
        <Button variant="ghost" size="icon" className="text-text-secondary">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {(user?.name ?? "E").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            {user && <RoleBadge role={user.role} />}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
