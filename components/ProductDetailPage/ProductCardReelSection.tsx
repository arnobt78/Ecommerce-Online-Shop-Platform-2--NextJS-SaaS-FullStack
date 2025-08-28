import React from "react";
import { products, ProductData } from "@/scripts/data/products";
import { useCart } from "@/context/CartContext";
import { useRouter, usePathname } from "next/navigation";
import { SingleProductCard } from "@/components/ProductCard/SingleProductCard";

// ProductReelCard component (inlined)
interface ProductReelCardProps {
  product: any;
  onProductClick?: (product: any) => void;
  products: any[];
}
const ProductReelCard: React.FC<ProductReelCardProps> = ({
  product,
  onProductClick,
  products,
}) => {
  const router = useRouter();
  const { setCartItems, setCartOpen } = useCart();
  const getProductSlug = (product: any) => product.slug;
  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.stopPropagation && e.stopPropagation();
    setCartItems((prev: any[]) => {
      const existingItem = prev.find((item) => item.slug === product.slug);
      if (existingItem) {
        return prev.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
        if (typeof onProductClick === "function") {
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
        if (e.key === "Enter" || e.key === " ") {
          if (typeof onProductClick === "function") {
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
const ProductReelGrid: React.FC<ProductReelGridProps> = ({
  products,
  cardsToShow,
  onProductClick,
}) => {
  const [scrollIndex, setScrollIndex] = React.useState(0);
  const [itemsToShow, setItemsToShow] = React.useState(2);

  React.useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth < 640 ? 2 : 5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showArrows = products.length > itemsToShow;
  const maxIndex = Math.max(0, products.length - itemsToShow);
  const handleLeft = () => setScrollIndex((i) => Math.max(0, i - 1));
  const handleRight = () => setScrollIndex((i) => Math.min(maxIndex, i + 1));

  const visibleProducts = products.slice(
    scrollIndex,
    scrollIndex + itemsToShow
  );

  // Responsive card width
  const getCardWidth = () => {
    if (itemsToShow <= 2) return "90vw"; // Show 2 full cards on mobile
    return "220px";
  };

  return (
    <div className="relative w-full flex flex-row items-center justify-center max-w-[1180px]">
      {/* Left Arrow */}
      {showArrows && (
        <button
          type="button"
          className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 h-5/6 bg-gradient-to-r from-white/70 to-transparent cursor-pointer"
          onClick={handleLeft}
          aria-label="Scroll left"
          disabled={scrollIndex === 0}
        >
          <svg
            className="w-8 h-8 text-gray-400 hover:text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      {/* Reel */}
      <div
        className="flex flex-row gap-x-1 sm:gap-x-4 w-full mx-auto overflow-x-hidden scroll-smooth justify-center"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          overflowY: "hidden",
        }}
      >
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}</style>
        {visibleProducts.map((product, idx) => (
          <div
            className="flex justify-center flex-shrink-0"
            key={scrollIndex + idx}
            style={{
              width: getCardWidth(),
              scrollSnapAlign: "start",
              minWidth: itemsToShow <= 2 ? "45vw" : undefined, // 2 full cards on mobile
              maxWidth: itemsToShow <= 2 ? "45vw" : undefined,
            }}
          >
            <ProductReelCard
              product={product}
              onProductClick={onProductClick}
              products={products}
            />
          </div>
        ))}
      </div>
      {/* Right Arrow */}
      {showArrows && (
        <button
          type="button"
          className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 h-5/6 bg-gradient-to-l from-white/70 to-transparent cursor-pointer"
          onClick={handleRight}
          aria-label="Scroll right"
          disabled={scrollIndex === maxIndex}
        >
          <svg
            className="w-8 h-8 text-gray-400 hover:text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

interface ProductCardReelSectionProps {
  products?: any[];
  onProductClick?: (product: any) => void;
}

export const ProductCardReelSection: React.FC<ProductCardReelSectionProps> = ({
  products,
  onProductClick,
}) => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const cardsToShow = isMobile ? 2 : 5;

  let productsToUse: ProductData[] = Array.isArray(products) ? products : [];

  // Get current slug from URL
  const pathname = usePathname();
  const slug = React.useMemo(() => {
    const match = pathname && pathname.match(/\/product-detail\/(.+)$/);
    return match ? match[1] : undefined;
  }, [pathname]);

  // Find the current product by slug
  const currentProduct = React.useMemo(() => {
    if (!slug) return undefined;
    return productsToUse.find((p) => p.slug === slug);
  }, [slug, productsToUse]);

  // Filter related products by productName, brand, or flavor
  let relatedProducts: ProductData[] = [];
  if (currentProduct) {
    relatedProducts = productsToUse.filter(
      (p) =>
        p.slug !== currentProduct.slug &&
        ((currentProduct.productName &&
          p.productName &&
          p.productName
            .toLowerCase()
            .includes(currentProduct.productName.toLowerCase())) ||
          (currentProduct.brand &&
            p.brand &&
            p.brand.toLowerCase() === currentProduct.brand.toLowerCase()) ||
          (currentProduct.flavor &&
            p.flavor &&
            p.flavor.toLowerCase() === currentProduct.flavor.toLowerCase()))
    );
  }

  // Always fill the reel: related products first, then random others (excluding current and already shown)
  let finalProducts: ProductData[] = [];
  const alreadyShownSlugs = new Set<string>(
    [...relatedProducts.map((p) => p.slug), currentProduct?.slug].filter(
      Boolean
    ) as string[]
  );
  // Get the rest of the products (excluding current and related)
  let restProducts = productsToUse.filter(
    (p) => !alreadyShownSlugs.has(p.slug)
  );
  // Shuffle restProducts for randomness
  for (let i = restProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [restProducts[i], restProducts[j]] = [restProducts[j], restProducts[i]];
  }
  // Combine related + random others
  finalProducts = [...relatedProducts, ...restProducts];
  // Optionally, limit to a max number if you want (e.g., 20)
  // finalProducts = finalProducts.slice(0, 20);

  // Sort alphabetically for consistency (optional, or comment out for more randomness)
  // finalProducts = [...finalProducts].sort((a, b) => {
  //   if (!a.productName || !b.productName) return 0;
  //   return a.productName.localeCompare(b.productName);
  // });

  return (
    <div className="w-full flex flex-col items-center px-1 sm:px-0">
      <div className="w-full flex flex-row items-center justify-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight text-center">
          You May Also Like
        </h2>
      </div>
      <ProductReelGrid
        products={finalProducts}
        cardsToShow={cardsToShow}
        onProductClick={onProductClick}
      />
    </div>
  );
};
