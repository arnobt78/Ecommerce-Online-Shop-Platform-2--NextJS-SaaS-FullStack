// Language detection script that runs before React hydration
// This prevents the flicker by setting the correct language immediately

import { detectInitialLanguageSSR } from "@/lib/language-cookie";

export function detectAndSetInitialLanguage(): string {
  return detectInitialLanguageSSR();
}

// Set a global variable that can be accessed before React hydration
if (typeof window !== "undefined" && typeof document !== "undefined") {
  (window as any).__INITIAL_LANGUAGE__ = detectAndSetInitialLanguage();
}

export function getInitialLanguage(): string {
  if (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    (window as any).__INITIAL_LANGUAGE__
  ) {
    return (window as any).__INITIAL_LANGUAGE__;
  }
  return detectAndSetInitialLanguage();
}
