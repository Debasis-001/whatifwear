"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Heart, Star, Plus } from "lucide-react"
import { useState } from "react"

const products = [
  {
    id: 1,
    name: "White Minimal Tee",
    price: "SAR 299.00",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    rating: 4,
  },
  {
    id: 2,
    name: "Vintage Black",
    price: "SAR 349.00",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    name: "Cream Oversized",
    price: "SAR 279.00",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    rating: 4,
  },
  {
    id: 4,
    name: "Sage Green Tee",
    price: "SAR 319.00",
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=400&h=500&fit=crop",
    rating: 5,
  },
  {
    id: 5,
    name: "Soft Grey Basic",
    price: "SAR 289.00",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
    rating: 4,
  },
]

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

export function RelatedProducts() {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section className="bg-background py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-8 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-16 lg:mb-20 text-center font-serif text-xl md:text-2xl lg:text-3xl font-light tracking-[0.12em] text-foreground"
        >
          Related Products
        </motion.h2>

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
              <div className="relative overflow-hidden bg-card rounded-sm shadow-sm transition-all duration-700 ease-out hover:shadow-xl">
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 md:p-2.5 bg-background/90 rounded-full backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-background"
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <motion.div
                    animate={wishlist.includes(product.id) ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 md:h-4 md:w-4 transition-colors duration-400 ${
                        wishlist.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-foreground/50"
                      }`}
                    />
                  </motion.div>
                </button>

                {/* Product Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>

                {/* Add to Cart Button */}
                <button 
                  className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 p-2 md:p-2.5 bg-foreground/90 rounded-full transition-all duration-500 hover:scale-110 hover:bg-foreground shadow-lg"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <Plus className="h-3.5 w-3.5 md:h-4 md:w-4 text-background" strokeWidth={2} />
                </button>
              </div>

              {/* Product Info */}
              <div className="mt-4 md:mt-5 px-0.5">
                <p className="text-xs md:text-sm font-medium text-muted-foreground">{product.price}</p>
                <h3 className="text-xs md:text-sm text-foreground mt-1">{product.name}</h3>
                {/* Rating */}
                <div className="mt-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-2.5 w-2.5 md:h-3 md:w-3 ${
                        i < product.rating
                          ? "fill-amber-400 text-amber-400"
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
