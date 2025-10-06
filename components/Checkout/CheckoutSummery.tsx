// Checkout page for /checkout
// Responsive, two-column on desktop, single column on mobile
// Uses zod for validation, placeholder for payment gateway
// Imports summary/cart logic from context

"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useLanguage } from "@/context/LanguageContextNew";

export default function CheckoutSummery() {
  const { cartItems, appliedPromo, setAppliedPromo } = useCart();
  const { t } = useLanguage();
  // Promo code logic (same as cart page)
  const [promoCode, setPromoCode] = useState("");

  function parsePrice(price: string | undefined) {
    if (!price) return 0;
    const cleaned = price.replace(/[^0-9,.-]+/g, "").replace(",", ".");
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }
  const getSubtotal = () =>
    cartItems.reduce((total, item) => {
      // Use salePrice if it is a non-empty string, otherwise fallback to originalPrice
      let priceStr =
        typeof item.salePrice === "string" && item.salePrice.trim().length > 0
          ? item.salePrice
          : item.originalPrice;
      const price = parsePrice(priceStr);
      const originalTotal = price * item.quantity;
      const discountAmount = originalTotal * 0.1; // 10% discount per item
      const discountedTotal = originalTotal - discountAmount;
      return total + discountedTotal;
    }, 0);
  const getDiscount = () =>
    appliedPromo === "SAVE30" ? getSubtotal() * 0.3 : 0;
  // const getShipping = () => (getSubtotal() > 100 ? 0 : 9.99);
  // const getTax = () => (getSubtotal() - getDiscount()) * 0.08;
  const getTotal = () =>
    // getSubtotal() - getDiscount() + getShipping() + getTax();
    getSubtotal() - getDiscount();
  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const applyPromoCode = () => {
    // Support SAVE30 promo code interactively
    if (promoCode.trim().toLowerCase() === "save30") {
      setAppliedPromo("SAVE30");
      setPromoCode("");
    } else {
      setAppliedPromo(null);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-transparent">
        {/* <Header /> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-0 py-12 pt-32">
          <div className="text-center py-20">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#3AF0F7]/10 via-[#8ef7fb]/20 to-[#3AF0F7]/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <div className="w-24 h-24 bg-gradient-to-br from-[#3AF0F7]/20 to-[#8ef7fb]/30 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              {t("cartPage.empty.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
              {t("cartPage.empty.description")}
            </p>
            <Link href="/products">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-gray-900 font-semibold px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {t("cartPage.empty.exploreProducts")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Right: Cart Summary */}
      <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-6 sticky self-start">
        <h2 className="text-lg text-gray-900 font-semibold mb-4">
          {t("cartPage.orderSummary")}
        </h2>
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div key={item.slug} className="flex items-center py-4">
              {/* Product Image with Quantity Badge */}
              <div className="relative mr-4">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain rounded border"
                />
                {/* Quantity Badge - positioned on top-right corner of image */}
                <div className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-md px-2 py-1 min-w-[20px] text-center">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <span className="font-normal text-sm text-gray-900">
                  {item.productName}
                </span>
                <span className="font-normal text-xs text-gray-600">
                  {item.brand || ""}
                </span>
                <span className="font-normal text-xs text-gray-600">
                  Discount: 10%
                </span>
              </div>
              <div className="font-normal text-base text-gray-900">
                €{" "}
                {(() => {
                  let price =
                    typeof item.salePrice === "string" &&
                    item.salePrice.trim().length > 0
                      ? item.salePrice
                      : item.originalPrice;
                  const originalTotal =
                    (parsePrice(price) || 0) * item.quantity;
                  const discountAmount = originalTotal * 0.1; // 10% discount
                  const discountedTotal = originalTotal - discountAmount;
                  return discountedTotal.toFixed(2);
                })()}
              </div>
            </div>
          ))}
        </div>

        {/* Discount code input */}
        <div className="mt-6">
          <div className="flex space-x-2">
            <input
              placeholder={t("cartPage.enterPromoCode")}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
            />
            <button
              onClick={applyPromoCode}
              className="bg-gray-200 text-gray-700 font-semibold px-4 rounded disabled:opacity-50"
              disabled={!promoCode}
              type="button"
            >
              {t("cartPage.apply")}
            </button>
          </div>
          {appliedPromo && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl flex items-center">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm text-green-800 font-medium">
                {t("cartPage.promoApplied")
                  .replace("{code}", appliedPromo)
                  .replace("{amount}", getDiscount().toFixed(2))}
              </span>
            </div>
          )}
        </div>
        {/* Subtotal, Shipping, Total (with icons and tax) */}
        <div className="space-y-4 mb-6 mt-6">
          <div className="flex justify-between text-gray-700">
            <span className="flex items-center">
              <ShoppingBag className="w-4 h-4 mr-1" />
              {t("cartPage.subtotal")} ({getTotalItems()}{" "}
              {getTotalItems() === 1 ? "item" : "items"})
            </span>
            <span className="font-semibold">€ {getSubtotal().toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-gray-700">
            <span className="flex items-center">
              <Truck className="w-4 h-4 mr-1" />
              {t("cartPage.shipping")}
            </span>
            <span
              className="font-semibold px-3 rounded-full text-sm border-2 border-green-400 bg-green-50 text-green-700"
              style={{
                backgroundColor: "#e6f9f0",
                borderColor: "#34d399",
                color: "#059669",
              }}
            >
              {t("cartPage.free")}
            </span>
          </div>

          {getDiscount() > 0 && (
            <div className="flex justify-between text-green-600">
              <span>{t("cartPage.discount")}</span>
              <span>-€ {getDiscount().toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-gray-200 my-4" />
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-900">
              {t("cartPage.total")}
            </span>
            <span className="text-xl font-semibold text-gray-900">
              € {getTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
