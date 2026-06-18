"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { DataSectionConfig } from "@/lib/types/data-center.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataField } from "./DataField";
import { useDataCenterStore } from "@/lib/stores/data-center.store";
import { toast } from "@/hooks/use-toast";

interface DataSectionProps {
  config: DataSectionConfig;
  icon: React.ReactNode;
}

export function DataSection({ config, icon }: DataSectionProps) {
  const t = useTranslations("data");
  const tCenter = useTranslations("data.center.sections");
  const [isOpen, setIsOpen] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const isComplete = useDataCenterStore((s) => s.isSectionComplete(config.id));
  const setFieldValue = useDataCenterStore((s) => s.setFieldValue);
  const getFieldValue = useDataCenterStore((s) => s.getFieldValue);
  const saveSection = useDataCenterStore((s) => s.saveSection);

  const title = tCenter(`${config.id}.title` as "finance.title");
  const description = tCenter(`${config.id}.description` as "finance.description");

  const handleSave = () => {
    saveSection(config.id);
    setJustSaved(true);
    toast({ title: t("saved"), description: t("savedDesc") });
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-surface">
      <div className="flex items-center justify-between p-4 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-surface-raised flex items-center justify-center shrink-0 text-accent">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-medium truncate">{title}</h3>
            <p className="text-xs text-text-muted truncate">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isComplete ? (
            <Badge className="bg-success/20 text-success border-0">
              {t("complete")}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-text-muted">
              {t("incomplete")}
            </Badge>
          )}
          <Button
            size="sm"
            variant={isOpen ? "secondary" : "default"}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? t("collapse") : t("fillNow")}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {config.fieldKeys.map((field) => (
            <DataField
              key={field.id}
              field={field}
              value={getFieldValue(config.id, field.id)}
              onChange={(v) => setFieldValue(config.id, field.id, v)}
            />
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="bronze" onClick={handleSave} disabled={justSaved}>
              {justSaved ? `✓ ${t("saved")}` : t("save")}
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              {t("cancel")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
