import React from "react";

interface FeatureCardItemProps {
  imgSrc: string;
  alt: string;
  title: string;
  subtitle?: string;
}

export default function FeatureCardItem({ imgSrc, alt, title, subtitle }: FeatureCardItemProps) {
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
