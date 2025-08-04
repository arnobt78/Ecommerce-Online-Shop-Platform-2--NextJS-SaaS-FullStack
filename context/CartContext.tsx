"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Import ProductData to ensure CartItem matches product props
import type { ProductData } from "@/data/products";

// CartItem extends ProductData and adds quantity. Use slug as unique id.
export interface CartItem extends ProductData {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
  
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('cartItems');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
    }
    return [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  // Persist cartItems to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}
