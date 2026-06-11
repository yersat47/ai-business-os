interface BrainCoverageBarProps {
  pct: number;
  label: string;
  count: number;
}

export function BrainCoverageBar({ pct, label, count }: BrainCoverageBarProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="text-text-muted">{count} items</span>
      </div>
      <div className="h-2 rounded-full bg-border overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
