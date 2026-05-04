"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "@/app/components/store/ProductCard";
import { StoreShell } from "@/app/components/store/StoreShell";
import { categoryTabs, products, type ProductCategory } from "@/app/lib/products";

const BATCH = 4;

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
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-white/60">Curated by category</p>
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
          {filtered.length} items
        </span>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
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
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? "border-[#8CFB5A] bg-[#8CFB5A]/10 text-[#8CFB5A] shadow-[0_0_16px_rgba(140,251,90,0.25)]"
                  : "border-white/15 text-white/70 hover:border-white/35 hover:text-white"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <section className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <div ref={loadMoreRef} className="py-8 text-center text-sm text-white/45">
        {hasMore ? "Loading more archive pieces..." : "End of archive"}
      </div>
    </StoreShell>
  );
}