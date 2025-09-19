"use client";

import { useState } from "react";
import {
  FooterLogoSocial,
  FooterSection,
  FooterContact,
  FooterPayments,
  FooterCopyright,
} from "@/components/Footer/FooterComponments";
import { useLanguage } from "@/context/LanguageContextNew";

export default function Footer() {
  const { t } = useLanguage();
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
      <div className="max-w-9xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 lg:gap-8 pb-0 sm:pb-8 items-center">
          <FooterLogoSocial />
          <FooterSection
            title={t("footer.shop.title")}
            items={[
              t("footer.shop.brands"),
              t("footer.shop.flavours"),
              t("footer.shop.strength"),
              t("footer.shop.snuzzpro"),
            ]}
            open={!!openDropdowns.shop}
            onToggle={() => toggleDropdown("shop")}
            sectionKey="shop"
          />
          <FooterSection
            title={t("footer.favorites.title")}
            items={[
              t("footer.favorites.zynAppleMint"),
              t("footer.favorites.veloPeppermint"),
              t("footer.favorites.killaGrape"),
              t("footer.favorites.puffGrape"),
            ]}
            open={!!openDropdowns.favorites}
            onToggle={() => toggleDropdown("favorites")}
            sectionKey="favorites"
          />
          <FooterSection
            title={t("footer.information.title")}
            items={[
              t("footer.information.terms"),
              t("footer.information.privacy"),
              t("footer.information.refund"),
              t("footer.information.faq"),
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
        <div className="border-t border-gray-300 pt-4 sm:pt-8  flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:px-20">
          <FooterPayments />
          <FooterCopyright />
        </div>
      </div>
    </footer>
  );
}
