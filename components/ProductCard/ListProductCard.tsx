"use client";

import React from "react";
import { useRouter } from "next/navigation";
// ProductGridEmpty component
const ProductGridEmpty: React.FC = () => (
  <div className="col-span-full flex flex-col items-center justify-center w-full min-h-[180px] py-8">
    <span className="text-lg sm:text-xl font-semibold text-gray-500 text-center">
      No products matched your category filter.
    </span>
  </div>
);

// ListProductCardItem component
import { SingleProductCard } from "./SingleProductCard";
interface ListProductCardItemProps {
  product: any;
  idx: number;
  handleAddToCart: (product: any) => void;
  onCardClick: () => void;
}
function ListProductCardItem({ product, idx, handleAddToCart, onCardClick }: ListProductCardItemProps) {
  return (
    <div className="w-full flex justify-center">
      <SingleProductCard
        {...product}
        addToCart={e => {
          if (e && e.stopPropagation) e.stopPropagation();
          handleAddToCart(product);
        }}
        onCardClick={onCardClick}
      />
    </div>
  );
}

// ProductGrid component
interface ProductGridProps {
  products: any[];
  handleAddToCart: (product: any) => void;
  onCardClick: (product: any, idx: number) => void;
}
const ProductGrid: React.FC<ProductGridProps> = ({ products, handleAddToCart, onCardClick }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-6 justify-items-center w-full max-w-7xl mt-6 sm:px-2 min-h-[200px]">
    {products.length > 0 ? (
      products.map((product, idx) => (
        <ListProductCardItem
          key={product.id || idx}
          product={product}
          idx={idx}
          handleAddToCart={handleAddToCart}
          onCardClick={() => onCardClick(product, idx)}
        />
      ))
    ) : (
      <ProductGridEmpty />
    )}
  </div>
);
import { useProductPagination } from "./useProductPagination";
import { Pagination } from "../Pagination/Pagination";
import { useCart } from "@/context/CartContext";

interface ListProductCardProps {
  products: any[];
  addToCart?: (product: any) => void;
}

export const ListProductCard: React.FC<ListProductCardProps> = ({ products, addToCart }) => {
  const { setCartItems } = useCart();
  // Use the provided addToCart or fallback to global context
  // Helper to parse price string (e.g., "€ 3,60") to number (3.60)
  function parsePrice(price: any) {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      const cleaned = price.replace(/[^0-9,.-]+/g, "").replace(",", ".");
      const num = parseFloat(cleaned);
      return isNaN(num) ? 0 : num;
    }
    return 0;
  }

  // Helper to get a unique id for a product (fallback to name+brand+image if missing)
  function getProductId(product: any) {
    if (typeof product.id === 'number' || typeof product.id === 'string') return product.id;
    return `${product.name || product.productName}_${product.brand}_${product.image || product.productImage}`;
  }

  const handleAddToCart = addToCart || ((product: any) => {
    const id = getProductId(product);
    setCartItems((prev: any[]) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            id,
            name: product.name || product.productName,
            price: parsePrice(product.salePrice ?? product.price ?? product.originalPrice),
            quantity: 1,
            image: product.image || product.productImage,
            brand: product.brand,
            slug: product.slug,
          },
        ];
      }
    });
  });

  const router = useRouter();

  // Pagination logic: show 10 per page (5x2 grid)
  const { page, setPage, totalPages, paginated } = useProductPagination(products, 10);

  return (
    <div className="flex flex-col items-center w-full lg:px-2 sm:px-0">
      <ProductGrid
        products={paginated}
        handleAddToCart={handleAddToCart}
        onCardClick={(product, idx) => {
          if (product.slug) {
            router.push(`/product-detail/${product.slug}`);
          } else {
            // fallback: try idx-based navigation (should not happen if data is correct)
            router.push(`/product-detail?idx=${product.id ?? idx}`);
          }
        }}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};
