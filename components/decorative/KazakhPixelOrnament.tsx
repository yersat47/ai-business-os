"use client";

import { COLORS } from "@/lib/design/tokens";

type Variant = "corner" | "divider" | "empty" | "hero" | "auth";

const OPACITY: Record<Variant, number> = {
  corner: 0.06,
  divider: 0.05,
  empty: 0.08,
  hero: 0.04,
  auth: 0.03,
};

const SIZE_STYLES: Record<Variant, React.CSSProperties> = {
  corner: { width: 80, height: 80 },
  divider: { width: "100%", height: 24 },
  empty: { width: 200, height: 200 },
  hero: { width: "100%", height: "100%", maxWidth: 480, maxHeight: 480 },
  auth: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  },
};

interface KazakhPixelOrnamentProps {
  variant: Variant;
  className?: string;
}

const SHANYRAK_PATTERN = [
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
] as const;

function PixelShanyrakSVG() {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
      preserveAspectRatio="xMidYMid meet"
    >
      {SHANYRAK_PATTERN.map((row, y) =>
        row.map((cell, x) =>
          cell === 1 ? (
            <rect
              key={`${x}-${y}`}
              x={x * 4}
              y={y * 4}
              width="4"
              height="4"
              fill="currentColor"
            />
          ) : null
        )
      )}
    </svg>
  );
}

function PixelDividerSVG() {
  return (
    <svg width="100%" height="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern
          id="pixel-shanyrak-tile"
          x="0"
          y="0"
          width="64"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <rect x="28" y="4" width="4" height="4" fill="currentColor" />
          <rect x="32" y="4" width="4" height="4" fill="currentColor" />
          <rect x="24" y="8" width="4" height="4" fill="currentColor" />
          <rect x="28" y="8" width="4" height="4" fill="currentColor" />
          <rect x="32" y="8" width="4" height="4" fill="currentColor" />
          <rect x="36" y="8" width="4" height="4" fill="currentColor" />
          <rect x="20" y="12" width="4" height="4" fill="currentColor" />
          <rect x="40" y="12" width="4" height="4" fill="currentColor" />
          <rect x="24" y="16" width="4" height="4" fill="currentColor" />
          <rect x="36" y="16" width="4" height="4" fill="currentColor" />
          <rect x="28" y="20" width="4" height="4" fill="currentColor" />
          <rect x="32" y="20" width="4" height="4" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="24" fill="url(#pixel-shanyrak-tile)" />
    </svg>
  );
}

export function KazakhPixelOrnament({
  variant,
  className,
}: KazakhPixelOrnamentProps) {
  return (
    <div
      className={className}
      style={{
        opacity: OPACITY[variant],
        color: COLORS.accent.bronze,
        pointerEvents: "none",
        userSelect: "none",
        ...SIZE_STYLES[variant],
      }}
      aria-hidden="true"
    >
      {variant === "divider" ? <PixelDividerSVG /> : <PixelShanyrakSVG />}
    </div>
  );
}
