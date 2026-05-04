import Image from "next/image";
import { products } from "./data";

export default function ProductGrid() {
  return (
    <section id="products" className="bg-white px-5 pb-20 text-center md:px-10">
      <h2 className="text-xl font-bold">Related Product</h2>
      <div className="mx-auto mt-10 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {products.map((product) => (
          <article key={product.name} className="group text-left">
            <div className="relative aspect-square overflow-hidden bg-[#f5f0ec]">
              <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 50vw, 240px" className="object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute left-0 top-0 bg-stone-950 px-3 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-white">
                New
              </span>
              <button
                type="button"
                className="absolute bottom-3 left-3 right-3 translate-y-3 bg-white px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100"
              >
                Add to cart
              </button>
            </div>
            <p className="mt-4 text-xs font-semibold">{product.price}</p>
            <h3 className="mt-2 text-sm font-bold">{product.name}</h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-stone-400">
              What If Wear
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
