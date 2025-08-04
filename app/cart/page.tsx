"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Lock,
  CreditCard,
  Truck,
  Shield,
  Tag,
  Star,
  Heart,
  Clock,
  ArrowRight,
  Package,
  Percent,
} from "lucide-react"
import Link from "next/link"

import { useCart } from "@/context/CartContext"
import { StockStatusLabel } from "@/components/ui/StockStatusLabel";


// Parse price string to number
function parsePrice(price: string | undefined) {
  if (!price) return 0;
  const cleaned = price.replace(/[^0-9,.-]+/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export default function CartPage() {
  const { cartItems, setCartItems, cartOpen, setCartOpen } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  // Use slug as id for cart operations
  const updateQuantity = (slug: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.slug !== slug))
    } else {
      setCartItems((prev) => prev.map((item) => (item.slug === slug ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeFromCart = (slug: string) => {
    setCartItems((prev) => prev.filter((item) => item.slug !== slug))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo("SAVE10")
      setPromoCode("")
    }
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      // Prefer salePrice, fallback to originalPrice
      const price = parsePrice(item.salePrice ?? item.originalPrice);
      return total + price * item.quantity;
    }, 0)
  }

  const getDiscount = () => {
    return appliedPromo === "SAVE10" ? getSubtotal() * 0.1 : 0
  }

  const getShipping = () => {
    return getSubtotal() > 100 ? 0 : 9.99
  }

  const getTax = () => {
    return (getSubtotal() - getDiscount()) * 0.08
  }

  const getTotal = () => {
    return getSubtotal() - getDiscount() + getShipping() + getTax()
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-transparent">
        {/* <Header /> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
          <div className="text-center py-20">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#3AF0F7]/10 via-[#8ef7fb]/20 to-[#3AF0F7]/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <div className="w-24 h-24 bg-gradient-to-br from-[#3AF0F7]/20 to-[#8ef7fb]/30 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Your cart is empty</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
              Discover our curated collection of premium products and start building your perfect order.
            </p>
            <Link href="/products">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black font-semibold px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* <Header /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">Shopping Cart</h1>
              <p className="text-sm sm:text-lg text-gray-600 mt-1">Review your items and proceed to checkout</p>
            </div>
          </div>
          {/* <div className="text-right">
            <div className="text-2xl sm:text-4xl font-bold text-gray-900">{getTotalItems()}</div>
            <div className="text-gray-500">Items</div>
          </div> */}
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
                              {typeof item.productImage === 'string' && item.productImage.startsWith('/') ? (
                                <img
                                  src={item.productImage}
                                  alt={item.productName}
                                  className="object-contain w-full h-full"
                                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
                              ) : (
                                <div className="text-2xl">{item.productImage}</div>
                              )}
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center sm:space-x-3">
                                  {item.slug ? (
                                    <Link href={`/product-detail/${item.slug}`} className="group hover:cursor-pointer">
                                      <h3 className="text-sm sm:text-xl font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-300">
                                        {item.productName}
                                      </h3>
                                    </Link>
                                  ) : (
                                    <h3 className="text-sm sm:text-xl font-medium text-gray-900">
                                      {item.productName}
                                    </h3>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-500"
                                  >
                                    <Heart className="w-4 h-4" />
                                  </Button>
                                </div>
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                  <StockStatusLabel stockStatus={item.stockStatus} labelClassName="text-sm text-gray-500" />
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
                            <div className="flex items-center justify-between">
                              <div className="flex items-center sm:space-x-4">
                                <div className="flex items-center sm:space-x-3 bg-gray-50 rounded-xl">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className=" w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-gray-200 hover:bg-gray-300 hover:shadow-md transition-all duration-300"
                                    onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="w-8 sm:w-10 text-center font-semibold text-md sm:text-lg text-gray-900">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-gray-200 hover:bg-gray-300 hover:shadow-md transition-all duration-300"
                                    onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs sm:text-sm text-gray-500">Item Total</p>
                                <p className="text-lg sm:text-xl font-semibold text-gray-900">
                                  € {(() => {
                                    const price = item.salePrice ?? item.originalPrice;
                                    const cleaned = price ? price.replace(/[^0-9,.-]+/g, "").replace(",", ".") : "0";
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
            <div className="bg-transparent sm:bg-white sm:bg-opacity-80 sm:rounded-2xl sm:shadow-xl sm:border sm:border-gray-200/50 p-0 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                {/* <div className="w-10 h-10 bg-[#3AF0F7] rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-black" />
                </div> */}
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Order Summary</h2>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center"><ShoppingBag className="w-4 h-4 mr-1" />Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold">€ {getSubtotal().toFixed(2)}</span>
                </div>
                {getShipping() === 0 && (
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="flex items-center"><Truck className="w-4 h-4 mr-1" /> Shipping</span>
                    <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full text-sm">Free</span>
                  </div>
                )}
                {getShipping() > 0 && (
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="flex items-center"><Truck className="w-4 h-4 mr-1" /> Shipping</span>
                    <span className="font-semibold">€ {getShipping().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center"><Percent className="w-4 h-4 mr-1" />Tax</span>
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
                  <span className="text-2xl font-semibold text-gray-900">€ {getTotal().toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" passHref legacyBehavior>
                <a className="max-w-sm w-full flex flex-row justify-center items-center py-[10px] px-6 bg-[#4F46E5] shadow-sm rounded-md relative transition-all duration-300 hover:bg-[#4338ca] active:bg-[#4338ca]/10 mx-auto mt-4 text-white font-semibold text-base">
                  <Lock className="w-5 h-5 mr-2" /> Secure Checkout
                </a>
              </Link>


              {/* delivery feature section */}
              <div className="my-8">
                <div className="flex items-stretch bg-[#3AF0F7]/10 rounded-lg px-4 py-6 flex-row items-center sm:justify-between border border-green-100">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Clock className="w-6 h-6 text-gray-700" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 font-medium">Orders Placed</span>
                      <span className="text-sm sm:text-base font-semibold text-gray-700">Today</span>
                    </div>
                  </div>
                  <span className="flex items-center mr-4 sm:mr-0">
                    <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                      <path d="M3,12H21m-3,3,3-3L18,9" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Package className="w-6 h-6 text-gray-700" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 font-medium">Delivered</span>
                      <span className="text-sm sm:text-base font-semibold text-gray-700">2 days from now</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 my-8" />
              <div>
                {/* <div className="text-gray-700 font-semibold mb-2">Accepted Payment Methods</div> */}
                {/* <div className="flex space-x-3">
                  <div className="w-14 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold">VISA</span>
                  </div>
                  <div className="w-14 h-10 rounded-lg bg-red-600 flex items-center justify-center">
                    <span className="text-white font-bold">MC</span>
                  </div>
                  <div className="w-14 h-10 rounded-lg bg-blue-400 flex items-center justify-center">
                    <span className="text-white font-bold">AMEX</span>
                  </div>
                  <div className="w-14 h-10 rounded-lg bg-yellow-400 flex items-center justify-center">
                    <span className="text-white font-bold">PP</span>
                  </div>
                </div> */}

              {/* Promo Code section */}
              <div className="w-full px-2 sm:px-0 py-0">
                <div className="flex items-center space-x-2">
                  {/* <div className="w-10 h-10 bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] rounded-full flex items-center justify-center">
                  <Tag className="w-5 h-5 text-gray-900" />
                </div> */}
                <h3 className="text-lg font-semibold text-gray-900">Promo Code</h3>
              </div>
              <div className="flex space-x-2 sm:space-x-2 mt-2">
                <input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="border border-[#E0E0E0] rounded-md px-4 py-2 text-sm sm:text-base text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-[#8ffaff]"
                />
                <button
                  onClick={applyPromoCode}
                  className="bg-gray-300 hover:bg-[#2de0e7]/50 text-gray-900 text-sm sm:text-base font-semibold px-4 sm:px-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 active:bg-[#4338ca]/10"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                  <p className="text-sm text-green-800 font-medium flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Promo code "{appliedPromo}" applied! You saved €{getDiscount().toFixed(2)}
                  </p>
                </div>
              )}
              {/* <p className="text-xs text-gray-600 mt-3 flex items-center">
                <span className="w-2 h-2 bg-[#3AF0F7] rounded-full mr-2"></span>
                Try "SAVE10" for 10% off your order
              </p> */}
            </div>

            <div className="block sm:hidden border-t border-gray-200 mt-8" />
              <div></div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
