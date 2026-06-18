"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { City } from "@/lib/cities.config";

interface CityBackgroundProps {
  city: City;
}

export function CityBackground({ city }: CityBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={city.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img
            src={city.image}
            alt={city.name.ru}
            className="w-full h-full object-cover object-center"
            style={{ imageRendering: "pixelated" }}
          />

          <div
            className="absolute inset-0"
            style={{ background: city.overlayColor }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(6,6,14,0.95) 0%, rgba(6,6,14,0.4) 40%, transparent 70%)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,6,14,0.7) 0%, transparent 25%)",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
