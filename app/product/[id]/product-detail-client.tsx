"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { ProductCard } from "@/app/components/store/ProductCard";
import { RefreshIcon, RouteIcon, ShieldIcon, TruckIcon } from "@/app/components/store/icons";
import { StoreShell } from "@/app/components/store/StoreShell";
import { useStore } from "@/app/context/store-context";
import { products, type Product } from "@/app/lib/products";

const featureItems = [
  { label: "Secure Payment", icon: ShieldIcon },
  { label: "Free Shipping", icon: TruckIcon },
  { label: "Easy Returns", icon: RefreshIcon },
  { label: "Order Tracking", icon: RouteIcon },
];

type TabName = "Description" | "Additional Info" | "Reviews";

export function ProductDetailClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<TabName>("Description");
  const { addToCart, isInWishlist, toggleWishlist } = useStore();

  const isWishlisted = isInWishlist(product.id);

  const related = useMemo(
    () => products.filter((item) => item.id !== product.id).slice(0, 6),
    [product.id],
  );

  return (
    <StoreShell>
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              src={activeImage}
              alt={product.name}
              className="aspect-[4/5] w-full rounded-2xl border border-white/10 object-cover"
            />
            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`absolute right-4 top-4 rounded-full border p-3 backdrop-blur-sm transition ${
                isWishlisted
                  ? "border-gold/50 bg-gold/20 text-gold"
                  : "border-white/20 bg-black/50 text-white/80 hover:border-gold/50 hover:text-gold"
              }`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {product.images.map((img) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`overflow-hidden rounded-xl border transition ${
                  activeImage === img ? "border-gold" : "border-white/15 hover:border-white/30"
                }`}
              >
                <img src={img} alt={product.name} className="h-20 w-16 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Premium Streetwear</span>
          <h1 className="mt-3 font-serif text-3xl font-light text-white md:text-4xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <p className="text-2xl font-medium text-white">{"\u20B9"}{product.price.toLocaleString("en-IN")}</p>
            <div className="flex items-center gap-1 text-sm text-white/60">
              <span className="text-gold">{"★"}</span>
              {product.rating.toFixed(1)} rating
            </div>
          </div>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">{product.description}</p>

          <div className="mt-8 space-y-5">
            <div>
              <p className="mb-3 text-xs uppercase tracking-wider text-white/50">Color</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    style={{ backgroundColor: color }}
                    className="h-7 w-7 rounded-full border-2 border-white/20 transition hover:border-gold/50"
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-wider text-white/50">Size</p>
              <div className="flex gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    className={`rounded-lg border px-4 py-2 text-sm transition ${
                      size === item
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-white/20 text-white/70 hover:border-gold/30 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-wider text-white/50">Quantity</p>
              <div className="flex w-fit items-center gap-4 rounded-lg border border-white/20 px-4 py-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-6 w-6 text-lg text-white/80 hover:text-gold transition"
                >
                  -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-6 w-6 text-lg text-white/80 hover:text-gold transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addToCart(product.id, quantity)}
              className="rounded-lg bg-gold px-8 py-3.5 text-sm font-medium uppercase tracking-wider text-charcoal transition hover:bg-gold/90 active:scale-[0.99]"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => addToCart(product.id, quantity)}
              className="rounded-lg border border-white/25 px-8 py-3.5 text-sm uppercase tracking-wider text-white/90 transition hover:border-gold/50 hover:text-gold"
            >
              Buy Now
            </button>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex flex-wrap gap-2">
          {(["Description", "Additional Info", "Reviews"] as TabName[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                tab === item
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-white/15 text-white/70 hover:border-white/30"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-5 text-sm leading-7 text-white/60">
          {tab === "Description" ? (
            <p>
              Built for late nights and city mornings, this piece balances structure and comfort
              with premium finishing. Designed with attention to detail for the modern minimalist.
            </p>
          ) : null}
          {tab === "Additional Info" ? (
            <p>Material: Premium blend | Fit: Relaxed | Care: Gentle cold wash | Origin: India</p>
          ) : null}
          {tab === "Reviews" ? (
            <p>Customers love the fit, texture, and elevated look. 4.8/5 average from demo ratings.</p>
          ) : null}
        </div>
      </section>

      <section className="mt-7 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-4">
        {featureItems.map((feature) => (
          <div key={feature.label} className="flex items-center gap-3 text-sm text-white/70">
            <feature.icon className="h-5 w-5 text-gold" />
            <span>{feature.label}</span>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">You May Also Like</span>
          <h2 className="mt-2 font-serif text-2xl font-light text-white">Related Products</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {related.map((item) => (
            <div key={item.id} className="min-w-[190px] flex-1 sm:min-w-[220px]">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </section>
    </StoreShell>
  );
}
