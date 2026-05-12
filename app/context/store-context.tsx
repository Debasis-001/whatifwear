"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "@/app/lib/products";

type CartItem = {
  id: string;
  quantity: number;
};

type StoreContextValue = {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  addToCart: (id: string, qty?: number) => void;

  removeFromCart: (id: string) => void;

  updateQty: (id: string, qty: number) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;

  clearCart: () => void;

  cartCount: number;

  cartTotal: number;

  // Wishlist
  wishlist: string[];

  toggleWishlist: (id: string) => void;

  isInWishlist: (id: string) => boolean;

  wishlistCount: number;

  // Search
  isSearchOpen: boolean;

  openSearch: () => void;

  closeSearch: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_STORAGE_KEY = "whatifwear-cart";

const WISHLIST_STORAGE_KEY = "whatifwear-wishlist";

export function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [wishlist, setWishlist] = useState<string[]>([]);

  const [isCartOpen, setCartOpen] = useState(false);

  const [isSearchOpen, setSearchOpen] = useState(false);

  const [isHydrated, setIsHydrated] = useState(false);

  // =========================
  // HYDRATE LOCAL STORAGE
  // =========================

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart) as CartItem[]);
      } catch {
        console.log("Invalid cart data");
      }
    }

    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist) as string[]);
      } catch {
        console.log("Invalid wishlist data");
      }
    }

    setIsHydrated(true);
  }, []);

  // =========================
  // SAVE CART
  // =========================

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  // =========================
  // SAVE WISHLIST
  // =========================

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlist),
      );
    }
  }, [wishlist, isHydrated]);

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (id: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);

      if (existing) {
        return prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + qty,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          id,
          quantity: qty,
        },
      ];
    });

    setCartOpen(true);
  };

  // =========================
  // REMOVE ITEM
  // =========================

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // =========================
  // UPDATE QTY
  // =========================

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: qty,
            }
          : item,
      ),
    );
  };

  // =========================
  // INCREASE QTY
  // =========================

  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // =========================
  // DECREASE QTY
  // =========================

  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // =========================
  // WISHLIST
  // =========================

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  // =========================
  // CART COUNT
  // =========================

  const cartCount = useMemo(() => {
    return cart.reduce(
      (count, item) => count + item.quantity,
      0,
    );
  }, [cart]);

  // =========================
  // CART TOTAL
  // =========================

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const product = products.find(
        (entry) => entry.id === item.id,
      );

      return total + (product?.price ?? 0) * item.quantity;
    }, 0);
  }, [cart]);

  const wishlistCount = wishlist.length;

  // =========================
  // CONTEXT VALUE
  // =========================

  const value: StoreContextValue = {
    // Cart
    cart,

    isCartOpen,

    openCart: () => setCartOpen(true),

    closeCart: () => setCartOpen(false),

    addToCart,

    removeFromCart,

    updateQty,

    increaseQuantity,

    decreaseQuantity,

    clearCart: () => setCart([]),

    cartCount,

    cartTotal,

    // Wishlist
    wishlist,

    toggleWishlist,

    isInWishlist,

    wishlistCount,

    // Search
    isSearchOpen,

    openSearch: () => setSearchOpen(true),

    closeSearch: () => setSearchOpen(false),
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used within StoreProvider",
    );
  }

  return context;
}