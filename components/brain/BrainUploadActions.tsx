"use client";

import { FileText, GitBranch, CheckCircle, Pin, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const actions = [
  { key: "document", icon: FileText },
  { key: "process", icon: GitBranch },
  { key: "decision", icon: CheckCircle },
  { key: "rule", icon: Pin },
] as const;

export function BrainUploadActions() {
  const t = useTranslations("brain.uploadActions");
  const tMock = useTranslations("mock.brain");

  const handleClick = (key: string) => {
    toast({
      title: t(`${key}.label`),
      description: t("toastDesc"),
    });
  };

  return (
    <div className="space-y-4">
      <label className="flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 text-sm font-medium text-accent md:hidden">
        <Upload className="h-5 w-5" />
        {tMock("tapToChoose")}
        <input
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
          className="sr-only"
          onChange={() => handleClick("document")}
        />
      </label>
      {actions.map(({ key, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => handleClick(key)}
          className="w-full rounded-xl border border-border bg-surface p-4 text-left transition-all duration-300 hover:border-accent md:p-5 md:hover:scale-[1.01]"
        >
          <div className="flex min-h-[44px] gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <Icon className="h-5 w-5 text-accent" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm mb-1">{t(`${key}.label`)}</p>
              <p className="text-xs text-text-secondary mb-1">
                {t(`${key}.description`)}
              </p>
              <p className="hidden text-xs text-text-muted sm:block">{t(`${key}.example`)}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
