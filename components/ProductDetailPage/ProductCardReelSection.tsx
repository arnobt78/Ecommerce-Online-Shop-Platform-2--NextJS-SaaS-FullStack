

import React from "react";
import { products as globalProducts } from "../../data/products";

import { useRouter } from "next/navigation";
import { SingleProductCard } from "@/components/ProductCard/SingleProductCard";

// ProductReelCard component (inlined)
interface ProductReelCardProps {
  product: any;
  onProductClick?: (product: any) => void;
  products: any[];
}
/**
 * ProductReelCard renders a clickable product card for the reel.
 */
const ProductReelCard: React.FC<ProductReelCardProps> = ({ product, onProductClick, products }) => {
  const router = useRouter();
  // Helper: get product index for navigation (assumes unique productName)
  const getProductIndex = (product: any) => {
    return products.findIndex((p: any) => p.productName === product.productName);
  };
  return (
    <div
      className="w-full flex justify-center cursor-pointer"
      onClick={() => {
        if (typeof onProductClick === 'function') {
          onProductClick(product);
        } else {
          const index = getProductIndex(product);
          if (index !== -1) {
            router.push(`/product-detail?idx=${index}`);
          }
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.productName}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (typeof onProductClick === 'function') {
            onProductClick(product);
          } else {
            const index = getProductIndex(product);
            if (index !== -1) {
              router.push(`/product-detail?idx=${index}`);
            }
          }
        }
      }}
    >
      <SingleProductCard {...product} />
    </div>
  );
};

// ProductReelGrid component (inlined)
interface ProductReelGridProps {
  products: any[];
  cardsToShow: number;
  onProductClick?: (product: any) => void;
}
/**
 * ProductReelGrid renders a grid of ProductReelCard components.
 */
const ProductReelGrid: React.FC<ProductReelGridProps> = ({ products, cardsToShow, onProductClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-6 justify-items-center w-full max-w-7xl">
      {products.slice(0, cardsToShow).map((product, idx) => (
        <div className="w-full flex justify-center" key={idx}>
          <ProductReelCard product={product} onProductClick={onProductClick} products={products} />
        </div>
      ))}
    </div>
  );
};



interface ProductCardReelSectionProps {
  products?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onProductClick?: (product: any) => void;
}


export const ProductCardReelSection: React.FC<ProductCardReelSectionProps> = ({ products, onProductClick }) => {
  // Use the same grid and card layout as ListProductCard for consistency
  // Show only 2 cards on mobile, 5 on desktop
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const cardsToShow = isMobile ? 2 : 5;

  // Use products prop if provided, otherwise fallback to globalProducts
  const productsToUse = products && products.length > 0 ? products : globalProducts;

  return (
    <div className="w-full flex flex-col items-center px-1 sm:px-0">
      <ProductReelGrid products={productsToUse} cardsToShow={cardsToShow} onProductClick={onProductClick} />
    </div>
  );
};
