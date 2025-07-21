// data/reviews.ts
// Exporting default testimonials for the ReviewCardSection

export interface Testimonial {
  name: string;
  review: string;
  rating: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "A.R",
    review: "best price but delivery time take long",
    rating: 5,
  },
  {
    name: "M.B",
    review: "best price but delivery time take long",
    rating: 5,
  },
  {
    name: "C.D",
    review: "Delivery time take long",
    rating: 5,
  },
  {
    name: "X.Y",
    review: "Good price but delivery time take long",
    rating: 4,
  },
];

export default defaultTestimonials;
