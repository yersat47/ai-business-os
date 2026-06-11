"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWizardStore } from "@/lib/stores/wizard.store";

const countries = ["KZ", "UZ", "KG"] as const;
const currencies = [
  { value: "₸", key: "KZT" },
  { value: "$", key: "USD" },
] as const;

export function Step4City() {
  const t = useTranslations("wizard.step4");
  const { wizardData, setStepData } = useWizardStore();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <p className="text-text-secondary mb-8">{t("subtitle")}</p>
      <div className="space-y-6">
        <div>
          <Label htmlFor="city">{t("city")}</Label>
          <Input
            id="city"
            value={wizardData.city ?? ""}
            onChange={(e) => setStepData({ city: e.target.value })}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label>{t("country")}</Label>
          <Select
            value={wizardData.country ?? "KZ"}
            onValueChange={(v) => setStepData({ country: v })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countries.map((code) => (
                <SelectItem key={code} value={code}>
                  {t(code)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>{t("currency")}</Label>
          <Select
            value={wizardData.currency ?? "₸"}
            onValueChange={(v) => setStepData({ currency: v })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((cur) => (
                <SelectItem key={cur.value} value={cur.value}>
                  {t(cur.key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
