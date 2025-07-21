
import React from "react";

// ProductQuantityDropdownPrice component (inlined)
interface ProductQuantityDropdownPriceProps {
  salePrice?: string;
  originalPrice?: string;
  value?: number; // quantity
}
/**
 * ProductQuantityDropdownPrice renders the calculated price for the selected quantity.
 */
const ProductQuantityDropdownPrice: React.FC<ProductQuantityDropdownPriceProps> = ({ salePrice, originalPrice, value = 1 }) => {
  // Helper to parse price string (e.g., "€ 3,60") to number (3.60)
  function parsePrice(price: string | undefined): number {
    if (!price) return 0;
    const cleaned = price.replace(/[^0-9,.-]+/g, "").replace(",", ".");
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }
  // Helper to extract currency symbol (defaults to "€")
  function getCurrency(price: string | undefined): string {
    if (!price) return "€";
    const match = price.match(/[^\d.,\s]+/);
    return match ? match[0] : "€";
  }
  const currency = getCurrency(salePrice || originalPrice);
  const sale = parsePrice(salePrice);
  const original = parsePrice(originalPrice);
  const totalSale = sale * value;
  const totalOriginal = original * value;
  const showDiscount = salePrice && sale < original;
  return (
    <div className="flex flex-row items-center justify-end min-w-[120px] gap-2">
      {showDiscount ? (
        <>
          <span className="text-[18px] font-semibold text-[#C02929] leading-[24px]">
            {currency} {totalSale.toFixed(2).replace(".", ",")}
          </span>
          <span className="text-[16px] text-black line-through">
            {currency} {totalOriginal.toFixed(2).replace(".", ",")}
          </span>
        </>
      ) : (
        <span className="text-[18px] font-semibold text-black leading-[24px]">
          {currency} {totalOriginal.toFixed(2).replace(".", ",")}
        </span>
      )}
      {/* {value > 1 && (
        <span className="text-[12px] text-gray-500 ml-2">({currency} {(showDiscount ? sale : original).toFixed(2).replace(".", ",")} x {value})</span>
      )} */}
        </div>
      );
    };


// ProductQuantityDropdownList component (inlined)
interface ProductQuantityDropdownListProps {
  quantityOptions: number[];
  value: number;
  onChange: (qty: number) => void;
  listRef: React.RefObject<HTMLDivElement>;
}
/**
 * ProductQuantityDropdownList renders the dropdown list of quantity options.
 */
const ProductQuantityDropdownList: React.FC<ProductQuantityDropdownListProps> = ({ quantityOptions, value, onChange, listRef }) => (
  <div
    ref={listRef}
    className="absolute left-1/2 -translate-x-1/2 z-50 mt-1 w-[100px] max-h-[303px] bg-white border border-black/15 rounded-xl shadow-2xl overflow-y-auto mx-auto"
    style={{ boxShadow: '0px 30px 60px rgba(0,0,0,0.2)', minWidth: 60, width: 60 }}
    role="listbox"
    tabIndex={-1}
  >
    {quantityOptions.map((q, i) => (
      <button
        key={q}
        type="button"
        role="option"
        aria-selected={q === value}
        className={`w-full flex flex-row items-center px-4 py-4 text-[18px] font-normal text-black/80 focus:outline-none cursor-pointer ${q === value ? 'bg-[#8EF7FB]/10' : 'bg-white'} ${i === 0 ? 'rounded-t-xl' : ''} ${i === quantityOptions.length-1 ? 'rounded-b-xl' : ''} hover:bg-zinc-200`}
        style={{ fontFamily: 'Poppins, sans-serif', lineHeight: '27px', borderBottom: i !== quantityOptions.length-1 ? '1px solid #EFEFEF' : undefined }}
        onClick={() => { onChange(q); }}
        tabIndex={0}
      >
        {q}x
      </button>
    ))}
  </div>
);

export interface ProductQuantityDropdownSectionProps {
  value: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
  salePrice?: string;
  originalPrice?: string;
}

const defaultOptions = [1,2,3,4,5,6,7,8,9,10];

export const ProductQuantityDropdownSection: React.FC<ProductQuantityDropdownSectionProps> = ({
  value,
  onChange,
  min = 1,
  max = 10,
  salePrice,
  originalPrice,
}) => {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const quantityOptions = React.useMemo(() => {
    if (min === 1 && max === 10) return defaultOptions;
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  }, [min, max]);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  React.useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('keydown', handleKey);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  React.useEffect(() => {
    if (open && listRef.current) {
      const idx = quantityOptions.indexOf(value);
      if (idx >= 0) {
        const item = listRef.current.children[idx] as HTMLElement;
        if (item) item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [open, value, quantityOptions]);

  // ...existing code...
  // Price calculation moved to ProductQuantityDropdownPrice


  return (
    <div className="flex flex-row items-center justify-between w-full select-none" style={{ minWidth: 60 }}>
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex flex-row items-center w-[75px] h-[51px] bg-white border border-black/15 rounded-xl px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] cursor-pointer"
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, lineHeight: '27px', fontWeight: 400, color: '#000', opacity: 0.8 }}
          onClick={() => setOpen(o => !o)}
          tabIndex={0}
        >
          <span className="pr-1">{value}x</span>
          {/* Down arrow SVG, vertically centered and inside the button */}
          <span className="flex items-center">
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="1.2"/>
            </svg>
          </span>
        </button>

        {open && (
          <ProductQuantityDropdownList
            quantityOptions={quantityOptions}
            value={value}
            onChange={q => { onChange(q); setOpen(false); }}
            listRef={listRef}
          />
        )}
      </div>
    </div>
  );
};




