"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCompanyStore } from "@/lib/stores/company.store";
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/utils/formatters";
import { RoleAwareHint } from "@/components/wizard/RoleAwareHint";
import { cn } from "@/lib/utils/cn";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const sectionKeys = [
  "revenue",
  "marketing",
  "inventory",
  "finance",
  "team",
] as const;

export function DataCenterGuided() {
  const t = useTranslations("dataCenter.guided");
  const company = useCompanyStore((s) => s.company);
  const updateCompany = useCompanyStore((s) => s.updateCompany);
  const [openSection, setOpenSection] = useState<string>("revenue");
  const [filledSections, setFilledSections] = useState<Set<string>>(
    new Set(["revenue"])
  );
  const [saving, setSaving] = useState(false);

  const progress = filledSections.size;
  const total = sectionKeys.length;

  const toggle = (key: string) => {
    setOpenSection(openSection === key ? "" : key);
  };

  const markFilled = (key: string) => {
    setFilledSections((prev) => new Set([...prev, key]));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    toast({ title: t("saved"), description: t("savedDesc") });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-text-secondary mb-2">
          {t("progress", { done: progress, total })}
        </p>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: `${(progress / total) * 100}%` }}
          />
        </div>
        <p className="text-xs text-accent mt-2">{t("impact")}</p>
      </div>

      <div className="space-y-3">
        {sectionKeys.map((key) => (
          <div
            key={key}
            className="rounded-xl border border-border bg-surface overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(key)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-raised transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{t(`sections.${key}.title`)}</span>
                <Tooltip>
                  <TooltipTrigger onClick={(e) => e.stopPropagation()}>
                    <HelpCircle className="h-4 w-4 text-text-muted" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    {t(`sections.${key}.why`)}
                  </TooltipContent>
                </Tooltip>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openSection === key && "rotate-180"
                )}
              />
            </button>

            {openSection === key && (
              <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
                <p className="text-sm text-text-secondary">
                  {t(`sections.${key}.explanation`)}
                </p>
                {key === "marketing" && (
                  <RoleAwareHint section="marketing" teamRoles={company.teamRoles} />
                )}
                {key === "finance" && (
                  <RoleAwareHint section="financial" teamRoles={company.teamRoles} />
                )}

                {key === "revenue" && (
                  <div className="grid gap-4">
                    <div>
                      <Label>{t("fields.monthlyRevenue")}</Label>
                      <Input
                        className="mt-1 font-mono"
                        value={
                          company.monthlyRevenue
                            ? formatCurrencyInput(company.monthlyRevenue)
                            : ""
                        }
                        onChange={(e) =>
                          updateCompany({
                            monthlyRevenue: parseCurrencyInput(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => markFilled(key)}
                >
                  {t("markComplete")}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="bronze"
        className="w-full mt-8"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("save")}
      </Button>
    </div>
  );
}
