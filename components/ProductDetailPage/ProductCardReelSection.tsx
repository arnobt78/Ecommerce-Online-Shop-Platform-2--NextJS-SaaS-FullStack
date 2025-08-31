import React from "react";
import useEmblaCarousel from "embla-carousel-react";
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
  const [itemsToShow, setItemsToShow] = React.useState(2);
  const [mounted, setMounted] = React.useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    containScroll: "trimSnaps",
    dragFree: false,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setItemsToShow(window.innerWidth < 640 ? 2 : 5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Arrow navigation logic (must be after hooks)
  const totalSlides = products.length - itemsToShow + 1;
  const showArrows = totalSlides > 1;
  const handleLeft = () => {
    if (emblaApi) emblaApi.scrollTo(selectedIndex - 1);
  };
  const handleRight = () => {
    if (emblaApi) emblaApi.scrollTo(selectedIndex + 1);
  };

  // Responsive card width
  const getCardWidth = () => {
    if (itemsToShow <= 2) return "90vw";
    return "220px";
  };

  if (!mounted) {
    // Render nothing on server to avoid hydration mismatch
    return null;
  }

  return (
    <div className="relative w-full flex flex-row items-center justify-center max-w-[1180px]">
      {/* Left Arrow */}
      {showArrows && (
        <button
          type="button"
          className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 h-5/6 bg-gradient-to-r from-white/90 to-transparent cursor-pointer"
          onClick={handleLeft}
          aria-label="Scroll left"
          disabled={selectedIndex === 0}
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
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div
          className="flex flex-row gap-x-2 sm:gap-x-4"
          style={{ willChange: "transform" }}
        >
          {products.map((product, idx) => (
            <div
              className="flex justify-center flex-shrink-0"
              key={idx}
              style={{
                width: getCardWidth(),
                scrollSnapAlign: "start",
                minWidth: itemsToShow <= 2 ? "45vw" : undefined,
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
      </div>
      {/* Right Arrow */}
      {showArrows && (
        <button
          type="button"
          className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 h-5/6 bg-gradient-to-l from-white/90 to-transparent cursor-pointer"
          onClick={handleRight}
          aria-label="Scroll right"
          disabled={selectedIndex === totalSlides - 1}
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
      {/* Dots indicator for mobile */}
      {/* {products.length > itemsToShow && (
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-row gap-1 sm:hidden z-20"
          style={{
            bottom: "calc(0% - 16px)",
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
            minWidth: "unset",
            maxWidth: "unset",
          }}
        >
          {(() => {
            const total = products.length - itemsToShow + 1;
            const maxDots = 20;
            let start = 0;
            let end = total;
            if (total > maxDots) {
              if (selectedIndex < Math.floor(maxDots / 2)) {
                start = 0;
                end = maxDots;
              } else if (selectedIndex > total - Math.ceil(maxDots / 2)) {
                start = total - maxDots;
                end = total;
              } else {
                start = selectedIndex - Math.floor(maxDots / 2);
                end = start + maxDots;
              }
            }
            return Array.from({ length: Math.min(total, maxDots) }, (_, i) => {
              const idx = start + i;
              return (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === idx
                      ? "bg-gray-700 scale-110"
                      : "bg-gray-300"
                  }`}
                />
              );
            });
          })()}
        </div>
      )} */}
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
    if (typeof window === 'undefined') return;

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
  // Shuffle restProducts for randomness, but only on the client to avoid hydration mismatch
  const [shuffledRestProducts, setShuffledRestProducts] =
    React.useState(restProducts);

  React.useEffect(() => {
    // Shuffle only on the client
    const arr = [...restProducts];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffledRestProducts(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsToUse, relatedProducts.length]);

  // Combine related + random others
  finalProducts = [...relatedProducts, ...shuffledRestProducts];

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
