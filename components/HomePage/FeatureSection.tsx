
// FeatureCardSection combines the FeatureCard and FeatureCardItem components into a single file for easier maintenance.
// This file is now self-contained and does not depend on the previous separate files.

import React from "react";

// FeatureCardItem component displays a single feature card with an image, title, and optional subtitle.
interface FeatureCardItemProps {
  imgSrc: string;
  alt: string;
  title: string;
  subtitle?: string;
}

function FeatureCardItem({ imgSrc, alt, title, subtitle }: FeatureCardItemProps) {
  return (
    <div className="flex flex-col items-center text-center w-full h-full px-2 py-2">
      <div className="flex items-center justify-center w-full h-[90px] sm:h-[120px] md:h-[140px] mb-2">
        <img
          src={imgSrc}
          alt={alt}
          className="object-contain max-h-[90px] sm:max-h-[120px] md:max-h-[140px] w-auto mx-auto"
          width={100}
          height={100}
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="space-y-1 w-full flex flex-col items-center justify-center">
        <p className="text-lg sm:text-xl md:text-2xl italic font-bold text-gray-900 leading-tight mt-1">{title}</p>
        {subtitle && <span className="text-sm font-bold text-gray-900 leading-tight">{subtitle}</span>}
      </div>
    </div>
  );
}

// FeatureCardSection is the main section that displays all feature cards in a grid layout.
const FeatureCardSection: React.FC = () => {
  return (
    <section className="px-4 bg-transparent">
      <div className="max-w-[1440px] mx-auto bg-transparent">
        <div className="w-full flex flex-col items-center justify-center py-6 bg-transparent">
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-12 max-w-5xl mx-auto bg-transparent">
            <FeatureCardItem
              imgSrc="/dollar.svg"
              alt="Best Price on Market"
              title="Best Price on Market"
            />
            <FeatureCardItem
              imgSrc="/icon3-clean.svg"
              alt="Free Shipping"
              title="Free Shipping in EU"
            />
            <FeatureCardItem
              imgSrc="/icon2-clean.svg"
              alt="Exclusive Brands"
              title="Exclusive Brands"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCardSection;
