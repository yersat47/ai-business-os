"use client";

import { FileText, GitBranch, CheckCircle, Pin } from "lucide-react";
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

  const handleClick = (key: string) => {
    toast({
      title: t(`${key}.label`),
      description: t("toastDesc"),
    });
  };

  return (
    <div className="space-y-4">
      {actions.map(({ key, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => handleClick(key)}
          className="w-full text-left rounded-xl border border-border bg-surface p-5 hover:border-accent hover:scale-[1.01] transition-all duration-300"
        >
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-medium text-sm mb-1">{t(`${key}.label`)}</p>
              <p className="text-xs text-text-secondary mb-1">
                {t(`${key}.description`)}
              </p>
              <p className="text-xs text-text-muted">{t(`${key}.example`)}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
