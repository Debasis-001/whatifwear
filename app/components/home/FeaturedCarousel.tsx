import Image from "next/image";
import { featuredProducts } from "./data";

export default function FeaturedCarousel() {
  return (
    <section id="shop" className="bg-white px-5 py-20 text-center md:px-10">
      <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-stone-500">
        Curated edit
      </p>
      <h2 className="mt-3 [font-family:var(--font-playfair)] text-4xl uppercase tracking-[0.18em] md:text-5xl">
        Featured Collection
      </h2>
      <div className="mx-auto mt-12 flex max-w-7xl snap-x items-center gap-4 overflow-x-auto pb-8 [perspective:1000px]">
        {featuredProducts.map((item, index) => {
          const isCenter = index === 2;

          return (
            <article
              key={item.name}
              className={`group relative shrink-0 snap-center overflow-hidden rounded-lg bg-stone-200 shadow-xl transition duration-500 hover:-translate-y-2 ${
                isCenter
                  ? "h-[430px] w-[300px] md:h-[500px] md:w-[360px]"
                  : "h-[330px] w-[180px] rotate-y-6 opacity-80 md:h-[410px] md:w-[230px]"
              }`}
            >
              <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 80vw, 360px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />
              {isCenter ? (
                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-1 text-[9px] font-black uppercase tracking-[0.18em]">
                  New
                </span>
              ) : null}
              <div className="absolute bottom-5 left-5 right-5 text-left text-white">
                <h3 className="[font-family:var(--font-playfair)] text-2xl">{item.name}</h3>
                <p className="mt-1 text-sm">{item.price}</p>
              </div>
              <button
                type="button"
                className="absolute bottom-5 right-5 grid size-10 place-items-center rounded-full bg-white text-lg text-black opacity-0 transition group-hover:opacity-100"
                aria-label={`Add ${item.name}`}
              >
                +
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
