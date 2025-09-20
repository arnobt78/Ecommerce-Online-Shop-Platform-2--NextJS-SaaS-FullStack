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
  // Defensive: If product is missing or incomplete, render fallback
  if (!product || !product.productImage || !product.productName) {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-zinc-200">
        <span className="text-gray-500">Product image unavailable</span>
      </div>
    );
  }
  return (
    <div className="relative flex flex-col items-center shadow-lg bg-zinc-200 overflow-visible w-full aspect-square max-w-[640px] mx-auto">
      {/* Top badges */}
      <div className="absolute flex flex-row w-full justify-between top-1 sm:top-2 left-0 pr-1 sm:pr-2 pl-1 sm:pl-2 z-10">
        {product.saleLabel ? (
          <div className="bg-white rounded-[6px] min-w-[90px] sm:min-w-[110px] h-[20px] sm:h-[24px] px-1 sm:px-2 flex items-center justify-center shadow-sm whitespace-nowrap overflow-hidden">
            <span className="italic font-semibold text-xs sm:text-sm text-[#C02929] truncate">
              {t("products.sale")} {product.saleLabel}
            </span>
          </div>
        ) : (
          <div className="min-w-[90px] sm:min-w-[110px] h-[20px] sm:h-[24px]" />
        )}
        <div className="bg-white rounded-[6px] min-w-[90px] sm:min-w-[110px] h-[20px] sm:h-[24px] px-1 sm:px-2 flex items-center justify-center shadow-sm">
          <span className="italic font-semibold text-xs sm:text-sm text-gray-900 whitespace-nowrap overflow-hidden truncate">
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
  let product: any = undefined;
  let idx = 0;
  try {
    // Defensive: Use context, prop, or fallback
    const searchParams = useSearchParams();
    if (searchParams) {
      idx = Number(searchParams.get("idx")) || 0;
    }
    const { sharedProduct } = useProductContext();
    product = sharedProduct || propProduct;
    if (!product && slug) {
      product = products.find((p: any) => p.slug === slug);
    }
    if (!product && typeof products !== "undefined") {
      product = products[idx] || products[0];
    }
  } catch (err) {
    // Defensive: log error
    if (typeof window !== "undefined") {
      console.error("Error finding product:", err);
    }
    product = undefined;
  }
  // Defensive: If product is missing, render fallback
  if (!product) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100">
        <span className="text-gray-500 text-lg">
          Product not found or unavailable.
        </span>
      </div>
    );
  }
  const [quantity, setQuantity] = useState(1);
  // Memoize related products for the reel section for performance
  const relatedProducts = useMemo(
    () => getRelatedProducts(product, products),
    [product, products]
  );
  return (
    <div className="w-full bg-white flex flex-col items-center pt-20 sm:pt-32">
      {/* Main Content */}
      <div className="w-full max-w-9xl bg-white flex flex-col lg:flex-row gap-8 mx-auto px-1 sm:px-32">
        {/* Left: Product Card and Description (on desktop), only Product Poster Card on mobile */}
        <div className="flex flex-col gap-8 w-full bg-white lg:w-[687px]">
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
              {/* Defensive: Only render if product fields exist */}
              {product.productName && product.productImage && product.brand ? (
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
              ) : (
                <div className="w-full h-32 flex items-center justify-center bg-gray-100">
                  <span className="text-gray-500">
                    Product details unavailable
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* Description Section for mobile only (below purchase section) */}
          <ProductDetailDescriptionSection
            product={product}
            className="block sm:hidden w-full"
          />
        </div>
      </div>
      {/* Product Card Reel - Centered on desktop */}
      <div className="mt-8 sm:mt-16 w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
          {t("productDetail.youMayAlsoLike")}
        </h2>
        <div className="w-full flex justify-center items-center">
          <ProductCardReelSection products={relatedProducts} />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-0 sm:mt-8 w-full">
        <ReviewSection />
      </div>
    </div>
  );
};
