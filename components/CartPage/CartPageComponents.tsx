import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Heart, Trash2, Plus, Minus, ShoppingBag, Lock, CreditCard, Truck, Shield
} from "lucide-react";

/**
 * CartPageComponents - All-in-one cart page UI and logic for the cart route.
 * Includes header, item list, summary, and empty cart state.
 */
const CartPageComponents: React.FC = () => {
  // Cart context state
  const { cartItems, setCartItems } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Cart logic helpers
  const updateQuantity = (slug: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev: any) => prev.filter((item: any) => item.slug !== slug));
    } else {
      setCartItems((prev: any) => prev.map((item: any) => (item.slug === slug ? { ...item, quantity: newQuantity } : item)));
    }
  };
  const removeFromCart = (slug: string) => {
    setCartItems((prev: any) => prev.filter((item: any) => item.slug !== slug));
  };
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo("SAVE10");
      setPromoCode("");
    }
  };
  // Helper to parse price string to number
  function parsePrice(price: string | undefined) {
    if (!price) return 0;
    const cleaned = price.replace(/[^0-9,.-]+/g, "").replace(",", ".");
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }
  const getSubtotal = () => cartItems.reduce((total: number, item: any) => {
    const price = parsePrice(item.salePrice ?? item.originalPrice);
    return total + price * item.quantity;
  }, 0);
  const getDiscount = () => (appliedPromo === "SAVE10" ? getSubtotal() * 0.1 : 0);
  const getShipping = () => (getSubtotal() > 100 ? 0 : 5);
  const getTax = () => getSubtotal() * 0.2;
  const getTotal = () => getSubtotal() - getDiscount() + getShipping() + getTax();

  // Only render cart items list (no summary, promo, or badges)
  if (!cartItems.length) return null;
  return (
    <div className="space-y-8">
      {cartItems.map((item: any) => (
        <div key={item.slug} className="group">
          <div className="flex items-start space-x-6">
            {/* Product Image */}
            <div className="relative">
              <div className="w-24 h-24 bg-transparent rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                {typeof item.productImage === 'string' && item.productImage.startsWith('/') ? (
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="object-contain w-full h-full"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                ) : (
                  <div className="text-3xl">{item.productImage}</div>
                )}
              </div>
            </div>
            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#3AF0F7] transition-colors duration-200">
                      {item.productName}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-500"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {item.brand}
                    </span>
                    {item.stockStatus && (
                      <span className="text-xs font-medium text-white px-2 py-1 rounded-full" style={{ background: item.stockStatus === 'in_stock' ? '#15FF00' : item.stockStatus === 'low_stock' ? '#FFD600' : item.stockStatus === 'last_3' ? '#FFD600' : '#FF3B30' }}>
                        {item.stockStatus.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => removeFromCart(item.slug)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-black"
                    onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-lg font-semibold text-gray-900 bg-white">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-black"
                    onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  €{(() => {
                    const price = parsePrice(item.salePrice ?? item.originalPrice);
                    return (price * item.quantity).toFixed(2);
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPageComponents;
