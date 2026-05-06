"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/app/components/store/ProductCard";
import { categoryTabs, products, type ProductCategory } from "@/app/lib/products";
import { SlidersHorizontal, Search, Heart, User, Menu, X, ShoppingBag } from "lucide-react";
import { useStore } from "@/app/context/store-context";
import { useAuth } from "@/app/context/auth-context";
import { SearchModal } from "@/components/search/search-modal";
import { CartPanel } from "@/components/cart/cart-panel";
import { Footer } from "@/components/sections/footer";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const BATCH = 12;

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("Men");
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const { openSearch, wishlistCount, cartCount, openCart } = useStore();
  const { user, isAuthenticated } = useAuth();

  const filtered = useMemo(
    () => products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH, filtered.length));
        }
      },
      { rootMargin: "120px" },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filtered.length]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen bg-[#F3EEE8] overflow-x-hidden">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#6E725F]/95 backdrop-blur-md border-b border-[#F3EEE8]/10">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Left - Nav Links (Desktop) */}
            <div className="hidden md:flex items-center gap-8 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] font-medium transition-colors duration-500 tracking-[0.15em] uppercase ${
                    link.href === "/shop" ? "text-[#B8B8A6]" : "text-[#F3EEE8]/70 hover:text-[#B8B8A6]"
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
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-lg md:text-xl tracking-[0.25em] text-[#F3EEE8]">
              WHAT IF WEAR
            </Link>

            {/* Right - Icons */}
            <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
              <button 
                onClick={openSearch}
                className="text-[#F3EEE8]/70 hover:text-[#B8B8A6] transition-colors duration-500" 
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <Link 
                href="/wishlist" 
                className="relative text-[#F3EEE8]/70 hover:text-[#B8B8A6] transition-colors duration-500" 
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8D927B] text-[#F3EEE8] text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link 
                href="/profile" 
                className="relative text-[#F3EEE8]/70 hover:text-[#B8B8A6] transition-all duration-500 group"
                aria-label="Profile"
              >
                {isAuthenticated && user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover border-2 border-transparent group-hover:border-[#B8B8A6] transition-all duration-500"
                  />
                ) : (
                  <div className="p-1 rounded-full border border-[#F3EEE8]/20 group-hover:border-[#B8B8A6]/60 transition-all duration-500">
                    <User className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                )}
              </Link>
            </div>

            {/* Mobile Icons */}
            <div className="flex md:hidden items-center gap-4">
              <button 
                onClick={openSearch}
                className="text-[#F3EEE8]/70 hover:text-[#B8B8A6] transition-colors duration-500" 
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <Link 
                href="/wishlist" 
                className="relative text-[#F3EEE8]/70 hover:text-[#B8B8A6] transition-colors duration-500" 
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" strokeWidth={1.5} />
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
            className="md:hidden bg-[#6E725F]/98 backdrop-blur-md border-t border-[#F3EEE8]/10"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block py-3 transition-colors duration-500 text-sm tracking-[0.12em] uppercase ${
                    link.href === "/shop" ? "text-[#B8B8A6]" : "text-[#F3EEE8]/70 hover:text-[#B8B8A6]"
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

      {/* Premium Hero Banner */}
      <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
            alt="Shop Collection"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#6E725F]/60 via-[#6E725F]/30 to-[#6E725F]/70" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#F3EEE8] mb-6"
          >
            Curated Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] max-w-4xl"
          >
            THE ARCHIVE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 md:mt-8 max-w-xl text-sm md:text-base text-white/80 leading-relaxed"
          >
            Discover timeless pieces crafted for the modern individual. Each item tells a story of elegance and sophistication.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-gradient-to-b from-[#8D927B] to-[#B8B8A6] py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-14"
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-wide">
                  Explore Collection
                </h2>
                <p className="mt-3 text-sm md:text-base text-white/70">
                  Curated pieces for the modern individual
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/60 uppercase tracking-wider">
                  {filtered.length} pieces
                </span>
                <div className="h-4 w-px bg-white/30" />
                <button className="flex items-center gap-2 text-xs text-white/70 hover:text-white transition-colors duration-300">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categoryTabs.map((tab) => {
                const active = tab === activeCategory;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveCategory(tab);
                      setVisibleCount(BATCH);
                    }}
                    className={`rounded-full border px-5 py-2.5 text-xs md:text-sm font-medium uppercase tracking-wider transition-all duration-500 ${
                      active
                        ? "border-white bg-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "border-white/25 text-white/70 hover:border-white/50 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Products Grid - 4 cols on laptop, 2 on phone */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 lg:grid-cols-4"
          >
            {visible.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.section>

          {/* Load More Indicator */}
          <div ref={loadMoreRef} className="py-12 md:py-16 text-center">
            {hasMore ? (
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/30" />
                <span className="text-sm text-white/60 uppercase tracking-wider">
                  Loading more pieces...
                </span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/30" />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/40" />
                <span className="text-xs text-white/70 uppercase tracking-[0.2em]">
                  End of Collection
                </span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/40" />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <SearchModal />
      <CartPanel />

      {/* Floating Cart Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={openCart}
        className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-50 bg-[#6E725F] text-[#F3EEE8] p-4 md:p-5 rounded-full shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(110,114,95,0.4)]"
        aria-label="Shopping Cart"
      >
        <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#8D927B] text-[#F3EEE8] text-[10px] font-medium w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </motion.button>
    </div>
  );
}
