import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Supported languages
const supportedLanguages = ["en", "pl", "de", "cs"];

export function middleware(request: NextRequest) {
  // Read language from cookie
  const cookieLang = request.cookies.get("selectedLanguage")?.value;
  let lang = "en";
  if (cookieLang && supportedLanguages.includes(cookieLang)) {
    lang = cookieLang;
  } else {
    // Fallback: browser language
    const browserLang =
      request.headers.get("accept-language")?.toLowerCase() || "en";
    if (browserLang.startsWith("pl")) lang = "pl";
    else if (browserLang.startsWith("de")) lang = "de";
    else if (browserLang.startsWith("cs")) lang = "cs";
  }

  // Set header for SSR
  const response = NextResponse.next();
  response.headers.set("x-initial-language", lang);
  return response;
}

export const config = {
  matcher: "/:path*",
};
