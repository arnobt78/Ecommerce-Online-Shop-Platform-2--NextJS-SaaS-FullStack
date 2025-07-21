// Moved and renamed from components/cart-sidebar.tsx
"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, X, CreditCard, Lock } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import CartSidebarItem from "@/components/CartSidebar/CartSidebarItemCard";

export default function CartSidebarLayout() {
  const { cartOpen, setCartOpen, cartItems, setCartItems } = useCart();
  const router = useRouter();

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
                <ShoppingCart className="w-4 md:w-5 h-4 md:h-5 text-black" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Cart ({getTotalItems()})</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartOpen(false)}
              className="hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 w-8 md:w-10 h-8 md:h-10"
            >
              <X className="w-5 md:w-6 h-5 md:h-6" />
            </Button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 md:py-12 animate-fade-in">
                <div className="w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br from-[#3AF0F7]/20 to-[#8ef7fb]/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse">
                  <ShoppingCart className="w-10 md:w-12 h-10 md:h-12 text-gray-300" />
                </div>
                <p className="text-gray-500 text-base md:text-lg font-semibold mb-2">Your cart is empty</p>
                <p className="text-gray-400 text-sm">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {cartItems.map((item, index) => (
                  <div key={item.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-in">
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
            <div className="border-t border-gray-200 p-4 md:p-6 bg-gradient-to-r from-gray-50 to-white backdrop-blur-sm animate-slide-up">
              <div className="flex justify-between items-center mb-3 md:mb-4 p-3 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm">
                <span className="text-base md:text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-xl md:text-2xl font-bold text-black">
                  €{getTotalPrice().toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black font-bold py-3 md:py-4 rounded-lg md:rounded-xl text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                onClick={() => {
                  setCartOpen(false);
                  router.push("/cart");
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <span className="relative flex items-center justify-center">
                  <Lock className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                  Secure Checkout
                </span>
              </Button>
              <div className="flex items-center justify-center mt-2 md:mt-3 text-xs text-gray-500 animate-fade-in">
                <CreditCard className="w-3 md:w-4 h-3 md:h-4 mr-1" />
                Secure payment with SSL encryption
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
