"use client";

import { useState } from "react";
import { FooterLogoSocial, FooterSection, FooterContact, FooterPayments, FooterCopyright } from "@/components/Footer/FooterComponments";

export default function Footer() {
  const [openDropdowns, setOpenDropdowns] = useState<{[key: string]: boolean}>({});

  const toggleDropdown = (section: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-transparent text-gray-900 px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 md:gap-8 lg:gap-12 mb-8 md:mb-12">
          <FooterLogoSocial />
          <FooterSection
            title="Shop"
            items={["Brand", "Flavour", "Strength", "Snuzz Pro"]}
            open={!!openDropdowns.shop}
            onToggle={() => toggleDropdown('shop')}
            sectionKey="shop"
          />
          <FooterSection
            title="Favorites"
            items={["Klint Arctic Mint", "Klint Berry Blast", "Klint Cool Mint", "Klint Fresh Mint"]}
            open={!!openDropdowns.favorites}
            onToggle={() => toggleDropdown('favorites')}
            sectionKey="favorites"
          />
          <FooterSection
            title="Information"
            items={["Contact Us", "Order Status", "Shipping", "Privacy"]}
            open={!!openDropdowns.information}
            onToggle={() => toggleDropdown('information')}
            sectionKey="information"
          />
          <FooterContact
            open={!!openDropdowns.contact}
            onToggle={() => toggleDropdown('contact')}
          />
        </div>
        <div className="border-t border-gray-300 pt-4 sm:pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <FooterPayments />
          <FooterCopyright />
        </div>
      </div>
    </footer>
  );
}
