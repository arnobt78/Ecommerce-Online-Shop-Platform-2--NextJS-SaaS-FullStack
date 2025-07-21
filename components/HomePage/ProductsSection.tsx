
import { ListProductCard } from "@/components/ProductCard/ListProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ProductsSectionTitle component displays the section title for the products section.
const ProductsSectionTitle: React.FC = () => (
  <div className="text-center mb-10 sm:mb-20">
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 ">Best Selling</h2>
  </div>
);


// ProductsSection is the main section that displays the best selling products and a button to show all products.
export default function ProductsSection() {
  return (
    <section id="products-section" className="px-2 sm:px-4 py-12 sm:py-20 w-full">
      <div className="max-w-[1440px] mx-auto w-full">
        <ProductsSectionTitle />
        {/* Product Cards List */}
        <div className="flex flex-col items-center w-full">
          {/* ListProductCard fetches and displays products from data/products.ts */}
          <ListProductCard products={products.slice(0, 10)} />

          {/* Show all button */}
          <Link href="/products" passHref legacyBehavior>
            <button
              className="relative mt-12 flex flex-row justify-center items-center px-[18px] py-[7px] gap-[8.5px] w-[150px] h-[48px] bg-white border border-[#6DF4F9] rounded-[7.7px] shadow-sm hover:bg-[#e6fcfd] transition-colors"
              style={{ boxSizing: 'border-box', fontFamily: 'Mono', fontWeight: 500, fontSize: '14px', lineHeight: '16px', color: '#000' }}
            >
              <span className="mr-1 items-center justify-center text-lg" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500 }}>Show all</span>
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }}
              />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
