"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Menu, X, Plus, Star, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

type NavbarProps = {
  allProducts?: any[];
  noBlur?: boolean;
};

export default function Navbar({ allProducts = [], noBlur = false }: NavbarProps) {
  const { cartItems, setCartItems, cartOpen, setCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // State to control navbar visibility based on scroll position
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only when at the very top
      setShowNavbar(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = allProducts
      .filter((product) => {
        // Use productName as fallback for name, and productImage as fallback for image
        const name = typeof product.name === 'string' ? product.name : (typeof product.productName === 'string' ? product.productName : '');
        const brand = typeof product.brand === 'string' ? product.brand : '';
        const category = typeof product.category === 'string' ? product.category : '';
        const query = searchQuery.toLowerCase();
        return (
          name.toLowerCase().includes(query) ||
          brand.toLowerCase().includes(query) ||
          category.toLowerCase().includes(query)
        );
      })
      .slice(0, 8);

    setSearchResults(filtered);
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

  // Helper to get a unique id for a product (fallback to name+brand if missing)
  function getProductId(product: any) {
    if (typeof product.id === 'number' || typeof product.id === 'string') return product.id;
    // fallback: hash name+brand+image
    return `${product.name || product.productName}_${product.brand}_${product.image || product.productImage}`;
  }

  // Add product to cart
  const addToCart = (product: any) => {
    const id = getProductId(product);
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            id,
            name: product.name || product.productName,
            price: parsePrice(product.salePrice ?? product.price ?? product.originalPrice),
            quantity: 1,
            image: product.image || product.productImage,
            brand: product.brand,
            slug: product.slug,
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
      className="w-full bg-transparent text-[1.1rem] fixed top-0 left-0 z-50 transition-transform duration-300"
      style={{
        transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: showNavbar ? 'auto' : 'none',
        background: 'transparent',
      }}
    >
      <div className="max-w-[1440px] mx-auto py-3 sm:px-8 px-2 sm:py-6">
        {/* Desktop Navbar (≥850px) */}
        <div className="hidden [@media(min-width:850px)]:flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <a href="/">
              <img src="/logo.svg" alt="SNUZZ" className="h-12 w-auto" />
            </a>
          </div>

          <nav className="flex items-center space-x-8">
            {[
              { label: "Shop", href: "/products" },
              { label: "Brands", href: "/products?filter=brands" },
              { label: "Flavor", href: "/products?filter=flavors" },
              { label: "Strength", href: "/products?filter=strength" },
              { label: "snuzzPRO", href: "/pro" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative font-large hover:text-[#3AF0F7] transition-all duration-300"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Search and Cart buttons (desktop) */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="pl-8 pr-3 py-1.5 w-48 h-8 border border-gray-300 rounded-md hover:border-[#3AF0F7]/50 focus:border-[#3AF0F7] focus:ring-0 focus:outline-none"
              />
              {showSearchResults && (
                <div className="absolute top-full -right-8 mt-2 bg-white border border-gray-200 rounded-2xl z-50 w-[350px] max-h-[420px] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="p-0">
                      <div className="text-sm text-gray-500 m-4 border-b border-gray-200 pb-2 font-semibold text-center">
                         {searchResults.length} Product Found{searchResults.length !== 1 ? "s" : ""}
                      </div>
                      <div className="space-y-2">
                        {searchResults.map((product) => (
                          <div
                            key={product.id || product.slug || (product.name || product.productName) || Math.random()}
                            className="flex items-center gap-2 p-2 hover:bg-[#3AF0F7]/10 rounded-xl transition-all duration-300 group"
                          >
                            <a
                              href={`/product-detail/${product.slug || ''}`}
                              className="flex items-center flex-1 gap-2 min-w-0 cursor-pointer"
                              onClick={() => {
                                setSearchQuery("");
                                setShowSearchResults(false);
                              }}
                              style={{ textDecoration: 'none' }}
                            >
                              <div className="w-12 h-12 bg-gradient-to-br from-[#8cedf8] to-[#3AF0F7]/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200 overflow-hidden">
                                {(() => {
                                  const img = product.productImage || product.image || '';
                                  if (typeof img === 'string' && img.length > 0) {
                                    return (
                                      <img
                                        src={img.startsWith('/') ? img : '/' + img}
                                        alt={product.productName || product.name || 'Product'}
                                        className="object-contain w-full h-full"
                                        onError={e => { e.currentTarget.style.display = 'none'; }}
                                      />
                                    );
                                  } else {
                                    return <div className="text-gray-400 text-xs justify-center">No Image</div>;
                                  }
                                })()}
                              </div>
                              <div className="flex flex-col flex-1 min-w-0 justify-center">
                                <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-[#3AF0F7] transition-colors max-w-[140px]" title={product.productName || product.name || ''}>
                                  {(() => {
                                    const pname = product.productName || product.name || '';
                                    return typeof pname === 'string' && pname.length > 0
                                      ? (pname.length > 28 ? pname.slice(0, 28) + '…' : pname)
                                      : 'Unnamed';
                                  })()}
                                </h4>
                                <p className="text-xs text-gray-500 mt-0.5">{product.brand || ''}</p>
                              </div>
                              <div className="flex flex-col items-end min-w-[70px] ml-2">
                                {product.salePrice ? (
                                  <>
                                    <span className="text-[#3AF0F7] font-bold text-sm">
                                      €{parseFloat((typeof product.salePrice === 'string' ? product.salePrice : String(product.salePrice)).replace(/[^0-9,.-]+/g, '').replace(',', '.')).toFixed(2)}
                                    </span>
                                    <span className="text-gray-400 line-through text-xs">
                                      €{parseFloat((typeof product.originalPrice === 'string' ? product.originalPrice : String(product.originalPrice)).replace(/[^0-9,.-]+/g, '').replace(',', '.')).toFixed(2)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-[#3AF0F7] font-bold text-sm">
                                    €{parseFloat((typeof product.originalPrice === 'string' ? product.originalPrice : String(product.originalPrice)).replace(/[^0-9,.-]+/g, '').replace(',', '.')).toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </a>
                            <button
                              type="button"
                              className="flex-shrink-0 ml-2 focus:outline-none"
                              onClick={e => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              tabIndex={0}
                              aria-label="Add to cart"
                            >
                              <div className="w-8 h-8 bg-[#3AF0F7] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-110">
                                <Plus className="w-4 h-4 text-black" />
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-200 mt-4 pt-4">
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setShowSearchResults(false);
                          }}
                          className="w-full text-center text-[#3AF0F7] hover:text-[#2de0e7] font-semibold text-sm py-2 hover:bg-[#3AF0F7]/5 rounded-lg transition-colors"
                        >
                          View All Results →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">No products found</p>
                      <p className="text-gray-400 text-sm">Try searching for different keywords</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => setCartOpen(true)}
              className="relative bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black transition-all duration-300 transform hover:scale-110 rounded-md h-8 px-2"
            >
              <ShoppingBag className="w-4 h-4" />
              {getTotalItems() > 0 && (
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-12 h-12" /> : <Menu className="w-12 h-12" />}
            </Button>
          </div>
        </div>

      {/* Mobile Navbar Row: burger left, logo center, cart right (<850px) */}
      <div className="flex [@media(max-width:849px)]:flex [@media(min-width:850px)]:hidden items-center justify-between">
      {/* Burger menu button */}
  <Button
    variant="ghost"
    size="icon"
    className=""
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  >
    {mobileMenuOpen ? <X className="w-12 h-12" /> : <Menu className="w-12 h-12" />}
  </Button>
  {/* Center logo */}
  <a href="/" className="flex-1 flex justify-center">
    <img src="/logo.svg" alt="SNUZZ" className="h-12 w-auto" />
  </a>
  {/* Cart button */}
  <Button
    variant="ghost"
    onClick={() => setCartOpen(true)}
    className="relative bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black transition-all duration-300 transform hover:scale-110 rounded-md h-8 px-2"
  >
    <ShoppingBag className="w-4 h-4" />
    {getTotalItems() > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
        {getTotalItems()}
      </span>
    )}
  </Button>
</div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="[@media(max-width:849px)]:block [@media(min-width:850px)]:hidden w-full bg-white border-b border-gray-200">
          <div className="mx-0 py-4">
            {[
              { label: "Shop", href: "/products" },
              { label: "Brands", href: "/products?filter=brands" },
              { label: "Flavor", href: "/products?filter=flavors" },
              { label: "Strength", href: "/products?filter=strength" },
              { label: "SnuzzPro", href: "/pro" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block text-gray-700 hover:text-[#3AF0F7] hover:bg-gray-100 font-medium p-4"
              >
                {item.label}
              </a>
            ))}
            <div className="p-4 relative">
              <Search className="absolute left-6 top-[calc(50%)] transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full pl-10 pr-4 py-3 rounded-md border-2 border-gray-300 hover:border-[#3AF0F7]/50 focus:border-[#3AF0F7] focus:ring-0 focus:outline-none"
              />
              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md z-50 max-h-64 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="p-3">
                      {searchResults.slice(0, 5).map((product) => {
                        const name = product.productName || product.name || '';
                        const brand = product.brand || '';
                        const img = product.productImage || product.image || '';
                        const salePrice = typeof product.salePrice === 'string'
                          ? parseFloat(product.salePrice.replace(/[^0-9,.-]+/g, '').replace(',', '.'))
                          : product.salePrice;
                        const originalPrice = typeof product.originalPrice === 'string'
                          ? parseFloat(product.originalPrice.replace(/[^0-9,.-]+/g, '').replace(',', '.'))
                          : product.originalPrice;
                        return (
                          <div
                            key={product.id}
                            className="flex items-center gap-2 p-2 hover:bg-[#3AF0F7]/10 rounded-xl transition-all duration-300 group cursor-pointer"
                            onClick={() => {
                              addToCart(product);
                              setSearchQuery("");
                              setShowSearchResults(false);
                              setMobileMenuOpen(false);
                            }}
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-[#8cedf8] to-[#3AF0F7]/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                              {img ? (
                                <img
                                  src={img.startsWith('/') ? img : '/' + img}
                                  alt={name}
                                  className="object-contain w-full h-full"
                                  onError={e => { e.currentTarget.style.display = 'none'; }}
                                />
                              ) : (
                                <div className="text-gray-400 text-xs justify-center">No Image</div>
                              )}
                            </div>
                            <div className="flex flex-col flex-1 min-w-0 justify-center">
                              <h4
                                className="font-semibold text-gray-900 text-sm whitespace-normal line-clamp-2 group-hover:text-[#3AF0F7] transition-colors max-w-[240px]"
                                title={name}
                              >
                                {name}
                              </h4>
                              <p className="text-xs text-gray-500 mt-0.5">{brand}</p>
                            </div>
                            <div className="flex flex-col items-end ml-2">
                              {salePrice && !isNaN(salePrice) ? (
                                <>
                                  <span className="text-[#3AF0F7] font-bold text-sm">
                                    €{salePrice.toFixed(2)}
                                  </span>
                                  {originalPrice && !isNaN(originalPrice) && originalPrice > salePrice ? (
                                    <span className="text-gray-400 line-through text-xs">
                                      €{originalPrice.toFixed(2)}
                                    </span>
                                  ) : null}
                                </>
                              ) : originalPrice && !isNaN(originalPrice) ? (
                                <span className="text-[#3AF0F7] font-bold text-sm">€{originalPrice.toFixed(2)}</span>
                              ) : (
                                <span className="text-[#3AF0F7] font-bold text-sm">€N/A</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">No products found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
