import { ProductCardReelSkeleton } from "./ProductCardReelSkeleton";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { products, ProductData } from "@/scripts/data/products";
import { useCart } from "@/context/CartContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { SingleProductCard } from "@/components/ProductCard/SingleProductCard";
import { useLanguage } from "@/context/LanguageContextNew";
import { useProductContext, ProductProvider } from "@/context/ProductContext";

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
  const [isLoading, setIsLoading] = React.useState(false);
  // Use React Context for client-side product sharing
  const { setSharedProduct } = useProductContext();
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

  // Optimistic UI: show spinner when loading
  const Spinner = () => (
    <div className="flex items-center justify-center w-full h-full min-h-[180px]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3AF0F7]"></div>
    </div>
  );

  const slug = getProductSlug(product);
  return (
    <div className="w-full flex justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <Link
          href={`/product-detail/${slug}`}
          prefetch={true}
          className="w-full flex justify-center cursor-pointer"
          aria-label={`View details for ${product.productName}`}
          onClick={() => {
            setIsLoading(true);
            setSharedProduct(product);
          }}
        >
          <SingleProductCard {...product} addToCart={handleAddToCart} />
        </Link>
      )}
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
  const { isHydrated, t } = useLanguage();
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
    if (!isHydrated) return;

    const handleResize = () => {
      setItemsToShow(window.innerWidth < 640 ? 2 : 5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isHydrated]);

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
    // Show skeleton loader while carousel is hydrating
    return <ProductCardReelSkeleton count={cardsToShow} />;
  }

  return (
    <div className="relative w-full flex flex-row items-center justify-center max-w-[1180px]">
      {/* Left Arrow */}
      {showArrows && (
        <button
          type="button"
          className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 h-5/6 bg-gradient-to-r from-white/90 to-transparent cursor-pointer"
          onClick={handleLeft}
          aria-label={t("productDetail.scrollLeft")}
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
          aria-label={t("productDetail.scrollRight")}
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
  const { isHydrated, t } = useLanguage();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (!isHydrated) return;

    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isHydrated]);
  const cardsToShow = isMobile ? 2 : 5;

  let productsToUse: ProductData[] = Array.isArray(products) ? products : [];

  return (
    <ProductProvider>
      <div className="w-full flex flex-col items-center px-1 sm:px-0">
        <div className="w-full flex flex-row items-center justify-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight text-center">
            {t("productDetail.youMayAlsoLike")}
          </h2>
        </div>
        <ProductReelGrid
          products={productsToUse}
          cardsToShow={cardsToShow}
          onProductClick={onProductClick}
        />
      </div>
    </ProductProvider>
  );
};
