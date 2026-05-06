"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/app/lib/products";
import { useStore } from "@/app/context/store-context";
import { CartIcon, HeartIcon, ProfileIcon, SearchIcon } from "@/app/components/store/icons";
import { SearchModal } from "@/components/search/search-modal";
import { Home, ShoppingBag, Heart, User } from "lucide-react";

type StoreShellProps = {
  children: React.ReactNode;
  showArchiveLabel?: boolean;
};

function CartPanel() {
  const { cart, cartTotal, closeCart, isCartOpen, removeFromCart, updateQty } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.button
            type="button"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#134B42]/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-[#134B42] border-l border-[#EEA83B]/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#FDFCFA]/10">
              <h3 className="font-serif text-xl font-light tracking-wide text-[#FDFCFA]">Your Bag</h3>
              <button 
                type="button" 
                onClick={closeCart} 
                className="text-[#FDFCFA]/60 hover:text-[#EEA83B] transition-all duration-300 text-sm tracking-wider uppercase font-medium hover:scale-105"
              >
                Close
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="h-[calc(100%-180px)] overflow-y-auto p-5">
              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="empty-state-premium mt-16"
                >
                  <div className="icon-wrapper">
                    <ShoppingBag className="h-8 w-8 text-[#EEA83B]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[#FDFCFA] font-serif text-lg mb-2">Your bag is empty</p>
                  <p className="text-[#FDFCFA]/50 text-sm mb-6">Discover our curated collection</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="btn-premium-outline text-xs"
                  >
                    Explore Collection
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => {
                    const product = products.find((p) => p.id === item.id);
                    if (!product) return null;
                    return (
                      <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="card-luxury-dark p-4"
                      >
                        <div className="flex gap-4">
                          <div className="relative h-24 w-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[#FDFCFA] mb-1">{product.name}</p>
                            <p className="text-sm text-[#EEA83B] font-semibold">
                              {"\u20B9"}{product.price.toLocaleString("en-IN")}
                            </p>
                            <div className="mt-3 flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="h-8 w-8 rounded-full border border-[#FDFCFA]/20 text-[#FDFCFA] hover:border-[#EEA83B] hover:text-[#EEA83B] transition-all duration-300 flex items-center justify-center text-sm hover:scale-110"
                              >
                                -
                              </button>
                              <span className="text-sm text-[#FDFCFA] w-6 text-center font-medium">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="h-8 w-8 rounded-full border border-[#FDFCFA]/20 text-[#FDFCFA] hover:border-[#EEA83B] hover:text-[#EEA83B] transition-all duration-300 flex items-center justify-center text-sm hover:scale-110"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="mt-3 text-xs text-[#CA763B] hover:text-[#EEA83B] transition-colors duration-300"
                        >
                          Remove
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-[#FDFCFA]/10 bg-gradient-to-t from-[#134B42] to-transparent pt-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[#FDFCFA]/70 text-sm">Subtotal</span>
                <span className="font-serif text-xl text-[#EEA83B]">{"\u20B9"}{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <button
                type="button"
                className="btn-premium w-full"
              >
                Checkout
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export function StoreShell({ children, showArchiveLabel = false }: StoreShellProps) {
  const { cartCount, openCart, wishlistCount, openSearch } = useStore();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/wishlist", label: "Wishlist", icon: Heart, count: wishlistCount },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#134B42] text-[#FDFCFA] overflow-x-hidden">
      {/* Premium Header */}
      <header className="sticky top-0 z-30 nav-floating">
        <div className="mx-auto flex h-16 md:h-18 max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link 
            href="/" 
            className="font-serif text-sm md:text-base font-medium tracking-[0.25em] text-[#FDFCFA] hover:text-[#EEA83B] transition-all duration-500 hover:scale-105"
          >
            WHAT IF WEAR
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={openSearch}
              className="rounded-full p-2.5 text-[#FDFCFA]/70 transition-all duration-300 hover:text-[#EEA83B] hover:bg-[#FDFCFA]/5 hover:scale-110 hover:translate-y-[-2px]"
              aria-label="Search"
            >
              <SearchIcon className="h-[18px] w-[18px]" />
            </button>
            <Link
              href="/wishlist"
              className="relative rounded-full p-2.5 text-[#FDFCFA]/70 transition-all duration-300 hover:text-[#EEA83B] hover:bg-[#FDFCFA]/5 hover:scale-110 hover:translate-y-[-2px]"
              aria-label="Wishlist"
            >
              <HeartIcon className="h-[18px] w-[18px]" />
              {wishlistCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#EEA83B] text-[9px] font-bold text-[#134B42]"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-full p-2.5 text-[#FDFCFA]/70 transition-all duration-300 hover:text-[#EEA83B] hover:bg-[#FDFCFA]/5 hover:scale-110 hover:translate-y-[-2px]"
              aria-label="Cart"
            >
              <CartIcon className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#EEA83B] text-[9px] font-bold text-[#134B42]"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <Link 
              href="/profile" 
              className="rounded-full p-2.5 text-[#FDFCFA]/70 transition-all duration-300 hover:text-[#EEA83B] hover:bg-[#FDFCFA]/5 hover:scale-110 hover:translate-y-[-2px]"
              aria-label="Profile"
            >
              <ProfileIcon className="h-[18px] w-[18px]" />
            </Link>
          </div>
        </div>
        {showArchiveLabel && (
          <div className="mx-auto max-w-7xl px-5 pb-4 sm:px-6">
            <h1 className="font-serif text-2xl md:text-3xl font-light tracking-[0.3em] text-[#FDFCFA]">
              <span className="text-[#EEA83B]">THE</span> ARCHIVE
            </h1>
          </div>
        )}
      </header>
      
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-7xl px-5 pb-28 pt-6 sm:px-6"
      >
        {children}
      </motion.main>

      {/* Floating Cart Button (Desktop) */}
      <motion.button
        type="button"
        onClick={openCart}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="hidden md:flex fixed bottom-8 right-8 z-20 items-center justify-center h-14 w-14 rounded-full bg-[#EEA83B] text-[#134B42] shadow-[0_8px_32px_rgba(238,168,59,0.4)] transition-all duration-500 hover:scale-110 hover:translate-y-[-4px] hover:shadow-[0_12px_40px_rgba(238,168,59,0.5)]"
        aria-label="Open cart"
      >
        <CartIcon className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#134B42] text-[10px] font-bold text-[#FDFCFA]">
            {cartCount}
          </span>
        )}
      </motion.button>

      {/* Premium Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 md:hidden mobile-nav-premium safe-area-bottom">
        <div className="mx-auto flex max-w-md items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav-item relative ${isActive ? 'active' : ''}`}
              >
                <motion.div
                  animate={isActive ? { y: -2, scale: 1.15 } : { y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="nav-icon"
                >
                  <Icon 
                    className={`h-5 w-5 transition-all duration-300 ${
                      isActive ? 'drop-shadow-[0_0_10px_rgba(238,168,59,0.7)]' : ''
                    }`} 
                    strokeWidth={isActive ? 2 : 1.5} 
                  />
                </motion.div>
                <span className={`text-[10px] tracking-wider transition-all duration-300 ${
                  isActive ? 'font-semibold text-[#EEA83B]' : 'font-normal'
                }`}>
                  {item.label}
                </span>
                {item.count && item.count > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EEA83B] text-[9px] font-bold text-[#134B42]"
                  >
                    {item.count}
                  </motion.span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#EEA83B]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          
          {/* Cart Button in Mobile Nav */}
          <button
            type="button"
            onClick={openCart}
            className="mobile-nav-item relative"
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="nav-icon"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            </motion.div>
            <span className="text-[10px] tracking-wider">Cart</span>
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EEA83B] text-[9px] font-bold text-[#134B42]"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </nav>
      
      <CartPanel />
      <SearchModal />
    </div>
  );
}
