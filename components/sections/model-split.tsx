"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import Link from "next/link"

const models = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&h=900&fit=crop",
    alt: "Model in oversized white t-shirt",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=900&fit=crop",
    alt: "Model in black oversized tee",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=900&fit=crop",
    alt: "Model in neutral oversized style",
  },
]

export function ModelSplit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1])

  return (
    <section ref={containerRef} className="relative bg-vanilla py-16 md:py-0">
      <div className="grid md:grid-cols-2">
        {/* Left - Models Grid */}
        <div className="relative overflow-hidden">
          <motion.div style={{ scale }} className="relative h-[380px] md:h-[580px] lg:h-[700px]">
            <div className="grid grid-cols-3 h-full">
              {models.map((model, index) => (
                <div key={model.id} className="relative h-full w-full">
                  <Image
                    src={model.image}
                    alt={model.alt}
                    fill
                    sizes="(max-width: 768px) 33vw, 25vw"
                    className="object-cover"
                  />
                  {/* Vertical Line */}
                  {index < 2 && (
                    <div className="absolute right-0 top-0 h-full w-px bg-chai/40" />
                  )}
                </div>
              ))}
            </div>
            {/* Horizontal Line */}
            <div className="absolute left-0 top-1/2 w-full h-px bg-chai/40" />
            
            {/* Overlay Text */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10"
            >
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light leading-[1.1] tracking-wide drop-shadow-lg">
                OVERSIZED
                <br />
                COLLECTION
              </h3>
              <p className="mt-2 md:mt-3 text-[10px] md:text-xs text-white/80 tracking-[0.2em] uppercase drop-shadow">Your Favorite Style</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Right - Content (Light section) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col justify-center bg-vanilla px-8 py-14 md:px-14 md:py-20 lg:px-24 lg:py-0"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-carob mb-4">Premium Summer</span>
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-charcoal mb-6 gold-underline w-fit">
            Effortless Style
          </h3>
          <p className="text-sm md:text-base text-charcoal/70 max-w-sm leading-[1.8] mb-8 md:mb-12">
            Explore 100s on-trend styles with brand-new drops that are stylish and comfortable. Designed for those who appreciate quality.
          </p>
          <Link
            href="/shop"
            className="btn-luxury inline-block border border-charcoal bg-transparent px-10 py-4 text-[10px] md:text-xs uppercase tracking-[0.25em] text-charcoal w-fit"
          >
            <span>Shop Collection</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
