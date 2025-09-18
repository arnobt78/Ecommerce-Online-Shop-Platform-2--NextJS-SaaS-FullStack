// data/reviews.ts
// Exporting default testimonials for the ReviewCardSection

export interface Testimonial {
  name: string;
  review: string;
  rating: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Seb",
    review: "Large selection, great prices, fast shipping",
    rating: 5,
  },
  {
    name: "Tobias G.",
    review: "Fast delivery and uncomplicated.",
    rating: 5,
  },
  {
    name: "Martin",
    review: "Top shop with the best prices.",
    rating: 5,
  },
  {
    name: "S.L.",
    review: "Super fast processing, top shipping, and good quality",
    rating: 5,
  },
  {
    name: "Clara",
    review: "Absolutely top prices. ",
    rating: 5,
  },
  {
    name: "Verified Customer",
    review: "Unfortunately, I received the wrong order",
    rating: 1,
  },
  {
    name: "Daniel",
    review: "Good selection, good prices, super fast delivery",
    rating: 5,
  },
  {
    name: "Thomas",
    review:
      "No problems with your order, fast shipping, and good quality. I'd be happy to order again.",
    rating: 5,
  },
  {
    name: "Verified Customer",
    review: "Unfortunately, shipping was very slow. Otherwise, great!",
    rating: 3,
  },
  {
    name: "Verified Customer",
    review: "Fast shipping and good prices",
    rating: 5,
  },
  {
    name: "Markus",
    review: "Very large selection, good prices, free and fast delivery",
    rating: 5,
  },
  {
    name: "Verified Customer",
    review: "Slow shipping",
    rating: 1,
  },
  {
    name: "Jakob H.",
    review: "Super-fast order delivery",
    rating: 5,
  },
  {
    name: "Niklas",
    review: "Everything perfect",
    rating: 5,
  },
  {
    name: "Verified Customer",
    review: "Great prices, but a long wait",
    rating: 4,
  },
  {
    name: "Alex T.",
    review: "Good price and fast delivery",
    rating: 5,
  },
  {
    name: "Verified Customer",
    review: "The product is great, but I had to wait 2 weeks ",
    rating: 3,
  },
  {
    name: "Julian",
    review: "Very fast shipping. Great prices. Very satisfied",
    rating: 5,
  },
  {
    name: "Max",
    review: "Great service, great prices, and super fast shipping",
    rating: 5,
  },
  {
    name: "Verified Customer",
    review: "Long delivery times",
    rating: 2,
  },
  {
    name: "Verified Customer",
    review: "Good snus, one order took 10 days to arrive",
    rating: 2,
  },
  {
    name: "Matteo",
    review:
      "Fast and reliable. Top supplier, fast delivery, product as expected.",
    rating: 5,
  },
  {
    name: "Ben",
    review: "Unfortunately, it took a while to arrive.",
    rating: 4,
  },
  {
    name: "Oskar",
    review: "Very fast delivery",
    rating: 5,
  },
  {
    name: "Verified Customer",
    review: "I received a different flavor",
    rating: 2,
  },
  {
    name: "Verified Customer",
    review: "Wrong product delivered",
    rating: 3,
  },
  {
    name: "Luisa",
    review:
      "Fast and free delivery, I was satisfied, and they gave me a free sample",
    rating: 5,
  },
];

export default defaultTestimonials;
