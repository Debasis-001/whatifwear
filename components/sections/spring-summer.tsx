"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function SpringSummer() {
  return (
    <section className="bg-background py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-8 md:px-12">
        <div className="grid gap-12 md:gap-16 lg:gap-24 md:grid-cols-2 items-center">
          {/* Left - Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-2 gap-3 md:gap-5 lg:gap-8"
          >
            <div className="relative aspect-[3/4] overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&h=800&fit=crop"
                alt="Spring Summer Collection - White Tee"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden mt-8 md:mt-12 lg:mt-16 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=600&h=800&fit=crop"
                alt="Spring Summer Collection - Neutral Tee"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-foreground leading-[0.95] tracking-wide">
              SPRING
              <br />
              <span className="ml-6 md:ml-12 lg:ml-16">SUMMER</span>/22
            </h2>
            <p className="mt-8 md:mt-10 max-w-md text-sm md:text-base text-muted-foreground leading-[1.8]">
              Designed for warm days and effortless evenings. Our Spring / Summer
              &apos;22 collection showcases breathable fabrics, earthy tones, and
              relaxed silhouettes to match your every mood.
            </p>
            <p className="mt-4 max-w-md text-xs md:text-sm text-muted-foreground/70 leading-[1.8]">
              From coastal getaways to city strolls — a style that moves 
              with you, wherever the season takes you.
            </p>
            <div className="mt-8 md:mt-10">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 text-sm md:text-base font-medium text-foreground transition-all duration-500"
              >
                <span className="relative">
                  Explore Now
                  <span className="absolute left-0 bottom-0 h-px w-full bg-foreground origin-left transition-transform duration-500 group-hover:scale-x-0" />
                </span>
                <span className="transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
