"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full px-4 sm:px-8 py-6 sm:py-8 relative text-justify">
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
                j < 4 ? "fill-black text-gray-900" : "fill-none text-gray-900"
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

import defaultTestimonials from "@/data/reviews";

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
      className="border-0 transition-all duration-300 bg-transparent w-full max-w-[360px] rounded-[19px] flex flex-col justify-between bg-gradient-to-r from-[#3AF0F7]/10 to-[#8ef7fb]/10 cursor-pointer hover:bg-gradient-to-r hover:from-[#3AF0F7]/15 hove:to-[#8ef7fb]/15"
      onClick={onClick}
    >
      <CardContent className="px-4 py-4 flex flex-col h-full justify-between text-justify">
        <div>
          <div className="flex items-center space-x-1 mb-1">
            {[...Array(5)].map((_, j) => (
              <Star
                key={j}
                className={`size-4 ${
                  j < 4 ? "fill-black text-gray-900" : "fill-none text-gray-900"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-700 mb-2 text-sm leading-relaxed line-clamp-3 overflow-hidden min-h-[60px]">
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
              width={32}
              height={16}
              className="h-4 w-auto ml-2"
              style={{ width: "auto", height: "16px" }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReviewCard({
  testimonials = defaultTestimonials,
}: ReviewCardProps) {
  const { t, isHydrated } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [isHydrated]);

  const testimonialsToShow = isMobile ? testimonials.slice(0, 2) : testimonials;

  const handleCardClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTestimonial(null);
  };

  return (
    <section className="px-2 sm:px-4 bg-transparent">
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 36s linear infinite;
        }
      `}</style>
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center pb-8">
          {t("home.reviews.title")}
        </h2>

        {/* Mobile Layout - Static Grid */}
        <div className="md:hidden grid grid-cols-1 gap-6 justify-items-center">
          {testimonialsToShow.map((testimonial, i) => (
            <ReviewCardItem
              key={i}
              testimonial={testimonial}
              onClick={() => handleCardClick(testimonial)}
            />
          ))}
        </div>

        {/* Desktop Layout - Animated Floating */}
        <div className="hidden md:block relative overflow-hidden">
          <div className="flex animate-scroll-left">
            {[...testimonialsToShow, ...testimonialsToShow].map(
              (testimonial, i) => (
                <div key={i} className="w-[284px] flex-shrink-0 mx-4">
                  <ReviewCardItem
                    testimonial={testimonial}
                    onClick={() => handleCardClick(testimonial)}
                  />
                </div>
              )
            )}
          </div>
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
