"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Import ProductData to ensure CartItem matches product props
import type { ProductData } from "@/scripts/data/products";

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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart items from localStorage after hydration
  useEffect(() => {
    const stored = localStorage.getItem('cartItems');
    if (stored) {
      try {
        const parsedItems = JSON.parse(stored);
        setCartItems(parsedItems);
      } catch {
        // If parsing fails, keep empty array
      }
    }
    setIsHydrated(true);
  }, []);

  // Persist cartItems to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isHydrated]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}
