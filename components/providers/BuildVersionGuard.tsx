"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const STORAGE_KEY = "ai-bos-build-version";

export function BuildVersionGuard() {
  const t = useTranslations("common");
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkVersion() {
      try {
        const res = await fetch(
          `${basePath}/build-version.txt?_=${Date.now()}`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const text = await res.text();
        const match = text.match(/build=(.+)/);
        const remote = match?.[1]?.trim();
        if (!remote || cancelled) return;

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && stored !== remote) {
          setShowUpdate(true);
        }
        localStorage.setItem(STORAGE_KEY, remote);
      } catch {
        // ignore network errors
      }
    }

    checkVersion();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!showUpdate) return null;

  const handleRefresh = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(Date.now()));
    window.location.replace(url.toString());
  };

  return (
    <div className="fixed inset-x-0 top-0 z-[100] border-b border-accent/40 bg-accent/95 px-4 py-2 text-center text-sm text-white shadow-lg">
      <span className="mr-3">{t("newVersionAvailable")}</span>
      <Button
        size="sm"
        variant="secondary"
        className="h-8 min-h-0 bg-white/20 text-white hover:bg-white/30"
        onClick={handleRefresh}
      >
        {t("refreshPage")}
      </Button>
    </div>
  );
}
