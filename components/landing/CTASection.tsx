"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const t = useTranslations("landing.cta");

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">{t("heading")}</h2>
        <p className="text-text-secondary text-lg mb-10">{t("subtitle")}</p>
        <Button variant="bronze" size="lg" asChild>
          <Link href="/register">{t("button")}</Link>
        </Button>
        <footer className="mt-20 pt-8 border-t border-border text-text-muted text-sm">
          {t("copyright")}
        </footer>
      </div>
    </section>
  );
}
