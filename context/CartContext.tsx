"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
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
  const previousCartRef = useRef<CartItem[]>([]);

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

  // Clear promo code when cart items change or cart becomes empty (only after hydration)
  useEffect(() => {
    if (isHydrated && appliedPromo) {
      // Clear promo code when cart becomes empty
      if (cartItems.length === 0) {
        setAppliedPromo(null);
        return;
      }

      // Check if cart items have actually changed (not just quantity updates)
      const previousCart = previousCartRef.current;
      const currentCart = cartItems;

      // If this is the first time (no previous cart), just store current cart
      if (previousCart.length === 0) {
        previousCartRef.current = [...currentCart];
        return;
      }

      // Check if the actual items have changed (different products, not just quantities)
      const previousSlugs = previousCart.map((item) => item.slug).sort();
      const currentSlugs = currentCart.map((item) => item.slug).sort();

      const itemsChanged =
        JSON.stringify(previousSlugs) !== JSON.stringify(currentSlugs);

      if (itemsChanged) {
        // Cart items have changed (different products), clear promo code
        setAppliedPromo(null);
      }

      // Update the previous cart reference
      previousCartRef.current = [...currentCart];
    }
  }, [cartItems, isHydrated, appliedPromo]);

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
