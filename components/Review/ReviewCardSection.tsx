
"use client";

import { useState, useEffect } from "react";
import { Star, CircleUserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
function ReviewCardItem({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="border-0 transition-all duration-300 bg-transparent w-full max-w-[284px] rounded-[19px]">
      <CardContent className="px-5 py-2">
        <div className="flex items-center space-x-1 mb-1">
          {[...Array(5)].map((_, j) => (
            <Star
              key={j}
              className={`size-4 ${j < 4 ? "fill-black text-black" : "fill-none text-black"}`}
            />
          ))}
        </div>
        <p className="text-gray-700 mb-1 text-sm leading-relaxed">{testimonial.review}</p>
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <CircleUserRound />
            <p className="font-semibold text-sm text-gray-900">{testimonial.name}</p>
            <img
              src="/signature.png"
              alt="Verified signature"
              className="h-4 w-auto ml-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


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
