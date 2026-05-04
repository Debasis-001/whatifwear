import Link from "next/link";
import { ProductCard } from "@/app/components/store/ProductCard";
import { StoreShell } from "@/app/components/store/StoreShell";
import { products } from "@/app/lib/products";

export default function ProfilePage() {
  const saved = products.slice(0, 3);

  return (
    <StoreShell>
      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8CFB5A]/20 text-xl text-[#8CFB5A]">
            👤
          </div>
          <div>
            <h1 className="text-xl font-semibold">Aarav Singh</h1>
            <p className="text-sm text-white/60">aarav@whatifwear.com</p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] p-5">
        <h2 className="text-lg font-semibold">Orders</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="rounded-xl border border-white/10 p-3">
            <p className="text-white">#WIW-2041 • Obsidian Drift Jacket</p>
            <p className="text-white/55">Delivered • 16 Apr 2026</p>
          </div>
          <div className="rounded-xl border border-white/10 p-3">
            <p className="text-white">#WIW-1966 • Graphite Relaxed Tee</p>
            <p className="text-white/55">Shipped • Tracking active</p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-4 text-lg font-semibold">Saved Items</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {saved.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          className="rounded-full border border-red-400/60 px-5 py-2 text-sm text-red-300 hover:bg-red-500/10"
        >
          Logout
        </button>
        <Link
          href="/login"
          className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/80 hover:text-white"
        >
          Login as another account
        </Link>
      </div>
    </StoreShell>
  );
}