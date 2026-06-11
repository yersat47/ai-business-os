"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { persistLocale } from "@/lib/i18n/locale-storage";
import { cn } from "@/lib/utils/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Globe } from "lucide-react";

const localeOrder: Locale[] = ["ru", "kk", "en"];

const localeConfig: Record<Locale, { flag: string; labelKey: "ru" | "kk" | "en" }> = {
  ru: { flag: "🇷🇺", labelKey: "ru" },
  kk: { flag: "🇰🇿", labelKey: "kk" },
  en: { flag: "🇺🇸", labelKey: "en" },
};

interface LanguageSwitcherProps {
  variant?: "compact" | "full";
  className?: string;
}

export function LanguageSwitcher({
  variant = "compact",
  className,
}: LanguageSwitcherProps) {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    persistLocale(nextLocale);
    router.replace(pathname, { locale: nextLocale });
  };

  if (variant === "full") {
    return (
      <div className={cn("space-y-2", className)}>
        {localeOrder.map((loc) => {
          const { flag, labelKey } = localeConfig[loc];
          const isActive = loc === locale;
          return (
            <button
              key={loc}
              type="button"
              onClick={() => switchLocale(loc)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-colors",
                isActive
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-border bg-surface hover:bg-surface-raised text-text-secondary"
              )}
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{flag}</span>
                <span className="font-medium">{t(labelKey)}</span>
              </span>
              {isActive && <Check className="h-4 w-4" />}
            </button>
          );
        })}
      </div>
    );
  }

  const current = localeConfig[locale];

  return (
    <Select value={locale} onValueChange={(v) => switchLocale(v as Locale)}>
      <SelectTrigger
        className={cn(
          "h-8 w-auto gap-1.5 border-none bg-transparent px-2 text-text-secondary shadow-none focus:ring-0",
          className
        )}
      >
        <Globe className="h-4 w-4 shrink-0" />
        <SelectValue>
          <span className="hidden sm:inline text-xs">
            {current.flag} {t(current.labelKey)}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        {localeOrder.map((loc) => {
          const { flag, labelKey } = localeConfig[loc];
          return (
            <SelectItem key={loc} value={loc}>
              <span className="flex items-center gap-2">
                <span>{flag}</span>
                <span>{t(labelKey)}</span>
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
