import { ScoreRing } from "@/components/shared/ScoreRing";
import { BrainCoverageBar } from "./BrainCoverageBar";
import { MOCK_BRAIN } from "@/lib/mock/mock-brain";

export function BrainPreview() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col items-center">
        <ScoreRing
          score={MOCK_BRAIN.coveragePct}
          size="lg"
          animated
        />
        <p className="text-text-secondary mt-4">
          Brain coverage — {MOCK_BRAIN.coveragePct}% populated
        </p>
      </div>
      <div className="space-y-4">
        {MOCK_BRAIN.categories.map((cat) => (
          <BrainCoverageBar
            key={cat.name}
            label={cat.name}
            count={cat.count}
            pct={cat.pct}
          />
        ))}
      </div>
    </div>
  );
}
