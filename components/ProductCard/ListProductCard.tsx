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
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-1 gap-y-2 sm:gap-x-4 sm:gap-y-6 justify-items-center w-full max-w-7xl mt-8">
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

  // Sort: numbers first, then A-Z
  const sortedProducts = React.useMemo(() => {
    if (!products) return [];
    const isNumberFirst = (name: string) => /^[0-9]/.test(name.trim());
    return [...products].sort((a, b) => {
      const nameA = (a.productName || a.name || '').trim();
      const nameB = (b.productName || b.name || '').trim();
      const aNum = isNumberFirst(nameA);
      const bNum = isNumberFirst(nameB);
      if (aNum && !bNum) return -1;
      if (!aNum && bNum) return 1;
      return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
    });
  }, [products]);

  const handleAddToCart = addToCart || ((product: any) => {
    setCartItems((prev: any[]) => {
      const existingItem = prev.find((item) => item.slug === product.slug);
      if (existingItem) {
        return prev.map((item) =>
          item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            quantity: 1,
          },
        ];
      }
    });
  });

  const router = useRouter();

  // Responsive pagination: 16 per page on phone, 15 per page on laptop and up
  const [perPage, setPerPage] = React.useState(16);
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setPerPage(16); // phone (sm breakpoint)
      } else {
        setPerPage(15); // laptop/tablet and up
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const { page, setPage, totalPages, paginated } = useProductPagination(sortedProducts, perPage);

  return (
    <div className="flex flex-col items-center w-full px-0">
      <ProductGrid
        products={paginated}
        handleAddToCart={handleAddToCart}
        onCardClick={(product, idx) => {
          if (product.slug) {
            router.push(`/product-detail/${product.slug}`);
          } else {
            // fallback: if no slug, do nothing or show error (should not happen if data is correct)
            // Optionally, you can show a toast or alert here
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
