"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useStore } from "@/app/context/store-context";
import type { Product } from "@/app/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { isInWishlist, toggleWishlist, addToCart } = useStore();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
    >
      <Link
        href={`/product/${product.id}`}
        className="product-card-premium block"
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          
          {/* Subtle gradient overlay on hover - not color wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#134B42]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Wishlist button - premium styling */}
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            whileTap={{ scale: 0.9 }}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`wishlist-btn-premium absolute right-3 top-3 z-10 ${
              isWishlisted ? 'active' : ''
            }`}
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart 
                className={`h-4 w-4 transition-all duration-300 ${isWishlisted ? "fill-current" : ""}`} 
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.button>

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
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-3 right-3 z-10 flex items-center justify-center h-10 w-10 rounded-full bg-[#EEA83B] text-[#134B42] opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg hover:shadow-[0_8px_20px_rgba(238,168,59,0.4)] hover:scale-110"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          </motion.button>

          {/* New badge for recent items */}
          {product.isNew && (
            <span className="absolute left-3 top-3 bg-[#EEA83B] text-[#134B42] text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-md">
              New
            </span>
          )}
        </div>
        
        {/* Product Info - enhanced typography and spacing */}
        <div className="p-4 bg-[#FDFCFA] rounded-b-2xl">
          <p className="truncate text-sm font-semibold text-[#134B42] group-hover:text-[#80917D] transition-colors duration-500 leading-tight">
            {product.name}
          </p>
          <div className="mt-2.5 flex items-center justify-between">
            <p className="text-sm font-bold text-[#134B42]">
              {"\u20B9"}{product.price.toLocaleString("en-IN")}
            </p>
            {/* Rating stars */}
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 transition-colors duration-300 ${
                    i < (product.rating || 4)
                      ? "fill-[#EEA83B] text-[#EEA83B]"
                      : "fill-[#AEBA8A]/30 text-[#AEBA8A]/30"
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Category tag - subtle */}
          <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#80917D] font-medium">
            {product.category}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
