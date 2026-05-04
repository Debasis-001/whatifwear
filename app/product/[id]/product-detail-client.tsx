"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  const { addToCart } = useStore();

  const related = useMemo(
    () => products.filter((item) => item.id !== product.id).slice(0, 6),
    [product.id],
  );

  return (
    <StoreShell>
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <motion.img
            key={activeImage}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            src={activeImage}
            alt={product.name}
            className="aspect-[4/5] w-full rounded-3xl border border-white/10 object-cover"
          />
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {product.images.map((img) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`overflow-hidden rounded-xl border ${
                  activeImage === img ? "border-[#8CFB5A]" : "border-white/15"
                }`}
              >
                <img src={img} alt={product.name} className="h-20 w-16 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/45">Premium streetwear</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <p className="text-2xl font-bold text-[#8CFB5A]">₹{product.price.toLocaleString("en-IN")}</p>
            <p className="text-sm text-white/60">★ {product.rating.toFixed(1)} rating</p>
          </div>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">{product.description}</p>

          <div className="mt-6 space-y-4">
            <div>
              <p className="mb-2 text-sm text-white/70">Color</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    style={{ backgroundColor: color }}
                    className="h-6 w-6 rounded-full border border-white/20"
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-white/70">Size</p>
              <div className="flex gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                      size === item
                        ? "border-[#8CFB5A] bg-[#8CFB5A]/10 text-[#8CFB5A]"
                        : "border-white/20 text-white/70 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-white/70">Quantity</p>
              <div className="flex w-fit items-center gap-3 rounded-full border border-white/20 px-3 py-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-6 w-6 text-lg text-white/80"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-6 w-6 text-lg text-white/80"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addToCart(product.id, quantity)}
              className="rounded-full bg-[#8CFB5A] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 active:scale-[0.99]"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => addToCart(product.id, quantity)}
              className="rounded-full border border-white/25 px-6 py-3 text-sm text-white/90 transition hover:border-[#8CFB5A]/50 hover:text-[#8CFB5A]"
            >
              Buy Now
            </button>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex flex-wrap gap-2">
          {(["Description", "Additional Info", "Reviews"] as TabName[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`rounded-full border px-4 py-2 text-sm ${
                tab === item
                  ? "border-[#8CFB5A] bg-[#8CFB5A]/10 text-[#8CFB5A]"
                  : "border-white/15 text-white/70"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm leading-6 text-white/70">
          {tab === "Description" ? (
            <p>
              Built for late nights and city mornings, this piece balances structure and comfort
              with premium finishing.
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

      <section className="mt-7 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-4">
        {featureItems.map((feature) => (
          <div key={feature.label} className="flex items-center gap-2 text-sm text-white/80">
            <feature.icon className="h-4 w-4 text-[#8CFB5A]" />
            <span>{feature.label}</span>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Related Products</h2>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
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
