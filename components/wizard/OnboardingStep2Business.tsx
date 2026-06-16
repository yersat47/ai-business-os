"use client";

import { useTranslations } from "next-intl";
import { Store, ShoppingBag, Layers, Package, Briefcase, MoreHorizontal } from "lucide-react";
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
import { RadioCard } from "./RadioCard";
import { OnboardingTip } from "./OnboardingTip";

const businessTypes = [
  { value: "Retail Store (physical)", icon: <Store className="h-5 w-5" /> },
  { value: "Online Store (e-commerce)", icon: <ShoppingBag className="h-5 w-5" /> },
  { value: "Retail + Online", icon: <Layers className="h-5 w-5" /> },
  { value: "Wholesale", icon: <Package className="h-5 w-5" /> },
  { value: "Service Business", icon: <Briefcase className="h-5 w-5" /> },
  { value: "Other", icon: <MoreHorizontal className="h-5 w-5" /> },
];

const sizes = [
  "Solo (just me)",
  "2–5 people",
  "6–15 people",
  "16–30 people",
  "31–50 people",
  "50+ people",
];

export function OnboardingStep2Business() {
  const t = useTranslations("wizard.onboarding");
  const t2 = useTranslations("wizard.step2");
  const t3 = useTranslations("wizard.step3");
  const t4 = useTranslations("wizard.step4");
  const { wizardData, setStepData } = useWizardStore();

  return (
    <div className="max-w-lg space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t("step2Title")}</h2>
        <OnboardingTip text={t("step2Why")} gain={t("step2Gain")} />
      </div>

      <div className="grid gap-3">
        {businessTypes.map((opt) => (
          <RadioCard
            key={opt.value}
            label={opt.value}
            icon={opt.icon}
            selected={wizardData.businessType === opt.value}
            onClick={() => setStepData({ businessType: opt.value })}
          />
        ))}
      </div>

      <div>
        <Label className="mb-3 block">{t3("subtitle")}</Label>
        <div className="grid grid-cols-2 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setStepData({ size })}
              className={`p-3 rounded-xl border text-left text-xs transition-all ${
                wizardData.size === size
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-surface hover:border-border-bright"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">{t4("city")}</Label>
          <Input
            id="city"
            value={wizardData.city ?? ""}
            onChange={(e) => setStepData({ city: e.target.value })}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label>{t4("country")}</Label>
          <Select
            value={wizardData.country ?? "KZ"}
            onValueChange={(v) => setStepData({ country: v })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KZ">{t4("KZ")}</SelectItem>
              <SelectItem value="UZ">{t4("UZ")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
