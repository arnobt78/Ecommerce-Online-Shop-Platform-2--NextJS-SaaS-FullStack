"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContextNew";

const languageOptions = [
  { code: "en" as Language, name: "English", flag: "🇬🇧" },
  { code: "pl" as Language, name: "Polski", flag: "🇵🇱" },
  { code: "de" as Language, name: "Deutsch", flag: "🇩🇪" },
  { code: "cs" as Language, name: "Čeština", flag: "🇨🇿" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    languageOptions.find((lang) => lang.code === language) ||
    languageOptions[0];

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 h-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.flag}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[140px] overflow-hidden">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => handleLanguageChange(option.code)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                  language === option.code
                    ? "bg-[#3AF0F7]/10 text-[#3AF0F7]"
                    : "text-gray-700"
                }`}
              >
                <span className="text-base">{option.flag}</span>
                <span className="font-medium">{option.name}</span>
                {language === option.code && (
                  <div className="ml-auto w-2 h-2 bg-[#3AF0F7] rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
