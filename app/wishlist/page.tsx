"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StoreShell } from "@/app/components/store/StoreShell";
import { useStore } from "@/app/context/store-context";
import { products } from "@/app/lib/products";
import { HeartIcon } from "@/app/components/store/icons";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <StoreShell>
      <div className="py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-light tracking-wide text-white md:text-4xl">
            Your Wishlist
          </h1>
          <p className="mt-2 text-white/60">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-md py-16 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <HeartIcon className="h-8 w-8 text-white/40" />
            </div>
            <h2 className="font-serif text-2xl font-light text-white">
              Your wishlist is empty
            </h2>
            <p className="mt-3 text-white/60">
              Save your favorite pieces to revisit them later
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block rounded-full bg-gold px-8 py-3 text-sm font-medium text-charcoal transition hover:bg-gold/90"
            >
              Explore Collection
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {wishlistProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Link
                  href={`/product/${product.id}`}
                  className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-white/5"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {/* Remove from wishlist */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-gold backdrop-blur-sm transition hover:bg-black/70"
                    aria-label="Remove from wishlist"
                  >
                    <HeartIcon className="h-4 w-4 fill-current" />
                  </button>
                </Link>
                <div className="mt-3 space-y-1">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="truncate text-sm font-medium text-white transition hover:text-gold">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-white/60">
                    {"\u20B9"}{product.price.toLocaleString("en-IN")}
                  </p>
                  <button
                    type="button"
                    onClick={() => addToCart(product.id)}
                    className="mt-2 w-full rounded-full border border-white/20 py-2 text-xs font-medium text-white transition hover:border-gold hover:text-gold"
                  >
                    Add to Bag
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </StoreShell>
  );
}
