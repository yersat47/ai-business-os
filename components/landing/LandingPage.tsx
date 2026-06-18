"use client";

import { CitySelector } from "./CitySelector";
import { LandingUI } from "./LandingUI";

export function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <LandingUI />

      <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 sm:bottom-8">
        <CitySelector />
      </div>
    </div>
  );
}
