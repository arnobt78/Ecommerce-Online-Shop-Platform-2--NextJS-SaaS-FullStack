import React from "react";

export default function HeroRightImage() {
  return (
    <div className="flex items-center justify-end w-full h-auto object-cover mt-36 max-h-[200px] sm:max-h-[400px] bg-transparent">
      <img
        src="/group-32.svg"
        alt="Hero visual"
        className="object-contain pointer-events-none relative top-[48px] sm:top-[300px] left-0 max-w-5xl max-h-5xl"
        width="150%"
        height="150%"
        
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}
