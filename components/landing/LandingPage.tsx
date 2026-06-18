"use client";

import { CitySelector } from "./CitySelector";
import { LandingUI } from "./LandingUI";

export function LandingPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <LandingUI />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <CitySelector />
      </div>
    </div>
  );
}
