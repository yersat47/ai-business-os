"use client";

import { useTranslations } from "next-intl";
import {
  Store,
  ShoppingBag,
  UtensilsCrossed,
  Sparkles,
  Package,
  Briefcase,
  MoreHorizontal,
} from "lucide-react";
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
import {
  BUSINESS_TYPE_KEYS,
  SIZE_KEYS,
  employeeCountFromSize,
  type BusinessTypeKey,
  type SizeKey,
} from "@/lib/utils/wizard-helpers";

const businessTypeIcons: Record<BusinessTypeKey, React.ReactNode> = {
  fashionRetail: <Store className="h-5 w-5" />,
  beautyAndSpa: <Sparkles className="h-5 w-5" />,
  foodAndCafe: <UtensilsCrossed className="h-5 w-5" />,
  ecommerce: <ShoppingBag className="h-5 w-5" />,
  services: <Briefcase className="h-5 w-5" />,
  wholesale: <Package className="h-5 w-5" />,
  other: <MoreHorizontal className="h-5 w-5" />,
};

export function OnboardingStep2Business() {
  const t = useTranslations("onboarding.businessType");
  const tOnb = useTranslations("wizard.onboarding");
  const t3 = useTranslations("wizard.step3");
  const t4 = useTranslations("wizard.step4");
  const { wizardData, setStepData } = useWizardStore();

  const handleSizeSelect = (size: SizeKey) => {
    setStepData({
      size,
      employeeCount: employeeCountFromSize(size),
    });
  };

  return (
    <div className="max-w-lg space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
        <p className="text-text-secondary text-sm mb-4">{t("subtitle")}</p>
        <OnboardingTip text={tOnb("step2Why")} gain={tOnb("step2Gain")} />
      </div>

      <div className="grid gap-3">
        {BUSINESS_TYPE_KEYS.map((key) => (
          <RadioCard
            key={key}
            label={t(key)}
            icon={businessTypeIcons[key]}
            selected={wizardData.businessType === key}
            onClick={() => setStepData({ businessType: key })}
          />
        ))}
      </div>

      <div>
        <Label className="mb-3 block">{t3("subtitle")}</Label>
        <div className="grid grid-cols-2 gap-2">
          {SIZE_KEYS.map((sizeKey) => (
            <button
              key={sizeKey}
              type="button"
              onClick={() => handleSizeSelect(sizeKey)}
              className={`p-3 rounded-xl border text-left text-xs transition-all ${
                wizardData.size === sizeKey
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-surface hover:border-border-bright"
              }`}
            >
              {t3(sizeKey)}
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
