"use client"

// import Image from "next/image"
import { ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar/Navbar"

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer/FooterSectionLayout"
import { products } from "@/data/products";

export default function SnuzzProLanding() {
  const { cartItems, setCartItems, cartOpen, setCartOpen } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // Use centralized product data for search functionality
  const allProducts = products;


  // ...existing code...
  const productSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const router = useRouter();
  return (
    <div
      className=""
    >
      {/* Header: Hide on any screen if cart is open */}
      {/* {!cartOpen && <Navbar allProducts={allProducts} noBlur />} */}
      {/* Header is now rendered globally via layout, matching main page behavior */}

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
              onClick={() => {
                router.push("/login");
                setTimeout(() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                }, 0);
              }}
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
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-full sm:max-w-md w-full text-center items-center">
          <div className="mb-8 item-center text-center">
            {/* <img
              src="/pro-logo.png"
              alt="Snuzz PRO"
              width={160}
              height={48}
              className="h-10 sm:h-12 w-auto mx-auto mb-4 sm:mb-6"
              loading="lazy"
              draggable={false}
            /> */}
            <svg width="212" height="40" viewBox="0 0 212 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 mx-auto">
          <path fillRule="evenodd" clipRule="evenodd" d="M141.703 0L101.485 21.9095L120.794 16.1033L117.242 20.991L97.3704 26.7174L116.132 2.6217L78.3892 20.5442L95.2231 18.7249L79.7619 40L115.898 22.8406L105.333 37.3783L149.301 16.4998L122.942 24.0957L141.703 0ZM75.5439 22.6094L74.9588 24.6662C74.3356 26.8568 72.8308 27.952 70.4445 27.952C68.0219 27.952 67.1223 26.8568 67.7454 24.6662L72.5609 7.73941H63.0695L58.41 24.1185C57.4846 27.3711 57.568 29.8106 58.6601 31.4369C59.7522 33.0632 61.6361 33.8764 64.3117 33.8764C66.5173 33.8764 68.3765 33.3786 69.889 32.3829C71.4016 31.3871 72.6188 30.1591 73.5404 28.6988H73.8115L72.4094 33.6275H81.9007L85.3363 21.5511L75.5439 22.6094ZM76.4134 19.553L87.3871 14.342L89.2654 7.73941H79.7742L76.4134 19.553ZM34.5886 7.73941H44.0798L42.6777 12.6681H42.9489C43.8706 11.2077 45.0876 9.97972 46.6003 8.98403C48.1129 7.98833 49.9719 7.49048 52.1775 7.49048C54.8531 7.49048 56.737 8.30364 57.8292 9.92993C58.9213 11.5562 59.0046 13.9957 58.0794 17.2483L53.4197 33.6275H43.9285L48.7439 16.7007C49.3671 14.5101 48.4673 13.4149 46.0448 13.4149C43.6585 13.4149 42.1536 14.5101 41.5305 16.7007L36.7151 33.6275H27.2238L34.5886 7.73941ZM0 33.6275L2.45874 25.1641C2.48061 25.1641 2.56031 25.1643 2.69078 25.1648C4.71776 25.1726 18.986 25.227 19.0747 24.9152C19.1691 24.5832 19.0356 24.4173 18.6739 24.4173L9.79828 23.9692C7.3412 23.8365 5.64122 23.1395 4.69836 21.8783C3.80109 20.5838 3.70654 18.6921 4.41468 16.2028C5.19837 13.4481 6.57059 11.3571 8.53136 9.92993C10.5016 8.46959 13.0053 7.73941 16.0424 7.73941H31.8251L28.9517 16.2028C28.9298 16.2028 28.8516 16.2025 28.724 16.202H28.7199C26.7236 16.1942 12.8391 16.1401 12.7504 16.4517C12.7221 16.5513 12.7252 16.6674 12.7598 16.8003C12.8399 16.8998 12.9703 16.9496 13.1512 16.9496L22.0269 17.3976C24.4839 17.5305 26.1611 18.2439 27.0583 19.5384C28.0012 20.7997 28.1185 22.6748 27.4104 25.1641C26.6267 27.9188 25.2498 30.0264 23.2796 31.4868C21.3188 32.9139 18.8198 33.6275 15.7827 33.6275H0Z" fill="#02000C"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M159.347 15.0146C159.347 17.0818 158.825 18.9193 157.781 20.5271C156.75 22.1349 155.312 23.3408 153.466 24.1447C151.62 24.9486 149.449 25.3505 146.954 25.3505H143.04L141.206 34.1744H132.957L134.843 25.227L145.157 19.4361H146.649C147.833 19.4361 148.781 19.0788 149.494 18.3642C150.029 17.8277 150.367 17.1836 150.507 16.4319L152.922 15.0763L150.582 15.5776C150.58 14.6388 150.287 13.9216 149.704 13.4259C149.118 12.9155 148.278 12.6603 147.183 12.6603H145.732L144.88 16.7996L136.229 18.6536L138.743 6.72668H149.799C152.88 6.72668 155.242 7.44127 156.884 8.87044C158.526 10.2868 159.347 12.3349 159.347 15.0146ZM181.3 17.0327H181.248C180.383 16.5992 179.44 16.3824 178.42 16.3824C176.62 16.3824 175.158 16.9026 174.034 17.9431C172.927 18.9836 172.088 20.7697 171.517 23.3015L169.233 34.1744H158.178L161.785 17.1888C162.633 13.235 163.187 10.0182 163.446 7.53844H174.319C174.129 9.22053 173.904 10.9286 173.645 12.6627H173.748C174.769 10.6859 175.868 9.2292 177.044 8.29278C178.238 7.35636 179.622 6.88815 181.196 6.88815C181.854 6.88815 182.632 7.00087 183.532 7.2263L181.3 17.0327ZM209.898 27.1512C211.299 24.5674 212 21.7235 212 18.6194C212 14.8737 210.892 11.9864 208.678 9.95753C206.463 7.91128 203.332 6.88815 199.284 6.88815C196.62 6.88815 194.249 7.26966 192.173 8.03267C190.115 8.79568 188.376 9.89684 186.957 11.3361C185.539 12.7581 184.431 14.5182 183.636 16.6165C182.84 18.7148 182.442 20.8564 182.442 23.0414C182.442 26.7697 183.558 29.6657 185.789 31.7293C188.039 33.7929 191.213 34.8247 195.313 34.8247C198.67 34.8247 201.593 34.1917 204.085 32.9258C206.576 31.6426 208.514 29.7177 209.898 27.1512ZM200.244 15.9402C200.746 16.5472 200.996 17.4402 200.996 18.6194C200.996 20.9605 200.564 22.894 199.699 24.42C198.834 25.946 197.692 26.709 196.273 26.709C195.408 26.709 194.716 26.4142 194.197 25.8246C193.696 25.2177 193.445 24.3246 193.445 23.1454C193.445 21.7755 193.644 20.4489 194.042 19.1657C194.457 17.8651 195.019 16.8506 195.729 16.1223C196.438 15.3766 197.268 15.0038 198.22 15.0038C199.068 15.0038 199.742 15.3159 200.244 15.9402Z" fill="#01DAE3"/>
            </svg>

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
