// Moved and renamed from components/cart-sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, ShoppingBag, X, CreditCard, Lock } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import CartSidebarItem from "@/components/CartSidebar/CartSidebarItemCard";
import { useLanguage } from "@/context/LanguageContextNew";

export default function CartSidebarLayout() {
  const { t } = useLanguage();
  const { cartOpen, setCartOpen, cartItems, setCartItems } = useCart();
  const router = useRouter();

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

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Helper to parse price string to number
  function parsePrice(price: string | undefined) {
    if (!price) return 0;
    const cleaned = price.replace(/[^0-9,.-]+/g, "").replace(",", ".");
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }

  const getTotalPrice = () => {
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

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setCartOpen(false)}
      ></div>

      <div
        className={`absolute right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cart Header */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-[#3AF0F7]/10 to-[#8ef7fb]/10 backdrop-blur-sm">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] rounded-full flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {t("cart.shoppingCart")}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartOpen(false)}
              className="hover:bg-gray-200 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center w-10 h-10 text-gray-600"
            >
              <X className="!w-6 sm:!w-7 !h-6 sm:!h-7" />
            </Button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-0 sm:p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 md:py-12 animate-fade-in">
                <div className="w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br from-[#3AF0F7]/20 to-[#8ef7fb]/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse">
                  <ShoppingCart className="w-10 md:w-12 h-10 md:h-12 text-gray-300" />
                </div>
                <p className="text-gray-500 text-base md:text-lg font-semibold mb-2">
                  {t("cart.empty")}
                </p>
                <p className="text-gray-400 text-sm">
                  {t("cart.emptyDescription")}
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                {cartItems.map((item, index) => (
                  <div
                    key={item.slug}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className="animate-slide-in border-b border-gray-200 last:border-b-0"
                  >
                    <CartSidebarItem
                      item={item}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary and Checkout Button */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-gray-50 to-white backdrop-blur-sm animate-slide-up">
              <div className="flex justify-between items-center px-3 sm:px-4">
                <span className="text-base sm:text-lg font-semibold text-gray-900">
                  {t("cart.subtotal")}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  € {getTotalPrice().toFixed(2)}
                </span>
              </div>
              <div className="px-3 sm:px-4 mb-2">
                <span className="block text-sm text-gray-600">
                  {t("cart.shippingTaxes")}
                </span>
              </div>
              <button
                type="button"
                className="max-w-sm w-full flex flex-row justify-center items-center py-[10px] px-6 bg-[#4F46E5] shadow-sm rounded-md relative transition-all duration-300 hover:bg-[#4338ca] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-auto mt-4"
                style={{ minHeight: 40, borderRadius: 6 }}
                onClick={() => {
                  setCartOpen(false);
                  router.push("/cart");
                }}
              >
                <span
                  className="font-medium text-[16px] leading-6 text-white flex items-center"
                  style={{ height: 24, maxWidth: 350 }}
                >
                  {t("cart.checkout")}
                </span>
              </button>
              <div className="flex flex-row justify-center items-center mt-4 space-x-2 animate-fade-in">
                {/* or label */}
                <span className="flex items-center text-[14px] leading-5 text-gray-600">
                  {t("cart.or")}
                </span>
                {/* Continue Shopping button */}
                <button
                  type="button"
                  className="flex items-center text-[14px] leading-5 font-medium text-indigo-600 hover:text-indigo-500"
                  style={{ height: 20, minWidth: 146 }}
                  onClick={() => {
                    setCartOpen(false);
                    router.push("/products");
                  }}
                >
                  {t("cart.continueShopping")}
                </button>
              </div>

              {/* <div className="flex items-center justify-center mt-2 md:mt-3 text-xs text-gray-500 animate-fade-in">
                <CreditCard className="w-3 md:w-4 h-3 md:h-4 mr-1" />
                Secure payment with SSL encryption
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
