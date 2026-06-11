"use client";

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
  "Confident & Direct",
  "Warm & Friendly",
  "Professional & Formal",
  "Playful & Energetic",
];

export function Step11DNA() {
  const { wizardData, setStepData, nextStep } = useWizardStore();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-2">Company DNA</h2>
      <p className="text-text-secondary mb-2">
        Now let&apos;s capture your brand identity.
      </p>
      <p className="text-xs text-text-muted mb-8">
        This powers how AI agents communicate for your company.
      </p>
      <div className="space-y-6">
        <div>
          <Label>Brand Positioning</Label>
          <Textarea
            className="mt-1.5"
            value={wizardData.positioning ?? ""}
            onChange={(e) => setStepData({ positioning: e.target.value })}
            placeholder="e.g. Accessible urban fashion for young professionals in Kazakhstan"
          />
        </div>
        <div>
          <Label>Target Audience</Label>
          <Input
            className="mt-1.5"
            value={wizardData.targetAudience ?? ""}
            onChange={(e) => setStepData({ targetAudience: e.target.value })}
            placeholder="e.g. Women 22–35, Astana, middle income"
          />
        </div>
        <div>
          <Label>Tone of Voice</Label>
          <Select
            value={wizardData.toneOfVoice ?? ""}
            onValueChange={(v) => setStepData({ toneOfVoice: v })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {tones.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Top Competitors</Label>
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
            placeholder="e.g. ZARA KZ, LC Waikiki"
          />
        </div>
      </div>
      <Button variant="ghost" className="mt-6" onClick={() => nextStep()}>
        I&apos;ll add this later
      </Button>
    </div>
  );
}
