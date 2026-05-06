"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { ArrowRight, Leaf, Award, Heart, Globe } from "lucide-react"
import { Footer } from "@/components/sections/footer"
import { Newsletter } from "@/components/sections/newsletter"
import { useStore } from "@/app/context/store-context"
import { useAuth } from "@/app/context/auth-context"
import { SearchModal } from "@/components/search/search-modal"
import { CartPanel } from "@/components/cart/cart-panel"
import { Search, Heart as HeartIcon, User, Menu, X, ShoppingBag } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
]

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Committed to ethical practices and eco-conscious materials that respect our planet.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Every piece crafted with meticulous attention to detail and uncompromising quality.",
  },
  {
    icon: Heart,
    title: "Authenticity",
    description: "True to our vision of empowering individuals to express their unique identity.",
  },
  {
    icon: Globe,
    title: "Global Vision",
    description: "Bridging cultures through fashion while celebrating diverse perspectives.",
  },
]

const milestones = [
  { year: "2020", title: "The Beginning", description: "Founded with a vision to redefine luxury fashion." },
  { year: "2022", title: "Expansion", description: "Launched our first flagship collection with 50+ pieces." },
  { year: "2024", title: "Global Reach", description: "Expanded to serve customers across 30+ countries." },
  { year: "2026", title: "Today", description: "Leading the way in sustainable luxury fashion." },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openSearch, wishlistCount, cartCount, openCart } = useStore()
  const { user, isAuthenticated } = useAuth()

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-floating">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Left - Nav Links (Desktop) */}
            <div className="hidden md:flex items-center gap-8 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] font-medium transition-colors duration-500 tracking-[0.15em] uppercase ${
                    link.href === "/about" ? "text-[#B8B8A6]" : "text-[#F3EEE8]/60 hover:text-[#B8B8A6]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#F3EEE8] z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Center - Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-lg md:text-xl tracking-[0.25em] text-[#F3EEE8] hover:text-[#B8B8A6] transition-colors duration-500">
              WHAT IF WEAR
            </Link>

            {/* Right - Icons */}
            <div className="hidden md:flex items-center gap-5 flex-1 justify-end">
              <button 
                onClick={openSearch}
                className="p-2.5 rounded-full text-[#F3EEE8]/60 hover:text-[#B8B8A6] hover:bg-[#F3EEE8]/5 transition-all duration-300" 
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
              <Link 
                href="/wishlist" 
                className="relative p-2.5 rounded-full text-[#F3EEE8]/60 hover:text-[#B8B8A6] hover:bg-[#F3EEE8]/5 transition-all duration-300" 
                aria-label="Wishlist"
              >
                <HeartIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 bg-[#B8B8A6] text-[#6E725F] text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>
              <Link 
                href="/profile" 
                className="relative p-2.5 rounded-full text-[#F3EEE8]/60 hover:text-[#B8B8A6] hover:bg-[#F3EEE8]/5 transition-all duration-300 group"
                aria-label="Profile"
              >
                {isAuthenticated && user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover border-2 border-transparent group-hover:border-[#B8B8A6] transition-all duration-500"
                  />
                ) : (
                  <div className="p-0.5 rounded-full border border-[#F3EEE8]/20 group-hover:border-[#B8B8A6]/60 transition-all duration-500">
                    <User className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                )}
              </Link>
            </div>

            {/* Mobile Icons */}
            <div className="flex md:hidden items-center gap-3">
              <button 
                onClick={openSearch}
                className="p-2 rounded-full text-[#F3EEE8]/60 hover:text-[#B8B8A6] transition-colors duration-300" 
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <Link 
                href="/wishlist" 
                className="relative p-2 rounded-full text-[#F3EEE8]/60 hover:text-[#B8B8A6] transition-colors duration-300" 
                aria-label="Wishlist"
              >
                <HeartIcon className="h-5 w-5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden bg-gradient-to-b from-[#6E725F]/98 to-[#8D927B]/98 backdrop-blur-xl border-t border-[#F3EEE8]/10"
          >
            <div className="px-6 py-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block py-3 transition-colors duration-300 text-sm tracking-[0.15em] uppercase ${
                    link.href === "/about" ? "text-[#B8B8A6]" : "text-[#F3EEE8]/60 hover:text-[#B8B8A6]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
            alt="About WHAT IF WEAR"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#6E725F]/60 via-[#6E725F]/30 to-[#8D927B]/80" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#B8B8A6] mb-6"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#F3EEE8] leading-[1.1] max-w-4xl"
          >
            Crafting Elegance,
            <br />
            <span className="italic">Defining Style</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 md:mt-8 max-w-xl text-sm md:text-base text-[#F3EEE8]/70 leading-relaxed"
          >
            Where timeless sophistication meets contemporary design. We believe fashion is more than clothing - it&apos;s a statement of who you are.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="premium-depth-light py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#8D927B]">The Vision</span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#6E725F] leading-[1.15]">
                Ordinary Was
                <br />
                Never An Option
              </h2>
              <div className="mt-8 space-y-5 text-[#6E725F]/80 text-sm md:text-base leading-[1.8]">
                <p>
                  WHAT IF WEAR was born from a simple yet profound question: What if fashion could be both a personal expression and a force for positive change?
                </p>
                <p>
                  Founded in 2020, we set out to create a brand that doesn&apos;t just follow trends but defines them. Our collections are designed for individuals who refuse to blend in - those who understand that true style comes from within.
                </p>
                <p>
                  Every piece we create tells a story of craftsmanship, sustainability, and uncompromising quality. We partner with artisans who share our vision, using only the finest materials sourced responsibly from around the world.
                </p>
              </div>
              <Link
                href="/shop"
                className="mt-10 inline-flex items-center gap-3 text-sm font-medium text-[#6E725F] group"
              >
                <span className="border-b border-[#6E725F] pb-0.5 group-hover:border-[#8D927B] group-hover:text-[#8D927B] transition-all duration-500">
                  Explore Our Collection
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2 group-hover:text-[#8D927B] duration-500" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
                  alt="Our Craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 w-32 h-32 md:w-40 md:h-40 bg-[#B8B8A6]/20 rounded-xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="premium-depth-dark py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#B8B8A6]">What We Stand For</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#F3EEE8]">
              Our Values
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="mb-6 inline-flex p-4 rounded-full border border-[#B8B8A6]/25 bg-[#B8B8A6]/5 group-hover:bg-[#B8B8A6]/15 group-hover:border-[#B8B8A6]/40 transition-all duration-500">
                  <value.icon className="h-6 w-6 md:h-7 md:w-7 text-[#B8B8A6]" strokeWidth={1.25} />
                </div>
                <h3 className="font-serif text-lg md:text-xl font-medium text-[#F3EEE8] mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-[#F3EEE8]/60 leading-[1.7]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline/Journey Section */}
      <section className="premium-depth-light py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#8D927B]">Our Journey</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#6E725F]">
              Milestones
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#B8B8A6]/40 md:-translate-x-1/2" />

            <div className="space-y-12 md:space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#8D927B] rounded-full md:-translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="text-2xl md:text-3xl font-serif text-[#8D927B] font-light">{milestone.year}</span>
                    <h3 className="mt-2 font-serif text-lg md:text-xl font-medium text-[#6E725F]">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#6E725F]/70 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team/Founder Quote Section */}
      <section className="bg-gradient-to-b from-[#6E725F] to-[#8D927B] py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-8 rounded-full overflow-hidden border-2 border-[#B8B8A6]/40">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                alt="Founder"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-[#F3EEE8] leading-[1.4] italic">
              &ldquo;Fashion should never be ordinary. It should challenge, inspire, and empower. That&apos;s the essence of WHAT IF WEAR.&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="text-[#B8B8A6] font-medium tracking-wide">The Founders</p>
              <p className="text-[#F3EEE8]/50 text-sm mt-1">WHAT IF WEAR</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Newsletter />
      <Footer />
      <SearchModal />
      <CartPanel />

      {/* Floating Cart Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={openCart}
        className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-50 bg-gradient-to-br from-[#8D927B] to-[#6E725F] text-[#F3EEE8] p-4 md:p-5 rounded-full shadow-[0_8px_32px_rgba(110,114,95,0.4)] transition-all duration-500 hover:scale-105 hover:shadow-[0_12px_40px_rgba(141,146,123,0.5)]"
        aria-label="Shopping Cart"
      >
        <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
        {cartCount > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-[#F3EEE8] text-[#6E725F] text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center"
          >
            {cartCount}
          </motion.span>
        )}
      </motion.button>
    </div>
  )
}
