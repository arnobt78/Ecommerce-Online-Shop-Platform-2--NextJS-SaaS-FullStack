
import React from "react";
import { ListProductCard } from "@/components/ProductCard/ListProductCard";
import { products } from "@/scripts/data/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ProductsSectionTitle component displays the section title for the products section.
const ProductsSectionTitle: React.FC = () => (
  <div className="text-center mb-4 sm:mb-8">
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 ">Best Selling</h2>
  </div>
);


// ProductsSection is the main section that displays the best selling products and a button to show all products.
export default function ProductsSection() {
  // Shuffle products and pick 10 random ones on each render
  const getRandomProducts = <T,>(arr: T[], n: number): T[] => {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result.slice(0, n);
  };
  const randomProducts = React.useMemo(() => getRandomProducts(products, 10), []);
  return (
    <section id="products-section" className="px-1 sm:px-4 py-4 sm:py-8 w-full">
      <div className="max-w-[1440px] mx-auto w-full">
        <ProductsSectionTitle />
        {/* Product Cards List */}
        <div className="flex flex-col items-center w-full">
          {/* ListProductCard fetches and displays products from data/products.ts */}
          <ListProductCard products={randomProducts} />
          {/* Show all button */}
          <Link href="/products" passHref legacyBehavior>
            {/* <button
              className="relative mt-12 flex flex-row justify-center items-center px-[18px] py-[7px] gap-[8.5px] w-[150px] h-[48px] bg-white border border-[#6DF4F9] rounded-[7.7px] shadow-sm hover:bg-[#e6fcfd] transition-colors"
              style={{ boxSizing: 'border-box', fontFamily: 'Mono', fontWeight: 500, fontSize: '14px', lineHeight: '16px', color: '#000' }}
            >
              <span className="mr-1 items-center justify-center text-lg" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500 }}>Show all</span>
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }}
              />
            </button> */}
            <Button 
          variant="ghost" 
          className="h-auto px-4 sm:px-6 py-2 border border-teal-400 rounded-sm text-gray-600 hover:text-gray-900 font-normal text-xs sm:text-sm md:text-base justify-center sm:justify-start group mt-12"
        >
          Show all
          <ArrowRight className="ml-0 sm:ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
