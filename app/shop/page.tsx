"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/app/components/store/ProductCard";
import { StoreShell } from "@/app/components/store/StoreShell";
import { categoryTabs, products, type ProductCategory } from "@/app/lib/products";
import { SlidersHorizontal } from "lucide-react";

const BATCH = 8;

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("Men");
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(
    () => products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH, filtered.length));
        }
      },
      { rootMargin: "120px" },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filtered.length]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <StoreShell showArchiveLabel>
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-white tracking-wide">
              Explore Collection
            </h2>
            <p className="mt-2 text-sm text-white/50">
              Curated pieces for the modern individual
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40 uppercase tracking-wider">
              {filtered.length} pieces
            </span>
            <div className="h-4 w-px bg-white/20" />
            <button className="flex items-center gap-2 text-xs text-white/60 hover:text-gold transition-colors duration-300">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {categoryTabs.map((tab) => {
            const active = tab === activeCategory;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveCategory(tab);
                  setVisibleCount(BATCH);
                }}
                className={`rounded-full border px-5 py-2.5 text-xs md:text-sm font-medium uppercase tracking-wider transition-all duration-500 ${
                  active
                    ? "border-gold bg-gold/15 text-gold shadow-[0_0_20px_rgba(201,169,98,0.25)]"
                    : "border-white/15 text-white/60 hover:border-gold/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
      >
        {visible.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.section>

      {/* Load More Indicator */}
      <div ref={loadMoreRef} className="py-12 text-center">
        {hasMore ? (
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-sm text-white/40 uppercase tracking-wider">
              Loading more pieces...
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/30" />
            <span className="text-xs text-gold/60 uppercase tracking-[0.2em]">
              End of Collection
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        )}
      </div>
    </StoreShell>
  );
}
