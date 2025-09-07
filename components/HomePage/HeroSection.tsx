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
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Ensure we only render translations after hydration
  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Show loading state until hydrated to prevent layout shift
  if (!isHydrated) {
    const stats = [
      { num: 47, text: "Orders today" },
      { num: 7000, text: "Orders", suffix: "+" },
      { num: 4000, text: "Customers", suffix: "+" },
    ];
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
  }

  const stats = [
    { num: 47, text: t("hero.stats.ordersToday") },
    { num: 7000, text: t("hero.stats.orders"), suffix: "+" },
    { num: 4000, text: t("hero.stats.customers"), suffix: "+" },
  ];
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

  // Show loading state until hydrated to prevent layout shift
  if (!isHydrated) {
    return (
      <div className="flex flex-col justify-center items-start w-full max-w-xl sm:max-w-lg lg:max-w-xl bg-transparent">
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
          Never run out <br className="block sm:hidden" /> of snus again
        </h1>
        <h3 className="text-xl sm:text-3xl text-gray-900 leading-tight whitespace-wrap sm:whitespace-nowrap mb-8 z-30 items-left sm:items-center">
          Choose from huge <br className="block sm:hidden" /> sortiment of
          exclusive <br /> brands, flavors and{" "}
          <br className="block sm:hidden" /> strength{" "}
          <br className="hidden sm:block" /> for best price on market{" "}
          <br className="hidden sm:block" /> with free shipping.
        </h3>
        {/* CTA Button */}
        <div className="button-wrapper mb-12 relative inline-block">
          <Link href="/products">
            <button
              className="buy-button px-6 py-3 text-gray-900 text-lg font-medium flex items-center justify-center bg-[radial-gradient(38.76%_67.86%_at_48.35%_100%,_#FFFFFF_0%,_#3AD8E9_100%)] shadow-[0_0_620px_#0A0F8A,0_0_354px_#0A0F8A] whitespace-nowrap"
              style={{
                minWidth: "140px",
                minHeight: "54px",
                borderRadius: "16px",
                zIndex: 10,
              }}
              type="button"
            >
              <span>Buy now</span>
              <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-24 h-8 bg-white rounded-full z-10 blur-lg"></div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-8 bg-white rounded-full z-10 blur-md"></div>
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-12 h-8 bg-white rounded-full z-10 blur"></div>
            </button>
          </Link>

          {/* Dynamic rotating border overlay - matches button size exactly */}
          <div className="rotating-border pointer-events-none absolute inset-0 z-50">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              style={{ borderRadius: "16px" }}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="border-gradient"
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="100"
                >
                  <stop offset="0%" stopColor="#3AF0F7" />
                  <stop offset="50%" stopColor="#8ef7fb" />
                  <stop offset="100%" stopColor="#3AF0F7" />
                </linearGradient>
              </defs>
              <rect
                x="1"
                y="1"
                width="98"
                height="98"
                rx="12"
                fill="none"
                stroke="url(#border-gradient)"
                strokeWidth="2.5"
                strokeDasharray="120 240"
                strokeDashoffset="0"
                className="svg-border-anim"
              />
            </svg>
          </div>
        </div>
        {/* Stats */}
        <HeroStats />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-start w-full max-w-xl sm:max-w-lg lg:max-w-xl bg-transparent">
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
      <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-none sm:leading-tight whitespace-wrap sm:whitespace-nowrap z-30 mb-2 text-left">
        {renderTranslation("hero.title.mobile")}
      </h1>
      <h3 className="text-xl sm:text-3xl text-gray-900 leading-tight whitespace-wrap sm:whitespace-nowrap mb-8 z-30 text-left">
        {renderTranslation("hero.subtitle.mobile")}
      </h3>
      {/* CTA Button */}
      <div className="button-wrapper mb-12 relative inline-block">
        <Link href="/products">
          <button
            className="buy-button px-6 py-3 text-gray-900 text-lg font-medium flex items-center justify-center bg-[radial-gradient(38.76%_67.86%_at_48.35%_100%,_#FFFFFF_0%,_#3AD8E9_100%)] shadow-[0_0_620px_#0A0F8A,0_0_354px_#0A0F8A] whitespace-nowrap"
            style={{
              minWidth: "140px",
              minHeight: "54px",
              borderRadius: "16px",
              zIndex: 10,
            }}
            type="button"
          >
            <span>{t("hero.buyNow")}</span>
            <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-24 h-8 bg-white rounded-full z-10 blur-lg"></div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-8 bg-white rounded-full z-10 blur-md"></div>
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-12 h-8 bg-white rounded-full z-10 blur"></div>
          </button>
        </Link>

        {/* Dynamic rotating border overlay - matches button size exactly */}
        <div className="rotating-border pointer-events-none absolute inset-0 z-50">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <rect
              x="1"
              y="1"
              width="98"
              height="98"
              rx="12"
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
                x2="100"
                y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#02000C" />
                <stop offset="1" stopColor="#02000C" />
              </linearGradient>
            </defs>
          </svg>
        </div>

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
    <section className="relative flex items-center justify-center overflow-hidden w-full pt-20 sm:pt-0 sm:min-h-screen object-top bg-transparent">
      {/* Hero background image as full-section background */}
      <Image
        src="/hero-img-compressed.jpg"
        alt="Hero background"
        width={800}
        height={800}
        priority
        className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-auto h-[80vh] max-h-[800px] z-0"
        style={{
          position: "absolute",
          height: "100vh",
          maxHeight: "800px",
          width: "auto",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          objectFit: "contain",
          objectPosition: "center",
          color: "transparent",
        }}
      />

      <div className="max-w-9xl mx-auto px-2 sm:px-12 relative z-10 w-full bg-transparent flex flex-row items-center justify-between">
        {/* Left Content */}
        <HeroLeftContent />
      </div>
    </section>
  );
}
