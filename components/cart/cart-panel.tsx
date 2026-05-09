"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/app/lib/products";
import { useStore } from "@/app/context/store-context";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";

export function CartPanel() {
  const router = useRouter();

  const {
    cart,
    cartTotal,
    closeCart,
    isCartOpen,
    removeFromCart,
    updateQty,
  } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          {/* Overlay */}
          <motion.button
            type="button"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99998] bg-black/40"
          />

          {/* Cart Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            className="fixed right-0 top-0 z-[99999] h-full w-full max-w-md bg-[#0f3d35] border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-white" />

                <h2 className="text-2xl font-serif text-white">
                  Your Bag
                </h2>
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Empty Cart */}
            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-white/70">
                Your cart is empty
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {cart.map((item) => {
                    const product = products.find(
                      (p) => p.id === item.id
                    );

                    if (!product) return null;

                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex gap-4">
                          <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="h-28 w-24 rounded-xl object-cover"
                          />

                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-white">
                                  {product.name}
                                </h3>

                                <p className="mt-1 text-xl text-yellow-400">
                                  ₹{product.price}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeFromCart(item.id)
                                }
                                className="text-red-400"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Quantity */}
                            <div className="mt-auto flex items-center gap-3 pt-4">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQty(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white"
                              >
                                <Minus className="h-4 w-4" />
                              </button>

                              <span className="text-lg text-white">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQty(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-white/70">
                      Subtotal
                    </span>

                    <span className="text-2xl font-semibold text-white">
                      ₹{cartTotal}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="button"
                    onClick={() => {
                      closeCart();

                      setTimeout(() => {
                        router.push("/checkout");
                      }, 300);
                    }}
                    className="w-full rounded-xl bg-yellow-500 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400"
                  >
                    CHECKOUT
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}