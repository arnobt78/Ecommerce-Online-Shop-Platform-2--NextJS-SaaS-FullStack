"use client";

import HeroSection from "@/components/HomePage/HeroSection";
import ProductsSection from "@/components/HomePage/ProductsSection";
import FeatureSection from "@/components/HomePage/FeatureSection";
import ReviewSection from "@/components/Review/ReviewCardSection";
import AnimationsAndStyles from "@/components/HomePage/AnimationsAndStyles";

export default function Home() {
  return (
    <div className="">
      {/* Header and CartSidebar are now global in layout.tsx */}
      <HeroSection />
      <FeatureSection />
      <ProductsSection />
      <ReviewSection />
      <AnimationsAndStyles />
    </div>
  );
}

