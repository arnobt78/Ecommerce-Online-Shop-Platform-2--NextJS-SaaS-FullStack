"use client";
import React, { createContext, useContext, useState } from "react";

export type SharedProduct = any;

interface ProductContextType {
  sharedProduct: SharedProduct | null;
  setSharedProduct: (product: SharedProduct | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sharedProduct, setSharedProduct] = useState<SharedProduct | null>(
    null
  );
  return (
    <ProductContext.Provider value={{ sharedProduct, setSharedProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
