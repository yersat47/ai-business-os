"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/formatters";

interface CurrencyDisplayProps {
  amount: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  animated?: boolean;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

export function CurrencyDisplay({
  amount,
  currency = "₸",
  size = "md",
  color = "text-accent",
  animated = false,
}: CurrencyDisplayProps) {
  const [display, setDisplay] = useState(animated ? 0 : amount);

  useEffect(() => {
    if (!animated) {
      setDisplay(amount);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(amount * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [amount, animated]);

  return (
    <span
      className={cn("font-mono font-bold tabular-nums", sizeClasses[size], color)}
    >
      {formatCurrency(display, currency)}
    </span>
  );
}
