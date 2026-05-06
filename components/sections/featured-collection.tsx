"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Autoplay } from "swiper/modules"
import { Heart, ShoppingBag } from "lucide-react"
import { useStore } from "@/app/context/store-context"
import { products as storeProducts } from "@/app/lib/products"

import "swiper/css"
import "swiper/css/effect-coverflow"

// Map featured products to real store products
const featuredProductIds = [
  "obsidian-drift-jacket",
  "noir-crop-hoodie", 
  "graphite-relaxed-tee",
  "neon-stitch-parka",
  "shadow-cargo-pants",
  "luxe-knit-dress",
  "utility-bomber",
]

export function FeaturedCollection() {
  const { isInWishlist, toggleWishlist, addToCart } = useStore()

  const products = featuredProductIds
    .map((id) => storeProducts.find((p) => p.id === id))
    .filter(Boolean) as typeof storeProducts

  return (
    <section className="bg-background-dark py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 md:mb-18 lg:mb-24 text-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Curated Selection</span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-foreground-light">
            Featured Collection
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            speed={1000}
            loop
            loopAdditionalSlides={3}
            modules={[EffectCoverflow, Autoplay]}
            className="featured-swiper !overflow-visible !py-8"
          >
            {products.map((product) => (
              <SwiperSlide 
                key={product.id} 
                className="!w-[220px] md:!w-[280px] lg:!w-[320px] transition-all duration-700"
              >
                {({ isActive }) => (
                  <Link href={`/product/${product.id}`} className="block">
                    <div 
                      className={`relative overflow-hidden bg-charcoal rounded-xl transition-all duration-700 ease-out ${
                        isActive 
                          ? "scale-100 opacity-100 shadow-2xl" 
                          : "scale-[0.85] opacity-50 blur-[1px]"
                      }`}
                    >
                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleWishlist(product.id)
                        }}
                        className="absolute top-4 right-4 z-10 p-2.5 bg-black/60 backdrop-blur-sm rounded-full transition-all duration-500 hover:scale-110 hover:bg-black/80"
                        aria-label={`Add ${product.name} to wishlist`}
                      >
                        <motion.div
                          animate={isInWishlist(product.id) ? { scale: [1, 1.3, 1] } : {}}
                          transition={{ duration: 0.4 }}
                        >
                          <Heart
                            className={`h-4 w-4 transition-colors duration-400 ${
                              isInWishlist(product.id)
                                ? "fill-gold text-gold"
                                : "text-white/60 hover:text-gold"
                            }`}
                          />
                        </motion.div>
                      </button>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addToCart(product.id)
                        }}
                        className="absolute bottom-20 right-4 z-10 p-2.5 bg-gold rounded-full transition-all duration-500 hover:scale-110 hover:bg-gold/90 shadow-lg opacity-0 group-hover:opacity-100"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingBag className="h-4 w-4 text-charcoal" />
                      </button>

                      {/* Product Image */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                          sizes="(max-width: 768px) 220px, 320px"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-5 md:p-6 text-center bg-charcoal">
                        <h3 className="font-serif text-base md:text-lg font-medium text-foreground-light">
                          {product.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-white/60">
                          {"\u20B9"}{product.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
