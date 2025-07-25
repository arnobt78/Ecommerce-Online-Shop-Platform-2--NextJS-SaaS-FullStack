// Moved from components/Layout/CartSidebar/CartSidebarItem.tsx

import { Trash2 } from "lucide-react";

interface CartSidebarItemProps {
  item: any;
  updateQuantity: (id: number, newQuantity: number) => void;
  removeFromCart: (id: number) => void;
}

export default function CartSidebarItem({ item, updateQuantity, removeFromCart }: CartSidebarItemProps) {
  return (
    <div className="flex items-stretch bg-transparent p-4 hover:bg-gray-50 transition-colors duration-300">
      {/* Product image frame, stretches to match content height */}
      <div className="flex-shrink-0 flex flex-col justify-center">
        <div className="w-20 h-20 border border-gray-200 rounded-lg flex items-center justify-center bg-white mr-4">
          <img src={item.image} alt={item.name} className="max-w-[70%] max-h-[70%] object-contain" />
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        {/* Top row: name (left), price (right) */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="font-semibold text-gray-900 hover:text-indigo-600 text-base leading-tight truncate text-left"
            onClick={() => item.slug && window.location.assign(`/product-detail/${item.slug}`)}
            style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
          >
            {item.name}
          </button>
          <div className="text-base font-bold text-gray-900 ml-4 whitespace-nowrap">${item.price.toFixed(2)}</div>
        </div>
        {/* Second row: brand (left), empty (right) */}
        <div className="flex items-center justify-between mt-0.5">
          <div className="text-xs text-gray-500 truncate">{item.brand}</div>
          <div></div>
        </div>
        {/* Third row: quantity controls (left), trash (right) */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded text-lg text-gray-700 hover:bg-gray-200 transition border border-gray-200"
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
            >
              –
            </button>
            <span className="flex items-baseline w-4 justify-center">
              {/* <span className="text-xs text-gray-400">Qty</span> */}
              <span className="font-semibold text-base text-gray-900">{item.quantity}</span>
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded text-lg text-gray-700 hover:bg-gray-200 transition border border-gray-200"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-600 transition ml-2"
            aria-label="Remove from cart"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
