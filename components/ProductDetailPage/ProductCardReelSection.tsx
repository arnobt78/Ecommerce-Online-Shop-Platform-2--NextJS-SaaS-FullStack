
import React from "react";
import { products as globalProducts } from "@/scripts/data/products";
import { useCart } from "@/context/CartContext";
import { useRouter, usePathname } from "next/navigation";
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
  const { setCartItems, setCartOpen } = useCart();
  // Helper: get product slug for navigation
  const getProductSlug = (product: any) => product.slug;
  // Add to cart handler for reel
  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.stopPropagation && e.stopPropagation();
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
    setCartOpen(true);
  };
  return (
    <div
      className="w-full flex justify-center cursor-pointer"
      onClick={() => {
        if (typeof onProductClick === 'function') {
          onProductClick(product);
        } else {
          const slug = getProductSlug(product);
          if (slug) {
            router.push(`/product-detail/${slug}`);
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
            const slug = getProductSlug(product);
            if (slug) {
              router.push(`/product-detail/${slug}`);
            }
          }
        }
      }}
    >
      <SingleProductCard {...product} addToCart={handleAddToCart} />
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

/**
 * ProductCardReelSection displays a reel/grid of related products.
 */
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

  // Get current slug from URL
  const pathname = usePathname();
  const slug = React.useMemo(() => {
    // Expecting /product-detail/[slug]
    const match = pathname && pathname.match(/\/product-detail\/(.+)$/);
    return match ? match[1] : undefined;
  }, [pathname]);

  // Try to get current product from props (if passed from ProductDetailLayout), otherwise from URL
  const currentProduct = React.useMemo(() => {
    // If productsToUse contains only 1 product, assume it's the current product
    if (productsToUse.length === 1) return productsToUse[0];
    // Otherwise, find by slug from URL
    if (slug) return productsToUse.find((p: any) => p.slug === slug);
    return undefined;
  }, [slug, productsToUse]);

  // Filter products by brand or flavor (same as current product, but not itself)
  const filteredProducts = React.useMemo(() => {
    if (!currentProduct) return productsToUse;
    const { brand, flavor, slug: currentSlug } = currentProduct;
    const norm = (val: string) => (val || '').toLowerCase().trim();
    // Find related by brand or flavor, case-insensitive and trimmed
    let filtered = productsToUse.filter((p: any) =>
      (norm(p.brand) === norm(brand) || norm(p.flavor) === norm(flavor)) && p.slug !== currentSlug
    );
    // If none found, fallback to all except current
    if (filtered.length === 0) {
      filtered = productsToUse.filter((p: any) => p.slug !== currentSlug);
    }
    // Sort A-Z by productName
    filtered.sort((a: any, b: any) => (a.productName || '').localeCompare(b.productName || '', undefined, { sensitivity: 'base' }));
    return filtered;
  }, [currentProduct, productsToUse, cardsToShow]);

  return (
    <div className="w-full flex flex-col items-center px-1 sm:px-0">
      <ProductReelGrid products={filteredProducts} cardsToShow={cardsToShow} onProductClick={onProductClick} />
    </div>
  );
};
