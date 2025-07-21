
import HeroLeftContent from "@/components/Home/Hero/HeroLeftContent";
import HeroRightImage from "@/components/Home/Hero/HeroRightImage";
import HeroLines from "@/components/Home/Hero/HeroLines";

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
