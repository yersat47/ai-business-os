"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWizardStore } from "@/lib/stores/wizard.store";

export function Step1Identity() {
  const { wizardData, setStepData } = useWizardStore();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">Company Identity</h2>
      <p className="text-text-secondary mb-8">What&apos;s your company called?</p>
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Company Name *</Label>
          <Input
            id="name"
            value={wizardData.name ?? ""}
            onChange={(e) => setStepData({ name: e.target.value })}
            className="mt-1.5"
            placeholder="Urban Mode"
          />
        </div>
        <div>
          <Label htmlFor="tagline">Tagline / short description</Label>
          <Textarea
            id="tagline"
            value={wizardData.tagline ?? ""}
            onChange={(e) => setStepData({ tagline: e.target.value })}
            className="mt-1.5"
            maxLength={120}
            placeholder="Optional — one line about your business"
          />
          <p className="text-xs text-text-muted mt-1">
            {(wizardData.tagline?.length ?? 0)}/120
          </p>
        </div>
      </div>
    </div>
  );
}
