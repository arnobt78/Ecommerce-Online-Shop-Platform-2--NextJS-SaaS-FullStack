"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
// import i18n from "@/lib/i18n";
import { getInitialLanguage } from "@/lib/language-detection";

export type Language = "en" | "pl" | "de" | "cs";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Helper function to detect user's preferred language
function detectUserLanguage(): Language {
  return getInitialLanguage() as Language;
}

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: string;
}) {
  const { i18n: i18nInstance, t: i18nT } = useTranslation();
  const [isHydrated, setIsHydrated] = useState(false);

  // Always use SSR initialLanguage for first render
  const [language, setLanguageState] = useState<Language>(() => {
    if (initialLanguage && ["en", "pl", "de", "cs"].includes(initialLanguage)) {
      return initialLanguage as Language;
    }
    // Fallback to detected language only if SSR did not provide one
    return getInitialLanguage() as Language;
  });

  // Memoize the current language to prevent unnecessary re-renders
  const currentLanguage = useMemo(() => {
    // Always use SSR initialLanguage for first render
    return language;
  }, [language]);

  useEffect(() => {
    // Only detect and change language after hydration (run once)
    if (typeof window !== "undefined") {
      setIsHydrated(true);
      // After hydration, allow localStorage/browser detection
      const savedLanguage = localStorage.getItem(
        "selectedLanguage"
      ) as Language;
      if (
        savedLanguage &&
        ["en", "pl", "de", "cs"].includes(savedLanguage) &&
        savedLanguage !== language
      ) {
        setLanguageState(savedLanguage);
        i18nInstance.changeLanguage(savedLanguage);
      }
    }
    // Only run once after mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18nInstance]);

  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem("selectedLanguage", language);
      i18nInstance.changeLanguage(language);
    }
  }, [language, isHydrated, i18nInstance]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Immediately update i18n to prevent flicker
    i18nInstance.changeLanguage(lang);
    // Set cookie for SSR consistency
    if (typeof document !== "undefined") {
      try {
        document.cookie = `selectedLanguage=${lang}; path=/; max-age=31536000`;
      } catch (e) {}
    }
  };

  // Enhanced translation function with interpolation
  const t = (key: string, params?: Record<string, string | number>): string => {
    // Always use SSR initialLanguage for first render
    const currentLang = language || i18nInstance.language;
    const resourceBundle = i18nInstance.getResourceBundle(
      currentLang,
      "translation"
    );
    return resourceBundle[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language: currentLanguage,
        setLanguage,
        t,
        isHydrated,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
