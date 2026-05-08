"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/app/lib/products";
import { useStore } from "@/app/context/store-context";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";

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
            className="fixed inset-0 z-40 bg-[#6E725F]/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md premium-depth-dark border-l border-[#F3EEE8]/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#F3EEE8]/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#B8B8A6]/10">
                  <ShoppingBag className="h-5 w-5 text-[#B8B8A6]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-light text-[#F3EEE8]">Your Bag</h3>
                  <p className="text-xs text-[#F3EEE8]/40">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={closeCart} 
                className="p-2 rounded-full text-[#F3EEE8]/50 hover:text-[#F3EEE8] hover:bg-[#F3EEE8]/5 transition-all duration-300"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="h-[calc(100%-200px)] overflow-y-auto p-5">
              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="empty-state-premium mt-12"
                >
                  <div className="icon-wrapper">
                    <ShoppingBag className="h-8 w-8 text-[#B8B8A6]/50" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[#F3EEE8] font-serif text-lg mb-2">Your bag is empty</h4>
                  <p className="text-[#F3EEE8]/40 text-sm mb-6">Discover our curated collection of luxury pieces.</p>
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
                          <Link 
                            href={`/product/${product.id}`}
                            onClick={closeCart}
                            className="relative h-24 w-20 rounded-lg overflow-hidden flex-shrink-0 group"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <Link 
                              href={`/product/${product.id}`}
                              onClick={closeCart}
                              className="truncate text-sm font-medium text-[#F3EEE8] hover:text-[#B8B8A6] transition-colors duration-300 block"
                            >
                              {product.name}
                            </Link>
                            <p className="text-[10px] uppercase tracking-wider text-[#F3EEE8]/40 mt-0.5">{product.category}</p>
                            <p className="text-sm text-[#B8B8A6] font-medium mt-2">
                              {"\u20B9"}{product.price.toLocaleString("en-IN")}
                            </p>
                            
                            {/* Quantity controls */}
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => updateQty(item.id, item.quantity - 1)}
                                  className="h-8 w-8 rounded-full border border-[#F3EEE8]/15 text-[#F3EEE8]/60 hover:border-[#B8B8A6]/40 hover:text-[#B8B8A6] transition-all duration-300 flex items-center justify-center"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3 w-3" strokeWidth={1.5} />
                                </button>
                                <span className="text-sm text-[#F3EEE8] w-8 text-center font-medium">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQty(item.id, item.quantity + 1)}
                                  className="h-8 w-8 rounded-full border border-[#F3EEE8]/15 text-[#F3EEE8]/60 hover:border-[#B8B8A6]/40 hover:text-[#B8B8A6] transition-all duration-300 flex items-center justify-center"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3 w-3" strokeWidth={1.5} />
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 rounded-full text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                                aria-label="Remove item"
                              >
                                <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Footer */}
            {cart.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-[#F3EEE8]/10 bg-gradient-to-t from-[#6E725F] via-[#6E725F] to-transparent">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[#F3EEE8]/50 text-xs uppercase tracking-wider">Subtotal</span>
                    <p className="font-serif text-2xl text-[#F3EEE8] mt-0.5">{"\u20B9"}{cartTotal.toLocaleString("en-IN")}</p>
                  </div>
                  <p className="text-[10px] text-[#F3EEE8]/40 text-right">
                    Shipping calculated<br />at checkout
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-premium w-full"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
