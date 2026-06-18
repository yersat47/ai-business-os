"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EntryPage() {
  const t = useTranslations("onboarding.entry");

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 md:p-6">
      <div className="max-w-3xl w-full">
        <div className="mb-8 text-center md:mb-12">
          <h1 className="mb-3 text-2xl font-bold md:text-3xl">{t("heading")}</h1>
          <p className="text-base text-text-secondary md:text-lg">{t("subtitle")}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent md:p-8">
            <Building2 className="h-10 w-10 text-accent mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t("createTitle")}</h2>
            <p className="text-text-secondary text-sm mb-6">{t("createDesc")}</p>
            <Button variant="bronze" asChild className="min-h-[52px] w-full">
              <Link href="/create-company">{t("createButton")}</Link>
            </Button>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent md:p-8">
            <Users className="h-10 w-10 text-accent mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t("joinTitle")}</h2>
            <p className="text-text-secondary text-sm mb-6">{t("joinDesc")}</p>
            <Button variant="outline" asChild className="min-h-[52px] w-full">
              <Link href="/join-company">{t("joinButton")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
