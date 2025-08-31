"use client";

import React, { useState } from "react";

// CollapsibleSection component (inlined)
interface CollapsibleSectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  sectionId: string;
}
/**
 * CollapsibleSection renders a section with a title that can be expanded/collapsed.
 */
const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  open,
  onToggle,
  children,
  sectionId,
}) => (
  <div className="flex flex-col gap-5 border-b border-[#C4C4C4] pb-8 pt-8">
    <button
      className="flex flex-row items-center justify-between w-full bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={sectionId}
    >
      <span className="font-semibold text-[24px] leading-[29px] text-gray-900">
        {title}
      </span>
      <svg
        width="20"
        height="10"
        viewBox="0 0 20 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-300 ease-in-out ${
          open ? "" : "rotate-180"
        }`}
        style={{ transformOrigin: "50% 50%" }}
      >
        <path
          d="M1 1L10 9L19 1"
          stroke="#000"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
    <div
      id={sectionId}
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        open
          ? "max-h-[2000px] opacity-100"
          : "max-h-0 opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {children}
    </div>
  </div>
);

// ProductDescriptionDetails component (inlined)
interface ProductDescriptionDetailsProps {
  brand: string;
  flavor: string;
  strength: string;
  nicotinePerPouch: string;
}
/**
 * ProductDescriptionDetails renders product meta info in a styled list.
 */
const ProductDescriptionDetails: React.FC<ProductDescriptionDetailsProps> = ({
  brand,
  flavor,
  strength,
  nicotinePerPouch,
}) => (
  <>
    <div className="flex flex-row items-center text-[#343232] text-[19px] leading-[29px] font-normal">
      <span>Brand:</span>
      <span
        className="flex-1 border-b border-dotted border-[#343232] mx-2 h-[1px]"
        style={{ marginTop: 14 }}
      ></span>
      <span className="ml-2">{brand}</span>
    </div>
    <div className="flex flex-row items-center text-[#343232] text-[19px] leading-[29px] font-normal">
      <span>Flavor:</span>
      <span
        className="flex-1 border-b border-dotted border-[#343232] mx-2 h-[1px]"
        style={{ marginTop: 14 }}
      ></span>
      <span className="ml-2">{flavor}</span>
    </div>
    <div className="flex flex-row items-center text-[#343232] text-[19px] leading-[29px] font-normal">
      <span>Strength:</span>
      <span
        className="flex-1 border-b border-dotted border-[#343232] mx-2 h-[1px]"
        style={{ marginTop: 14 }}
      ></span>
      <span className="ml-2">{strength}</span>
    </div>
    <div className="flex flex-row items-center text-[#343232] text-[19px] leading-[29px] font-normal">
      <span>Nicotine per pouch:</span>
      <span
        className="flex-1 border-b border-dotted border-[#343232] mx-2 h-[1px]"
        style={{ marginTop: 14 }}
      ></span>
      <span className="ml-2">{nicotinePerPouch}</span>
    </div>
  </>
);

interface ProductCardDescriptionSectionProps {
  brand: string;
  flavor: string;
  strength: string;
  nicotinePerPouch: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  description?: string;
  howToUse?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ProductCardDescriptionSection: React.FC<
  ProductCardDescriptionSectionProps
> = ({ brand, flavor, strength, nicotinePerPouch, description, howToUse }) => {
  // Collapsible state for each section
  const [descOpen, setDescOpen] = useState(true);
  const [howToUseOpen, setHowToUseOpen] = useState(true);

  return (
    <div className="w-full max-w-[687px]">
      <CollapsibleSection
        title="Product Description"
        open={descOpen}
        onToggle={() => setDescOpen((prev) => !prev)}
        sectionId="product-desc-section"
      >
        <ProductDescriptionDetails
          brand={brand}
          flavor={flavor}
          strength={strength}
          nicotinePerPouch={nicotinePerPouch}
        />
      </CollapsibleSection>
      <CollapsibleSection
        title="How to Use"
        open={howToUseOpen}
        onToggle={() => setHowToUseOpen((prev) => !prev)}
        sectionId="how-to-use-section"
      >
        <div className="text-red text-[19px] leading-[29px] font-normal whitespace-pre-line text-justify">
          {howToUse || (
            <>
              <p>
                Open the can and take out a single pouch. Place the pouch
                between your upper lip and gum. Let the pouch rest and enjoy the
                flavor and nicotine release for up to 30 minutes. Dispose of the
                used pouch in a waste bin. Do not swallow or chew the pouch.
              </p>
              <p className="mt-2">
                For best results, do not eat or drink while using the pouch.
                Keep out of reach of children and store in a cool, dry place.
              </p>
            </>
          )}
        </div>
      </CollapsibleSection>
    </div>
  );
};
