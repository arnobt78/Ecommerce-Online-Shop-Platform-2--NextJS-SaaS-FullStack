// components/Review/ReviewCardReelServer.tsx
import defaultTestimonials, { Testimonial } from "@/data/reviews";

// Server-side review selection and shuffling
export function getRelatedReviews(productSlug?: string): Testimonial[] {
  // For now, just shuffle and return default testimonials
  // In future, you can filter by productSlug or other logic
  let reviews = [...defaultTestimonials];
  for (let i = reviews.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [reviews[i], reviews[j]] = [reviews[j], reviews[i]];
  }
  return reviews;
}
