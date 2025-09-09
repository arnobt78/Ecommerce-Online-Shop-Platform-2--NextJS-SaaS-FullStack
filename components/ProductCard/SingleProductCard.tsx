"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContextNew";

// TopBadges component
interface TopBadgesProps {
  saleLabel?: string;
}
const TopBadges: React.FC<TopBadgesProps> = ({ saleLabel }) => {
  const { t } = useLanguage();
  return (
    <div className="absolute flex flex-row flex-nowrap min-w-0 overflow-hidden w-full justify-between top-[8px] left-0 px-1 sm:px-2 z-30">
      {/* Sale badge (conditionally render) */}
      {saleLabel ? (
        <div className="bg-white rounded-[6px] w-[48px] sm:w-[60px] h-[16px] sm:h-[24px] flex-shrink flex items-center justify-center">
          <span className="italic font-bold text-[9px] sm:text-[11px] text-[#C02929]">
            {saleLabel}
          </span>
        </div>
      ) : (
        <div className="w-[48px] h-[16px] sm:h-[24px]" />
      )}
      {/* Free shipping badge */}
      <div className="bg-white rounded-[6px] min-w-[68px] sm:min-w-[80px] h-[16px] sm:h-[24px] px-2 sm:px-3 flex-shrink flex items-center justify-center">
        <span className="italic font-bold text-[9px] sm:text-[11px] text-gray-900 whitespace-nowrap overflow-hidden truncate">
          {t("products.shipping.freeShipping")}
        </span>
      </div>
    </div>
  );
};

// ProductImage component
interface ProductImageProps {
  productImage: string;
  productName: string;
}
const ProductImage: React.FC<ProductImageProps> = React.memo(
  ({ productImage, productName }) => (
    <div className="absolute left-1/2 top-[12px] sm:top-[12px] -translate-x-1/2 w-[190px] h-[190px] sm:w-[280px] sm:h-[280px] flex items-center justify-center">
      <Image
        src={productImage}
        alt={productName}
        className="object-contain rounded-[12px] w-full h-full"
        width={280}
        height={280}
        loading="eager"
        draggable={false}
        sizes="(max-width: 640px) 190px, 280px"
        priority={true}
      />
    </div>
  )
);

// ProductInfo component
interface ProductInfoProps {
  productName: string;
  salePrice?: string;
  originalPrice: string;
}
const ProductInfo: React.FC<ProductInfoProps> = ({
  productName,
  salePrice,
  originalPrice,
}) => (
  <div className="flex flex-col gap-1 w-full min-w-0 max-w-full">
    {/* Use CSS for truncation and responsive max-width, no JS or window usage */}
    <span
      className="font-normal text-xs sm:text-sm text-gray-900 truncate w-full block max-w-[110px] sm:max-w-[180px]"
      title={productName}
    >
      {productName}
    </span>
    <div className="flex flex-row items-center gap-1 sm:gap-2 w-full whitespace-nowrap overflow-hidden">
      {salePrice ? (
        <>
          <span className="font-normal text-xs text-[#C02929] truncate max-w-[54px] sm:max-w-none align-middle flex items-center">
            {salePrice}
          </span>
          <span className="font-normal text-xs text-gray-900 line-through truncate max-w-[54px] sm:max-w-none align-middle flex items-center">
            {originalPrice}
          </span>
        </>
      ) : (
        <span className="font-normal text-xs text-gray-900 truncate max-w-[54px] sm:max-w-none align-middle flex items-center">
          {originalPrice}
        </span>
      )}
    </div>
  </div>
);

// AddToCartButton component
interface AddToCartButtonProps {
  addToCart?: (e?: React.MouseEvent) => void;
}
const AddToCartButton: React.FC<AddToCartButtonProps> = ({ addToCart }) => {
  const { t } = useLanguage();
  return (
    <div className="relative flex flex-row items-end gap-1 min-w-[40px] justify-end">
      <div className="w-[36px] h-[36px] rounded-full bg-[#CCEBE5] z-0 absolute right-0 bottom-0" />
      <div className="w-[28px] h-[28px] rounded-full bg-[#DDFFF8] z-0 absolute right-1 bottom-1" />
      <button
        className="w-[28px] h-[28px] flex items-center justify-center z-10 focus:outline-none absolute right-1 bottom-1 cursor-pointer rounded-full hover:bg-[#fff] active:bg-[#B2E0DF] scale-105 transition-transform duration-300 ease-in-out"
        onClick={(e) => {
          e.stopPropagation();
          addToCart && addToCart(e);
        }}
        aria-label={t("products.cart.addToBasket")}
        type="button"
      >
        {/* Simple basket icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
        >
          <rect width="15" height="14" fill="url(#pattern0_7817_2152)" />
          <defs>
            <pattern
              id="pattern0_7817_2152"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_7817_2152"
                transform="matrix(0.0103704 0 0 0.0111111 0.0333333 0)"
              />
            </pattern>
            <image
              id="image0_7817_2152"
              width="90"
              height="90"
              preserveAspectRatio="none"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADTklEQVR4nO2dzasOURzHP9drUkKIq6ysbGRlIy/5D5SFssHKy4biYWXpykUKC2VjQXaSjeR6yU5KkWzFJa/lKroLjs5tpq7rOXOfZ+bMOWfmfj/13TzdM3Pm07nz/ObMzHmgXWwArgKfgG/ARWBB7E61ibXAXcB0yeXYnWsLR4BfDsk2P4CB2J1sMnOAKwWC84zF7miTGQCu9yDZ5kLszjaZkz0I/gkMA/Nid7apbAL+THNOPgEsjd3RJjMXeFEg+SmwJnYn28DeAsmPgYWxO9gWnjkkvwWWxe5cm676jCM7YneuTRx1SH6lCxK/3HaIPuZ5PzOe1w7RG2e8Gc98cYhWveyZ3w7Rs3zvaKZjHBESnR5ne5yJKxM7sSQmTXteq0HyTZ3D/8dOZ97zKPkhML/LfgSwCHjuQfJLYImMFjMIvKkg+Z2mSntnXfa4QL+SvwPr+9iPADZPc3d7asaB7TJXjp0FV4STY29t7S65D5FxoAfRh/M/FtUYLpB8puK2xSTsxNGNLpLtZ5pUquGC5jzwNcs5PbMhhBBCCNFvOXUaeF/DhLxpWUaBobLl5lACB2AaFuusbzSS6Vv0hzKiY48O09BINBJN7FGoEU18cTp1EF+qztE0SPRoAqPDNCz2UYe+0QULfYs+VUb0vEy2Rjb1XoJP5aOHf63x7J2TwSyd7LOU2xbFrgvinREPHet02W4n8bZFeVCD54nVXKp2bFWX7a5MvG1RrJMoD7JMFxcpty2KdeKdrRLNVNFb6hBt37XWiOYfB8upCfstq1MHEw5sFVYb9ltWoqmv4si5JNHUWnHkHJRoctH76xRdtfJwkXLboBWHr8rDRcptg1ccPioPFym3DV5x5NgXJWe66BECUKXycJFy2+AVh4/Kw0XKbYNXHDnbJBr7DmTtrJBogq2xV7byGOyyrdWJt41ScVStPDpdtnU88bZRKo6qlcd4dtBl7/vFaBul4sg5VLKTpgUJUnH4qDxMwxOk4vBReZiGJ/iqvp8TOGgTOEErjpw7CRy4CZxbMUTvSuDATeDYhVqCY5dveJTAwZtAuR9zyQq70u2TBCSYmmMH1GIS+IWffdmPGYwlIMV4ylgmeA8wO7ZkIYQQQgghhBBCCBLiL+jG5pQWk0kFAAAAAElFTkSuQmCC"
            />
          </defs>
        </svg>
      </button>
    </div>
  );
};

export type StockStatus = "in_stock" | "low_stock" | "last_3" | "no_stock";

interface SingleProductCardProps {
  productImage: string;
  productName: string;
  salePrice?: string;
  originalPrice: string;
  saleLabel?: string;
  stockStatus: StockStatus;
  addToCart?: (e?: React.MouseEvent) => void;
  onCardClick?: () => void;
}

export const SingleProductCard: React.FC<SingleProductCardProps> = React.memo(
  ({
    productImage,
    productName,
    salePrice,
    originalPrice,
    saleLabel,
    stockStatus,
    addToCart,
    onCardClick,
  }) => {
    return (
      <div
        className="relative w-full h-[240px] sm:max-w-[248px] sm:h-[329px] rounded-[16px] mx-auto overflow-hidden shadow-lg flex-shrink hover:scale-[1.01] transition-transform duration-300 ease-in-out cursor-pointer"
        style={{
          background: "linear-gradient(180deg, #CEF6F8 0%, #F0F1F1 100%)",
          minWidth: 0,
        }}
        onClick={onCardClick}
      >
        {/* Top badges */}
        <TopBadges saleLabel={saleLabel} />

        {/* Product image */}
        <ProductImage productImage={productImage} productName={productName} />

        {/* Product name, prices, and Add to Basket (bottom area) */}
        <div className="absolute left-2 right-2 bottom-3 flex flex-row items-end justify-between min-w-0">
          {/* ProductInfo gets a max-w to prevent overflow, AddToCartButton stays fixed right */}
          <div className="flex-1 min-w-0 max-w-[110px]">
            <ProductInfo
              productName={productName}
              salePrice={salePrice}
              originalPrice={originalPrice}
            />
          </div>
          <AddToCartButton addToCart={addToCart} />
        </div>
      </div>
    );
  }
);
