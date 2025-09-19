import React from "react";
import { ListProductCard } from "@/components/ProductCard/ListProductCard";
import { products } from "@/scripts/data/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContextNew";

// ProductsSectionTitle component displays the section title for the products section.
const ProductsSectionTitle: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-4 sm:mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 ">
        {t("home.products.bestSelling")}
      </h2>
    </div>
  );
};

// ProductsSection is the main section that displays the best selling products and a button to show all products.

export default function ProductsSection() {
  const { t, isHydrated } = useLanguage();

  // Hydration-safe: always render 15 products for SSR and initial client render
  const [randomizedProducts, setRandomizedProducts] = React.useState(
    products.slice(0, 15)
  );
  const [productCount, setProductCount] = React.useState(15);

  React.useEffect(() => {
    if (!isHydrated) return;
    // Randomize products only once after hydration
    const getRandomProducts = <T,>(arr: T[]): T[] => {
      const result = [...arr];
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    };
    setRandomizedProducts(getRandomProducts(products));
    setProductCount(window.innerWidth < 640 ? 14 : 15);
    const handleResize = () => {
      setProductCount(window.innerWidth < 640 ? 14 : 15);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isHydrated]);

  const displayProducts = randomizedProducts.slice(0, productCount);

  return (
    <section id="products-section" className="px-1 sm:px-4 py-4 sm:py-8 w-full">
      <div className="max-w-7xl mx-auto w-full">
        <ProductsSectionTitle />
        {/* Product Cards List */}
        <div className="flex flex-col items-center w-full">
          {/* ListProductCard fetches and displays products from data/products.ts */}
          <ListProductCard products={displayProducts} />
          {/* Show all button */}
          <Link href="/products" passHref legacyBehavior>
            <Button
              variant="ghost"
              className="h-auto px-4 sm:px-6 py-2 border border-teal-400 rounded-sm text-gray-600 hover:text-gray-900 font-normal text-xs sm:text-sm md:text-base justify-center sm:justify-start group mt-8 sm:mt-12"
            >
              {t("home.products.showAll")}
              <ArrowRight className="ml-0 sm:ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
