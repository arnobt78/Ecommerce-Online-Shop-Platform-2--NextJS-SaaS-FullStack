import React from "react";

// This component renders the animated hero lines for visual interest in the hero section
const HeroLines: React.FC = () => {
  return (
    <>
      {/* Example: Add SVG or divs for animated lines here. You can expand this as needed. */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none z-0" width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 300 Q720 100 1440 300" stroke="#3AF0F7" strokeOpacity="0.12" strokeWidth="8" className="hero-line hero-line-1" />
        <path d="M0 400 Q720 200 1440 400" stroke="#8ef7fb" strokeOpacity="0.10" strokeWidth="6" className="hero-line hero-line-2" />
        <path d="M0 500 Q720 300 1440 500" stroke="#3AF0F7" strokeOpacity="0.08" strokeWidth="4" className="hero-line hero-line-3" />
      </svg>
    </>
  );
};

export default HeroLines;
