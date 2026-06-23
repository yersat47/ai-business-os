"use client";

import { FileText, BarChart3, GitBranch } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const typeIcons: Record<string, React.ElementType> = {
  document: FileText,
  report: BarChart3,
  process: GitBranch,
};

interface DocumentCardProps {
  itemId: string;
  type: string;
  date: string;
  categoryId: string;
}

export function DocumentCard({
  itemId,
  type,
  date,
  categoryId,
}: DocumentCardProps) {
  const t = useTranslations("mock.brain");
  const Icon = typeIcons[type] ?? FileText;

  return (
    <div className="rounded-xl border border-border bg-surface p-3 transition-colors hover:border-border-bright md:p-4">
      <div className="flex min-h-[52px] items-center gap-3 md:items-start">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{t(`items.${itemId}`)}</h4>
          <div className="mt-2 flex min-w-0 items-center gap-2">
            <Badge variant="outline" className="text-[10px]">
              {t(`itemCategories.${categoryId}`)}
            </Badge>
            <span className="truncate text-[10px] text-text-muted">{date}</span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="mt-3 hidden min-h-[44px] w-full md:inline-flex"
        onClick={() =>
          toast({
            title: t("documentPreview"),
            description: t("documentPreviewDesc"),
          })
        }
      >
        {t("view")}
      </Button>
    </div>
  );
}
