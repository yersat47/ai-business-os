"use client";

import { useTranslations } from "next-intl";
import { Store, ShoppingBag, Layers, Package, Briefcase, MoreHorizontal } from "lucide-react";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { RadioCard } from "./RadioCard";

const options = [
  { value: "Retail Store (physical)", key: "retailStore", icon: <Store className="h-5 w-5" /> },
  { value: "Online Store (e-commerce)", key: "onlineStore", icon: <ShoppingBag className="h-5 w-5" /> },
  { value: "Retail + Online", key: "retailOnline", icon: <Layers className="h-5 w-5" /> },
  { value: "Wholesale", key: "wholesale", icon: <Package className="h-5 w-5" /> },
  { value: "Service Business", key: "serviceBusiness", icon: <Briefcase className="h-5 w-5" /> },
  { value: "Other", key: "other", icon: <MoreHorizontal className="h-5 w-5" /> },
] as const;

export function Step2BusinessType() {
  const t = useTranslations("wizard.step2");
  const { wizardData, setStepData } = useWizardStore();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <p className="text-text-secondary mb-8">{t("subtitle")}</p>
      <div className="grid gap-3">
        {options.map((opt) => (
          <RadioCard
            key={opt.value}
            label={t(opt.key)}
            icon={opt.icon}
            selected={wizardData.businessType === opt.value}
            onClick={() => setStepData({ businessType: opt.value })}
          />
        ))}
      </div>
    </div>
  );
}
