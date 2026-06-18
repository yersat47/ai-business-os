import type { Locale } from "@/i18n/routing";

const STORAGE_KEY = "ai-bos-locale";

export function persistLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, locale);
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  }
}

export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "ru" || stored === "kk" || stored === "en") {
    return stored;
  }
  return null;
}
