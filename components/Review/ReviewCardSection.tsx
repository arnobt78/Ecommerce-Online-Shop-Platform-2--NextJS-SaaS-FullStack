"use client";

import { useState, useEffect } from "react";
import ReviewCardItem from "@/components/Review/ReviewCardItem";

interface Testimonial {
  name: string;
  review: string;
  rating: number;
}

interface ReviewCardProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "M.B",
    review: "best price but delivery time take long",
    rating: 5,
  },
  {
    name: "M.B",
    review: "best price but delivery time take long",
    rating: 5,
  },
  {
    name: "M.B",
    review: "best price but delivery time take long",
    rating: 5,
  },
  {
    name: "M.B",
    review: "best price but delivery time take long",
    rating: 5,
  },
];

export default function ReviewCard({ testimonials = defaultTestimonials }: ReviewCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const testimonialsToShow = isMobile ? testimonials.slice(0, 2) : testimonials;

  return (
    <section className="px-5 py-12 bg-transparent">
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
          animation: scroll-left 20s linear infinite;
        }
      `}</style>
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 text-center mb-12">Reviews</h2>
        
        {/* Mobile Layout - Static Grid */}
        <div className="md:hidden grid grid-cols-1 gap-6 justify-items-center">
          {testimonialsToShow.map((testimonial, i) => (
            <ReviewCardItem key={i} testimonial={testimonial} />
          ))}
        </div>

        {/* Desktop Layout - Animated Floating */}
        <div className="hidden md:block relative overflow-hidden">
          <div className="flex animate-scroll-left">
            {[...testimonialsToShow, ...testimonialsToShow].map((testimonial, i) => (
              <div key={i} className="w-[284px] flex-shrink-0 mx-4">
                <ReviewCardItem testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
