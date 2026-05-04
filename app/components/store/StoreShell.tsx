"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/app/lib/products";
import { useStore } from "@/app/context/store-context";
import { CartIcon, HeartIcon, ProfileIcon, SearchIcon } from "@/app/components/store/icons";

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
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: "easeOut", duration: 0.35 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-[#111] p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Your Bag</h3>
              <button type="button" onClick={closeCart} className="text-white/70 hover:text-white">
                Close
              </button>
            </div>
            <div className="mt-5 h-[calc(100%-162px)] overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
                  <p className="text-white/80">Your bag is empty</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-4 inline-block rounded-full border border-[#8CFB5A]/50 px-4 py-2 text-sm text-[#8CFB5A] hover:bg-[#8CFB5A]/10"
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
                      <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                        <div className="flex gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-20 w-16 rounded-lg object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-white">{product.name}</p>
                            <p className="text-sm text-white/70">
                              ₹{product.price.toLocaleString("en-IN")}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="h-7 w-7 rounded-full border border-white/20 text-white/80"
                              >
                                -
                              </button>
                              <span className="text-sm">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="h-7 w-7 rounded-full border border-white/20 text-white/80"
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
            <div className="absolute bottom-5 left-5 right-5 border-t border-white/10 pt-4">
              <div className="mb-3 flex items-center justify-between text-white/80">
                <span>Total</span>
                <span className="font-semibold text-white">₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <button
                type="button"
                className="w-full rounded-full bg-[#8CFB5A] px-4 py-3 text-sm font-semibold text-black transition active:scale-[0.99]"
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
  const { cartCount, openCart } = useStore();

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B0B0B]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-sm font-semibold tracking-[0.3em] text-white">
            WHAT IF WEAR
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/shop" className="rounded-full p-2 text-white/70 transition hover:text-[#8CFB5A]">
              <SearchIcon className="h-4 w-4" />
            </Link>
            <button type="button" className="rounded-full p-2 text-white/70 transition hover:text-[#8CFB5A]">
              <HeartIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-full p-2 text-white/80 transition hover:text-[#8CFB5A]"
            >
              <CartIcon className="h-4 w-4" />
              {cartCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 rounded-full bg-[#8CFB5A] px-1.5 text-[10px] font-semibold text-black">
                  {cartCount}
                </span>
              ) : null}
            </button>
            <Link href="/profile" className="rounded-full p-2 text-white/70 transition hover:text-[#8CFB5A]">
              <ProfileIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
        {showArchiveLabel ? (
          <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
            <h1 className="text-3xl font-semibold tracking-[0.25em] text-white">ARCHIVE</h1>
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
        className="fixed bottom-20 right-4 z-20 rounded-full border border-[#8CFB5A]/50 bg-[#101010] p-3 text-[#8CFB5A] shadow-[0_0_16px_rgba(140,251,90,0.35)] transition hover:scale-105 md:bottom-6"
      >
        <CartIcon className="h-5 w-5" />
      </button>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#090909]/95 px-4 py-2 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between text-xs text-white/70">
          <Link href="/" className="rounded-full px-3 py-2">
            Home
          </Link>
          <Link href="/shop" className="rounded-full px-3 py-2">
            Shop
          </Link>
          <button type="button" onClick={openCart} className="rounded-full px-3 py-2">
            Cart
          </button>
          <Link href="/profile" className="rounded-full px-3 py-2">
            Profile
          </Link>
        </div>
      </nav>
      <CartPanel />
    </div>
  );
}
