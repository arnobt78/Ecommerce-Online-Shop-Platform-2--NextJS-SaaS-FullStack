import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import { translations } from "./translations";
import { getInitialLanguage } from "./language-detection";

// Helper function to get the initial language
function getInitialLanguageForI18n(): string {
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
  lng: getInitialLanguageForI18n(), // Use detected language (cookie/localStorage/browser)
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
