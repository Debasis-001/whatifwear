"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/app/lib/products";
import { useStore } from "@/app/context/store-context";
import { CartIcon, HeartIcon, ProfileIcon, SearchIcon } from "@/app/components/store/icons";
import { SearchModal } from "@/components/search/search-modal";

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
            className="fixed inset-0 z-40 bg-[#6E725F]/55 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: "easeOut", duration: 0.35 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-[#F3EEE8]/10 bg-[#6E725F] p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#F3EEE8]">Your Bag</h3>
              <button type="button" onClick={closeCart} className="text-[#F3EEE8]/70 hover:text-[#F3EEE8]">
                Close
              </button>
            </div>
            <div className="mt-5 h-[calc(100%-162px)] overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="mt-20 rounded-2xl border border-[#F3EEE8]/10 bg-[#F3EEE8]/[0.02] p-6 text-center">
                  <p className="text-[#F3EEE8]/80">Your bag is empty</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-4 inline-block rounded-full border border-[#B8B8A6]/50 px-4 py-2 text-sm text-[#B8B8A6] hover:bg-[#B8B8A6]/10"
                  >
                    Explore Collection
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => {
                    const product = products.find((p) => p.id === item.id);
                    if (!product) return null;
                    return (
                      <div key={item.id} className="rounded-2xl border border-[#F3EEE8]/10 bg-[#F3EEE8]/[0.02] p-3">
                        <div className="flex gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-20 w-16 rounded-lg object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[#F3EEE8]">{product.name}</p>
                            <p className="text-sm text-[#F3EEE8]/70">
                              {"\u20B9"}{product.price.toLocaleString("en-IN")}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="h-7 w-7 rounded-full border border-[#F3EEE8]/20 text-[#F3EEE8]/80"
                              >
                                -
                              </button>
                              <span className="text-sm text-[#F3EEE8]">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="h-7 w-7 rounded-full border border-[#F3EEE8]/20 text-[#F3EEE8]/80"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="mt-3 text-xs text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="absolute bottom-5 left-5 right-5 border-t border-[#F3EEE8]/10 pt-4">
              <div className="mb-3 flex items-center justify-between text-[#F3EEE8]/80">
                <span>Total</span>
                <span className="font-semibold text-[#F3EEE8]">{"\u20B9"}{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <button
                type="button"
                className="w-full rounded-full bg-[#B8B8A6] px-4 py-3 text-sm font-semibold text-[#6E725F] transition active:scale-[0.99] hover:bg-[#D9D2C8]"
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

  return (
    <div className="min-h-screen bg-[#8D927B] text-[#FAF8F5] overflow-x-hidden">
      <header className="sticky top-0 z-30 border-b border-[#F3EEE8]/10 bg-[#8D927B]/90 backdrop-blur-lg">
        <div className="mx-auto flex h-16 md:h-18 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-serif text-sm md:text-base font-medium tracking-[0.25em] text-[#F3EEE8] hover:text-[#B8B8A6] transition-colors duration-500">
            WHAT IF WEAR
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openSearch}
              className="rounded-full p-2 text-[#F3EEE8]/70 transition hover:text-[#B8B8A6]"
            >
              <SearchIcon className="h-4 w-4" />
            </button>
            <Link
              href="/wishlist"
              className="relative rounded-full p-2 text-[#F3EEE8]/70 transition hover:text-[#B8B8A6]"
            >
              <HeartIcon className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#6E725F] text-[10px] font-semibold text-[#F3EEE8]">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-full p-2 text-[#F3EEE8]/80 transition hover:text-[#B8B8A6]"
            >
              <CartIcon className="h-4 w-4" />
              {cartCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#6E725F] text-[10px] font-semibold text-[#F3EEE8]">
                  {cartCount}
                </span>
              ) : null}
            </button>
            <Link href="/profile" className="rounded-full p-2 text-[#F3EEE8]/70 transition hover:text-[#B8B8A6]">
              <ProfileIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
        {showArchiveLabel ? (
          <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
            <h1 className="font-serif text-2xl md:text-3xl font-light tracking-[0.3em] text-[#F3EEE8]">
              <span className="text-[#D9D2C8]">THE</span> ARCHIVE
            </h1>
          </div>
        ) : null}
      </header>
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6"
      >
        {children}
      </motion.main>

      <button
        type="button"
        onClick={openCart}
        className="fixed bottom-20 right-4 z-20 rounded-full border border-[#F3EEE8]/50 bg-[#6E725F] p-3 text-[#F3EEE8] shadow-[0_0_16px_rgba(141,146,123,0.35)] transition hover:scale-105 md:bottom-6"
      >
        <CartIcon className="h-5 w-5" />
      </button>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#F3EEE8]/10 bg-[#8D927B]/95 px-4 py-2 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between text-xs text-[#F3EEE8]/70">
          <Link href="/" className="rounded-full px-3 py-2 hover:text-[#B8B8A6]">
            Home
          </Link>
          <Link href="/shop" className="rounded-full px-3 py-2 hover:text-[#B8B8A6]">
            Shop
          </Link>
          <Link href="/wishlist" className="relative rounded-full px-3 py-2 hover:text-[#B8B8A6]">
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#6E725F] text-[10px] font-semibold text-[#F3EEE8]">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button type="button" onClick={openCart} className="rounded-full px-3 py-2 hover:text-[#B8B8A6]">
            Cart
          </button>
          <Link href="/profile" className="rounded-full px-3 py-2 hover:text-[#B8B8A6]">
            Profile
          </Link>
        </div>
      </nav>
      <CartPanel />
      <SearchModal />
    </div>
  );
}
