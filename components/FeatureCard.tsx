"use client";

// import Image from "next/image";

import FeatureCardItem from "@/components/Home/Feature/FeatureCardItem";

export default function FeatureCard() {
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
}
