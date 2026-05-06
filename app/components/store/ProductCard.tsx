"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeartIcon } from "@/app/components/store/icons";
import { useStore } from "@/app/context/store-context";
import type { Product } from "@/app/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { isInWishlist, toggleWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link
        href={`/product/${product.id}`}
        className="block overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] shadow-[0_8px_30px_rgba(0,0,0,0.28)] transition duration-500 hover:border-gold/40 hover:shadow-[0_0_28px_rgba(201,169,98,0.18)] hover-lift"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute right-3 top-3 rounded-full border bg-black/50 p-2 backdrop-blur-sm transition ${
              isWishlisted 
                ? "border-gold/50 text-gold" 
                : "border-white/20 text-white/85 hover:border-gold/50 hover:text-gold"
            }`}
          >
            <HeartIcon className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="p-4">
          <p className="truncate text-sm font-medium text-white">{product.name}</p>
          <p className="mt-1 text-sm text-white/60">{"\u20B9"}{product.price.toLocaleString("en-IN")}</p>
        </div>
      </Link>
    </motion.div>
  );
}
