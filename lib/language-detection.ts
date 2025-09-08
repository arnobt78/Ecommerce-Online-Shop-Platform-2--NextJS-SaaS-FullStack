// Language detection script that runs before React hydration
// This prevents the flicker by setting the correct language immediately

export function detectAndSetInitialLanguage(): string {
  if (typeof window === "undefined") {
    return "en"; // Default for SSR
  }

  // Try to get from localStorage first
  try {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage && ["en", "pl", "de", "cs"].includes(savedLanguage)) {
      return savedLanguage;
    }
  } catch (e) {
    // localStorage might not be available
  }

  // Fallback to browser language detection
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("pl")) return "pl";
  if (browserLang.startsWith("de")) return "de";
  if (browserLang.startsWith("cs")) return "cs";

  return "en"; // Default fallback
}

// Set a global variable that can be accessed before React hydration
if (typeof window !== "undefined") {
  (window as any).__INITIAL_LANGUAGE__ = detectAndSetInitialLanguage();
}

export function getInitialLanguage(): string {
  if (typeof window !== "undefined" && (window as any).__INITIAL_LANGUAGE__) {
    return (window as any).__INITIAL_LANGUAGE__;
  }
  return detectAndSetInitialLanguage();
}
