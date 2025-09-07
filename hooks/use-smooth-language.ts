"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContextNew";

export function useSmoothLanguage() {
  const { language, isHydrated } = useLanguage();
  const [displayLanguage, setDisplayLanguage] = useState<typeof language>("en");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isHydrated && displayLanguage !== language) {
      setIsTransitioning(true);

      // Small delay to allow for smooth transition
      const timer = setTimeout(() => {
        setDisplayLanguage(language);
        setIsTransitioning(false);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [language, isHydrated, displayLanguage]);

  return {
    displayLanguage,
    isTransitioning,
    isHydrated,
  };
}
