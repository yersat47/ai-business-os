"use client";

import { CITIES } from "@/lib/cities.config";
import { useCityStore } from "@/lib/stores/city.store";
import { CityBackground } from "./CityBackground";
import { CitySelector } from "./CitySelector";
import { LandingUI } from "./LandingUI";

export function LandingPage() {
  const { selectedCity } = useCityStore();
  const city = CITIES.find((c) => c.id === selectedCity) ?? CITIES[0];

  return (
    <div
      className="relative w-full h-screen overflow-hidden fixed inset-0"
      style={{ background: "#06060E" }}
    >
      <CityBackground city={city} />
      <LandingUI />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <CitySelector />
      </div>
    </div>
  );
}
