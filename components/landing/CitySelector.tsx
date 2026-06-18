"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { CITIES } from "@/lib/cities.config";
import { useCityStore } from "@/lib/stores/city.store";
import type { Locale } from "@/i18n/routing";

export function CitySelector() {
  const { selectedCity, setCity } = useCityStore();
  const locale = useLocale() as Locale;
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const displayCityId = hoveredCity ?? selectedCity;
  const displayName = CITIES.find((c) => c.id === displayCityId)?.name[locale];

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.span
        className="text-xs tracking-[2px] uppercase min-h-[1rem]"
        style={{ color: "rgba(201,150,58,0.7)" }}
        animate={{ opacity: displayName ? 1 : 0.6 }}
      >
        {displayName}
      </motion.span>

      <div className="flex items-center gap-3">
        {CITIES.map((city) => {
          const isActive = selectedCity === city.id;
          const isHovered = hoveredCity === city.id;

          return (
            <motion.button
              key={city.id}
              type="button"
              aria-label={city.name[locale]}
              onClick={() => setCity(city.id)}
              onMouseEnter={() => setHoveredCity(city.id)}
              onMouseLeave={() => setHoveredCity(null)}
              className="relative flex items-center justify-center h-4 w-4"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              {isActive && (
                <motion.div
                  className="absolute rounded-full border"
                  style={{
                    width: 16,
                    height: 16,
                    borderColor: "rgba(201,150,58,0.5)",
                  }}
                  layoutId="city-ring"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <motion.div
                className="rounded-full"
                style={{
                  width: isActive ? 6 : 4,
                  height: isActive ? 6 : 4,
                  background: isActive
                    ? "#C9963A"
                    : isHovered
                      ? "rgba(201,150,58,0.6)"
                      : "rgba(255,255,255,0.3)",
                }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
