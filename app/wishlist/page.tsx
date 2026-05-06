"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StoreShell } from "@/app/components/store/StoreShell";
import { useStore } from "@/app/context/store-context";
import { products } from "@/app/lib/products";
import { Heart, ShoppingBag, Star } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <StoreShell>
      <div className="py-4 md:py-8">
        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#EEA83B] block mb-2 font-semibold">Your Collection</span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-[#FDFCFA]">
            Wishlist
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[#EEA83B] to-transparent" />
            <p className="text-[#FDFCFA]/70 text-sm">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? "piece" : "pieces"} saved
            </p>
          </div>
        </motion.div>

        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="empty-state-premium mx-auto max-w-md py-16"
          >
            <div className="icon-wrapper">
              <Heart className="h-8 w-8 text-[#EEA83B]" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl font-light text-[#FDFCFA] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-[#FDFCFA]/60 text-sm mb-8 max-w-xs">
              Save your favorite pieces to revisit them later. Start exploring our curated collection.
            </p>
            <Link
              href="/shop"
              className="btn-premium"
            >
              Explore Collection
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 md:grid-cols-3 lg:grid-cols-4">
            {wishlistProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <div className="product-card-premium overflow-hidden">
                  {/* Image */}
                  <Link
                    href={`/product/${product.id}`}
                    className="relative block aspect-[3/4] overflow-hidden"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#134B42]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Remove from wishlist */}
                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="wishlist-btn-premium active absolute right-3 top-3 z-10"
                      aria-label="Remove from wishlist"
                    >
                      <Heart className="h-4 w-4 fill-current" strokeWidth={1.5} />
                    </motion.button>
                    
                    {/* Quick add to cart */}
                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product.id);
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute bottom-3 right-3 z-10 flex items-center justify-center h-10 w-10 rounded-full bg-[#EEA83B] text-[#134B42] opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg hover:scale-110"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                    </motion.button>
                  </Link>
                  
                  {/* Product Info */}
                  <div className="p-4 bg-[#FDFCFA]">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="truncate text-sm font-semibold text-[#134B42] transition-colors duration-300 hover:text-[#80917D]">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-bold text-[#134B42]">
                        {"\u20B9"}{product.price.toLocaleString("en-IN")}
                      </p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < (product.rating || 4)
                                ? "fill-[#EEA83B] text-[#EEA83B]"
                                : "fill-[#AEBA8A]/30 text-[#AEBA8A]/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Add to bag button */}
                    <button
                      type="button"
                      onClick={() => addToCart(product.id)}
                      className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border-2 border-[#134B42]/30 bg-transparent py-2.5 text-xs font-bold uppercase tracking-wider text-[#134B42] transition-all duration-300 hover:border-[#EEA83B] hover:bg-[#EEA83B] hover:text-[#134B42] hover:scale-[1.02]"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Add to Bag
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </StoreShell>
  );
}
