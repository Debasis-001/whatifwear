"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "@/app/lib/products";

type CartItem = {
  id: string;
  quantity: number;
};

type StoreContextValue = {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_KEY = "whatifwear-cart";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved) as CartItem[];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + qty } : item,
        );
      }
      return [...prev, { id, quantity: qty }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  const cartCount = useMemo(
    () => cart.reduce((count, item) => count + item.quantity, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce((total, item) => {
        const product = products.find((entry) => entry.id === item.id);
        return total + (product?.price ?? 0) * item.quantity;
      }, 0),
    [cart],
  );

  const value: StoreContextValue = {
    cart,
    isCartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    addToCart,
    removeFromCart,
    updateQty,
    clearCart: () => setCart([]),
    cartCount,
    cartTotal,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
