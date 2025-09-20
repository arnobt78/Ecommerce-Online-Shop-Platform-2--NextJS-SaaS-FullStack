"use client";

import { Button } from "@/components/ui/button";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Plus,
  Star,
  ShoppingBag,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContextNew";
// import { LanguageSelector } from "@/components/LanguageSelector/LanguageSelector";
import Image from "next/image";

type NavbarProps = {
  allProducts?: any[];
  noBlur?: boolean;
};

export default function Navbar({
  allProducts = [],
  noBlur = false,
}: NavbarProps) {
  const { cartItems, setCartItems, cartOpen, setCartOpen } = useCart();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchResultsTotal, setSearchResultsTotal] = useState(0);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  // State to control navbar visibility based on scroll position
  const [showNavbar, setShowNavbar] = useState(true);
  // State to keep search results visible even when navbar is hidden
  const [keepSearchResultsVisible, setKeepSearchResultsVisible] =
    useState(false);
  // Hydration state to avoid SSR mismatch for cart badge
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const isAtTop = window.scrollY === 0;

      // Keep navbar always visible on mobile (don't hide on scroll)
      // Only hide navbar on desktop
      if (window.innerWidth > 1184) {
        setShowNavbar(isAtTop);
      } else {
        setShowNavbar(true); // Always visible on mobile
      }

      // Close mobile menu when scrolling down (but not when search is focused)
      if (!isAtTop && mobileMenuOpen && !searchFocused) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen, searchFocused]);

  // Add search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setSearchResultsTotal(0);
      setShowSearchResults(false);
      return;
    }

    const filteredAll = allProducts.filter((product) => {
      // Use productName as fallback for name, and productImage as fallback for image
      const name =
        typeof product.name === "string"
          ? product.name
          : typeof product.productName === "string"
          ? product.productName
          : "";
      const brand = typeof product.brand === "string" ? product.brand : "";
      const category =
        typeof product.category === "string" ? product.category : "";
      const query = searchQuery.toLowerCase();
      return (
        name.toLowerCase().includes(query) ||
        brand.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query)
      );
    });
    setSearchResultsTotal(filteredAll.length);
    setSearchResults(filteredAll.slice(0, 8));
    setShowSearchResults(true);
  }, [searchQuery, allProducts]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (!searchFocused) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [searchFocused]);

  // Helper to parse price string (e.g., "€ 3,60") to number (3.60)
  function parsePrice(price: any) {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      // Remove euro sign and spaces, replace comma with dot
      const cleaned = price.replace(/[^0-9,.-]+/g, "").replace(",", ".");
      const num = parseFloat(cleaned);
      return isNaN(num) ? 0 : num;
    }
    return 0;
  }

  // Add product to cart using CartItem shape (from data/products.ts)
  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.slug === product.slug);
      if (existingItem) {
        return prev.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add full product object plus quantity
        return [
          ...prev,
          {
            ...product,
            quantity: 1,
          },
        ];
      }
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <header
      className="w-full bg-white [@media(max-width:1184px)]:bg-white sm:bg-transparent text-[1.1rem] fixed top-0 left-0 z-50 transition-transform duration-300"
      style={{
        transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: showNavbar ? "auto" : "none",
      }}
    >
      <div className="max-w-9xl w-full mx-auto [@media(max-width:1184px)]:py-2 sm:py-6 [@media(max-width:1184px)]:px-2 sm:px-16">
        {/* Desktop Navbar (≥1185px) */}
        <div className="hidden [@media(min-width:1185px)]:flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <a
              href="/"
              className="flex items-center justify-center"
              style={{ minWidth: 120, maxWidth: 120, width: 120, height: 48 }}
            >
              <Image
                src="/logo.svg"
                alt="SNUZZ"
                width={120}
                height={48}
                className="h-12 w-auto"
                style={{ width: 120, height: 48, minWidth: 120, maxWidth: 120 }}
                priority
              />
            </a>
          </div>

          <nav
            className="flex items-center space-x-4 flex-nowrap overflow-x-auto scrollbar-hide"
            style={{ minWidth: 480, maxWidth: "100vw" }}
          >
            {[
              { label: t("nav.shop"), href: "/products" },
              { label: t("nav.brands"), href: "/products?filter=brands" },
              { label: t("nav.flavor"), href: "/products?filter=flavors" },
              { label: t("nav.strength"), href: "/products?filter=strength" },
              { label: t("nav.snuzzpro"), href: "/pro" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative font-large hover:text-[#3AF0F7] transition-all duration-300 flex items-center justify-center"
                style={{
                  minWidth: 90,
                  maxWidth: 110,
                  width: 100,
                  fontFamily: "inherit",
                  fontWeight: 400,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Search and Cart buttons (desktop) */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                // placeholder={t("nav.search.placeholder")}
                className="pl-8 pr-3 py-1.5 w-48 h-8 text-sm text-gray-600 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ffaff]"
              />
              {showSearchResults && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-2xl z-50 w-[300px] max-h-[390px] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="p-0">
                      <div className="text-sm text-gray-500 mx-4 border-b border-gray-200 py-2 font-semibold text-center">
                        {searchResultsTotal}{" "}
                        {searchResultsTotal === 1
                          ? t("nav.search.results")
                          : t("nav.search.results.plural")}
                      </div>
                      <div className="space-y-2">
                        {[...searchResults]
                          .sort((a, b) => {
                            const nameA = (
                              a.productName ||
                              a.name ||
                              ""
                            ).trim();
                            const nameB = (
                              b.productName ||
                              b.name ||
                              ""
                            ).trim();
                            const aNum = /^[0-9]/.test(nameA);
                            const bNum = /^[0-9]/.test(nameB);
                            if (aNum && !bNum) return -1;
                            if (!aNum && bNum) return 1;
                            return nameA.localeCompare(nameB, undefined, {
                              sensitivity: "base",
                            });
                          })
                          .map((product, index) => (
                            <div
                              key={
                                product.id ||
                                product.slug ||
                                product.name ||
                                product.productName ||
                                `search-result-${
                                  product.slug ||
                                  product.name ||
                                  product.productName ||
                                  index
                                }`
                              }
                              className="flex items-center gap-2 p-2 hover:bg-[#3AF0F7]/10 rounded-xl transition-all duration-300 group"
                            >
                              <a
                                href={`/product-detail/${product.slug || ""}`}
                                className="flex items-center flex-1 gap-2 min-w-0 cursor-pointer"
                                onClick={() => {
                                  setSearchQuery("");
                                  setShowSearchResults(false);
                                }}
                                style={{ textDecoration: "none" }}
                              >
                                <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200 overflow-hidden">
                                  {(() => {
                                    const img =
                                      product.productImage ||
                                      product.image ||
                                      "";
                                    if (
                                      typeof img === "string" &&
                                      img.length > 0
                                    ) {
                                      return (
                                        <Image
                                          src={
                                            typeof img === "string" &&
                                            img.length > 0
                                              ? img.startsWith("http://") ||
                                                img.startsWith("https://")
                                                ? img
                                                : "/" + img.replace(/^\/+/, "")
                                              : ""
                                          }
                                          alt={
                                            product.productName ||
                                            product.name ||
                                            "Product"
                                          }
                                          width={48}
                                          height={48}
                                          className="object-contain w-full h-full"
                                          onError={(e) => {
                                            e.currentTarget.style.display =
                                              "none";
                                          }}
                                        />
                                      );
                                    } else {
                                      return (
                                        <div className="text-gray-400 text-xs justify-center">
                                          No Image
                                        </div>
                                      );
                                    }
                                  })()}
                                </div>
                                <div className="flex flex-col flex-1 min-w-0 justify-center">
                                  <h4
                                    className="font-semibold text-gray-900 text-sm truncate transition-colors max-w-[160px]"
                                    title={
                                      product.productName || product.name || ""
                                    }
                                  >
                                    {(() => {
                                      const pname =
                                        product.productName ||
                                        product.name ||
                                        "";
                                      return typeof pname === "string" &&
                                        pname.length > 0
                                        ? pname.length > 32
                                          ? pname.slice(0, 32) + "…"
                                          : pname
                                        : "Unnamed";
                                    })()}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {product.brand || ""}
                                  </p>
                                </div>
                                <div className="flex flex-col items-end min-w-[48px] ml-2">
                                  {product.salePrice ? (
                                    <>
                                      <span className="text-gray-900 font-semibold text-sm">
                                        €
                                        {parseFloat(
                                          (typeof product.salePrice === "string"
                                            ? product.salePrice
                                            : String(product.salePrice)
                                          )
                                            .replace(/[^0-9,.-]+/g, "")
                                            .replace(",", ".")
                                        ).toFixed(2)}
                                      </span>
                                      <span className="text-gray-400 line-through text-xs">
                                        €
                                        {parseFloat(
                                          (typeof product.originalPrice ===
                                          "string"
                                            ? product.originalPrice
                                            : String(product.originalPrice)
                                          )
                                            .replace(/[^0-9,.-]+/g, "")
                                            .replace(",", ".")
                                        ).toFixed(2)}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-gray-900 font-semibold text-sm">
                                      €
                                      {parseFloat(
                                        (typeof product.originalPrice ===
                                        "string"
                                          ? product.originalPrice
                                          : String(product.originalPrice)
                                        )
                                          .replace(/[^0-9,.-]+/g, "")
                                          .replace(",", ".")
                                      ).toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              </a>
                              {/* <button
                                type="button"
                                className="flex-shrink-0 ml-2 focus:outline-none"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product);
                                }}
                                tabIndex={0}
                                aria-label="Add to cart"
                              >
                                <div className="w-8 h-8 bg-[#3AF0F7] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-110">
                                  <Plus className="w-4 h-4 text-gray-900" />
                                </div>
                              </button> */}
                            </div>
                          ))}
                      </div>
                      <div className="border-t border-gray-200 mx-2">
                        <button
                          onClick={() => {
                            // Navigate to /products with search param
                            window.location.href = `/products?search=${encodeURIComponent(
                              searchQuery
                            )}`;
                            setSearchQuery("");
                            setShowSearchResults(false);
                          }}
                          className="w-full text-center text-gray-900 font-semibold text-sm py-3 hover:bg-[#3AF0F7]/10 rounded-lg transition-colors"
                        >
                          {t("nav.search.viewAll")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">
                        {t("nav.search.noResults")}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {t("nav.search.tryDifferent")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => setCartOpen(true)}
              className="relative bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-gray-900 transition-all duration-300 transform hover:scale-110 rounded-md h-8 px-2"
            >
              <ShoppingBag className="w-4 h-4" />
              {hydrated && getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              // className="[@media(max-width:849px)]:hidden"
              onClick={() => {
                // Ensure state is properly synchronized
                setMobileMenuOpen((prev) => !prev);
              }}
            >
              {mobileMenuOpen ? (
                <X className="w-12 h-12" />
              ) : (
                <Menu className="w-12 h-12" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navbar Row: burger left, logo center, cart right (<1185px) */}
        <div className="flex [@media(max-width:1184px)]:flex [@media(min-width:1185px)]:hidden items-center justify-between">
          {/* Burger menu button */}
          <Button
            variant="ghost"
            size="icon"
            className=""
            onClick={() => {
              // Ensure state is properly synchronized
              setMobileMenuOpen((prev) => !prev);
            }}
          >
            {mobileMenuOpen ? (
              <X className="w-12 h-12" />
            ) : (
              <Menu className="w-12 h-12" />
            )}
          </Button>
          {/* Center logo */}
          <a
            href="/"
            className="flex-1 flex justify-center"
            style={{ minWidth: 120, maxWidth: 120, width: 120, height: 48 }}
          >
            <Image
              src="/logo.svg"
              alt="SNUZZ"
              width={120}
              height={48}
              className="h-12 w-auto"
              style={{ width: 120, height: 48, minWidth: 120, maxWidth: 120 }}
            />
          </a>
          {/* Cart button */}
          <Button
            variant="ghost"
            onClick={() => setCartOpen(true)}
            className="relative bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-gray-900 transition-all duration-300 transform hover:scale-110 rounded-md h-8 px-2"
          >
            <ShoppingBag className="w-4 h-4" />
            {hydrated && getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                {getTotalItems()}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="[@media(max-width:1184px)]:block [@media(min-width:1185px)]:hidden w-full bg-white border-b border-gray-200">
          <div className="mx-0 py-0">
            {/* Navigation Items - Collapse when search is focused for better UX */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                searchFocused
                  ? "max-h-0 overflow-hidden opacity-0 -mt-4"
                  : "max-h-96 opacity-100"
              }`}
            >
              {[
                { label: t("nav.shop"), href: "/products" },
                { label: t("nav.brands"), href: "/products?filter=brands" },
                { label: t("nav.flavor"), href: "/products?filter=flavors" },
                { label: t("nav.strength"), href: "/products?filter=strength" },
                { label: t("nav.snuzzpro"), href: "/pro" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block text-gray-700 hover:text-[#3AF0F7] hover:bg-gray-100 font-medium px-4 py-3"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Search Section - Always visible */}
            <div className="px-4 pt-1 pb-2 relative">
              <Search className="absolute left-6 top-[calc(50%)] transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <div className="w-full max-w-full overflow-x-hidden">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={(e) => {
                    setSearchFocused(true);
                    // Keep search input visible when keyboard appears
                    setTimeout(() => {
                      const searchInput = e.target as HTMLInputElement;
                      if (searchInput) {
                        // Get the current scroll position
                        const currentScrollY = window.scrollY;
                        // Get the input's position relative to the viewport
                        const inputRect = searchInput.getBoundingClientRect();
                        // Calculate how much to scroll to keep input visible
                        const scrollAdjustment =
                          inputRect.top - window.innerHeight / 2;

                        if (scrollAdjustment < 0) {
                          // Scroll up to keep input visible
                          window.scrollTo({
                            top: currentScrollY + scrollAdjustment,
                            behavior: "smooth",
                          });
                        }
                      }
                    }, 500); // Longer delay to ensure keyboard is fully visible
                  }}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  placeholder={t("nav.search.placeholder")}
                  className={`w-full pl-8 pr-4 py-2 text-base text-[16px] text-gray-600 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ffaff] transition-all duration-300 ${
                    searchFocused ? "border-[#3AF0F7] bg-blue-50/30" : ""
                  }`}
                />
              </div>

              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md z-50 max-h-80 overflow-y-auto shadow-lg">
                  {searchResults.length > 0 ? (
                    <div className="p-0">
                      <div className="text-sm text-gray-500 mx-2 border-b border-gray-200 py-2 font-semibold text-center">
                        {searchResultsTotal}{" "}
                        {searchResultsTotal === 1
                          ? t("nav.search.results")
                          : t("nav.search.results.plural")}
                      </div>
                      <div className="space-y-2">
                        {[...searchResults]
                          .sort((a, b) => {
                            const nameA = (
                              a.productName ||
                              a.name ||
                              ""
                            ).trim();
                            const nameB = (
                              b.productName ||
                              b.name ||
                              ""
                            ).trim();
                            const aNum = /^[0-9]/.test(nameA);
                            const bNum = /^[0-9]/.test(nameB);
                            if (aNum && !bNum) return -1;
                            if (!aNum && bNum) return 1;
                            return nameA.localeCompare(nameB, undefined, {
                              sensitivity: "base",
                            });
                          })
                          .map((product, index) => (
                            <div
                              key={
                                product.id ||
                                product.slug ||
                                product.name ||
                                product.productName ||
                                `search-result-${
                                  product.slug ||
                                  product.name ||
                                  product.productName ||
                                  index
                                }`
                              }
                              className="flex items-center gap-2 p-2 hover:bg-[#3AF0F7]/10 rounded-xl transition-all duration-300 group"
                            >
                              <a
                                href={`/product-detail/${product.slug || ""}`}
                                className="flex items-center flex-1 gap-2 min-w-0 cursor-pointer"
                                onClick={() => {
                                  setSearchQuery("");
                                  setShowSearchResults(false);
                                }}
                                style={{ textDecoration: "none" }}
                              >
                                <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200 overflow-hidden">
                                  {(() => {
                                    const img =
                                      product.productImage ||
                                      product.image ||
                                      "";
                                    if (
                                      typeof img === "string" &&
                                      img.length > 0
                                    ) {
                                      return (
                                        <Image
                                          src={
                                            typeof img === "string" &&
                                            img.length > 0
                                              ? img.startsWith("http://") ||
                                                img.startsWith("https://")
                                                ? img
                                                : "/" + img.replace(/^\/+/, "")
                                              : ""
                                          }
                                          alt={
                                            product.productName ||
                                            product.name ||
                                            "Product"
                                          }
                                          width={48}
                                          height={48}
                                          className="object-contain w-full h-full"
                                          onError={(e) => {
                                            e.currentTarget.style.display =
                                              "none";
                                          }}
                                        />
                                      );
                                    } else {
                                      return (
                                        <div className="text-gray-400 text-xs justify-center">
                                          No Image
                                        </div>
                                      );
                                    }
                                  })()}
                                </div>
                                <div className="flex flex-col flex-1 min-w-0 justify-center">
                                  <h4
                                    className="font-semibold text-gray-900 text-sm truncate transition-colors max-w-[160px]"
                                    title={
                                      product.productName || product.name || ""
                                    }
                                  >
                                    {(() => {
                                      const pname =
                                        product.productName ||
                                        product.name ||
                                        "";
                                      return typeof pname === "string" &&
                                        pname.length > 0
                                        ? pname.length > 32
                                          ? pname.slice(0, 32) + "…"
                                          : pname
                                        : "Unnamed";
                                    })()}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {product.brand || ""}
                                  </p>
                                </div>
                                <div className="flex flex-col items-end min-w-[48px] ml-2">
                                  {product.salePrice ? (
                                    <>
                                      <span className="text-gray-900 font-semibold text-sm">
                                        €
                                        {parseFloat(
                                          (typeof product.salePrice === "string"
                                            ? product.salePrice
                                            : String(product.salePrice)
                                          )
                                            .replace(/[^0-9,.-]+/g, "")
                                            .replace(",", ".")
                                        ).toFixed(2)}
                                      </span>
                                      <span className="text-gray-400 line-through text-xs">
                                        €
                                        {parseFloat(
                                          (typeof product.originalPrice ===
                                          "string"
                                            ? product.originalPrice
                                            : String(product.originalPrice)
                                          )
                                            .replace(/[^0-9,.-]+/g, "")
                                            .replace(",", ".")
                                        ).toFixed(2)}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-gray-900 font-semibold text-sm">
                                      €
                                      {parseFloat(
                                        (typeof product.originalPrice ===
                                        "string"
                                          ? product.originalPrice
                                          : String(product.originalPrice)
                                        )
                                          .replace(/[^0-9,.-]+/g, "")
                                          .replace(",", ".")
                                      ).toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              </a>
                              {/* <button
                                type="button"
                                className="flex-shrink-0 ml-2 focus:outline-none"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product);
                                }}
                                tabIndex={0}
                                aria-label="Add to cart"
                              >
                                <div className="w-8 h-8 bg-[#3AF0F7] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-110">
                                  <Plus className="w-4 h-4 text-gray-900" />
                                </div>
                              </button> */}
                            </div>
                          ))}
                      </div>
                      <div className="border-t border-gray-200 mx-2">
                        <button
                          onClick={() => {
                            // Navigate to /products with search param
                            window.location.href = `/products?search=${encodeURIComponent(
                              searchQuery
                            )}`;
                            setSearchQuery("");
                            setShowSearchResults(false);
                          }}
                          className="w-full text-center text-gray-900 font-semibold text-sm py-3 hover:bg-[#3AF0F7]/10 rounded-lg transition-colors"
                        >
                          {t("nav.search.viewAll")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">
                        {t("nav.search.noResults")}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {t("nav.search.tryDifferent")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Results Overlay - Shows when navbar is hidden but search is active */}
      {keepSearchResultsVisible && showSearchResults && searchQuery && (
        <div className="[@media(max-width:1184px)]:block [@media(min-width:1185px)]:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 max-h-screen overflow-y-auto">
          <div className="p-4">
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("nav.search.placeholder")}
                className="w-full pl-10 pr-4 py-2 text-md text-gray-600 border border-[#3AF0F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ffaff] bg-blue-50/30"
                autoFocus
              />
            </div>

            {/* Search Results */}
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                <div className="text-sm text-gray-500 mb-4 border-b border-gray-200 pb-2 font-semibold text-center">
                  {searchResultsTotal}{" "}
                  {searchResultsTotal === 1
                    ? t("nav.search.results")
                    : t("nav.search.results.plural")}
                </div>
                {searchResults.map((product, index) => (
                  <div
                    key={`overlay-search-result-${
                      product.slug ||
                      product.name ||
                      product.productName ||
                      index
                    }`}
                    className="flex items-center gap-2 p-2 hover:bg-[#3AF0F7]/10 rounded-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => {
                      addToCart(product);
                      setSearchQuery("");
                      setShowSearchResults(false);
                      setKeepSearchResultsVisible(false);
                    }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8cedf8] to-[#3AF0F7]/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200 overflow-hidden">
                      {(() => {
                        const img = product.productImage || product.image || "";
                        if (typeof img === "string" && img.length > 0) {
                          return (
                            <Image
                              src={
                                typeof img === "string" && img.length > 0
                                  ? img.startsWith("http://") ||
                                    img.startsWith("https://")
                                    ? img
                                    : "/" + img.replace(/^\/+/, "")
                                  : ""
                              }
                              alt={
                                product.productName || product.name || "Product"
                              }
                              width={48}
                              height={48}
                              className="object-contain w-full h-full"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          );
                        } else {
                          return (
                            <div className="text-gray-400 text-xs justify-center">
                              {t("cart.noImage")}
                            </div>
                          );
                        }
                      })()}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 justify-center">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {product.productName ||
                          product.name ||
                          "Unnamed Product"}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {product.brand || "Unknown Brand"}
                      </p>
                    </div>
                    {product.originalPrice && (
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-gray-900">
                          €
                          {parseFloat(
                            String(product.originalPrice)
                              .replace(/[^0-9,.-]+/g, "")
                              .replace(",", ".")
                          ).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <div className="border-t border-gray-200 py-2 mt-4">
                  <button
                    onClick={() => {
                      window.location.href = `/products?search=${encodeURIComponent(
                        searchQuery
                      )}`;
                      setSearchQuery("");
                      setShowSearchResults(false);
                      setKeepSearchResultsVisible(false);
                    }}
                    className="w-full text-center text-[#3AF0F7] hover:text-[#2de0e7] font-semibold text-sm py-2 hover:bg-[#3AF0F7]/5 rounded-lg transition-colors"
                  >
                    {t("nav.search.viewAll")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">
                  {t("nav.search.noResults")}
                </p>
                <p className="text-gray-400 text-sm">
                  {t("nav.search.tryDifferent")}
                </p>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => {
                setSearchQuery("");
                setShowSearchResults(false);
                setKeepSearchResultsVisible(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
