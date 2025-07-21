

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
    <div className="w-full mt-6 border-t border-gray-200 bg-transparent">
      <div className="flex flex-row items-stretch justify-center w-full divide-x divide-gray-200 bg-transparent">
        {stats.map((item) => (
          <div
            key={item.text}
            className={`flex-1 flex flex-col items-center justify-center py-8 bg-transparent`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                <CountUp
                  end={item.num}
                  duration={2}
                  delay={0.5}
                  suffix={item.suffix || ""}
                />
              </div>
              <div className="text-base text-gray-600 text-center mt-1">
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- HeroLines: Animated SVG lines for visual interest ---
const HeroLines: React.FC = () => {
  return (
    <>
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none z-0" width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 300 Q720 100 1440 300" stroke="#3AF0F7" strokeOpacity="0.12" strokeWidth="8" className="hero-line hero-line-1" />
        <path d="M0 400 Q720 200 1440 400" stroke="#8ef7fb" strokeOpacity="0.10" strokeWidth="6" className="hero-line hero-line-2" />
        <path d="M0 500 Q720 300 1440 500" stroke="#3AF0F7" strokeOpacity="0.08" strokeWidth="4" className="hero-line hero-line-3" />
      </svg>
    </>
  );
};

// --- HeroRightImage: Hero visual image ---
function HeroRightImage() {
  return (
    <div className="flex items-center justify-end w-full h-auto object-cover mt-36 max-h-[200px] sm:max-h-[400px] bg-transparent">
      <img
        src="/group-32.svg"
        alt="Hero visual"
        className="object-contain pointer-events-none relative top-[48px] sm:top-[300px] left-0 max-w-5xl max-h-5xl"
        width="150%"
        height="150%"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

// --- HeroLeftContent: Main hero text, CTA, and stats ---
function HeroLeftContent() {
  return (
    <div className="flex flex-col justify-center items-start space-y-5 sm:space-y-6 md:space-y-8 w-full max-w-xl mx-auto lg:mx-0 pt-32 bg-transparent">
      {/* Rating */}
      <div className="flex items-center space-x-2 mb-2">
        <Star className="w-5 h-5 text-black fill-black" />
        <span className="text-gray-700 font-medium text-sm">4.47 | 537 Reviews</span>
      </div>
      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
        Never run out of snus again
      </h1>
      <p className="text-xl md:text-2xl text-gray-900 leading-relaxed max-w-2xl">
        Choose from huge sortiment of exclusive brands, flavors and strength for best price
        on market with free shipping.
      </p>
      {/* CTA Button */}
      <Link href="/products">
        <Button
          className="relative flex items-center justify-center px-8 py-4 rounded-[13px] text-[17px] font-semibold bg-[radial-gradient(38.76%_67.86%_at_48.35%_100%,_#FFFFFF_0%,_#3AD8E9_100%)] text-black text-2xl shadow-[0_0_620px_#0A0F8A,0_0_354px_#0A0F8A] border border-[#02000C] transition-all duration-300 group"
          style={{
            boxShadow: '0px 0px 620px #0A0F8A, 0px 0px 354px #0A0F8A',
            borderRadius: '13.4px',
            minWidth: '168px',
            minHeight: '54px',
          }}
        >
          <span className="mr-1" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500 }}>Buy now</span>
          <ArrowRight
            className="group-hover:translate-x-1 transition-transform"
            style={{ width: '30px', height: '30px', minWidth: '30px', minHeight: '30px' }}
          />
        </Button>
      </Link>
      {/* Stats with vertical dividers */}
      <HeroStats />
    </div>
  );
}

// --- Main HeroSection component ---
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full bg-transparent">
      {/* Hero Lines - animated lines for visual interest */}
      <HeroLines />
      {/* Centered, smaller background circle for glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[1100px] sm:h-[1100px] rounded-full bg-gradient-to-br from-[#3AF0F7]/10 via-[#8ef7fb]/10 to-white z-0 pointer-events-none"></div>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 relative z-10 w-full bg-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center min-h-[80vh] sm:min-h-[90vh] w-full">
          {/* Left Content */}
          <HeroLeftContent />
          {/* Right Hero SVG Image */}
          <HeroRightImage />
        </div>
      </div>
    </section>
  );
}
