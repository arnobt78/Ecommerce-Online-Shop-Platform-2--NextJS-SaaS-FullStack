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
import i18n from "@/lib/i18n";
import { getInitialLanguage } from "@/lib/language-detection";

export type Language = "en" | "pl" | "ru";

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n: i18nInstance, t: i18nT } = useTranslation();
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize with detected language to prevent flicker during navigation
  const [language, setLanguageState] = useState<Language>(() => {
    // During SSR, always use English to prevent hydration mismatch
    if (typeof window === "undefined") {
      return "en";
    }

    // On client-side, try to get the current language from i18n instance
    // This prevents flicker during navigation
    const currentLang = i18nInstance.language as Language;
    if (currentLang && ["en", "pl", "ru"].includes(currentLang)) {
      return currentLang;
    }

    // Fallback to detected language
    return detectUserLanguage();
  });

  // Memoize the current language to prevent unnecessary re-renders
  const currentLanguage = useMemo(() => {
    // During SSR, always use English
    if (typeof window === "undefined") {
      return "en";
    }

    // After hydration, use the current language state
    return isHydrated ? language : "en";
  }, [isHydrated, language]);

  useEffect(() => {
    // Only detect and change language if we're starting fresh (not during navigation)
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(
        "selectedLanguage"
      ) as Language;
      const currentI18nLang = i18nInstance.language as Language;

      // If we have a saved language and it's different from current i18n language
      if (savedLanguage && savedLanguage !== currentI18nLang) {
        setLanguageState(savedLanguage);
        i18nInstance.changeLanguage(savedLanguage);
      } else if (!savedLanguage) {
        // Only detect language if we don't have a saved one
        const detectedLang = detectUserLanguage();
        setLanguageState(detectedLang);
        i18nInstance.changeLanguage(detectedLang);
      }

      // Use requestAnimationFrame for smoother hydration timing
      // This helps avoid conflicts with browser extensions
      const rafId = requestAnimationFrame(() => {
        setIsHydrated(true);
      });

      return () => cancelAnimationFrame(rafId);
    }
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
  };

  // Enhanced translation function with interpolation
  const t = (key: string, params?: Record<string, string | number>): string => {
    // During SSR and before hydration, always use English to prevent mismatch
    if (!isHydrated || typeof window === "undefined") {
      const resourceBundle = i18nInstance.getResourceBundle(
        "en",
        "translation"
      );
      return resourceBundle[key] || key;
    }

    // After hydration, use the current language state
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
      {isHydrated ? children : null}
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
