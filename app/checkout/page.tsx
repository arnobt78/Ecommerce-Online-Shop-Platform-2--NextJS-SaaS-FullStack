// Checkout page for /checkout
// Responsive, two-column on desktop, single column on mobile
// Uses zod for validation, placeholder for payment gateway
// Imports summary/cart logic from context

"use client";

import { useState } from "react";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import CheckoutPayment from "@/components/Checkout/CheckoutPayment";
import { useCart } from "@/context/CartContext";
import { Percent, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  // Promo code logic (same as cart page)
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

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
      return total + price * item.quantity;
    }, 0);
  const getDiscount = () =>
    appliedPromo === "SAVE10" ? getSubtotal() * 0.1 : 0;
  const getShipping = () => (getSubtotal() > 100 ? 0 : 9.99);
  const getTax = () => (getSubtotal() - getDiscount()) * 0.08;
  const getTotal = () =>
    getSubtotal() - getDiscount() + getShipping() + getTax();
  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo("SAVE10");
      setPromoCode("");
    }
  };

  return (
    <div className="min-h-screen bg-white pt-12 sm:pt-24">
      <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Left: Form & Payment */}
        <div className="w-full">
          <CheckoutForm />
          <div className="mt-8">
            <CheckoutPayment />
          </div>
        </div>

        {/* Right: Cart Summary */}
        <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-6 sticky self-start top-8">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.slug} className="flex items-center py-4">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain rounded border mr-4"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">
                    {item.productName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.quantity} x{" "}
                    {(() => {
                      let price =
                        typeof item.salePrice === "string" &&
                        item.salePrice.trim().length > 0
                          ? item.salePrice
                          : item.originalPrice;
                      return price;
                    })()}
                  </div>
                </div>
                <div className="font-bold text-base">
                  €{" "}
                  {(() => {
                    let price =
                      typeof item.salePrice === "string" &&
                      item.salePrice.trim().length > 0
                        ? item.salePrice
                        : item.originalPrice;
                    return ((parsePrice(price) || 0) * item.quantity).toFixed(
                      2
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
          {/* Discount code input */}
          <div className="mt-6">
            <div className="flex space-x-2">
              <input
                placeholder="Discount code or gift card"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
              />
              <button
                onClick={applyPromoCode}
                className="bg-gray-200 text-gray-700 font-semibold px-4 rounded disabled:opacity-50"
                disabled={!promoCode}
              >
                APPLY
              </button>
            </div>
            {appliedPromo && (
              <div className="mt-2 text-green-600 text-sm font-medium">
                Promo code "{appliedPromo}" applied!
              </div>
            )}
          </div>
          {/* Subtotal, Shipping, Total (with icons and tax) */}
          <div className="space-y-4 mb-6 mt-6">
            <div className="flex justify-between text-gray-700">
              <span className="flex items-center">
                <ShoppingBag className="w-4 h-4 mr-1" />
                Subtotal ({getTotalItems()}{" "}
                {getTotalItems() === 1 ? "item" : "items"})
              </span>
              <span className="font-semibold">
                € {getSubtotal().toFixed(2)}
              </span>
            </div>
            {getShipping() === 0 && (
              <div className="flex justify-between items-center text-gray-700">
                <span className="flex items-center">
                  <Truck className="w-4 h-4 mr-1" /> Shipping
                </span>
                <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full text-sm">
                  Free
                </span>
              </div>
            )}
            {getShipping() > 0 && (
              <div className="flex justify-between items-center text-gray-700">
                <span className="flex items-center">
                  <Truck className="w-4 h-4 mr-1" /> Shipping
                </span>
                <span className="font-semibold">
                  € {getShipping().toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-gray-700">
              <span className="flex items-center">
                <Percent className="w-4 h-4 mr-1" />
                Tax
              </span>
              <span className="font-semibold">€ {getTax().toFixed(2)}</span>
            </div>
            {getDiscount() > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-€ {getDiscount().toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 my-4" />
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-semibold text-gray-900">
                € {getTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
