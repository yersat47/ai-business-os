"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useCompanyStore } from "@/lib/stores/company.store";

export function useStoreHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let pending = 2;

    const markReady = () => {
      pending -= 1;
      if (pending <= 0) setHydrated(true);
    };

    if (useAuthStore.persist.hasHydrated()) {
      pending -= 1;
    } else {
      useAuthStore.persist.onFinishHydration(markReady);
    }

    if (useCompanyStore.persist.hasHydrated()) {
      pending -= 1;
    } else {
      useCompanyStore.persist.onFinishHydration(markReady);
    }

    if (pending <= 0) setHydrated(true);
  }, []);

  return hydrated;
}
