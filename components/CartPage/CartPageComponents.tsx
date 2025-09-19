"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Lock,
  Truck,
  Clock,
  Package,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { StockStatusLabel } from "@/components/ui/StockStatusLabel";
import { useLanguage } from "@/context/LanguageContextNew";

// Parse price string to number
function parsePrice(price: string | undefined) {
  if (!price) return 0;
  const cleaned = price.replace(/[^0-9,.-]+/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

const CartPageComponents = () => {
  const { t } = useLanguage();
  const { cartItems, setCartItems, cartOpen, setCartOpen } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Use slug as id for cart operations
  const updateQuantity = (slug: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.slug !== slug));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.slug === slug ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (slug: string) => {
    setCartItems((prev) => prev.filter((item) => item.slug !== slug));
  };

  const applyPromoCode = () => {
    // Support SAVE30 promo code interactively
    if (promoCode.trim().toLowerCase() === "save30") {
      setAppliedPromo("SAVE30");
      setPromoCode("");
    } else {
      setAppliedPromo(null);
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      // Use salePrice if it is a non-empty string, otherwise fallback to originalPrice
      let priceStr =
        typeof item.salePrice === "string" && item.salePrice.trim().length > 0
          ? item.salePrice
          : item.originalPrice;
      const price = parsePrice(priceStr);
      return total + price * item.quantity;
    }, 0);
  };

  const getDiscount = () => {
    return appliedPromo === "SAVE30" ? getSubtotal() * 0.3 : 0;
  };

  // Shipping is always free for all products, so no calculation needed

  const getTotal = () => {
    // Remove shipping and tax from total calculation
    return getSubtotal() - getDiscount();
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-transparent">
        {/* <Header /> */}
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
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
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* <Header /> */}
      <div className="max-w-7xl mx-auto px-2 sm:px-0 pt-20 sm:pt-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
            {t("cartPage.title")}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-7">
            <div className="sm:bg-white/80 sm:backdrop-blur-sm sm:rounded-2xl sm:shadow-xl sm:border sm:border-gray-200/50 overflow-hidden">
              <div className="sm:p-8">
                <div className="space-y-4 sm:space-y-8">
                  {cartItems.map((item, index) => {
                    return (
                      <div key={item.slug} className="group">
                        <div className="flex items-start space-x-2 sm:space-x-6">
                          {/* Product Image */}
                          <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#8cedf8]/30 via-white to-[#3AF0F7]/20 rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                              {/* Robust image logic: show image if valid URL, else fallback */}
                              {typeof item.productImage === "string" &&
                              item.productImage.length > 0 ? (
                                <Image
                                  src={
                                    item.productImage.startsWith("http://") ||
                                    item.productImage.startsWith("https://")
                                      ? item.productImage
                                      : "/" +
                                        item.productImage.replace(/^\/+/, "")
                                  }
                                  alt={item.productName}
                                  width={96}
                                  height={96}
                                  className="object-contain w-full h-full"
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                  }}
                                />
                              ) : (
                                <div className="text-2xl">
                                  {t("cartPage.noImage")}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center sm:space-x-3">
                                  {item.slug ? (
                                    <Link
                                      href={`/product-detail/${item.slug}`}
                                      className="group hover:cursor-pointer"
                                    >
                                      <h3 className="text-sm sm:text-xl font-medium text-gray-900 hover:text-blue-700 transition-colors duration-300">
                                        {item.productName}
                                      </h3>
                                    </Link>
                                  ) : (
                                    <h3 className="text-sm sm:text-xl font-medium text-gray-900">
                                      {item.productName}
                                    </h3>
                                  )}
                                </div>
                                <div className="flex items-center">
                                  <StockStatusLabel
                                    stockStatus={item.stockStatus}
                                    labelClassName="pl-2 text-sm text-gray-500"
                                    dotClassName="-left-0.5 top-1"
                                  />
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.slug)}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-full p-2 transition-all duration-300"
                              >
                                <Trash2 className="w-8 h-8" />
                              </Button>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center sm:space-x-4">
                                <div className="flex items-center space-x-2 bg-gray-50 rounded-xl mt-2 sm:mt-3">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="w-8 sm:w-8 h-8 sm:h-8 rounded-lg bg-gray-200 hover:bg-gray-300 hover:shadow-md transition-all duration-300"
                                    onClick={() =>
                                      updateQuantity(
                                        item.slug,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="w-6 sm:w-8 text-center font-semibold text-md sm:text-lg text-gray-900">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="w-8 sm:w-8 h-8 sm:h-8 rounded-lg bg-gray-200 hover:bg-gray-300 hover:shadow-md transition-all duration-300"
                                    onClick={() =>
                                      updateQuantity(
                                        item.slug,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg sm:text-xl font-semibold text-gray-900">
                                  €{" "}
                                  {(() => {
                                    // Use salePrice if it is a non-empty string, otherwise fallback to originalPrice
                                    let price =
                                      typeof item.salePrice === "string" &&
                                      item.salePrice.trim().length > 0
                                        ? item.salePrice
                                        : item.originalPrice;
                                    const cleaned = price
                                      ? price
                                          .replace(/[^0-9,.-]+/g, "")
                                          .replace(",", ".")
                                      : "0";
                                    const num = parseFloat(cleaned);
                                    return (num * item.quantity).toFixed(2);
                                  })()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < cartItems.length - 1 && (
                          <div className="mt-8">
                            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary section */}
          <div className="lg:col-span-5 mt-2 sm:mt-0">
            <div className="bg-transparent sm:bg-white sm:bg-opacity-80 sm:rounded-2xl sm:shadow-xl sm:border sm:border-gray-200/50 p-2 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {t("cartPage.orderSummary")}
                </h2>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    {t("cartPage.subtotal")} ({getTotalItems()}{" "}
                    {getTotalItems() === 1
                      ? t("cartPage.item")
                      : t("cartPage.items")}
                    )
                  </span>
                  <span className="font-semibold">
                    € {getSubtotal().toFixed(2)}
                  </span>
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
                  <span className="text-2xl font-semibold text-gray-900">
                    € {getTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" passHref legacyBehavior>
                <a className="max-w-sm w-full flex flex-row justify-center items-center py-[10px] px-6 bg-blue-500 shadow-sm rounded-md relative transition-all duration-300 hover:bg-blue-600 active:bg-blue-700 mx-auto mt-4 text-white font-semibold text-base">
                  <Lock className="w-5 h-5 mr-2" />{" "}
                  {t("cartPage.secureCheckout")}
                </a>
              </Link>

              {/* delivery feature section */}
              <div className="my-8 flex justify-center items-center w-full">
                <div className="flex flex-row items-center justify-center w-full bg-[#3AF0F7]/10 rounded-lg px-4 py-6 border border-green-100 gap-6">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Clock className="w-6 h-6 text-gray-700" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 font-medium">
                        {t("cartPage.ordersPlaced")}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-gray-700">
                        {t("cartPage.today")}
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center mx-0 sm:mx-4">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        d="M3,12H21m-3,3,3-3L18,9"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Package className="w-6 h-6 text-gray-700" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 font-medium">
                        {t("cartPage.delivered")}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-gray-700">
                        {t("cartPage.deliveryTime")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 my-8" />

              <div>
                {/* Promo Code section */}
                <div className="w-full px-2 sm:px-0 py-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t("cartPage.promoCode")}
                    </h3>
                  </div>
                  <div className="flex space-x-2 sm:space-x-2 mt-2">
                    <input
                      placeholder={t("cartPage.enterPromoCode")}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="border border-[#E0E0E0] rounded-md px-4 py-2 text-md text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-[#8ffaff]"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-gray-300 hover:bg-blue-400 text-gray-900 hover:text-white text-sm sm:text-base font-semibold px-4 sm:px-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 active:bg-blue-700"
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

                <div className="block sm:hidden border-t border-gray-200 mt-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageComponents;
