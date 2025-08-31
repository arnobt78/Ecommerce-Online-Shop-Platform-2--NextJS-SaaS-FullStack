// --- Imports for merged components ---
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CountUp from "react-countup";
import * as React from "react";

// --- HeroStats: Stats with animated numbers ---
const stats = [
  { num: 47, text: "Orders today" },
  { num: 7000, text: "Orders", suffix: "+" },
  { num: 4000, text: "Customers", suffix: "+" },
];

const HeroStats = () => {
  return (
    <div className="w-full bg-transparent min-w-0 overflow-hidden">
      <div className="flex flex-row flex-nowrap min-w-0 w-full bg-transparent overflow-hidden">
        {stats.map((item, idx) => (
          <React.Fragment key={item.text}>
            <div
              className={`flex-1 min-w-0 flex-shrink flex flex-col items-center justify-center bg-transparent px-2 py-2`}
            >
              <div className="flex flex-col items-center justify-center h-full min-w-0">
                <div className="text-xl sm:text-4xl font-medium sm:font-semibold text-gray-900 mb-1 text-center truncate min-w-0">
                  <CountUp
                    end={item.num}
                    duration={2}
                    delay={0.5}
                    suffix={item.suffix || ""}
                    separator=""
                  />
                </div>
                <div className="text-xs sm:text-base text-gray-600 text-center truncate min-w-0">
                  {item.text}
                </div>
              </div>
            </div>
            {idx < stats.length - 1 && (
              <div className="flex items-center flex-shrink-0">
                <div className="h-10 sm:h-14 w-px bg-gray-200" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// --- HeroLines: Animated SVG lines for visual interest ---
const HeroLines: React.FC = () => {
  return (
    <div className="hidden sm:block">
      {/* <svg className="absolute left-0 top-0 w-full h-full pointer-events-none z-0" width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 300 Q720 100 1440 300" stroke="#3AF0F7" strokeOpacity="0.12" strokeWidth="8" className="hero-line hero-line-1" />
        <path d="M0 400 Q720 200 1440 400" stroke="#8ef7fb" strokeOpacity="0.10" strokeWidth="6" className="hero-line hero-line-2" />
        <path d="M0 500 Q720 300 1440 500" stroke="#3AF0F7" strokeOpacity="0.08" strokeWidth="4" className="hero-line hero-line-3" />
      </svg> */}
    </div>
  );
};

// --- HeroRightImage: Hero visual image ---
function HeroRightImage() {
  return (
    <div className="hidden sm:flex items-center justify-end w-full h-auto object-cover mt-24 max-h-[200px] sm:max-h-[400px] bg-transparent relative">
      {/* SVG Gradient Glow */}
      {/* <svg
        width="635"
        height="635"
        viewBox="0 0 635 635"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-32 -right-32 sm:top-[-120px] sm:right-[-120px] z-10 pointer-events-none"
        style={{ filter: 'blur(8px)' }}
      >
        <rect
          x="634.032"
          y="0"
          width="634.032"
          height="634.032"
          rx="317.016"
          transform="rotate(90 634.032 0)"
          fill="url(#hero-gradient)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="hero-gradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
            <stop offset="0%" stopColor="#3AF0F7" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#8ef7fb" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <img
        src="/group-32.png"
        alt="Hero visual"
        className="object-contain pointer-events-none relative sm:top-[120px] left-12 sm:left-0 z-20"
        width="100%"
        height="100%"
        loading="lazy"
        draggable={false}
      /> */}
      {/* <img
        alt="Hero background"
        loading="lazy"
        decoding="async"
        data-nimg="fill"
        className="min-h-screen absolute"
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          left: 0,
          top: -300,
          right: 0,
          bottom: 0,
          objectFit: "cover",
          color: "transparent",
        }}
        src="/hero-gradient.svg"
      /> */}
    </div>
  );
}

// --- HeroLeftContent: Main hero text, CTA, and stats ---
function HeroLeftContent() {
  return (
    <div className="flex flex-col justify-center items-start w-full max-w-xl mx-auto sm:mx-0 bg-transparent">
      {/* Rating */}
      <div className="flex items-center space-x-2">
        <svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.27372 15.7423L5.83717 10.0608L0.593597 6.23945L7.52088 5.73398L10.2148 0.376007L12.9088 5.73398L19.8361 6.23945L14.5925 10.0608L16.1559 15.7423L10.2148 12.7297L4.27372 15.7423Z"
            fill="black"
          />
        </svg>
        <span className="text-gray-500 text-xs">4.47 | 537 Reviews</span>
      </div>
      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-none sm:leading-tight whitespace-wrap sm:whitespace-nowrap z-30 mb-2 items-left sm:items-center">
        Never run out <br className="block sm:hidden" />
        of snus again
      </h1>
      <h3 className="text-xl sm:text-3xl text-gray-900 leading-tight whitespace-wrap sm:whitespace-nowrap mb-8 z-30 items-left sm:items-center">
        Choose from huge <br className="block sm:hidden" /> sortiment of
        exclusive
        <br />
        brands, flavors and <br className="block sm:hidden" />
        strength <br className="hidden sm:block" />
        for best price on market
        <br className="hidden sm:block" />
        with free shipping.
      </h3>
      {/* CTA Button */}
      <div
        className="button-wrapper mb-12 relative inline-block"
        style={{ width: "170px", height: "56px" }}
      >
        {/* Rotating border overlay - always on top, outside button/link */}
        <div
          className="rotating-border pointer-events-none absolute inset-0 z-50"
          style={{ width: "170px", height: "56px" }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 180 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            style={{ borderRadius: "16px" }}
          >
            <rect
              x="1"
              y="1"
              width="170"
              height="56"
              rx="16"
              fill="none"
              stroke="url(#border-gradient)"
              strokeWidth="2.5"
              strokeDasharray="120 240"
              strokeDashoffset="0"
              className="svg-border-anim"
            />
            <defs>
              <linearGradient
                id="border-gradient"
                x1="0"
                y1="0"
                x2="170"
                y2="56"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#02000C" />
                <stop offset="1" stopColor="#02000C" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <Link href="/products">
          <button
            className="buy-button relative px-8 py-3 text-gray-900 text-lg font-medium flex items-center rounded-2xl bg-[radial-gradient(38.76%_67.86%_at_48.35%_100%,_#FFFFFF_0%,_#3AD8E9_100%)] shadow-[0_0_620px_#0A0F8A,0_0_354px_#0A0F8A]"
            style={{
              minWidth: "160px",
              minHeight: "54px",
              borderRadius: "16px",
              zIndex: 10,
            }}
            type="button"
          >
            <span>Buy now</span>
            <ArrowRight className="ml-2 h-5 w-5" />
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-24 h-8 bg-white rounded-full z-10 blur-lg"></div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-8 bg-white rounded-full z-10 blur-md"></div>
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-12 h-8 bg-white rounded-full z-10 blur"></div>
          </button>
        </Link>
        <style jsx global>{`
          @keyframes move-border-segment {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -360;
            }
          }
          .svg-border-anim {
            animation: move-border-segment 2.5s linear infinite;
          }
        `}</style>
      </div>
      {/* Stats with vertical dividers */}
      <div className="w-full">
        <HeroStats />
      </div>
    </div>
  );
}

// --- Main HeroSection component ---
export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden w-full mt-20 sm:mt-0 sm:min-h-screen object-top bg-transparent">
      {/* Hero background image as full-section background */}
      <img
        alt="Hero background"
        loading="lazy"
        decoding="async"
        data-nimg="fill"
        className="hidden sm:block absolute inset-0 w-full h-full min-h-screen object-contain z-0"
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          left: 150,
          top: 0,
          right: 0,
          bottom: 0,
          objectFit: "contain",
          objectPosition: "top",
          color: "transparent",
        }}
        // src="/hero-img-final.svg"
        src="/hero-img-compressed.jpg"
      />
      {/* Hero Lines - animated lines for visual interest */}
      <HeroLines />
      {/* Centered, smaller background circle for glow (kept for extra effect) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[1100px] sm:h-[1100px] z-0 pointer-events-none bg-transparent"></div>
      <div className="max-w-[1440px] mx-auto px-2 sm:px-16 relative z-10 w-full bg-transparent flex flex-col items-start justify-center">
        {/* Left Content */}
        <HeroLeftContent />
        {/* Right Hero SVG Image (if needed in future) */}
        {/* <HeroRightImage /> */}
      </div>
    </section>
  );
}
