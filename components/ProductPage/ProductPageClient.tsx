"use client";

import React from "react";
import { useState } from "react";
import ReviewSection from "@/components/Review/ReviewCardSection";
import { ListProductCard } from "@/components/ProductCard/ListProductCard";
import { CategoryFilterMenuBar } from "@/components/CategoryFilter/CategoryFilterMenuBar";
import { useInitialFilter } from "@/app/products/useInitialFilter";
import { ProductData } from "@/scripts/data/products";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContextNew";
import { PageCache, usePagePreload } from "@/components/PageCache";

interface ProductPageClientProps {
  products: ProductData[];
}

export default function ProductPageClient({
  products,
}: ProductPageClientProps) {
  const { t } = useLanguage();
  const initialFilter = useInitialFilter();
  const searchParams = useSearchParams();
  const { preloadAllData } = usePagePreload();

  // Read search param from URL using Next.js hook
  const search = searchParams?.get("search") || "";

  // All cart logic is now handled globally via CartContext
  // Remove local pagination, let ListProductCard handle it
  // Filter state (lifted to parent)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("");

  // Debug: log when sort option changes
  React.useEffect(() => {
    // console.log("[DEBUG] Sort option changed:", selectedSort);
  }, [selectedSort]);

  // Handler for filter changes from dropdowns (optional, for analytics or side effects)
  const handleFilterChange = (filters: {
    brands: string[];
    flavors: string[];
    strength: string[];
    sort: string[];
  }) => {
    // No-op or analytics
  };

  // --- Synchronize initial sort value from filter bar ---
  // This effect will run only once on mount
  React.useEffect(() => {
    // If the initialFilter is 'sort', set the default sort value
    if (initialFilter === "sort") {
      // These are the sort options from CategoryFilterMenuBar
      const sortOptions = [
        t("products.sort.priceLowToHigh"),
        t("products.sort.priceHighToLow"),
        t("products.sort.productsAZ"),
        t("products.sort.productsZA"),
      ];
      setSelectedSort(sortOptions[0]);
    }
  }, [initialFilter]);

  // Extract unique brands, flavors, strengths from real data
  const brands = Array.from(new Set(products.map((p: ProductData) => p.brand)));
  const flavors = Array.from(
    new Set(products.map((p: ProductData) => p.flavor))
  );
  const strengths = Array.from(
    new Set(products.map((p: ProductData) => p.strength))
  );

  // Filter products
  let filteredProducts = products.filter((product: ProductData) => {
    // If search param is present, filter by productName, brand, or flavor
    if (search) {
      const q = search.toLowerCase();
      return (
        (product.productName &&
          product.productName.toLowerCase().includes(q)) ||
        (product.brand && product.brand.toLowerCase().includes(q)) ||
        (product.flavor && product.flavor.toLowerCase().includes(q))
      );
    }
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const flavorMatch =
      selectedFlavors.length === 0 || selectedFlavors.includes(product.flavor);
    const strengthMatch =
      selectedStrengths.length === 0 ||
      selectedStrengths.includes(product.strength);
    return brandMatch && flavorMatch && strengthMatch;
  });

  // Debug: log filtered products before sorting
  React.useEffect(() => {
    // console.log("[DEBUG] Filtered products before sort:", filteredProducts.map(p => p.productName));
  }, [selectedBrands, selectedFlavors, selectedStrengths, search, products]);

  // Sort products based on selectedSort
  if (selectedSort === t("products.sort.priceLowToHigh")) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      // Use salePrice if available, else originalPrice
      const getPrice = (p: ProductData) =>
        parseFloat(
          (p.salePrice || p.originalPrice)
            .replace(/[^\d.,]/g, "")
            .replace(",", ".")
        );
      return getPrice(a) - getPrice(b);
    });
    // console.log("[DEBUG] Sorted by Price Low to High:", filteredProducts.map(p => p.productName));
  } else if (selectedSort === t("products.sort.priceHighToLow")) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const getPrice = (p: ProductData) =>
        parseFloat(
          (p.salePrice || p.originalPrice)
            .replace(/[^\d.,]/g, "")
            .replace(",", ".")
        );
      return getPrice(b) - getPrice(a);
    });
    // console.log("[DEBUG] Sorted by Price High to Low:", filteredProducts.map(p => p.productName));
  } else if (selectedSort === t("products.sort.productsAZ")) {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
    // console.log("[DEBUG] Sorted by Products A-Z:", filteredProducts.map(p => p.productName));
  } else if (selectedSort === t("products.sort.productsZA")) {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      b.productName.localeCompare(a.productName)
    );
    // console.log("[DEBUG] Sorted by Products Z-A:", filteredProducts.map(p => p.productName));
  } else {
    // Default: numbers first, then A-Z
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const nameA = (a.productName || "").trim();
      const nameB = (b.productName || "").trim();
      const aNum = /^[0-9]/.test(nameA);
      const bNum = /^[0-9]/.test(nameB);
      if (aNum && !bNum) return -1;
      if (!aNum && bNum) return 1;
      return nameA.localeCompare(nameB, undefined, { sensitivity: "base" });
    });
    // console.log("[DEBUG] Default sort: numbers first, then A-Z:", filteredProducts.map(p => p.productName));
  }

  return (
    <PageCache pageKey="products" preloadData={preloadAllData}>
      <div className="bg-transparent">
        {/* Header and CartSidebar are now global in layout.tsx */}
        <main className="pt-20 sm:pt-24">
          {/* Hero Section */}
          {/* <section className="py-2 sm:py-4"> */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center mb-2">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center">
              {t("products.title")}
            </h1>
            {/* <p className="text-gray-600 text-md">{t("products.subtitle")}</p> */}
          </div>
          {/* </section> */}

          {/* Category Filter, Product List, and Pagination (Reusable Components) */}
          <div className="max-w-7xl mx-auto px-1 sm:px-4 py-2 sm:py-4">
            {/* Category Filter */}
            <div className="mb-0 flex justify-center w-full">
              <CategoryFilterMenuBar
                onFilterChange={handleFilterChange}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedFlavors={selectedFlavors}
                setSelectedFlavors={setSelectedFlavors}
                selectedStrengths={selectedStrengths}
                setSelectedStrengths={setSelectedStrengths}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
              />
            </div>

            {/* Filtered by bar */}
            {(selectedBrands.length > 0 ||
              selectedFlavors.length > 0 ||
              selectedStrengths.length > 0 ||
              selectedSort) && (
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 m-0 px-2 sm:px-0">
                <span className="font-medium whitespace-nowrap">
                  {t("products.filteredBy")}
                </span>
                {/* Brands */}
                {selectedBrands.length > 0 && (
                  <span className="flex flex-row flex-wrap items-center gap-1">
                    <span className="whitespace-nowrap">
                      {t("products.filter.brands")}
                    </span>
                    {selectedBrands.map((brand, idx) => (
                      <span
                        key={brand + idx}
                        className="bg-gray-100 rounded px-2 py-1 flex items-center text-sm mr-1 mt-1 sm:mt-0"
                      >
                        {brand}
                        <button
                          className="ml-1 text-red-500 hover:text-red-700 focus:outline-none"
                          aria-label={`Remove brand ${brand}`}
                          onClick={() =>
                            setSelectedBrands(
                              selectedBrands.filter((_, i) => i !== idx)
                            )
                          }
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </span>
                )}
                {/* Flavors */}
                {selectedFlavors.length > 0 && (
                  <span className="flex flex-row flex-wrap items-center gap-1">
                    <span className="whitespace-nowrap">
                      {t("products.filter.flavors")}
                    </span>
                    {selectedFlavors.map((flavor, idx) => (
                      <span
                        key={flavor + idx}
                        className="bg-gray-100 rounded px-2 py-1 flex items-center text-sm mr-1 mt-1 sm:mt-0"
                      >
                        {flavor}
                        <button
                          className="ml-1 text-red-500 hover:text-red-700 focus:outline-none"
                          aria-label={`Remove flavor ${flavor}`}
                          onClick={() =>
                            setSelectedFlavors(
                              selectedFlavors.filter((_, i) => i !== idx)
                            )
                          }
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </span>
                )}
                {/* Strengths */}
                {selectedStrengths.length > 0 && (
                  <span className="flex flex-row flex-wrap items-center gap-1">
                    <span className="whitespace-nowrap">
                      {t("products.filter.strength")}
                    </span>
                    {selectedStrengths.map((strength, idx) => (
                      <span
                        key={strength + idx}
                        className="bg-gray-100 rounded px-2 py-1 flex items-center text-sm mr-1 mt-1 sm:mt-0"
                      >
                        {strength}
                        <button
                          className="ml-1 text-red-500 hover:text-red-700 focus:outline-none"
                          aria-label={`Remove strength ${strength}`}
                          onClick={() =>
                            setSelectedStrengths(
                              selectedStrengths.filter((_, i) => i !== idx)
                            )
                          }
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </span>
                )}
                {/* Sort */}
                {selectedSort && (
                  <span className="flex flex-row flex-wrap items-center gap-1">
                    <span className="whitespace-nowrap">
                      {t("products.filter.sort")}
                    </span>
                    <span className="bg-gray-100 rounded px-2 py-1 flex items-center text-sm mr-1 mt-1 sm:mt-0">
                      {selectedSort}
                      <button
                        className="ml-1 text-red-500 hover:text-red-700 focus:outline-none"
                        aria-label={`Remove sort ${selectedSort}`}
                        onClick={() => setSelectedSort("")}
                      >
                        ×
                      </button>
                    </span>
                  </span>
                )}
              </div>
            )}

            {/* Product List */}
            <div className="">
              <ListProductCard products={filteredProducts} />
            </div>
          </div>

          {/* Reviews Section */}
          <ReviewSection />
        </main>
      </div>
    </PageCache>
  );
}
