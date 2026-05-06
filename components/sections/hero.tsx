"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search, Heart, ShoppingBag, User } from "lucide-react"
import { useStore } from "@/app/context/store-context"
import { useAuth } from "@/app/context/auth-context"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
]

export function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openSearch, wishlistCount, cartCount, openCart } = useStore()
  const { user, isAuthenticated } = useAuth()

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/5705517/5705517-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Premium Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-8 md:px-12">
          <div className="flex h-20 md:h-24 items-center justify-between">
            {/* Left - Nav Links (Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden md:flex items-center gap-10 flex-1"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    className="text-[11px] font-medium text-white/70 hover:text-gold transition-colors duration-500 tracking-[0.15em] uppercase"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Center - Logo */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute left-1/2 -translate-x-1/2"
            >
              <Link href="/" className="font-serif text-xl md:text-2xl lg:text-[26px] font-medium tracking-[0.25em] text-white">
                WHAT IF WEAR
              </Link>
            </motion.div>

            {/* Right - Icons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden md:flex items-center gap-7 flex-1 justify-end"
            >
              <button 
                onClick={openSearch}
                className="text-white/70 hover:text-gold transition-colors duration-500" 
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <Link 
                href="/wishlist" 
                className="relative text-white/70 hover:text-gold transition-colors duration-500" 
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link 
                href="/profile" 
                className="relative text-white/70 hover:text-gold transition-all duration-500 group"
                aria-label="Profile"
              >
                {isAuthenticated && user?.avatar ? (
                  <div className="relative">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="h-7 w-7 rounded-full object-cover border-2 border-transparent group-hover:border-gold transition-all duration-500"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />
                  </div>
                ) : (
                  <div className="relative p-1 rounded-full border border-white/20 group-hover:border-gold/60 transition-all duration-500">
                    <User className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                )}
              </Link>
            </motion.div>

            {/* Mobile Icons */}
            <div className="flex md:hidden items-center gap-4">
              <button 
                onClick={openSearch}
                className="text-white/70 hover:text-gold transition-colors duration-500" 
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <Link 
                href="/wishlist" 
                className="relative text-white/70 hover:text-gold transition-colors duration-500" 
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link 
                href="/profile" 
                className="relative text-white/70 hover:text-gold transition-all duration-500"
                aria-label="Profile"
              >
                {isAuthenticated && user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-6 w-6 rounded-full object-cover border border-gold/50"
                  />
                ) : (
                  <div className="p-1 rounded-full border border-white/20">
                    <User className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                )}
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
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden bg-black/95 backdrop-blur-md"
          >
            <div className="px-8 py-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-4 text-white/70 hover:text-gold transition-colors duration-500 text-sm tracking-[0.12em] uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/wishlist"
                className="block py-4 text-white/70 hover:text-gold transition-colors duration-500 text-sm tracking-[0.12em] uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Content - Perfectly Centered with Better Spacing */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-10 md:px-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 md:mb-10 text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-gold"
        >
          Summer Collection 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 md:mb-12 font-serif text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] text-white text-balance max-w-4xl"
        >
          &ldquo;Ordinary Was Never An
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>Option&rdquo;
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-14 max-w-xs sm:max-w-sm md:max-w-md text-[13px] md:text-sm text-white/50 leading-[1.8]"
        >
          Not just an idea - it&apos;s a statement. Designed for those who stand out without trying.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/shop"
            className="btn-luxury inline-block border border-gold/60 bg-transparent px-12 md:px-14 py-4 md:py-[18px] text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white"
          >
            <span>View Collection</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="h-12 md:h-14 w-6 md:w-7 rounded-full border border-white/25 flex items-start justify-center p-2"
        >
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-gold/60" 
          />
        </motion.div>
      </motion.div>

      {/* Floating Cart Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={openCart}
        className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-50 bg-gold text-charcoal p-4 md:p-5 rounded-full shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(201,169,98,0.4)]"
        aria-label="Shopping Cart"
      >
        <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-charcoal text-gold text-[10px] font-medium w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </motion.button>
    </section>
  )
}
