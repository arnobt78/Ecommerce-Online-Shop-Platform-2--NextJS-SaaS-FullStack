"use client";

import React, { useState } from "react";

export interface FilterDropDownProps {
  title: string;
  _icon?: React.ReactNode;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  singleSelect?: boolean;
  disabledOptions?: string[];
}

// The FilterDropDown component renders a dropdown menu with checkboxes for selecting options.

export function FilterDropDown({
  title,
  _icon,
  options,
  selected,
  onChange,
  singleSelect = false,
  disabledOptions = [],
}: FilterDropDownProps) {
  const [open, setOpen] = useState(false);

  // Handle option selection
  const handleSelect = (option: string) => {
    if (disabledOptions.includes(option)) return;
    if (singleSelect) {
      // Always call onChange, even if the same option is already selected
      if (selected.includes(option)) {
        // If already selected, clear selection (toggle off)
        onChange([]);
      } else {
        // If not selected, select this option (toggle on)
        onChange([option]);
      }
    } else {
      if (selected.includes(option)) {
        onChange(selected.filter((item) => item !== option));
      } else {
        onChange([...selected, option]);
      }
    }
  };

  return (
    <div className="relative w-full sm:w-auto">
      <button
        className="flex flex-col items-start w-full px-4 py-2 sm:px-5 sm:py-3 bg-[#ffffff] border-0 rounded-[12px] shadow-none hover:bg-[#D2F3F7] focus:outline-none min-h-[56px] sm:min-h-[72px]"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        {/* Top row: icon and title */}
        <div className="flex items-center gap-2 mb-0 w-full">
          {_icon}
          <span className="font-bold text-[18px] text-[#222] capitalize leading-[22px]">{title}</span>
        </div>
        {/* Second row: Choose and arrow, justify-between */}
        <div className="w-full flex flex-row items-center justify-between text-[#A3A3A3] text-[15px] sm:text-[16px] leading-[19px] font-normal mt-1 pl-8">
          <span>Choose</span>
          <svg
            className={`w-5 h-5 ml-2 sm:ml-10 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="#A3A3A3"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute left-0 z-[100] w-full mt-2 bg-white border-0 rounded-[16px] shadow-[0_8px_40px_0_rgba(0,0,0,0.18)] max-h-[320px] overflow-y-auto py-2 min-w-auto sm:min-w-auto flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {options.map((option) => {
              const isDisabled = disabledOptions.includes(option);
              return (
                <label
                  key={option}
                  className={`flex items-center px-5 py-3 cursor-pointer hover:bg-[#F8F8F8] border-b border-[#EFEFEF] last:border-b-0 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ minHeight: 44 }}
                >
                  <span className="relative flex items-center justify-center" style={{ width: 24, height: 24 }}>
                    <input
                      type="checkbox"
                      checked={selected.includes(option)}
                      onChange={() => handleSelect(option)}
                      disabled={isDisabled}
                      className="appearance-none w-[24px] h-[24px] rounded-[5px] border border-[#222] bg-white checked:bg-[#8EF7FB] checked:border-[#222] focus:ring-0 focus:outline-none"
                      style={{ boxShadow: "none" }}
                    />
                    {selected.includes(option) && !isDisabled && (
                      <svg
                        className="absolute left-0 top-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="0.5" y="0.5" width="23" height="23" rx="5" fill="#8EF7FB" stroke="#222"/>
                        <path d="M6.5 12.5L11 17L18 9.5" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>

                  {/* Option label */}
                  <span className="ml-4 text-[#222] text-[18px] leading-[22px] font-normal">{option}</span>
                </label>
              );
            })}
          </div>
          <button
            type="button"
            className={`w-[90%] mx-auto my-2 py-2 rounded-[8px] text-[16px] font-semibold transition-colors duration-200 ${selected.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#8EF7FB] text-black hover:bg-[#3AF0F7] cursor-pointer'}`}
            disabled={selected.length === 0}
            onClick={() => onChange([])}
            tabIndex={0}
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
}
