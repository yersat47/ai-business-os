"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { persistLocale } from "@/lib/i18n/locale-storage";
import { glass } from "@/lib/glass.styles";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const langs: { code: Locale; label: string }[] = [
  { code: "kk", label: "Қаз" },
  { code: "ru", label: "Рус" },
  { code: "en", label: "Eng" },
];

export function LandingUI() {
  const t = useTranslations("landing.home");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    persistLocale(next);
    router.replace(pathname, { locale: next });
  };

  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 px-4">
        <motion.div className="text-center" {...fadeUp(0.1)}>
          <div style={glass.logoPill}>
            <h1
              className="text-3xl sm:text-[34px] font-light tracking-tight"
              style={{ color: "#EDE8E0" }}
            >
              AI Business OS
            </h1>
            <p
              className="text-[10px] tracking-[3px] uppercase mt-2"
              style={{ color: "rgba(201,150,58,0.75)" }}
            >
              {t("tagline")}
            </p>
          </div>
        </motion.div>

        <motion.div className="flex flex-wrap justify-center gap-3" {...fadeUp(0.3)}>
          <Link href="/login">
            <button
              type="button"
              className="px-10 py-3 rounded-lg font-medium transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "#C9963A",
                color: "#06060E",
                fontSize: "13px",
              }}
            >
              {t("login")}
            </button>
          </Link>
          <Link href="/register">
            <button
              type="button"
              className="px-10 py-3 rounded-lg transition-all hover:bg-white/5 active:scale-95"
              style={{
                border: "0.5px solid rgba(201,150,58,0.45)",
                color: "#C9963A",
                fontSize: "13px",
              }}
            >
              {t("register")}
            </button>
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.5)}>
          <Link href="/join-company">
            <span
              className="text-xs transition-colors hover:opacity-70 cursor-pointer"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {t("employeeText")}{" "}
              <span
                className="underline"
                style={{ color: "rgba(201,150,58,0.55)" }}
              >
                {t("employeeLink")}
              </span>
            </span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 right-6 z-10 flex gap-2"
        {...fadeUp(0.6)}
      >
        {langs.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => switchLocale(lang.code)}
            className="text-[11px] px-3 py-1.5 rounded-full transition-all"
            style={{
              border:
                locale === lang.code
                  ? "0.5px solid rgba(201,150,58,0.5)"
                  : "0.5px solid rgba(255,255,255,0.1)",
              color:
                locale === lang.code ? "#C9963A" : "rgba(255,255,255,0.3)",
              background:
                locale === lang.code
                  ? "rgba(201,150,58,0.08)"
                  : "transparent",
            }}
          >
            {lang.label}
          </button>
        ))}
      </motion.div>
    </>
  );
}
