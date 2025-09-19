"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Star, CircleUserRound } from "lucide-react";
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
          <CircleUserRound />
          <span className="font-semibold text-gray-900">
            {testimonial.name}
          </span>
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
            <CircleUserRound />
            <p className="font-semibold text-sm text-gray-900">
              {testimonial.name}
            </p>
            <Image
              src="/signature.png"
              alt="Verified signature"
              width={48}
              height={24}
              className="h-6 w-auto ml-2"
            />
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
      <section className="max-w-9xl mx-auto px-1 sm:px-4 py-4 sm:py-8 w-full overflow-x-hidden">
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
    <section className="max-w-9xl mx-auto px-1 sm:px-4 py-4 sm:py-8 w-full overflow-x-hidden">
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
