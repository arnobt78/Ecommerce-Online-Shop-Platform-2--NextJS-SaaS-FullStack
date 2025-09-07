import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { LanguageProvider } from "../context/LanguageContextNew";
import { QueryProvider } from "../context/QueryProvider";
import LayoutWithConditionalNavbar from "@/components/DashboardPage/LayoutWithConditionalNavbar";
import { StaticDataPreloader } from "@/components/StaticDataPreloader";
import { I18nProvider } from "@/components/I18nProvider";

export const metadata: Metadata = {
  title: {
    default: "Snuzz Pro - Premium Nicotine Pouches & Snus Online Store",
    template: "%s | Snuzz Pro",
  },
  description:
    "Never run out of snus again! Shop premium nicotine pouches from top brands like Klint, Velo, Loop, and Zyn. Choose from huge assortment of exclusive flavors, strengths, and nicotine levels. Best prices on market with free shipping. 4.47★ rating from 537+ reviews.",
  keywords: [
    "nicotine pouches",
    "snus",
    "snuff",
    "tobacco-free",
    "Klint",
    "Velo",
    "Loop",
    "Zyn",
    "arctic mint",
    "ice cool",
    "jalapeno lime",
    "citrus",
    "nicotine pouches online",
    "snus shop",
    "free shipping",
    "best price",
    "premium snus",
    "tobacco alternative",
    "nicotine pouches Europe",
    "snus delivery",
    "online nicotine shop",
  ],
  authors: [{ name: "Snuzz Pro Team" }],
  creator: "Snuzz Pro",
  publisher: "Snuzz Pro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Snuzz Pro",
    url: "https://snuzz-pro.vercel.app",
    logo: "https://snuzz-pro.vercel.app/logo.svg",
    description:
      "Premium nicotine pouches and snus online store with huge assortment of exclusive brands, flavors, and strengths. Best prices on market with free shipping.",
    foundingDate: "2025",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://snuzz-pro.vercel.app/contact",
    },
    sameAs: [
      "https://twitter.com/snuzzpro",
      "https://facebook.com/snuzzpro",
      "https://instagram.com/snuzzpro",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "EU",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "EUR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "EU",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.47",
      reviewCount: "537",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Nicotine Pouches & Snus",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Klint Arctic Mint",
            brand: "Klint",
            description:
              "A refreshing mint flavor with a cool sensation. Perfect for those who want a clean, crisp taste.",
            category: "Nicotine Pouches",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Velo Ice Cool",
            brand: "Velo",
            description:
              "Intense cooling effect with a strong nicotine kick. For experienced users.",
            category: "Nicotine Pouches",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Loop Jalapeno Lime",
            brand: "Loop",
            description: "A spicy and tangy blend for adventurous taste buds.",
            category: "Nicotine Pouches",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Zyn Citrus Mini",
            brand: "Zyn",
            description:
              "Bright citrus notes in a mini format. Great for beginners.",
            category: "Nicotine Pouches",
          },
        },
      ],
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Language detection script that runs before React hydration
              (function() {
                function detectAndSetInitialLanguage() {
                  if (typeof window === "undefined") return "en";
                  
                  // Try to get from localStorage first
                  var savedLanguage = localStorage.getItem("selectedLanguage");
                  if (savedLanguage && ["en", "pl", "ru"].includes(savedLanguage)) {
                    return savedLanguage;
                  }
                  
                  // Fallback to browser language detection
                  var browserLang = navigator.language.toLowerCase();
                  if (browserLang.startsWith("pl")) return "pl";
                  if (browserLang.startsWith("ru")) return "ru";
                  
                  return "en";
                }
                
                // Set the initial language immediately
                var initialLang = detectAndSetInitialLanguage();
                window.__INITIAL_LANGUAGE__ = initialLang;
                
                // Also set it in i18next if available
                if (window.i18next) {
                  window.i18next.changeLanguage(initialLang);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className="antialiased bg-white"
        style={{ fontFamily: "system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        <I18nProvider>
          <LanguageProvider>
            <QueryProvider>
              <StaticDataPreloader />
              <CartProvider>
                <LayoutWithConditionalNavbar>
                  {children}
                </LayoutWithConditionalNavbar>
              </CartProvider>
            </QueryProvider>
          </LanguageProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
