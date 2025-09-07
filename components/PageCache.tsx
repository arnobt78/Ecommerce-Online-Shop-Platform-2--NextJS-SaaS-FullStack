"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface PageCacheProps {
  children: ReactNode;
  pageKey: string;
  preloadData?: () => Promise<void>;
}

// Component to cache entire pages for faster navigation
export function PageCache({ children, pageKey, preloadData }: PageCacheProps) {
  const queryClient = useQueryClient();
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    // Preload data for this page if provided
    if (preloadData && !isPreloaded) {
      preloadData().then(() => {
        setIsPreloaded(true);
      });
    }
  }, [preloadData, isPreloaded]);

  // Keep the page data in cache when component unmounts
  useEffect(() => {
    return () => {
      // Mark this page as visited for future caching strategies
      queryClient.setQueryData(["page-visits", pageKey], true);
    };
  }, [queryClient, pageKey]);

  return <>{children}</>;
}

// Hook to preload page data
export function usePagePreload() {
  const queryClient = useQueryClient();

  const preloadProducts = async () => {
    // Preload products data
    await queryClient.prefetchQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const { products } = await import("@/scripts/data/products");
        return products;
      },
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
  };

  const preloadTranslations = async () => {
    // Preload translations data
    await queryClient.prefetchQuery({
      queryKey: ["translations"],
      queryFn: async () => {
        const { translations } = await import("@/lib/translations");
        return translations;
      },
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
  };

  const preloadAllData = async () => {
    await Promise.all([preloadProducts(), preloadTranslations()]);
  };

  return {
    preloadProducts,
    preloadTranslations,
    preloadAllData,
  };
}
