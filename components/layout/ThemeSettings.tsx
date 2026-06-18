"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

const themes = [
  { value: "dark", icon: Moon },
  { value: "light", icon: Sun },
  { value: "system", icon: Monitor },
] as const;

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("settings.appearance");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 rounded-xl bg-surface animate-pulse" />;
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{t("title")}</p>
      <div className="flex flex-col gap-2">
        {themes.map(({ value, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors text-left",
              theme === value
                ? "border-accent/50 bg-accent/10 text-text-primary"
                : "border-border bg-surface hover:border-border-bright"
            )}
          >
            <Icon size={16} className="text-accent shrink-0" />
            <span>{t(value)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
