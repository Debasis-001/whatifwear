"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules"
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"
import { useStore } from "@/app/context/store-context"
import { products as storeProducts } from "@/app/lib/products"
import { useRef, useState } from "react"
import type { Swiper as SwiperType } from "swiper"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/navigation"

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
  const swiperRef = useRef<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(false)
  const [isEnd, setIsEnd] = useState(false)

  const products = featuredProductIds
    .map((id) => storeProducts.find((p) => p.id === id))
    .filter(Boolean) as typeof storeProducts

  return (
    <section className="bg-background-warm py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 md:mb-14 lg:mb-20 text-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-carob">Curated Selection</span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-charcoal">
            Featured Collection
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          {/* Navigation Arrows - Desktop/Tablet */}
          <div className="hidden sm:block">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-carob/90 backdrop-blur-sm rounded-full border border-chai/40 text-chai transition-all duration-500 hover:bg-chai hover:text-carob hover:border-chai hover:scale-110 hover:shadow-[0_0_25px_rgba(210,171,128,0.35)] disabled:opacity-30 disabled:cursor-not-allowed -translate-x-2 md:-translate-x-4 lg:-translate-x-6"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-carob/90 backdrop-blur-sm rounded-full border border-chai/40 text-chai transition-all duration-500 hover:bg-chai hover:text-carob hover:border-chai hover:scale-110 hover:shadow-[0_0_25px_rgba(210,171,128,0.35)] disabled:opacity-30 disabled:cursor-not-allowed translate-x-2 md:translate-x-4 lg:translate-x-6"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Carousel Container */}
          <div className="carousel-container px-2 sm:px-8 md:px-16 lg:px-20">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning)
                setIsEnd(swiper.isEnd)
              }}
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 120,
                modifier: 2,
                slideShadows: false,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={800}
              loop
              loopAdditionalSlides={2}
              modules={[EffectCoverflow, Autoplay, Navigation]}
              className="featured-swiper !py-8"
            >
              {products.map((product) => (
                <SwiperSlide 
                  key={product.id} 
                  className="!w-[200px] sm:!w-[240px] md:!w-[280px] lg:!w-[320px] transition-all duration-700"
                >
                  {({ isActive }) => (
                    <Link href={`/product/${product.id}`} className="block group">
                      <motion.div 
                        className={`relative overflow-hidden bg-carob rounded-xl transition-all duration-700 ease-out ${
                          isActive 
                            ? "scale-100 opacity-100 shadow-[0_25px_50px_rgba(42,37,32,0.35)]" 
                            : "scale-[0.88] opacity-50 blur-[1px]"
                        }`}
                        whileHover={isActive ? { y: -8, transition: { duration: 0.4 } } : {}}
                      >
                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleWishlist(product.id)
                          }}
                          className={`absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 md:p-2.5 bg-carob/80 backdrop-blur-sm rounded-full transition-all duration-500 hover:scale-110 hover:bg-carob ${isActive ? 'opacity-100' : 'opacity-0'}`}
                          aria-label={`Add ${product.name} to wishlist`}
                        >
                          <motion.div
                            animate={isInWishlist(product.id) ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ duration: 0.4 }}
                          >
                            <Heart
                              className={`h-3.5 w-3.5 md:h-4 md:w-4 transition-colors duration-400 ${
                                isInWishlist(product.id)
                                  ? "fill-chai text-chai"
                                  : "text-ivory/70 hover:text-chai"
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
                          className={`absolute bottom-20 md:bottom-24 right-3 md:right-4 z-10 p-2 md:p-2.5 bg-chai rounded-full transition-all duration-500 hover:scale-110 hover:bg-chai/90 shadow-lg ${isActive ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <ShoppingBag className="h-3.5 w-3.5 md:h-4 md:w-4 text-carob" />
                        </button>

                        {/* Product Image */}
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 320px"
                          />
                          {/* Premium gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-carob/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Product Info */}
                        <div className="p-4 md:p-5 text-center bg-carob">
                          <h3 className="font-serif text-sm md:text-base lg:text-lg font-medium text-ivory line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="mt-1 md:mt-1.5 text-xs md:text-sm text-ivory/70">
                            {"\u20B9"}{product.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex sm:hidden justify-center gap-3 mt-6">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-2.5 bg-carob/80 rounded-full border border-chai/40 text-chai transition-all duration-300 active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="p-2.5 bg-carob/80 rounded-full border border-chai/40 text-chai transition-all duration-300 active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
