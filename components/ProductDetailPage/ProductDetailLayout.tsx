
"use client";

import React, { useState } from "react";


// --- Inlined: ProductPosterCard ---
interface ProductPosterCardProps {
  product: any;
}
/**
 * ProductPosterCard displays the main product image and badges.
 */
const ProductPosterCard: React.FC<ProductPosterCardProps> = ({ product }) => (
  <div className="relative flex flex-col items-center shadow-lg bg-zinc-200 overflow-visible w-full aspect-square max-w-[640px] mx-auto">
    {/* Top badges */}
    <div className="absolute flex flex-row w-full justify-between top-4 left-0 px-4 z-10">
      {product.saleLabel ? (
        <div className="bg-white rounded-[6px] w-[70px] h-[24px] flex items-center justify-center shadow-sm">
          <span className="italic font-semibold text-[13px] leading-[16px] text-[#C02929]">{product.saleLabel}</span>
        </div>
      ) : <div className="w-[70px] h-[24px]" />}
      <div className="bg-white rounded-[6px] w-[110px] h-[24px] flex items-center justify-center shadow-sm">
        <span className="italic font-semibold text-[13px] leading-[16px] text-black">{product.shippingLabel}</span>
      </div>
    </div>
    {/* Product image as poster */}
    <div className="relative flex flex-col items-center justify-center w-full h-full z-0 ">
      <img
        src={product.productImage}
        alt={product.productName}
        className="object-contain w-full h-full mx-auto drop-shadow-xl"
        draggable={false}
        loading="lazy"
      />
    </div>
  </div>
);

// --- Inlined: ProductCardDescriptionSection and ProductDetailDescriptionSection ---
interface ProductCardDescriptionSectionProps {
  brand: string;
  flavor: string;
  strength: string;
  nicotinePerPouch: string;
  description?: string;
  howToUse?: string;
}
const CollapsibleSection: React.FC<{ title: string; open: boolean; onToggle: () => void; children: React.ReactNode; sectionId: string }> = ({ title, open, onToggle, children, sectionId }) => (
  <div className="flex flex-col gap-5 border-b border-[#C4C4C4] pb-8 pt-8">
    <button
      className="flex flex-row items-center justify-between w-full bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={sectionId}
    >
      <span className="font-semibold text-[24px] leading-[29px] text-black">{title}</span>
      <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ease-in-out ${open ? '' : 'rotate-180'}`} style={{ transformOrigin: '50% 50%' }}>
        <path d="M1 1L10 9L19 1" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
    <div id={sectionId} className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`} aria-hidden={!open}>
      {children}
    </div>
  </div>
);
const ProductDescriptionDetails: React.FC<{ brand: string; flavor: string; strength: string; nicotinePerPouch: string }> = ({ brand, flavor, strength, nicotinePerPouch }) => (
  <>
    <div className="flex flex-row items-center text-[#343232] text-[19px] leading-[29px] font-normal">
      <span>Brand:</span>
      <span className="flex-1 border-b border-dotted border-[#343232] mx-2 h-[1px]" style={{marginTop: 14}}></span>
      <span className="ml-2">{brand}</span>
    </div>
    <div className="flex flex-row items-center text-[#343232] text-[19px] leading-[29px] font-normal">
      <span>Flavor:</span>
      <span className="flex-1 border-b border-dotted border-[#343232] mx-2 h-[1px]" style={{marginTop: 14}}></span>
      <span className="ml-2">{flavor}</span>
    </div>
    <div className="flex flex-row items-center text-[#343232] text-[19px] leading-[29px] font-normal">
      <span>Strength:</span>
      <span className="flex-1 border-b border-dotted border-[#343232] mx-2 h-[1px]" style={{marginTop: 14}}></span>
      <span className="ml-2">{strength}</span>
    </div>
    <div className="flex flex-row items-center text-[#343232] text-[19px] leading-[29px] font-normal">
      <span>Nicotine per pouch:</span>
      <span className="flex-1 border-b border-dotted border-[#343232] mx-2 h-[1px]" style={{marginTop: 14}}></span>
      <span className="ml-2">{nicotinePerPouch}</span>
    </div>
  </>
);
const ProductCardDescriptionSection: React.FC<ProductCardDescriptionSectionProps> = ({ brand, flavor, strength, nicotinePerPouch, description, howToUse }) => {
  const [descOpen, setDescOpen] = React.useState(true);
  const [howToUseOpen, setHowToUseOpen] = React.useState(true);
  return (
    <div className="w-full max-w-[687px]">
      <CollapsibleSection title="Product Description" open={descOpen} onToggle={() => setDescOpen((prev) => !prev)} sectionId="product-desc-section">
        <ProductDescriptionDetails brand={brand} flavor={flavor} strength={strength} nicotinePerPouch={nicotinePerPouch} />
      </CollapsibleSection>
      <CollapsibleSection title="How to Use" open={howToUseOpen} onToggle={() => setHowToUseOpen((prev) => !prev)} sectionId="how-to-use-section">
        <div className="text-[#343232] text-[19px] leading-[29px] font-normal whitespace-pre-line text-justify">
          {howToUse || (
            <>
              <p>
                Open the can and take out a single pouch. Place the pouch between your upper lip and gum. Let the pouch rest and enjoy the flavor and nicotine release for up to 30 minutes. Dispose of the used pouch in a waste bin. Do not swallow or chew the pouch.
              </p>
              <p className="mt-2">
                For best results, do not eat or drink while using the pouch. Keep out of reach of children and store in a cool, dry place.
              </p>
              <p className="mt-2">
              Jelly sweet roll jelly beans biscuit pie macaroon chocolate donut. Carrot cake caramels pie sweet apple pie tiramisu carrot cake. Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie. Cupcake muffin danish muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot cake jelly sweet. Gummies croissant macaroon dessert. Chocolate cake dragée pie.
              </p>
              <p className="mt-2">
              Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.
              </p>
              <p className="mt-2">
              Cat gets stuck in tree firefighters try to get cat down firefighters get stuck in tree cat eats firefighters' slippers kitty power ignore the squirrels, you'll never catch them anyway for what a cat-ass-trophy! or purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table. Pretend you want to go out but then don't bite off human's toes, yet disappear for four days and return home with an expensive injury; bite the vet so catch eat throw up catch eat throw up bad birds.
              </p>
              <p className="mt-2">
              This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel. That makes me feel angry! Anyhoo, your net-suits will allow you to experience Fry's worm infested bowels as if you were actually wriggling through them. I just told you! You've killed me! Fry! Quit doing the right thing, you jerk! Michelle, I don't regret this, but I both rue and lament it. Morbo can't understand his teleprompter because he forgot how you say that letter that's shaped like a man wearing a hat.
              </p>
            </>
          )}
        </div>
      </CollapsibleSection>
    </div>
  );
};
interface ProductDetailDescriptionSectionProps {
  product: any;
  className?: string;
}
/**
 * ProductDetailDescriptionSection renders the product description section for a product.
 */
const ProductDetailDescriptionSection: React.FC<ProductDetailDescriptionSectionProps> = ({ product, className = "" }) => (
  <div className={`relative bg-white overflow-visible ${className}`}>
    <div className="relative z-10 p-6">
      <ProductCardDescriptionSection
        brand={product.brand}
        flavor={product.flavor}
        strength={product.strength}
        nicotinePerPouch={product.nicotinePerPouch}
        description={product.description}
        howToUse={product.howToUse}
      />
    </div>
  </div>
);

// --- Inlined: ProductDetailReviewsSection, ReviewCardSection, ReviewCardItem ---
interface Testimonial {
  name: string;
  review: string;
  rating: number;
}
const defaultTestimonials: Testimonial[] = [
  { name: "M.B", review: "best price but delivery time take long", rating: 5 },
  { name: "M.B", review: "best price but delivery time take long", rating: 5 },
  { name: "M.B", review: "best price but delivery time take long", rating: 5 },
  { name: "M.B", review: "best price but delivery time take long", rating: 5 },
];
const ReviewCardItem: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="border-0 transition-all duration-300 bg-transparent w-full max-w-[284px] rounded-[19px] shadow-md">
      <div className="px-5 py-2">
        <div className="flex items-center space-x-1 mb-1">
          {[...Array(5)].map((_, j) => (
            <span key={j} className={`size-4 ${j < 4 ? "fill-black text-black" : "fill-none text-black"}`}>★</span>
          ))}
        </div>
        <p className="text-gray-700 mb-1 text-sm leading-relaxed">{testimonial.review}</p>
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <span>👤</span>
            <p className="font-semibold text-sm text-gray-900">{testimonial.name}</p>
            <img src="/signature.png" alt="Verified signature" className="h-4 w-auto ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
const ReviewCardSection: React.FC<{ testimonials?: Testimonial[] }> = ({ testimonials = defaultTestimonials }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  const testimonialsToShow = isMobile ? testimonials.slice(0, 2) : testimonials;
  return (
    <section className="px-5 py-12 bg-transparent">
      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll-left { animation: scroll-left 20s linear infinite; }
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
};
/**
 * ProductDetailReviewsSection renders the reviews section for a product.
 */
const ProductDetailReviewsSection: React.FC = () => (
  <div className="w-full mt-12">
    <ReviewCardSection />
  </div>
);
import { ProductPurchaseSection } from "./ProductPurchaseSection";
import { ProductCardReelSection } from "./ProductCardReelSection";

import { useSearchParams } from "next/navigation";
import { products } from "../../data/products";

// Get product index from query param, fallback to 0

interface ProductDetailLayoutProps {
  product?: any;
}

export const ProductDetailLayout: React.FC<ProductDetailLayoutProps> = ({ product: propProduct }) => {
  const searchParams = useSearchParams();
  const idx = Number(searchParams.get("idx")) || 0;
  const product = propProduct || products[idx] || products[0];
  const [quantity, setQuantity] = useState(1);

const mockDescription = {
  brand: "Velo",
  flavor: "Mint",
  strength: "Medium",
  nicotinePerPouch: "6 mg",
  description: "",
  howToUse: "",
};

const mockReelProducts = Array(5).fill({
  productImage: "/product-image.png",
  productName: "Klint Artic Mint",
  salePrice: "€ 3,60",
  originalPrice: "€ 4,99",
  saleLabel: "Sale 30%",
  shippingLabel: "Free shipping",
});

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* Main Content */}
      <div className="w-full max-w-[1440px] bg-white flex flex-col lg:flex-row gap-8 mx-auto pt-16 px-1 sm:px-32">
        {/* Left: Product Card and Description (on desktop), only Product Poster Card on mobile */}
        <div className="flex flex-col gap-8 w-full bg-white lg:w-[687px]">
          {/* Product Poster Card for Product Detail */}
          <ProductPosterCard product={product} />
          {/* Description Section with SVG background (hidden on mobile, shown on desktop) */}
          <ProductDetailDescriptionSection product={product} className="hidden sm:block" />
        </div>
        {/* Right: Purchase Section with SVG background - fixed on large screens */}
        <div className="flex-1 flex flex-col items-start min-w-full sm:min-w-[350px] max-w-full sm:max-w-[687px] mx-auto px-1 sm:px-0">
          <div className="relative w-full bg-white overflow-visible lg:sticky lg:top-0">
            <div className="relative z-10">
              <ProductPurchaseSection
                productName={product.productName}
                productImage={product.productImage}
                brand={product.brand}
                stockStatus={product.stockStatus}
                salePrice={product.salePrice || ""}
                originalPrice={product.originalPrice || ""}
                quantity={quantity}
                onQuantityChange={setQuantity}
                onBuyNow={() => {}}
                onAddToCart={() => {}}
                productId={idx}
                slug={product.slug}
              />
            </div>
          </div>
          {/* Description Section for mobile only (below purchase section) */}
          <ProductDetailDescriptionSection product={product} className="block sm:hidden w-full" />
        </div>
      </div>
      {/* Product Card Reel */}
      <div className="w-full max-w-[1440px] mx-auto mt-16">
        <ProductCardReelSection products={products.slice(0, 6)} />
      </div>
      {/* Reviews Section */}
      <ProductDetailReviewsSection />
    </div>
  );
};
