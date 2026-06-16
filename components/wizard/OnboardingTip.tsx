interface OnboardingTipProps {
  text: string;
  gain: string;
}

export function OnboardingTip({ text, gain }: OnboardingTipProps) {
  return (
    <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 mt-4 mb-6">
      <p className="text-sm text-text-secondary leading-relaxed">{text}</p>
      <p className="text-sm text-accent mt-2">{gain}</p>
    </div>
  );
}
