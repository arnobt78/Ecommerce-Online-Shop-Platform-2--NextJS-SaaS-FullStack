"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
// import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContextNew";

interface Testimonial {
  name: string;
  review: string;
  rating: number;
}

interface ReviewCardProps {
  testimonials?: Testimonial[];
}

// ReviewModal component displays a modal with the full review text
function ReviewModal({
  open,
  onClose,
  testimonial,
}: {
  open: boolean;
  onClose: () => void;
  testimonial: Testimonial | null;
}) {
  if (!open || !testimonial) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-md w-full px-4 sm:px-8 py-6 sm:py-8 relative text-justify"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-6 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex items-center space-x-2 mb-4">
          {/* <CircleUserRound /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18.5 20.247V16C18.5 16 16 14.5 12 14.5C8 14.5 5.5 16 5.5 16V20.247M1.5 12C1.5 6.201 6.201 1.5 12 1.5C17.799 1.5 22.5 6.201 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.201 22.5 1.5 17.799 1.5 12ZM11.926 12.5C11.926 12.5 8.5 10.68 8.5 8C8.5 6.067 10.069 4.5 12.004 4.5C12.4635 4.49987 12.9185 4.59034 13.3429 4.76623C13.7674 4.94212 14.153 5.19999 14.4778 5.52507C14.8025 5.85016 15.0599 6.23608 15.2353 6.66075C15.4107 7.08543 15.5007 7.54053 15.5 8C15.5 10.68 12.074 12.5 12.074 12.5H11.926Z"
              stroke="black"
            />
          </svg>
          <span className="font-semibold text-gray-900">
            {testimonial.name}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 13 13"
            fill="none"
          >
            <path
              d="M5.9312 7.27452L4.95836 6.30494C4.90781 6.25438 4.84624 6.2273 4.77365 6.22369C4.70071 6.22008 4.63445 6.24824 4.57486 6.30819C4.51708 6.36596 4.4882 6.42988 4.4882 6.49994C4.4882 6.56999 4.51708 6.63391 4.57486 6.69169L5.62461 7.74144C5.71236 7.82883 5.81456 7.87252 5.9312 7.87252C6.04783 7.87252 6.15003 7.82883 6.23778 7.74144L8.42503 5.55419C8.47775 5.50146 8.50538 5.43935 8.5079 5.36785C8.51043 5.29599 8.48281 5.23027 8.42503 5.17069C8.36545 5.1111 8.30099 5.08077 8.23165 5.07969C8.16232 5.0786 8.09804 5.10785 8.03882 5.16744L5.9312 7.27452ZM4.6962 11.1669L3.98336 9.97527L2.63949 9.69144C2.53188 9.67158 2.44611 9.6138 2.3822 9.5181C2.31828 9.42277 2.29192 9.3213 2.30311 9.21369L2.43149 7.82919L1.51986 6.78919C1.44331 6.71083 1.40503 6.61441 1.40503 6.49994C1.40503 6.38546 1.44331 6.28905 1.51986 6.21069L2.43149 5.17069L2.30311 3.78673C2.29228 3.67876 2.31864 3.5771 2.3822 3.48177C2.44611 3.38644 2.53188 3.32866 2.63949 3.30844L3.98282 3.02515L4.69565 1.83348C4.75415 1.7367 4.8327 1.6699 4.93128 1.63306C5.02986 1.59587 5.13188 1.60074 5.23732 1.64769L6.49995 2.18123L7.76203 1.64769C7.86783 1.60074 7.97003 1.59587 8.06861 1.63306C8.1672 1.6699 8.24574 1.7367 8.30424 1.83348L9.01653 3.02515L10.3604 3.30844C10.468 3.32866 10.5538 3.38644 10.6177 3.48177C10.6816 3.5771 10.708 3.67876 10.6968 3.78673L10.5689 5.17069L11.48 6.21069C11.5566 6.28905 11.5949 6.38546 11.5949 6.49994C11.5949 6.61441 11.5566 6.71101 11.48 6.78973L10.5689 7.82919L10.6968 9.21315C10.7076 9.32112 10.6813 9.42277 10.6177 9.5181C10.5538 9.6138 10.468 9.67158 10.3604 9.69144L9.01707 9.97527L8.30424 11.1669C8.24574 11.2634 8.1672 11.3302 8.06861 11.3674C7.97003 11.4045 7.86802 11.3995 7.76257 11.3522L6.49995 10.8186L5.23786 11.3522C5.13206 11.3991 5.02986 11.404 4.93128 11.3668C4.8327 11.33 4.75415 11.2632 4.69565 11.1664"
              fill="#9CF0FF"
            />
          </svg>
        </div>
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, j) => (
            <Star
              key={j}
              className={`size-4 ${
                j < testimonial.rating
                  ? "fill-black text-gray-900"
                  : "fill-none text-gray-900"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700 text-base whitespace-pre-line">
          {testimonial.review}
        </p>
      </div>
    </div>
  );
}

// ReviewCardItem component displays a single testimonial card with rating, review, and user info.
function ReviewCardItem({
  testimonial,
  onClick,
}: {
  testimonial: Testimonial;
  onClick?: () => void;
}) {
  return (
    <Card
      className="border-0 transition-all duration-300 bg-transparent w-full h-[160px] rounded-[19px] flex flex-col justify-between bg-gradient-to-r from-[#3AF0F7]/10 to-[#8ef7fb]/10 cursor-pointer hover:bg-gradient-to-r hover:from-[#3AF0F7]/15 hover:to-[#8ef7fb]/15"
      onClick={onClick}
    >
      <CardContent className="px-4 py-4 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center space-x-1 mb-1">
            {[...Array(5)].map((_, j) => (
              <Star
                key={j}
                className={`size-4 ${
                  j < testimonial.rating
                    ? "fill-black text-gray-900"
                    : "fill-none text-gray-900"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-700 mb-2 text-sm leading-relaxed line-clamp-3 overflow-hidden h-[80px] flex items-start">
            {testimonial.review}
          </p>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center space-x-2">
            {/* <CircleUserRound /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.5 20.247V16C18.5 16 16 14.5 12 14.5C8 14.5 5.5 16 5.5 16V20.247M1.5 12C1.5 6.201 6.201 1.5 12 1.5C17.799 1.5 22.5 6.201 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.201 22.5 1.5 17.799 1.5 12ZM11.926 12.5C11.926 12.5 8.5 10.68 8.5 8C8.5 6.067 10.069 4.5 12.004 4.5C12.4635 4.49987 12.9185 4.59034 13.3429 4.76623C13.7674 4.94212 14.153 5.19999 14.4778 5.52507C14.8025 5.85016 15.0599 6.23608 15.2353 6.66075C15.4107 7.08543 15.5007 7.54053 15.5 8C15.5 10.68 12.074 12.5 12.074 12.5H11.926Z"
                stroke="black"
              />
            </svg>
            <p className="font-semibold text-sm text-gray-900">
              {testimonial.name}
            </p>
            {/* <Image
              src="verified-customer-icon.svg"
              alt="Verified signature"
              width={48}
              height={24}
              className="h-8 w-auto ml-2"
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 13 13"
              fill="none"
            >
              <path
                d="M5.9312 7.27452L4.95836 6.30494C4.90781 6.25438 4.84624 6.2273 4.77365 6.22369C4.70071 6.22008 4.63445 6.24824 4.57486 6.30819C4.51708 6.36596 4.4882 6.42988 4.4882 6.49994C4.4882 6.56999 4.51708 6.63391 4.57486 6.69169L5.62461 7.74144C5.71236 7.82883 5.81456 7.87252 5.9312 7.87252C6.04783 7.87252 6.15003 7.82883 6.23778 7.74144L8.42503 5.55419C8.47775 5.50146 8.50538 5.43935 8.5079 5.36785C8.51043 5.29599 8.48281 5.23027 8.42503 5.17069C8.36545 5.1111 8.30099 5.08077 8.23165 5.07969C8.16232 5.0786 8.09804 5.10785 8.03882 5.16744L5.9312 7.27452ZM4.6962 11.1669L3.98336 9.97527L2.63949 9.69144C2.53188 9.67158 2.44611 9.6138 2.3822 9.5181C2.31828 9.42277 2.29192 9.3213 2.30311 9.21369L2.43149 7.82919L1.51986 6.78919C1.44331 6.71083 1.40503 6.61441 1.40503 6.49994C1.40503 6.38546 1.44331 6.28905 1.51986 6.21069L2.43149 5.17069L2.30311 3.78673C2.29228 3.67876 2.31864 3.5771 2.3822 3.48177C2.44611 3.38644 2.53188 3.32866 2.63949 3.30844L3.98282 3.02515L4.69565 1.83348C4.75415 1.7367 4.8327 1.6699 4.93128 1.63306C5.02986 1.59587 5.13188 1.60074 5.23732 1.64769L6.49995 2.18123L7.76203 1.64769C7.86783 1.60074 7.97003 1.59587 8.06861 1.63306C8.1672 1.6699 8.24574 1.7367 8.30424 1.83348L9.01653 3.02515L10.3604 3.30844C10.468 3.32866 10.5538 3.38644 10.6177 3.48177C10.6816 3.5771 10.708 3.67876 10.6968 3.78673L10.5689 5.17069L11.48 6.21069C11.5566 6.28905 11.5949 6.38546 11.5949 6.49994C11.5949 6.61441 11.5566 6.71101 11.48 6.78973L10.5689 7.82919L10.6968 9.21315C10.7076 9.32112 10.6813 9.42277 10.6177 9.5181C10.5538 9.6138 10.468 9.67158 10.3604 9.69144L9.01707 9.97527L8.30424 11.1669C8.24574 11.2634 8.1672 11.3302 8.06861 11.3674C7.97003 11.4045 7.86802 11.3995 7.76257 11.3522L6.49995 10.8186L5.23786 11.3522C5.13206 11.3991 5.02986 11.404 4.93128 11.3668C4.8327 11.33 4.75415 11.2632 4.69565 11.1664"
                fill="#9CF0FF"
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReviewCard(props: ReviewCardProps) {
  const { t, isHydrated } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  // Get testimonials from translations or fallback to props
  const translatedTestimonials = t("home.reviews.testimonials");
  const testimonials = Array.isArray(translatedTestimonials)
    ? translatedTestimonials
    : props.testimonials || [];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    containScroll: "trimSnaps",
    dragFree: false,
    slidesToScroll: 1,
    breakpoints: {
      "(max-width: 639px)": {
        slidesToScroll: 1,
      },
      "(min-width: 640px)": {
        slidesToScroll: 1,
      },
    },
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const cardsPerView = isMobile ? 1 : 5;
  const cardsPerView = 1;
  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;
    const checkIsMobile = () => setIsMobile(window.innerWidth < 640);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [isHydrated]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handleCardClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTestimonial(null);
  };

  // Arrow navigation for embla
  const totalSlides = testimonials.length - cardsPerView + 1;
  const showArrows = totalSlides > 1;
  const handleLeft = () => {
    if (emblaApi) emblaApi.scrollTo(selectedIndex - 1);
  };
  const handleRight = () => {
    if (emblaApi) emblaApi.scrollTo(selectedIndex + 1);
  };

  // Only render carousel after hydration and mobile detection
  if (!isHydrated) {
    // Render only a placeholder (no carousel markup) during SSR to avoid hydration error
    return (
      <section className="max-w-7xl mx-auto px-1 sm:px-0 py-4 sm:py-8 w-full overflow-x-hidden">
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center pb-8">
            {t("home.reviews.title")}
          </h2>
          <div className="w-full flex items-center justify-center min-h-[140px] sm:min-h-[180px]">
            {/* SSR placeholder only, no carousel markup */}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-4 sm:py-8 w-full overflow-x-hidden">
      <div className="w-full">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center pb-8">
          {t("home.reviews.title")}
        </h2>
        <div className="relative mx-auto w-full max-w-7xl flex items-center justify-center min-h-[140px] sm:min-h-[180px] overflow-x-hidden">
          {/* Left Arrow */}
          {showArrows && (
            <button
              type="button"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-5/6 bg-gradient-to-r from-white/90 to-transparent cursor-pointer"
              onClick={handleLeft}
              aria-label="Scroll left"
              disabled={selectedIndex === 0}
            >
              <svg
                className="w-8 h-8 text-gray-400 hover:text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          <div className="w-full overflow-x-hidden" ref={emblaRef}>
            <div
              className="flex flex-row gap-x-2 sm:gap-x-4 max-w-full"
              style={{ willChange: "transform" }}
            >
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className={`flex justify-center flex-shrink-0 ${
                    isMobile
                      ? "w-full max-w-[95vw] min-w-[95vw]"
                      : "w-full max-w-[280px] min-w-[280px]"
                  }`}
                >
                  <ReviewCardItem
                    testimonial={testimonial}
                    onClick={() => handleCardClick(testimonial)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Right Arrow */}
          {showArrows && (
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-5/6 bg-gradient-to-l from-white/90 to-transparent cursor-pointer"
              onClick={handleRight}
              aria-label="Scroll right"
              disabled={selectedIndex >= totalSlides - 1}
            >
              <svg
                className="w-8 h-8 text-gray-400 hover:text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <ReviewModal
        open={modalOpen}
        onClose={handleCloseModal}
        testimonial={selectedTestimonial}
      />
    </section>
  );
}
