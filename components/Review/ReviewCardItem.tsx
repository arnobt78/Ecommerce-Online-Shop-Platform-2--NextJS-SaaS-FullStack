import { Star, CircleUserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewCardItemProps {
  testimonial: {
    name: string;
    review: string;
    rating: number;
  };
}

export default function ReviewCardItem({ testimonial }: ReviewCardItemProps) {
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
