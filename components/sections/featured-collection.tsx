"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Autoplay } from "swiper/modules"
import { Heart } from "lucide-react"
import { useState } from "react"

import "swiper/css"
import "swiper/css/effect-coverflow"

const products = [
  {
    id: 1,
    name: "Classic White Tee",
    price: "Rs. 2,499",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
  },
  {
    id: 2,
    name: "Oversized Black",
    price: "Rs. 2,999",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop",
  },
  {
    id: 3,
    name: "The Daily Shirt",
    price: "Rs. 2,499",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
  },
  {
    id: 4,
    name: "Neutral Beige",
    price: "Rs. 3,299",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop",
  },
  {
    id: 5,
    name: "Cream Essential",
    price: "Rs. 2,799",
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=600&h=800&fit=crop",
  },
  {
    id: 6,
    name: "Stone Grey Tee",
    price: "Rs. 2,699",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=800&fit=crop",
  },
  {
    id: 7,
    name: "Vintage Sand",
    price: "Rs. 2,899",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop",
  },
]

export function FeaturedCollection() {
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
          className="mb-14 md:mb-18 lg:mb-24 text-center font-serif text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.12em] text-foreground"
        >
          Featured Collection
        </motion.h2>

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
                  <div 
                    className={`relative overflow-hidden bg-card shadow-sm transition-all duration-700 ease-out ${
                      isActive 
                        ? "scale-100 opacity-100 shadow-xl" 
                        : "scale-[0.85] opacity-50 blur-[1px]"
                    }`}
                  >
                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 z-10 p-2.5 bg-background/90 backdrop-blur-sm rounded-full transition-all duration-500 hover:scale-110 hover:bg-background"
                      aria-label={`Add ${product.name} to wishlist`}
                    >
                      <motion.div
                        animate={wishlist.includes(product.id) ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors duration-400 ${
                            wishlist.includes(product.id)
                              ? "fill-red-500 text-red-500"
                              : "text-foreground/60 hover:text-foreground"
                          }`}
                        />
                      </motion.div>
                    </button>

                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 220px, 320px"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-5 md:p-6 text-center bg-card">
                      <h3 className="font-serif text-base md:text-lg font-medium text-foreground">
                        {product.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{product.price}</p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
