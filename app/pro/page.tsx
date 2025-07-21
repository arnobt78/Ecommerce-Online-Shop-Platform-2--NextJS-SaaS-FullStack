"use client"

// import Image from "next/image"
import { ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar/Navbar"
import { useEffect, useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer/FooterSectionLayout"

export default function SnuzzProLanding() {
  const { cartItems, setCartItems, cartOpen, setCartOpen } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // Sample products for search functionality
  const allProducts = [
    {
      id: 1,
      name: "Snuzz Classic",
      brand: "Snuzz",
      category: "Nicotine",
      price: 12.99,
      salePrice: 9.99,
      rating: 4.5,
      image: "SC",
    },
    {
      id: 2,
      name: "Snuzz Pro Edition",
      brand: "Snuzz",
      category: "Premium",
      price: 19.99,
      salePrice: 15.99,
      rating: 4.8,
      image: "SPE",
    },
  ];


  // ...existing code...
  const productSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen"
    >
      {/* Header: Hide on any screen if cart is open */}
      {!cartOpen && <Navbar allProducts={allProducts} noBlur />}

      {/* Hero Section */}
      <div className="relative w-full bg-transparent">
        {/* Background Ellipse */}
        <div
          className="absolute w-[1419px] h-[1512px] left-[-66px] top-[-713px] opacity-50 pointer-events-none z-0"
          style={{
            background: "radial-gradient(50% 50% at 50% 50%, #3CF9FF 0%, #F5FFFF 100%)",
            transform: "matrix(0, 1, 1, 0, 0, 0)",
          }}
        />
        <section className="relative flex flex-col items-center justify-center px-8 py-20 pt-32 text-center z-10">
          <h1 className="text-[28px] sm:text-[40px] font-semibold text-gray-900 mb-6">Take nicotine under control!</h1>

          <div className="mb-8">
            <p className="text-lg text-gray-700">Afraid of negative effects of nicotine on your health?</p>
            <p className="text-lg text-gray-700">Become professional snus user with snuzz PRO.</p>
          </div>

          <div className="flex items-center space-x-4 mb-20">
            <Button
              className="text-black font-medium px-8 py-3 rounded-md transition-all duration-300"
              style={{
                backgroundColor: "#22d3ee",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#06b6d4"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#22d3ee"
              }}
            >
              Try for free
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-gray-400 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-md transition-all duration-300"
            >
              Log in
            </Button>
          </div>

          <div className="flex flex-col items-center mt-24 cursor-pointer hover:opacity-75" onClick={handleScrollDown}>
            <div className="bg-black rounded-full p-2 mb-2">
              <ChevronDown className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-gray-600">Scroll Down</span>
          </div>
        </section>
      </div>

      {/* Product Section */}
      <section ref={productSectionRef} className="flex flex-col items-center justify-center px-4 sm:px-8 py-10 sm:py-20 bg-transparent relative z-40">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-full sm:max-w-md w-full text-center">
          <div className="mb-8">
            <img
              src="/pro-logo.png"
              alt="Snuzz PRO"
              width={160}
              height={48}
              className="h-10 sm:h-12 w-auto mx-auto mb-4 sm:mb-6"
              loading="lazy"
              draggable={false}
            />
            <div className="text-gray-500 border-b border-gray-300 border-1 pb-6">
              <p className="text-sm sm:text-base">Unleash the Power of</p>
              <p className="text-sm sm:text-base">Knowledge with snuzz PRO</p>
            </div>
          </div>

          <div className="space-y-4 mb-8 text-base sm:text-lg">
            <div className="flex items-center space-x-4">
              <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-600 flex-shrink-0" />
              <span className="text-md sm:text-base text-gray-800">6+ hours of knowledge</span>
            </div>
            <div className="flex items-center space-x-4">
              <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-600 flex-shrink-0" />
              <span className="text-md sm:text-base text-gray-800">Know the risks</span>
            </div>
            <div className="flex items-center space-x-4">
              <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-600 flex-shrink-0" />
              <span className="text-md sm:text-base text-gray-800">Avoid addiction</span>
            </div>
            <div className="flex items-center space-x-4">
              <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-600 flex-shrink-0" />
              <span className="text-md sm:text-base text-gray-800">Be healthy!</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline justify-center mb-2">
              <span className="text-3xl sm:text-5xl font-bold text-gray-900">€10</span>
              <span className="text-xs sm:text-base text-gray-500 ml-2">per 14 days</span>
            </div>
          </div>

          <Button
            className="w-full bg-transparent border-2 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-base"
            style={{
              borderColor: "#22d3ee",
              color: "#22d3ee",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(34, 211, 238, 0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
            }}
          >
            Try fro free
          </Button>
        </div>
      </section>
    </div>
  )
}
