import React from "react";

export const ProductCardReelSkeleton: React.FC<{ count?: number }> = ({
  count = 5,
}) => (
  <div className="flex flex-row gap-x-2 sm:gap-x-4 w-full justify-center">
    {Array.from({ length: count }).map((_, idx) => (
      <div
        key={idx}
        className="flex justify-center flex-shrink-0 animate-pulse bg-gray-200 rounded-lg"
        style={{ width: "220px", height: "320px" }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="bg-gray-300 rounded-full w-32 h-32 mb-4" />
          <div className="bg-gray-300 rounded-md w-24 h-4 mb-2" />
          <div className="bg-gray-300 rounded-md w-20 h-4 mb-2" />
        </div>
      </div>
    ))}
  </div>
);
