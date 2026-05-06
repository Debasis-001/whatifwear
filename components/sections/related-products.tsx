"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, Plus, Star } from "lucide-react"
import { useStore } from "@/app/context/store-context"
import { products as storeProducts, type Product } from "@/app/lib/products"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

interface RelatedProductsProps {
  currentProductId?: string
  title?: string
  products?: Product[]
}

export function RelatedProducts({ 
  currentProductId, 
  title = "You May Also Like",
  products: customProducts 
}: RelatedProductsProps) {
  const { isInWishlist, toggleWishlist, addToCart } = useStore()

  // Use custom products or filter out current product from store products
  const products = customProducts || storeProducts
    .filter((p) => p.id !== currentProductId)
    .slice(0, 5)

  return (
    <section className="bg-background py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-16 lg:mb-20 text-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Discover More</span>
          <h2 className="mt-4 font-serif text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-foreground">
            {title}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-5 md:gap-8 lg:gap-10 md:grid-cols-3 lg:grid-cols-5"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative overflow-hidden bg-card rounded-xl shadow-sm transition-all duration-700 ease-out hover:shadow-xl hover-lift">
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleWishlist(product.id)
                    }}
                    className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 md:p-2.5 bg-background/90 rounded-full backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-background"
                    aria-label={`Add ${product.name} to wishlist`}
                  >
                    <motion.div
                      animate={isInWishlist(product.id) ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 md:h-4 md:w-4 transition-colors duration-400 ${
                          isInWishlist(product.id)
                            ? "fill-gold text-gold"
                            : "text-foreground/50 hover:text-gold"
                        }`}
                      />
                    </motion.div>
                  </button>

                  {/* Product Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      addToCart(product.id)
                    }}
                    className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 p-2 md:p-2.5 bg-gold rounded-full transition-all duration-500 hover:scale-110 hover:bg-gold/90 shadow-lg"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <Plus className="h-3.5 w-3.5 md:h-4 md:w-4 text-charcoal" strokeWidth={2} />
                  </button>
                </div>
              </Link>

              {/* Product Info */}
              <div className="mt-4 md:mt-5 px-0.5">
                <Link href={`/product/${product.id}`} className="group/link">
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">
                    {"\u20B9"}{product.price.toLocaleString("en-IN")}
                  </p>
                  <h3 className="text-xs md:text-sm text-foreground mt-1 transition-colors group-hover/link:text-gold">
                    {product.name}
                  </h3>
                </Link>
                {/* Rating */}
                <div className="mt-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-2.5 w-2.5 md:h-3 md:w-3 ${
                        i < product.rating
                          ? "fill-gold text-gold"
                          : "text-muted-foreground/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
