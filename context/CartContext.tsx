"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
  appliedPromo: string | null;
  setAppliedPromo: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart items and promo code from localStorage after hydration
  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    const storedPromo = localStorage.getItem("appliedPromo");

    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        setCartItems(parsedItems);
      } catch {
        // If parsing fails, keep empty array
      }
    }

    if (storedPromo) {
      try {
        const parsedPromo = JSON.parse(storedPromo);
        setAppliedPromo(parsedPromo);
      } catch {
        // If parsing fails, keep null
      }
    }

    setIsHydrated(true);
  }, []);

  // Persist cartItems to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isHydrated]);

  // Persist appliedPromo to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      if (appliedPromo) {
        localStorage.setItem("appliedPromo", JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem("appliedPromo");
      }
    }
  }, [appliedPromo, isHydrated]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartOpen,
        setCartOpen,
        appliedPromo,
        setAppliedPromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
