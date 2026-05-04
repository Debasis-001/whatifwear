"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeartIcon } from "@/app/components/store/icons";
import type { Product } from "@/app/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link
        href={`/product/${product.id}`}
        className="block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_8px_30px_rgba(0,0,0,0.28)] transition duration-300 hover:border-[#8CFB5A]/40 hover:shadow-[0_0_28px_rgba(140,251,90,0.18)]"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <button
            type="button"
            aria-label="Add to wishlist"
            className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/50 p-1.5 text-white/85 backdrop-blur-sm transition hover:text-[#8CFB5A]"
          >
            <HeartIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="p-3">
          <p className="truncate text-sm font-semibold text-white">{product.name}</p>
          <p className="mt-1 text-sm text-white/70">₹{product.price.toLocaleString("en-IN")}</p>
        </div>
      </Link>
    </motion.div>
  );
}
