"use client";

import React, { useState, useMemo } from "react";
import { useProductContext } from "@/context/ProductContext";
import { useLanguage } from "@/context/LanguageContextNew";
import Image from "next/image";

// --- Inlined: ProductPosterCard ---
interface ProductPosterCardProps {
  product: any;
}
/**
 * ProductPosterCard displays the main product image and badges.
 */
const ProductPosterCard: React.FC<ProductPosterCardProps> = ({ product }) => {
  const { t } = useLanguage();
  const [imgError, setImgError] = React.useState(false);
  return (
    <div className="relative flex flex-col items-center shadow-lg bg-zinc-200 overflow-visible w-full aspect-square max-w-[640px] mx-auto">
      {/* Top badges */}
      <div className="absolute flex flex-row w-full justify-between top-1 sm:top-4 left-0 pr-1 sm:pr-4 z-10">
        {product.saleLabel ? (
          <div className="bg-white rounded-[6px] w-[70px] h-[20px] sm:h-[24px] flex items-center justify-center shadow-sm">
            <span className="italic font-medium text-xs sm:text-sm text-[#C02929]">
              {product.saleLabel}
            </span>
          </div>
        ) : (
          <div className="w-[70px] h-[24px]" />
        )}
        <div className="bg-white rounded-[6px] w-[90px] sm:w-[110px] h-[20px] sm:h-[24px] flex items-center justify-center shadow-sm">
          <span className="italic font-medium text-xs sm:text-sm text-gray-900">
            {t("products.shipping.freeShipping")}
          </span>
        </div>
      </div>
      {/* Product image as poster */}
      <div className="relative flex flex-col items-center justify-center w-full h-full z-0 ">
        {!imgError ? (
          <Image
            src={product.productImage}
            alt={product.productName}
            width={640}
            height={640}
            className="object-contain w-full h-full mx-auto drop-shadow-xl"
            draggable={false}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src={product.productImage}
            alt={product.productName}
            width={640}
            height={640}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
            draggable={false}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/product-image.png";
            }}
          />
        )}
      </div>
    </div>
  );
};

// --- Inlined: ProductCardDescriptionSection and ProductDetailDescriptionSection ---
interface ProductCardDescriptionSectionProps {
  brand: string;
  flavor: string;
  strength: string;
  nicotinePerPouch: string;
  description?: string;
  howToUse?: string;
}
const CollapsibleSection: React.FC<{
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  sectionId: string;
}> = ({ title, open, onToggle, children, sectionId }) => (
  <div className="flex flex-col gap-5 border-b border-[#C4C4C4] pt-4 sm:pt-8 sm:pb-8">
    <button
      className="flex flex-row items-center justify-between w-full bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={sectionId}
    >
      <span className="font-semibold text-[24px] leading-[29px] text-gray-900">
        {title}
      </span>
      <svg
        width="20"
        height="10"
        viewBox="0 0 20 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-300 ease-in-out ${
          open ? "" : "rotate-180"
        }`}
        style={{ transformOrigin: "50% 50%" }}
      >
        <path
          d="M1 1L10 9L19 1"
          stroke="#000"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
    <div
      id={sectionId}
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        open
          ? "max-h-[2000px] opacity-100"
          : "max-h-0 opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {children}
    </div>
  </div>
);
const ProductDescriptionDetails: React.FC<{
  brand: string;
  flavor: string;
  strength: string;
  nicotinePerPouch: string;
  description?: string;
}> = ({ brand, flavor, strength, nicotinePerPouch, description }) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="flex flex-row items-center text-[#343232] text-sm sm:text-lg">
        <span>{t("productDetail.brand")}</span>
        <span className="flex-1 border-b border-dotted border-[#343232] mx-2 h-[1px]"></span>
        <span className="ml-2">{brand}</span>
      </div>
      <div className="flex flex-row items-center text-[#343232] text-sm sm:text-lg">
        <span>{t("productDetail.flavor")}</span>
        <span className="flex-1 border-b border-dotted border-[#343232] mx-2 h-[1px]"></span>
        <span className="ml-2">{flavor}</span>
      </div>
      <div className="flex flex-row items-center text-[#343232] text-sm sm:text-lg">
        <span>{t("productDetail.strength")}</span>
        <span className="flex-1 border-b border-dotted border-[#343232] mx-2 h-[1px]"></span>
        <span className="ml-2">{strength}</span>
      </div>
      <div className="flex flex-row items-center text-[#343232] text-sm sm:text-lg">
        <span>{t("productDetail.nicotinePerPouch")}</span>
        <span className="flex-1 border-b border-dotted border-[#343232] mx-2 h-[1px]"></span>
        <span className="ml-2">{nicotinePerPouch}</span>
      </div>
      <div className="flex flex-row items-center text-[#343232] text-sm sm:text-lg text-justify mt-4">
        <p className="">{description}</p>
      </div>
    </>
  );
};
const ProductCardDescriptionSection: React.FC<
  ProductCardDescriptionSectionProps
> = ({ brand, flavor, strength, nicotinePerPouch, description, howToUse }) => {
  const { t } = useLanguage();
  const [descOpen, setDescOpen] = React.useState(true);
  const [howToUseOpen, setHowToUseOpen] = React.useState(true);
  return (
    <div className="w-full max-w-[687px]">
      <CollapsibleSection
        title={t("productDetail.description")}
        open={descOpen}
        onToggle={() => setDescOpen((prev) => !prev)}
        sectionId="product-desc-section"
      >
        <ProductDescriptionDetails
          brand={brand}
          flavor={flavor}
          strength={strength}
          nicotinePerPouch={nicotinePerPouch}
          // description={description}
        />
      </CollapsibleSection>
      <CollapsibleSection
        title={t("productDetail.howToUse")}
        open={howToUseOpen}
        onToggle={() => setHowToUseOpen((prev) => !prev)}
        sectionId="how-to-use-section"
      >
        <div className="text-[#343232] text-justify min-w-0">
          {howToUse || (
            <div className="flex flex-col items-center w-full sm:pt-4">
              <div className="flex flex-row justify-center items-start gap-1 sm:gap-12 mb-6 w-full">
                {/* Step 1 */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <Image
                    src="/how-to-use-icons/howToUse-1.svg"
                    alt={t("productDetail.step1.title")}
                    width={128}
                    height={128}
                    className="w-24 h-24 sm:w-32 sm:h-32 mb-2"
                  />
                  <span className="block text-center text-xs sm:text-base font-medium mt-1">
                    {t("productDetail.howToUse.step1")}
                  </span>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <Image
                    src="/how-to-use-icons/howToUse-2.svg"
                    alt={t("productDetail.step2.title")}
                    width={128}
                    height={128}
                    className="w-24 h-24 sm:w-32 sm:h-32 mb-2"
                  />
                  <span className="block text-center text-xs sm:text-base font-medium mt-1">
                    {t("productDetail.howToUse.step2")}
                  </span>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <Image
                    src="/how-to-use-icons/howToUse-3.svg"
                    alt={t("productDetail.step3.title")}
                    width={128}
                    height={128}
                    className="w-24 h-24 sm:w-32 sm:h-32 mb-2"
                  />
                  <span className="block text-center text-xs sm:text-base font-medium mt-1">
                    {t("productDetail.howToUse.step3")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CollapsibleSection>
    </div>
  );
};
interface ProductDetailDescriptionSectionProps {
  product: any;
  className?: string;
}
/**
 * ProductDetailDescriptionSection renders the product description section for a product.
 */
const ProductDetailDescriptionSection: React.FC<
  ProductDetailDescriptionSectionProps
> = ({ product, className = "" }) => (
  <div className={`relative bg-white overflow-visible ${className}`}>
    <div className="relative z-10 m-1 sm:m-6">
      <ProductCardDescriptionSection
        brand={product.brand}
        flavor={product.flavor}
        strength={product.strength}
        nicotinePerPouch={product.nicotinePerPouch}
        description={product.description}
        howToUse={product.howToUse}
      />
    </div>
  </div>
);

// --- Inlined: ProductDetailReviewsSection, ReviewCardSection, ReviewCardItem ---
interface Testimonial {
  name: string;
  review: string;
  rating: number;
}
const defaultTestimonials: Testimonial[] = [
  { name: "M.B", review: "best price but delivery time take long", rating: 5 },
  { name: "M.B", review: "best price but delivery time take long", rating: 5 },
  { name: "M.B", review: "best price but delivery time take long", rating: 5 },
  { name: "M.B", review: "best price but delivery time take long", rating: 5 },
];
const ReviewCardItem: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className="border-0 transition-all duration-300 bg-transparent w-full max-w-[284px] rounded-[19px] shadow-md">
      <div className="px-5 py-2">
        <div className="flex items-center space-x-1 mb-1">
          {[...Array(5)].map((_, j) => (
            <span
              key={j}
              className={`size-4 ${
                j < 4 ? "fill-black text-gray-900" : "fill-none text-gray-900"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <p className="text-gray-700 mb-1 text-sm leading-relaxed">
          {testimonial.review}
        </p>
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <span>👤</span>
            <p className="font-semibold text-sm text-gray-900">
              {testimonial.name}
            </p>
            <Image
              src="/signature.png"
              alt="Verified signature"
              width={32}
              height={16}
              className="h-4 w-auto ml-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Inlined: Product Detail Page Layout ---

import { ProductPurchaseSection } from "./ProductPurchaseSection";
import { ProductCardReelSection } from "./ProductCardReelSection";
import { getRelatedProducts } from "./ProductCardReelServer";
import ReviewSection from "@/components/Review/ReviewCardSection";

import { useSearchParams } from "next/navigation";
import { products } from "@/scripts/data/products";

// Get product index from query param, fallback to 0

interface ProductDetailLayoutProps {
  product?: any;
  slug?: string;
}

export const ProductDetailLayout: React.FC<ProductDetailLayoutProps> = ({
  product: propProduct,
  slug,
}) => {
  const { t } = useLanguage();

  // Production debugging
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("ProductDetailLayout mounted:", {
        slug,
        hasPropProduct: !!propProduct,
        productName: propProduct?.productName,
        productSlug: propProduct?.slug,
        productId: propProduct?.id,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        pathname: window.location.pathname,
        searchParams: window.location.search,
        hash: window.location.hash,
        referrer: document.referrer,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        screen: {
          width: window.screen.width,
          height: window.screen.height,
        },
        devicePixelRatio: window.devicePixelRatio,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
      });
    }
  }, [slug, propProduct]);
  // If slug is provided, find the product by slug
  // Otherwise, fallback to idx from searchParams
  const searchParams = useSearchParams();
  let idx = 0;
  if (searchParams) {
    idx = Number(searchParams.get("idx")) || 0;
  }
  // Use context for instant product rendering after navigation from reel
  const { sharedProduct } = useProductContext();
  let product = sharedProduct || propProduct;
  if (!product && slug) {
    // Find product from already imported products array
    product = products.find((p: any) => p.slug === slug);

    // Log product finding results
    if (typeof window !== "undefined") {
      console.log("Product finding results:", {
        slug,
        foundProduct: !!product,
        productName: product?.productName,
        totalProducts: products.length,
        searchMethod: "slug",
        timestamp: new Date().toISOString(),
      });
    }
  }
  if (!product && typeof products !== "undefined") {
    product = products[idx] || products[0];

    // Log fallback product finding
    if (typeof window !== "undefined") {
      console.log("Fallback product finding:", {
        idx,
        foundProduct: !!product,
        productName: product?.productName,
        totalProducts: products.length,
        searchMethod: "index",
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Final product validation
  if (typeof window !== "undefined" && !product) {
    console.error("No product found:", {
      slug,
      idx,
      totalProducts: products.length,
      availableSlugs: products.map((p: any) => p.slug),
      timestamp: new Date().toISOString(),
    });
  }
  const [quantity, setQuantity] = useState(1);

  // Memoize related products for the reel section for performance
  const relatedProducts = useMemo(
    () => getRelatedProducts(product, products),
    [product, products]
  );

  return (
    <div className="w-full bg-white flex flex-col items-center">
      {/* Main Content */}
      <div className="w-full max-w-[1440px] bg-white flex flex-col lg:flex-row gap-8 mx-auto px-1 sm:px-32">
        {/* Left: Product Card and Description (on desktop), only Product Poster Card on mobile */}
        <div className="flex flex-col gap-8 w-full bg-white lg:w-[687px]">
          {/* Product Poster Card for Product Detail */}
          <ProductPosterCard product={product} />
          {/* Description Section with SVG background (hidden on mobile, shown on desktop) */}
          <ProductDetailDescriptionSection
            product={product}
            className="hidden sm:block"
          />
        </div>
        {/* Right: Purchase Section with SVG background - fixed on large screens */}
        <div className="flex-1 flex flex-col items-start min-w-full sm:min-w-[350px] max-w-full sm:max-w-[687px] mx-auto px-0 sm:px-0">
          <div className="relative w-full bg-white overflow-visible lg:sticky lg:top-0">
            <div className="relative z-10 w-full">
              <ProductPurchaseSection
                productName={product.productName}
                productImage={product.productImage}
                brand={product.brand}
                stockStatus={product.stockStatus}
                salePrice={product.salePrice || ""}
                originalPrice={product.originalPrice || ""}
                quantity={quantity}
                onQuantityChange={setQuantity}
                onBuyNow={() => {}}
                onAddToCart={() => {}}
                productId={idx}
                slug={product.slug}
              />
            </div>
          </div>
          {/* Description Section for mobile only (below purchase section) */}
          <ProductDetailDescriptionSection
            product={product}
            className="block sm:hidden w-full"
          />
        </div>
      </div>
      {/* Product Card Reel */}
      <div className="w-full max-w-[1440px] mx-auto mt-8 sm:mt-16">
        {/* Select and shuffle related products on the server for instant SSG load */}
        <ProductCardReelSection products={relatedProducts} />
      </div>
      {/* Reviews Section */}
      <div className="mt-8 sm:mt-16">
        <ReviewSection />
      </div>
    </div>
  );
};
