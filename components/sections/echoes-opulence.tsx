"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

// Same model in consistent pose - only outfit/t-shirt color changes
// Using fashion model images with similar composition for seamless transitions
const outfits = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=900&fit=crop&crop=center",
    title: "Classic White",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=900&fit=crop&crop=center",
    title: "Minimal Black",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=900&fit=crop&crop=center",
    title: "Neutral Beige",
  },
]

export function EchoesOpulence() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % outfits.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-[#EAE4DC] py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Typography - Large luxury style behind model */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.04 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-serif text-[22vw] md:text-[16vw] font-light text-foreground leading-none tracking-[0.05em]"
        >
          ECHOES
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.04 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl italic text-foreground -mt-6 md:-mt-10"
        >
          of
        </motion.p>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.04 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-[24vw] md:text-[18vw] font-light text-foreground leading-none tracking-[0.05em] -mt-6 md:-mt-12"
        >
          OPULENCE
        </motion.h2>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-28 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-2 md:order-1 text-center md:text-left"
          >
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
              Grandeur
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-[1.8] max-w-md mx-auto md:mx-0">
              A celebration of bold elegance crafted for timeless souls. Made to elevate the
              ordinary persona — we understand taste by exquisite precision. From impeccable
              silhouettes to contemporary designs.
            </p>
            <div className="mt-10 md:mt-12">
              <Link
                href="/shop"
                className="group inline-block relative border border-foreground/80 bg-transparent px-10 py-4 text-[10px] md:text-xs uppercase tracking-[0.25em] text-foreground overflow-hidden transition-all duration-700"
              >
                <span className="relative z-10 transition-colors duration-700 group-hover:text-background">
                  Browse Collection
                </span>
                <span className="absolute inset-0 bg-foreground transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
              </Link>
            </div>
          </motion.div>

          {/* Right - Model with Outfit Changes (Plain Beige Background) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative aspect-[3/4] w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={outfits[currentIndex].image}
                    alt={outfits[currentIndex].title}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 300px, 420px"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Slide Indicators */}
              <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
                {outfits.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1 rounded-full transition-all duration-700 ease-out ${
                      idx === currentIndex ? "bg-foreground/80 w-8" : "bg-foreground/25 w-1"
                    }`}
                    aria-label={`View outfit ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
