import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroStats from "./HeroStats";

export default function HeroLeftContent() {
  return (
    <div className="flex flex-col justify-center items-start space-y-5 sm:space-y-6 md:space-y-8 w-full max-w-xl mx-auto lg:mx-0 pt-32 bg-transparent">
      {/* Subheading */}
      {/* <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2> */}
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
