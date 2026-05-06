"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/app/lib/products";
import { useStore } from "@/app/context/store-context";

export function CartPanel() {
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
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-background-dark p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-light text-white">Your Bag</h3>
              <button type="button" onClick={closeCart} className="text-white/70 hover:text-gold transition">
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
                    className="mt-4 inline-block rounded-lg border border-gold/50 px-4 py-2 text-sm text-gold hover:bg-gold/10 transition"
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
                            <p className="text-sm text-white/60">
                              {"\u20B9"}{product.price.toLocaleString("en-IN")}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="h-7 w-7 rounded-full border border-white/20 text-white/80 hover:border-gold/50 hover:text-gold transition"
                              >
                                -
                              </button>
                              <span className="text-sm">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="h-7 w-7 rounded-full border border-white/20 text-white/80 hover:border-gold/50 hover:text-gold transition"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="mt-3 text-xs text-red-400 hover:text-red-300 transition"
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
                <span className="font-medium text-white">{"\u20B9"}{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <button
                type="button"
                className="w-full rounded-lg bg-gold px-4 py-3 text-sm font-medium uppercase tracking-wider text-charcoal transition hover:bg-gold/90 active:scale-[0.99]"
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
