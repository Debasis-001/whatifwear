import Image from "next/image";

export default function SeasonSection() {
  return (
    <section className="bg-white px-5 py-20 text-stone-950 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="lg:col-span-2">
          <h2 className="[font-family:var(--font-playfair)] text-6xl uppercase leading-[0.78] tracking-wide md:text-8xl lg:text-9xl">
            Spring
            <span className="block">Summer /22</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-[1.1fr_0.85fr]">
          <div className="relative aspect-[1.1/0.82] overflow-hidden bg-stone-100">
            <Image
              src="https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=900&q=80"
              alt="Editorial room fashion"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[0.84/1] overflow-hidden bg-stone-100 sm:mt-20">
            <Image
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80"
              alt="Soft neutral styling"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="self-center lg:pl-10">
          <p className="max-w-lg text-sm leading-8 text-stone-600">
            Designed for slow days and electric evenings, this edit keeps the
            silhouette relaxed while the details stay sharp. Light fabric, open
            collars, and warm neutral tones define the season.
          </p>
          <a
            href="#products"
            className="mt-9 inline-flex border-b border-stone-950 pb-2 text-[10px] font-black uppercase tracking-[0.24em]"
          >
            View the edit
          </a>
        </div>
      </div>
    </section>
  );
}
