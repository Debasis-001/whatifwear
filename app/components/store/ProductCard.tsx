"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeartIcon, ShoppingBag, Star } from "lucide-react";
import { useStore } from "@/app/context/store-context";
import type { Product } from "@/app/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { isInWishlist, toggleWishlist, addToCart } = useStore();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
    >
      <Link
        href={`/product/${product.id}`}
        className="block overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] shadow-[0_8px_30px_rgba(0,0,0,0.28)] transition-all duration-700 hover:border-gold/40 hover:shadow-[0_0_35px_rgba(201,169,98,0.2)]"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
          
          {/* Premium gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Wishlist button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute right-3 top-3 z-10 rounded-full border bg-black/50 p-2.5 backdrop-blur-sm transition-all duration-500 hover:scale-110 ${
              isWishlisted 
                ? "border-gold/50 text-gold bg-gold/20" 
                : "border-white/20 text-white/85 hover:border-gold/50 hover:text-gold hover:bg-black/70"
            }`}
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <HeartIcon className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
            </motion.div>
          </button>

          {/* Quick add to cart - appears on hover */}
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product.id);
            }}
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-3 right-3 z-10 p-2.5 bg-gold rounded-full text-charcoal opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gold/90 shadow-lg"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={2} />
          </motion.button>

          {/* New badge for recent items */}
          {product.isNew && (
            <span className="absolute left-3 top-3 bg-gold text-charcoal text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              New
            </span>
          )}
        </div>
        
        <div className="p-4 bg-gradient-to-b from-charcoal/50 to-charcoal">
          <p className="truncate text-sm font-medium text-white group-hover:text-gold transition-colors duration-500">
            {product.name}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-white/60">{"\u20B9"}{product.price.toLocaleString("en-IN")}</p>
            {/* Rating stars */}
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < (product.rating || 4)
                      ? "fill-gold text-gold"
                      : "text-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
