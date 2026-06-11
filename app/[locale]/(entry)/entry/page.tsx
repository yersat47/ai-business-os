"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EntryPage() {
  const t = useTranslations("onboarding.entry");

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{t("heading")}</h1>
          <p className="text-text-secondary text-lg">{t("subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-surface p-8 hover:border-accent transition-colors">
            <Building2 className="h-10 w-10 text-accent mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t("createTitle")}</h2>
            <p className="text-text-secondary text-sm mb-6">{t("createDesc")}</p>
            <Button variant="bronze" asChild className="w-full">
              <Link href="/create-company">{t("createButton")}</Link>
            </Button>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-8 hover:border-accent transition-colors">
            <Users className="h-10 w-10 text-accent mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t("joinTitle")}</h2>
            <p className="text-text-secondary text-sm mb-6">{t("joinDesc")}</p>
            <Button variant="outline" asChild className="w-full">
              <Link href="/join-company">{t("joinButton")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
