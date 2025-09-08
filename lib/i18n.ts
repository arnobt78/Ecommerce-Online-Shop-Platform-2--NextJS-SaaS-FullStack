import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import { translations } from "./translations";
import { getInitialLanguage } from "./language-detection";

// Helper function to get the initial language
function getInitialLanguageForI18n(): string {
  // During SSR, always use English
  if (typeof window === "undefined") {
    return "en";
  }

  // On client-side, try to get from localStorage first
  try {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage && ["en", "pl", "de", "cs"].includes(savedLanguage)) {
      return savedLanguage;
    }
  } catch (e) {
    // localStorage might not be available
  }

  // Fallback to browser language detection
  return getInitialLanguage();
}

// Initialize i18next immediately and synchronously
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translations.en,
    },
    pl: {
      translation: translations.pl,
    },
    de: {
      translation: translations.de,
    },
    cs: {
      translation: translations.cs,
    },
  },
  lng: getInitialLanguageForI18n(), // Use detected language
  fallbackLng: "en",
  debug: process.env.NODE_ENV === "development",

  interpolation: {
    escapeValue: false, // React already does escaping
  },

  // React-specific optimizations
  react: {
    useSuspense: false, // Disable suspense for better SSR compatibility
  },

  // Ensure immediate initialization
  initImmediate: true,

  // Performance optimizations
  load: "languageOnly", // Only load language, not region
  cleanCode: true, // Clean language codes
});

export default i18n;
