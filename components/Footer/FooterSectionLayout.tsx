"use client";

import { useState } from "react";
import {
  FooterLogoSocial,
  FooterSection,
  FooterContact,
  FooterPayments,
  FooterCopyright,
} from "@/components/Footer/FooterComponments";

export default function Footer() {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleDropdown = (section: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="bg-transparent text-gray-900 px-2 sm:px-4 py-4 sm:pb-8 sm:pt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 lg:gap-8 pb-0 sm:pb-8 items-center">
          <FooterLogoSocial />
          <FooterSection
            title="Shop"
            items={["Brands", "Flavours", "Strength", "Snuzz PRO"]}
            open={!!openDropdowns.shop}
            onToggle={() => toggleDropdown("shop")}
            sectionKey="shop"
          />
          <FooterSection
            title="Favorites"
            items={[
              "ZYN Apple Mint",
              "VELO Peppermint Storm",
              "Killa Grape Ice",
              "Puff & Pouch Grape",
            ]}
            open={!!openDropdowns.favorites}
            onToggle={() => toggleDropdown("favorites")}
            sectionKey="favorites"
          />
          <FooterSection
            title="Information"
            items={[
              "Terms of Service",
              "Privacy Policy",
              "Refund Policy",
              "FAQ",
            ]}
            open={!!openDropdowns.information}
            onToggle={() => toggleDropdown("information")}
            sectionKey="information"
          />
          <FooterContact
            open={!!openDropdowns.contact}
            onToggle={() => toggleDropdown("contact")}
          />
        </div>
        <div className="border-t border-gray-300 pt-4 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <FooterPayments />
          <FooterCopyright />
        </div>
      </div>
    </footer>
  );
}
