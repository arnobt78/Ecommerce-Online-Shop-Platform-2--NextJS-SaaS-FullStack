// Moved from components/Layout/CartSidebar/CartSidebarItem.tsx

import { Trash2 } from "lucide-react";
import Image from "next/image";

import type { CartItem } from "@/context/CartContext";
import { StockStatusLabel } from "../ui/StockStatusLabel";
import { useLanguage } from "@/context/LanguageContextNew";
interface CartSidebarItemProps {
  item: CartItem;
  updateQuantity: (slug: string, newQuantity: number) => void;
  removeFromCart: (slug: string) => void;
}

export default function CartSidebarItem({
  item,
  updateQuantity,
  removeFromCart,
}: CartSidebarItemProps) {
  const { t } = useLanguage();
  // Debug: log the item object to see what is actually in the cart
  console.log("CartSidebarItemCard item:", item);

  const handleViewProduct = () => {
    if (typeof window !== "undefined") {
      window.location.assign(`/product-detail/${item.slug}`);
    }
  };

  return (
    <div className="flex items-stretch bg-transparent p-4 hover:bg-gray-50 transition-colors duration-300">
      {/* Product image frame, stretches to match content height */}
      <div className="flex-shrink-0 flex flex-col justify-center">
        <div className="w-20 h-20 border border-gray-200 rounded-lg flex items-center justify-center bg-white mr-2 sm:mr-4 overflow-hidden">
          {item.productImage &&
          typeof item.productImage === "string" &&
          item.productImage.length > 0 ? (
            <Image
              src={
                item.productImage.startsWith("http://") ||
                item.productImage.startsWith("https://")
                  ? item.productImage
                  : "/" + item.productImage.replace(/^\/+/, "")
              }
              alt={item.productName}
              width={80}
              height={80}
              className="object-contain w-full h-full"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="text-gray-300 text-xs">{t("cart.noImage")}</div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        {/* Top row: name (left), price (right) */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="font-semibold text-gray-900 hover:text-indigo-600 text-sm sm:text-md leading-tight truncate text-left"
            onClick={handleViewProduct}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
            }}
          >
            {item.productName || t("cart.unnamed")}
          </button>
          <div className="text-md font-semibold text-gray-900 ml-2 sm:ml-4 whitespace-nowrap">
            €{" "}
            {(() => {
              // Use salePrice if it is a non-empty string, otherwise fallback to originalPrice
              let price =
                typeof item.salePrice === "string" &&
                item.salePrice.trim().length > 0
                  ? item.salePrice
                  : item.originalPrice;
              if (!price || typeof price !== "string") return "0.00";
              const cleaned = price
                .replace(/[^0-9,.-]+/g, "")
                .replace(",", ".");
              const num = parseFloat(cleaned);
              return isNaN(num) ? "0.00" : num.toFixed(2);
            })()}
          </div>
        </div>

        {/* Second row: brand (left), stock status (right) */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 truncate">
            {item.brand || ""}
          </div>
          <div className="">
            <StockStatusLabel
              stockStatus={item.stockStatus}
              labelClassName="pl-2 text-sm text-gray-500"
              dotClassName="-left-0.5 top-1" // or adjust as needed
            />
          </div>
        </div>

        {/* Third row: quantity controls (left), trash (right) */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.slug, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded text-lg text-gray-700 hover:bg-gray-200 transition border border-gray-200"
              aria-label={t("cart.decreaseQuantity")}
              disabled={item.quantity <= 1}
            >
              –
            </button>
            <span className="flex items-baseline w-4 justify-center">
              <span className="font-semibold text-base text-gray-900">
                {item.quantity}
              </span>
            </span>
            <button
              onClick={() => updateQuantity(item.slug, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded text-lg text-gray-700 hover:bg-gray-200 transition border border-gray-200"
              aria-label={t("cart.increaseQuantity")}
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.slug)}
            className="text-red-500 hover:text-red-600 transition ml-2"
            aria-label={t("cart.removeFromCart")}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
