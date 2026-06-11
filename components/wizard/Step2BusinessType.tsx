"use client";

import { Store, ShoppingBag, Layers, Package, Briefcase, MoreHorizontal } from "lucide-react";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { RadioCard } from "./RadioCard";

const options = [
  { value: "Retail Store (physical)", icon: <Store className="h-5 w-5" /> },
  { value: "Online Store (e-commerce)", icon: <ShoppingBag className="h-5 w-5" /> },
  { value: "Retail + Online", icon: <Layers className="h-5 w-5" /> },
  { value: "Wholesale", icon: <Package className="h-5 w-5" /> },
  { value: "Service Business", icon: <Briefcase className="h-5 w-5" /> },
  { value: "Other", icon: <MoreHorizontal className="h-5 w-5" /> },
];

export function Step2BusinessType() {
  const { wizardData, setStepData } = useWizardStore();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">Business Type</h2>
      <p className="text-text-secondary mb-8">How does your business operate?</p>
      <div className="grid gap-3">
        {options.map((opt) => (
          <RadioCard
            key={opt.value}
            label={opt.value}
            icon={opt.icon}
            selected={wizardData.businessType === opt.value}
            onClick={() => setStepData({ businessType: opt.value })}
          />
        ))}
      </div>
    </div>
  );
}
