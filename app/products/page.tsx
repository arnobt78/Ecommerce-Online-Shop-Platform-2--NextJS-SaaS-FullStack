"use client"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronDown, Plus } from 'lucide-react'
import ReviewSection from "@/components/Review/ReviewCardSection";
import { ListProductCard } from "@/components/ProductCard/ListProductCard"
import { CategoryFilterMenuBar } from "@/components/CategoryFilter/CategoryFilterMenuBar"
import { useInitialFilter } from "./useInitialFilter"
import { products, ProductData } from "@/data/products"



export default function CategoryPage() {
  const initialFilter = useInitialFilter();
  // Read search param from URL
  let search = "";
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    search = params.get("search") || "";
  }
  // All cart logic is now handled globally via CartContext
  // Remove local pagination, let ListProductCard handle it
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("");

  // Extract unique brands, flavors, strengths from real data
  const brands = Array.from(new Set(products.map((p: ProductData) => p.brand)));
  const flavors = Array.from(new Set(products.map((p: ProductData) => p.flavor)));
  const strengths = Array.from(new Set(products.map((p: ProductData) => p.strength)));

  // Filter products
  let filteredProducts = products.filter((product: ProductData) => {
    // If search param is present, filter by productName, brand, or flavor
    if (search) {
      const q = search.toLowerCase();
      return (
        (product.productName && product.productName.toLowerCase().includes(q)) ||
        (product.brand && product.brand.toLowerCase().includes(q)) ||
        (product.flavor && product.flavor.toLowerCase().includes(q))
      );
    }
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const flavorMatch = selectedFlavors.length === 0 || selectedFlavors.includes(product.flavor);
    const strengthMatch = selectedStrengths.length === 0 || selectedStrengths.includes(product.strength);
    return brandMatch && flavorMatch && strengthMatch;
  });

  // Sort products based on selectedSort
  if (selectedSort === "Price Low to High") {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      // Use salePrice if available, else originalPrice
      const getPrice = (p: ProductData) => parseFloat((p.salePrice || p.originalPrice).replace(/[^\d.,]/g, '').replace(',', '.'));
      return getPrice(a) - getPrice(b);
    });
  } else if (selectedSort === "Price High to Low") {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const getPrice = (p: ProductData) => parseFloat((p.salePrice || p.originalPrice).replace(/[^\d.,]/g, '').replace(',', '.'));
      return getPrice(b) - getPrice(a);
    });
  } else if (selectedSort === "Products A-Z") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.productName.localeCompare(b.productName));
  } else if (selectedSort === "Products Z-A") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.productName.localeCompare(a.productName));
  }

  return (
    <div className="bg-transparent">
      {/* Header and CartSidebar are now global in layout.tsx */}
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#3AF0F7]/10 to-[#8ef7fb]/10 py-2 sm:py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Best selling</h1>
            <p className="text-gray-600 text-md">Discover our most popular nicotine products</p>
          </div>
        </section>

        {/* Category Filter, Product List, and Pagination (Reusable Components) */}
        <div className="max-w-7xl mx-auto px-1 sm:px-4 py-4 md:py-6">
          {/* Category Filter */}
          <div className="mb-4 flex justify-center w-full">
            <CategoryFilterMenuBar
              onFilterChange={({ brands, flavors, strength, sort }) => {
                setSelectedBrands(brands);
                setSelectedFlavors(flavors);
                setSelectedStrengths(strength);
                setSelectedSort(sort && sort.length > 0 ? sort[0] : "");
              }}
              initialFilter={initialFilter}
            />
          </div>
          
          {/* Product List */}
          <div className="">
            <ListProductCard products={filteredProducts} />
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection />
      </main>
    </div>
  )
}
