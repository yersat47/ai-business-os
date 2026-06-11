"use client";

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

export function Step4City() {
  const { wizardData, setStepData } = useWizardStore();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">Location</h2>
      <p className="text-text-secondary mb-8">Where is your business based?</p>
      <div className="space-y-6">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={wizardData.city ?? ""}
            onChange={(e) => setStepData({ city: e.target.value })}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label>Country</Label>
          <Select
            value={wizardData.country ?? "KZ"}
            onValueChange={(v) => setStepData({ country: v })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KZ">Kazakhstan</SelectItem>
              <SelectItem value="UZ">Uzbekistan</SelectItem>
              <SelectItem value="KG">Kyrgyzstan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Currency</Label>
          <Select
            value={wizardData.currency ?? "₸"}
            onValueChange={(v) => setStepData({ currency: v })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="₸">₸ KZT</SelectItem>
              <SelectItem value="$">$ USD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
