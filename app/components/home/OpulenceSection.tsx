import Image from "next/image";

export default function OpulenceSection() {
  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#faf8f4] px-5 py-20 text-center text-stone-950 md:px-10">
      <h2 className="mx-auto max-w-6xl [font-family:var(--font-playfair)] text-6xl uppercase leading-[0.92] tracking-[0.08em] text-stone-950/90 md:text-9xl">
        Echoes
        <span className="block text-3xl lowercase italic tracking-normal md:text-5xl">of</span>
        Opulence
      </h2>
      <div className="absolute inset-x-0 bottom-16 z-10 mx-auto h-[520px] w-[min(78vw,390px)]">
        <Image
          src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80"
          alt="Elegant model wearing a long neutral dress"
          fill
          sizes="390px"
          className="object-contain object-bottom"
        />
      </div>
      <div className="absolute bottom-10 left-5 z-20 max-w-sm bg-white/55 p-5 text-left backdrop-blur md:left-[max(2.5rem,calc((100vw-80rem)/2))]">
        <p className="text-[10px] font-black uppercase tracking-[0.28em]">Grandeur</p>
        <p className="mt-4 text-xs leading-6 text-stone-600">
          Elevated essentials with a quiet presence, made for people who prefer
          restraint, movement, and lasting shape.
        </p>
      </div>
    </section>
  );
}
