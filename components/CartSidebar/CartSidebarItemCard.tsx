// Moved from components/Layout/CartSidebar/CartSidebarItem.tsx

import { Trash2 } from "lucide-react";

interface CartSidebarItemProps {
  item: any;
  updateQuantity: (id: number, newQuantity: number) => void;
  removeFromCart: (id: number) => void;
}

export default function CartSidebarItem({ item, updateQuantity, removeFromCart }: CartSidebarItemProps) {
  return (
    <div className="flex items-start bg-white rounded-lg shadow p-3 min-h-[72px]">
      {/* Product image */}
      <img src={item.image} alt={item.name} className="w-14 h-14 object-contain rounded mr-4 mt-1" />
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top row: name (left), price (right) */}
        <div className="flex items-center justify-between">
          <div className="font-semibold text-gray-900 text-base leading-tight truncate">{item.name}</div>
          <div className="text-base font-bold text-gray-900 ml-4 whitespace-nowrap">€{item.price.toFixed(2)}</div>
        </div>
        {/* Second row: brand (left), empty (right) */}
        <div className="flex items-center justify-between mt-0.5">
          <div className="text-xs text-gray-500 truncate">{item.brand}</div>
          <div></div>
        </div>
        {/* Third row: quantity controls (left), trash (right) */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded text-lg text-gray-700 hover:bg-gray-200 transition"
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
            >
              –
            </button>
            <span className="font-semibold text-base w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded text-lg text-gray-700 hover:bg-gray-200 transition"
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
