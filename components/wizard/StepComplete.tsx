"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWizardStore } from "@/lib/stores/wizard.store";
import { useCompanyStore } from "@/lib/stores/company.store";

export function StepComplete() {
  const t = useTranslations("wizard.complete");
  const router = useRouter();
  const { wizardData, completeWizard } = useWizardStore();
  const company = useCompanyStore((s) => s.company);

  useEffect(() => {
    completeWizard();
    const timer = setTimeout(() => router.push("/dashboard"), 4000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const name = wizardData.name || company.name;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute h-96 w-96 rounded-full border-2 border-accent/30"
      />
      <div className="relative z-10 text-center max-w-md px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="h-20 w-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto mb-8"
        >
          <Check className="h-10 w-10 text-accent" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-4">{t("heading", { name })}</h1>
        <ul className="text-left space-y-3 mb-10 text-text-secondary">
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            {t("healthScore")}
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            {t("agentTeam")}
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            {t("companyBrain")}
          </li>
        </ul>
        <Button variant="bronze" size="lg" onClick={() => router.push("/dashboard")}>
          {t("openDashboard")}
        </Button>
      </div>
    </div>
  );
}
