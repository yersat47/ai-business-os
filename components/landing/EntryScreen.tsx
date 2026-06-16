"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ShanyrakArc } from "@/components/shared/ShanyrakArc";
import { type Locale } from "@/i18n/routing";
import { persistLocale } from "@/lib/i18n/locale-storage";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

const locales: { code: Locale; label: string }[] = [
  { code: "kk", label: "Қазақша" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

export function EntryScreen() {
  const t = useTranslations("landing.entry");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    persistLocale(next);
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background overflow-hidden">
      <ShanyrakArc className="absolute w-[min(90vw,640px)] h-[min(90vw,640px)] opacity-[0.05] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full"
      >
        <div className="flex items-center gap-2.5 mb-12">
          <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(201,150,58,0.5)]" />
          <span className="text-xl font-semibold tracking-tight text-text-primary">
            {tCommon("brand")}
          </span>
        </div>

        <div className="flex gap-2 mb-12">
          {locales.map((loc) => (
            <button
              key={loc.code}
              type="button"
              onClick={() => switchLocale(loc.code)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border",
                locale === loc.code
                  ? "bg-accent/15 border-accent text-accent"
                  : "bg-surface border-border text-text-secondary hover:border-border-bright hover:text-text-primary"
              )}
            >
              {loc.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button variant="outline" size="lg" className="flex-1 h-12" asChild>
            <Link href="/login">{t("signIn")}</Link>
          </Button>
          <Button variant="bronze" size="lg" className="flex-1 h-12" asChild>
            <Link href="/register">{t("register")}</Link>
          </Button>
        </div>

        <p className="mt-8 text-xs text-text-muted max-w-xs leading-relaxed">
          {t("tagline")}
        </p>
      </motion.div>
    </div>
  );
}
