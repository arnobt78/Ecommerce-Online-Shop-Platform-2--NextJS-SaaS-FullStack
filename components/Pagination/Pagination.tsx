"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getPages = (current: number, total: number) => {
  // Always show first two and last two pages.
  // Show ... if there is a gap between the first/last two and the current window.
  // If current is near the start, show more numbers after 2; if near the end, show more before last two.
  // In the middle, show double ellipsis and current-1, current, current+1.
  const pages: (number | string)[] = [];
  if (total <= 6) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }
  pages.push(1);
  pages.push(2);
  if (current <= 4) {
    // Near start: show up to 5, then ...
    for (let i = 3; i <= 5; i++) {
      if (i < total - 1) pages.push(i);
    }
    if (total > 7) pages.push("...");
  } else if (current >= total - 3) {
    // Near end: ... then show total-4, total-3, total-2
    if (total > 7) pages.push("...");
    for (let i = total - 4; i <= total - 2; i++) {
      if (i > 2) pages.push(i);
    }
  } else {
    // In the middle: ... current-1, current, current+1 ...
    if (current > 5) pages.push("...");
    for (let i = current - 1; i <= current + 1; i++) {
      if (i > 2 && i < total - 1) pages.push(i);
    }
    if (current < total - 4) pages.push("...");
  }
  pages.push(total - 1);
  pages.push(total);
  // Remove duplicates and keep order
  const seen = new Set();
  return pages.filter((p) => {
    if (typeof p === "number" && (p < 1 || p > total)) return false;
    if (seen.has(p)) return false;
    seen.add(p);
    return true;
  });
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = getPages(currentPage, totalPages);

  return (
    <nav
      className="flex flex-row items-center gap-2 h-[36px] select-none my-8 sm:my-12 px-1 sm:px-0 w-full justify-center"
      style={{ maxWidth: 372, marginLeft: "auto", marginRight: "auto" }}
      aria-label="Pagination"
    >
      {/* Prev button */}
      <button
        className={`w-10 h-10 rounded-[4px] flex items-center justify-center border transition-transform duration-300 ease-in-out relative hover:scale-[1.1]
          ${
            currentPage === 1
              ? "bg-[#919EAB] opacity-50 border-transparent cursor-default"
              : "bg-white border-[#DFE3E8] hover:border-[#6DF4F9] cursor-pointer hover:scale-[1.1]"
          }
          `}
        disabled={currentPage === 1}
        onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
        aria-label="Previous page"
        tabIndex={0}
        style={{ boxSizing: "border-box" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="pointer-events-none"
        >
          <path
            d="M15 6L9 12L15 18"
            stroke="#C4CDD5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* Page numbers */}
      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={p}
            className={`w-10 h-10 rounded-[4px] flex items-center justify-center font-bold text-[14px] leading-[20px] transition-transform duration-300 ease-in-out border relative hover:scale-[1.1]
              ${
                p === currentPage
                  ? "bg-white border-[#6DF4F9] text-gray-900 shadow-sm z-10 cursor-default"
                  : "bg-white border-[#DFE3E8] text-[#212B36] hover:border-[#6DF4F9] cursor-pointer"
              }
              `}
            style={{ fontFamily: "Inter, sans-serif", boxSizing: "border-box" }}
            onClick={() => p !== currentPage && onPageChange(p)}
            aria-current={p === currentPage ? "page" : undefined}
            tabIndex={0}
          >
            {p}
          </button>
        ) : (
          <span
            key={"ellipsis-" + idx}
            className="w-8 h-8 rounded-[4px] flex items-center justify-center text-[14px] leading-[20px] text-[#212B36] font-bold select-none"
            style={{ fontFamily: "Inter, sans-serif", boxSizing: "border-box" }}
          >
            ...
          </span>
        )
      )}
      {/* Next button */}
      <button
        className={`w-10 h-10 rounded-[4px] flex items-center justify-center border transition-transform duration-300 ease-in-out relative hover:scale-[1.1]
          ${
            currentPage === totalPages
              ? "bg-[#919EAB] opacity-50 border-transparent cursor-default"
              : "bg-white border-[#DFE3E8] hover:border-[#6DF4F9] cursor-pointer"
          }
          `}
        disabled={currentPage === totalPages}
        onClick={() =>
          currentPage !== totalPages && onPageChange(currentPage + 1)
        }
        aria-label="Next page"
        tabIndex={0}
        style={{ boxSizing: "border-box" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="pointer-events-none"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="#C4CDD5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </nav>
  );
};
