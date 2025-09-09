// SSR-safe language detection using cookies
// Fallback to browser language or localStorage on client

export function getLanguageFromCookie(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|; )selectedLanguage=([^;]*)/);
  if (match && ["en", "pl", "de", "cs"].includes(match[1])) {
    return match[1];
  }
  return undefined;
}

export function setLanguageCookie(lang: string) {
  if (typeof document !== "undefined") {
    document.cookie = `selectedLanguage=${lang}; path=/; max-age=31536000`; // 1 year
  }
}

export function detectInitialLanguageSSR(): string {
  // SSR: try to get from cookie
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    const cookieLang = getLanguageFromCookie();
    if (cookieLang) return cookieLang;
    return "en";
  }
  // Client: check cookie, then localStorage, then browser language
  const cookieLang = getLanguageFromCookie();
  if (cookieLang) return cookieLang;
  try {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (
      savedLanguage &&
      typeof savedLanguage === "string" &&
      ["en", "pl", "de", "cs"].includes(savedLanguage)
    ) {
      return savedLanguage;
    }
  } catch (e) {}
  let browserLang = "en";
  if (typeof navigator !== "undefined" && navigator.language) {
    browserLang = navigator.language.toLowerCase();
  }
  if (browserLang.startsWith("pl")) return "pl";
  if (browserLang.startsWith("de")) return "de";
  if (browserLang.startsWith("cs")) return "cs";
  return "en";
}
