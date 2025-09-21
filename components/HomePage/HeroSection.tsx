// --- Imports for merged components ---
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CountUp from "react-countup";
import * as React from "react";
import { useLanguage } from "@/context/LanguageContextNew";
import Image from "next/image";

// --- HeroStats: Stats with animated numbers ---
const HeroStats = () => {
  const { t } = useLanguage();

  // Static stats, translation only, no counter animation
  const stats = [
    { num: 47, text: t("hero.stats.ordersToday") },
    { num: 7000, text: t("hero.stats.orders"), suffix: "+" },
    { num: 4000, text: t("hero.stats.customers"), suffix: "+" },
  ];
  return (
    <div className="w-full bg-transparent min-w-0 overflow-hidden">
      <div className="flex flex-row flex-nowrap min-w-0 w-full bg-transparent overflow-hidden min-h-[60px]">
        {stats.map((item, idx) => (
          <React.Fragment key={item.text}>
            <div
              className={`flex-1 min-w-0 flex-shrink flex flex-col items-center justify-center bg-transparent px-2 py-2`}
            >
              <div className="flex flex-col items-center justify-center h-full min-w-0">
                <div className="text-xl sm:text-4xl font-medium sm:font-semibold text-gray-900 mb-1 text-center truncate min-w-[60px]">
                  <span>
                    {item.num}
                    {item.suffix || ""}
                  </span>
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

// --- HeroLeftContent: Main hero text, CTA, and stats ---
function HeroLeftContent() {
  const { t, language } = useLanguage();
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Ensure we only render translations after hydration
  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Helper function to render HTML from translation strings
  const renderTranslation = (key: string) => {
    const text = t(key);
    // Parse HTML tags from the translation string
    return text.split(/(<br[^>]*\/>)/).map((part, index) => {
      if (part.startsWith("<br")) {
        // Extract className from the br tag
        const classNameMatch = part.match(/className="([^"]*)"/);
        const className = classNameMatch ? classNameMatch[1] : "";
        return <br key={index} className={className} />;
      }
      return part;
    });
  };

  // SSR/client output unified: always render translation-based layout

  return (
    <div className="flex flex-col justify-center items-start w-full max-w-xl sm:max-w-md md:max-w-lg lg:max-w-xl bg-transparent min-h-[400px]">
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
        <span className="text-gray-500 text-xs">{t("hero.rating")}</span>
      </div>
      {/* Main Heading */}
      <h1 className="text-4xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-none sm:leading-tight whitespace-wrap md:whitespace-nowrap z-30 mb-2 text-left">
        {renderTranslation("hero.title.mobile")}
      </h1>
      <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-900 leading-tight whitespace-wrap md:whitespace-nowrap mb-8 z-30 text-left">
        {renderTranslation("hero.subtitle.mobile")}
      </h3>

      {/* CTA Button */}
      <div className="button-wrapper mb-12 flex">
        <div className="button-container relative w-auto h-auto">
          {/* Rotating border overlay - matches button size and border radius */}
          <div
            className="rotating-border pointer-events-none absolute top-0 left-0 w-full h-full z-50"
            style={{ borderRadius: "16px", overflow: "hidden" }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 144 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="none"
              shapeRendering="geometricPrecision"
              style={{ display: "block" }}
            >
              <rect
                x="1"
                y="1"
                width="142"
                height="56"
                rx="16"
                fill="none"
                stroke="url(#border-gradient)"
                strokeWidth="2"
                strokeDasharray="120 240"
                strokeDashoffset="0"
                className="svg-border-anim"
              />
              <defs>
                <linearGradient
                  id="border-gradient"
                  x1="0"
                  y1="0"
                  x2="144"
                  y2="58"
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
              className="buy-button relative px-8 py-3 text-black text-lg font-inter font-medium flex items-center gap-2 rounded-2xl bg-[radial-gradient(38.76%_67.86%_at_48.35%_100%,_#FFFFFF_0%,_#3AD8E9_100%)] overflow-hidden"
              style={{
                minWidth: "140px",
                minHeight: "54px",
                borderRadius: "16px",
                zIndex: 1,
                margin: "2px",
              }}
              type="button"
            >
              <span style={{ whiteSpace: "nowrap" }}>{t("hero.buyNow")}</span>
              <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
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

            .buy-button {
              white-space: nowrap !important;
            }
            .buy-button span {
              white-space: nowrap !important;
            }
            .rotating-border {
              border-radius: 16px !important;
            }
          `}</style>
        </div>
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
    <section className="relative flex items-center justify-center overflow-hidden w-full pt-20 sm:pt-0 object-top bg-transparent sm:min-h-[700px]">
      {/* Hero background image as full-section background, w-screen for full width */}
      <Image
        src="/hero-img-compressed.jpg"
        alt="Hero background"
        width={1920}
        height={800}
        priority
        className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-screen h-[80vh] max-h-[800px] z-0"
        style={{
          position: "absolute",
          height: "100vh",
          maxHeight: "800px",
          width: "100vw",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          objectFit: "contain",
          objectPosition: "right center",
          color: "transparent",
        }}
      />
      {/* Mobile: half-circle image on right, vertically centered */}
      <div className="sm:hidden absolute -right-20 top-1/2 -translate-y-1/2 h-[300px] w-full overflow-hidden z-0 flex items-center justify-end">
        <Image
          src="/hero-img-compressed.jpg"
          alt="Hero background"
          width={180}
          height={220}
          priority
          className="h-full w-full object-cover"
          style={{
            objectFit: "cover",
            objectPosition: "right center",
            borderTopLeftRadius: "9999px",
            borderBottomLeftRadius: "9999px",
            color: "transparent",
          }}
        />
      </div>

      <div className="max-w-7xl [@media(max-width:1184px)]:px-4 sm:px-0 relative z-10 w-full bg-transparent flex flex-row items-center justify-start">
        {/* Left Content */}
        <HeroLeftContent />
      </div>
    </section>
  );
}
