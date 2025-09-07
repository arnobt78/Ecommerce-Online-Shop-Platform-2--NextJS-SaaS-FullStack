"use client";

import { useQuery } from "@tanstack/react-query";
import { products } from "@/scripts/data/products";
import { ProductData } from "@/scripts/data/products";

// Optimized product fetching with aggressive caching for static data
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => Promise.resolve(products), // Static data - no API calls needed
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - static data doesn't change
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days - keep in cache for a week
    refetchOnWindowFocus: false, // No need to refetch static data
    refetchOnMount: false, // No need to refetch on mount if cached
    refetchOnReconnect: false, // No need to refetch on reconnect
    retry: false, // No retries needed for static data
  });
}

// Optimized filtered products with aggressive caching
export function useFilteredProducts(filters: {
  brands?: string[];
  flavors?: string[];
  strength?: string[];
  sort?: string;
}) {
  return useQuery({
    queryKey: ["products", "filtered", filters],
    queryFn: () => {
      let filteredProducts = [...products];

      // Apply filters
      if (filters.brands && filters.brands.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          filters.brands!.includes(product.brand)
        );
      }

      if (filters.flavors && filters.flavors.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          filters.flavors!.some((flavor) =>
            product.flavor.toLowerCase().includes(flavor.toLowerCase())
          )
        );
      }

      if (filters.strength && filters.strength.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          filters.strength!.includes(product.strength)
        );
      }

      // Apply sorting
      if (filters.sort) {
        switch (filters.sort) {
          case "price-low-to-high":
            filteredProducts.sort(
              (a, b) =>
                parseFloat(a.originalPrice) - parseFloat(b.originalPrice)
            );
            break;
          case "price-high-to-low":
            filteredProducts.sort(
              (a, b) =>
                parseFloat(b.originalPrice) - parseFloat(a.originalPrice)
            );
            break;
          case "products-a-z":
            filteredProducts.sort((a, b) =>
              a.productName.localeCompare(b.productName)
            );
            break;
          case "products-z-a":
            filteredProducts.sort((a, b) =>
              b.productName.localeCompare(a.productName)
            );
            break;
        }
      }

      return filteredProducts;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - filtered results are also static
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days - keep in cache for a week
    refetchOnWindowFocus: false, // No need to refetch static data
    refetchOnMount: false, // No need to refetch on mount if cached
    refetchOnReconnect: false, // No need to refetch on reconnect
    retry: false, // No retries needed for static data
  });
}

// Translations data - cached for 24 hours since it's static
export function useTranslations() {
  return useQuery({
    queryKey: ["translations"],
    queryFn: async () => {
      const { translations } = await import("@/lib/translations");
      return translations;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
}

// Combined hook for all static data
export function useStaticData() {
  const productsQuery = useProducts();
  const translationsQuery = useTranslations();

  return {
    products: productsQuery.data || [],
    translations: translationsQuery.data,
    isLoading: productsQuery.isLoading || translationsQuery.isLoading,
    isError: productsQuery.isError || translationsQuery.isError,
  };
}
