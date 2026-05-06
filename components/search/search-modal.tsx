"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { products, type Product, type ProductCategory, categoryTabs } from "@/app/lib/products";
import { useStore } from "@/app/context/store-context";

type Filters = {
  category: ProductCategory | "All";
  color: string | null;
  size: string | null;
  priceRange: [number, number];
};

const allColors = Array.from(new Set(products.flatMap((p) => p.colors)));
const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
const maxPrice = Math.max(...products.map((p) => p.price));

function getColorName(hex: string): string {
  const colorMap: Record<string, string> = {
    "#0F172A": "Navy",
    "#3F3F46": "Charcoal",
    "#14532D": "Forest",
    "#18181B": "Black",
    "#0A0A0A": "Deep Black",
    "#3B0764": "Purple",
    "#111827": "Slate",
    "#404040": "Gray",
    "#0F766E": "Teal",
    "#09090B": "Jet",
    "#1A2E05": "Olive",
    "#1E293B": "Dark Slate",
    "#374151": "Steel",
    "#27272A": "Zinc",
    "#1E1B4B": "Indigo",
    "#052E16": "Dark Green",
    "#334155": "Cool Gray",
    "#064E3B": "Emerald",
  };
  return colorMap[hex] || hex;
}

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    category: "All",
    color: null,
    size: null,
    priceRange: [0, maxPrice],
  });
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Reset when closing
  useEffect(() => {
    if (!isSearchOpen) {
      setQuery("");
      setFilters({
        category: "All",
        color: null,
        size: null,
        priceRange: [0, maxPrice],
      });
      setShowFilters(false);
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    if (isSearchOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isSearchOpen, closeSearch]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Text search
      if (query) {
        const searchLower = query.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(searchLower);
        const descMatch = product.description.toLowerCase().includes(searchLower);
        const colorMatch = product.colors.some((c) =>
          getColorName(c).toLowerCase().includes(searchLower)
        );
        if (!nameMatch && !descMatch && !colorMatch) return false;
      }

      // Category filter
      if (filters.category !== "All" && product.category !== filters.category) {
        return false;
      }

      // Color filter
      if (filters.color && !product.colors.includes(filters.color)) {
        return false;
      }

      // Size filter
      if (filters.size && !product.sizes.includes(filters.size)) {
        return false;
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [query, filters]);

  const hasActiveFilters =
    filters.category !== "All" ||
    filters.color !== null ||
    filters.size !== null ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < maxPrice;

  const clearFilters = () => {
    setFilters({
      category: "All",
      color: null,
      size: null,
      priceRange: [0, maxPrice],
    });
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-4 z-50 mx-auto max-w-3xl md:inset-x-auto md:top-20 md:w-full"
          >
            <div className="glass-panel overflow-hidden rounded-2xl shadow-2xl">
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                <svg
                  className="h-5 w-5 text-white/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, colors, styles..."
                  className="flex-1 bg-transparent text-lg text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`rounded-lg px-3 py-1.5 text-sm transition ${
                    showFilters || hasActiveFilters
                      ? "bg-gold/20 text-gold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs text-charcoal">
                      {[
                        filters.category !== "All",
                        filters.color !== null,
                        filters.size !== null,
                        filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice,
                      ].filter(Boolean).length}
                    </span>
                  )}
                </button>
                <button
                  onClick={closeSearch}
                  className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filters Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-b border-white/10"
                  >
                    <div className="space-y-4 p-5">
                      {/* Category */}
                      <div>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                          Category
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["All", ...categoryTabs].map((cat) => (
                            <button
                              key={cat}
                              onClick={() =>
                                setFilters((f) => ({
                                  ...f,
                                  category: cat as ProductCategory | "All",
                                }))
                              }
                              className={`rounded-full px-3 py-1.5 text-sm transition ${
                                filters.category === cat
                                  ? "bg-white text-charcoal"
                                  : "bg-white/10 text-white/80 hover:bg-white/20"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Colors */}
                      <div>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                          Color
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {allColors.map((color) => (
                            <button
                              key={color}
                              onClick={() =>
                                setFilters((f) => ({
                                  ...f,
                                  color: f.color === color ? null : color,
                                }))
                              }
                              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition ${
                                filters.color === color
                                  ? "bg-white text-charcoal"
                                  : "bg-white/10 text-white/80 hover:bg-white/20"
                              }`}
                            >
                              <span
                                className="h-3 w-3 rounded-full border border-white/20"
                                style={{ backgroundColor: color }}
                              />
                              {getColorName(color)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sizes */}
                      <div>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                          Size
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {allSizes.map((size) => (
                            <button
                              key={size}
                              onClick={() =>
                                setFilters((f) => ({
                                  ...f,
                                  size: f.size === size ? null : size,
                                }))
                              }
                              className={`rounded-full px-3 py-1.5 text-sm transition ${
                                filters.size === size
                                  ? "bg-white text-charcoal"
                                  : "bg-white/10 text-white/80 hover:bg-white/20"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Clear Filters */}
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-gold hover:underline"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto p-4">
                {query || hasActiveFilters ? (
                  filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {filteredProducts.map((product) => (
                        <SearchResultCard
                          key={product.id}
                          product={product}
                          onClose={closeSearch}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-white/60">No products found</p>
                      <p className="mt-1 text-sm text-white/40">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-white/50">
                      Start typing to search our collection
                    </p>
                    <div className="mt-6">
                      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">
                        Popular searches
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {["Jacket", "Hoodie", "Tee", "Dress"].map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/20 hover:text-white"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SearchResultCard({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <Link
      href={`/product/${product.id}`}
      onClick={onClose}
      className="group block overflow-hidden rounded-xl bg-white/5 transition hover:bg-white/10"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-medium text-white">{product.name}</p>
        <p className="text-sm text-white/60">
          {"\u20B9"}{product.price.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
}
