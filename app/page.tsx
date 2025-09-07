"use client";

import HeroSection from "@/components/HomePage/HeroSection";
import ProductsSection from "@/components/HomePage/ProductsSection";
import FeatureSection from "@/components/HomePage/FeatureSection";
import ReviewSection from "@/components/Review/ReviewCardSection";
import AnimationsAndStyles from "@/components/HomePage/AnimationsAndStyles";
import { PageCache, usePagePreload } from "@/components/PageCache";

export default function Home() {
  const { preloadAllData } = usePagePreload();

  return (
    <PageCache pageKey="home" preloadData={preloadAllData}>
      <HeroSection />
      <FeatureSection />
      <ProductsSection />
      <ReviewSection />
      <AnimationsAndStyles />
    </PageCache>
  );
}
