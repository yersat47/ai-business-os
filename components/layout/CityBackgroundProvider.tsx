"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCityStore } from "@/lib/stores/city.store";
import { CITIES } from "@/lib/cities.config";
import { getBlurConfig } from "@/lib/utils/background-blur";
import { KazakhOrnament } from "./KazakhOrnament";

interface CityBackgroundProviderProps {
  children: React.ReactNode;
}

export function CityBackgroundProvider({ children }: CityBackgroundProviderProps) {
  const pathname = usePathname();
  const { selectedCity } = useCityStore();
  const city = CITIES.find((c) => c.id === selectedCity) ?? CITIES[0];
  const { blur, overlay, isLanding, fullCoverImage } = getBlurConfig(pathname);

  const imageStyle = fullCoverImage
    ? {
        width: "100%",
        height: "100vh",
        objectFit: "cover" as const,
        position: "fixed" as const,
        top: 0,
        left: 0,
        zIndex: -1,
        imageRendering: "pixelated" as const,
      }
    : {
        imageRendering: "pixelated" as const,
      };

  return (
    <div className="relative min-h-screen" style={{ background: "#06060E" }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={city.id}
          className={fullCoverImage ? "fixed inset-0" : "fixed inset-0 z-0"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={city.image}
            alt=""
            aria-hidden="true"
            className={fullCoverImage ? undefined : "w-full h-full object-cover object-center"}
            style={imageStyle}
          />
          <div
            className="absolute inset-0"
            style={{ background: city.overlayColor }}
          />
          {isLanding && (
            <>
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
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="fixed inset-0 z-[1]"
        animate={{
          backdropFilter: blur,
          WebkitBackdropFilter: blur,
          background: overlay,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {!isLanding && (
        <div
          className="fixed inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(6,6,14,0.95) 0%, rgba(6,6,14,0.2) 35%, transparent 60%)",
          }}
        />
      )}

      <KazakhOrnament />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
