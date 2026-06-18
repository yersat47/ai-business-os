"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWizardStore } from "@/lib/stores/wizard.store";

const tones = [
  { value: "Confident & Direct", key: "confident" },
  { value: "Warm & Friendly", key: "warm" },
  { value: "Professional & Formal", key: "professional" },
  { value: "Playful & Energetic", key: "playful" },
] as const;

export function Step11DNA() {
  const t = useTranslations("wizard.step11");
  const { wizardData, setStepData, nextStep } = useWizardStore();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <p className="text-text-secondary mb-2">{t("subtitle")}</p>
      <p className="text-xs text-text-muted mb-8">{t("hint")}</p>
      <div className="space-y-6">
        <div>
          <Label>{t("positioning")}</Label>
          <Textarea
            className="mt-1.5"
            value={wizardData.positioning ?? ""}
            onChange={(e) => setStepData({ positioning: e.target.value })}
            placeholder={t("positioningPlaceholder")}
          />
        </div>
        <div>
          <Label>{t("targetAudience")}</Label>
          <Input
            className="mt-1.5"
            value={wizardData.targetAudience ?? ""}
            onChange={(e) => setStepData({ targetAudience: e.target.value })}
            placeholder={t("targetAudiencePlaceholder")}
          />
        </div>
        <div>
          <Label>{t("toneOfVoice")}</Label>
          <Select
            value={wizardData.toneOfVoice ?? ""}
            onValueChange={(v) => setStepData({ toneOfVoice: v })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder={t("tonePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {tones.map((tone) => (
                <SelectItem key={tone.value} value={tone.value}>
                  {t(tone.key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>{t("competitors")}</Label>
          <Input
            className="mt-1.5"
            value={wizardData.competitors?.join(", ") ?? ""}
            onChange={(e) =>
              setStepData({
                competitors: e.target.value
                  .split(",")
                  .map((c) => c.trim())
                  .filter(Boolean),
              })
            }
            placeholder={t("competitorsPlaceholder")}
          />
        </div>
      </div>
      <Button variant="ghost" className="mt-6" onClick={() => nextStep()}>
        {t("skip")}
      </Button>
    </div>
  );
}
