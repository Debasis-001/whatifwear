import { navItems } from "./data";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-80 saturate-50"
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.72),rgba(0,0,0,0.28)_44%,rgba(0,0,0,0.78))]" />

      <nav className="absolute left-0 right-0 top-0 z-20 grid items-start gap-5 px-5 py-5 text-[10px] font-bold uppercase tracking-[0.18em] md:grid-cols-[1fr_auto_1fr] md:px-8">
        <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-7">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-stone-300">
              {item}
            </a>
          ))}
        </div>
        <a href="#home" className="row-start-1 text-center [font-family:var(--font-playfair)] md:row-auto">
          <span className="block text-base tracking-[0.22em]">WHAT IF Wear</span>
          <small className="mt-2 block font-sans text-[8px] tracking-[0.34em]">
            ORDINARY IS A CHOICE
          </small>
        </a>
        <div className="hidden justify-end gap-6 md:flex">
          <a href="#shop">Search</a>
          <a href="#products">Bag</a>
        </div>
      </nav>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 pt-28 text-center">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.34em] text-stone-200">
          Modern essentials for now
        </p>
        <h1 className="[font-family:var(--font-playfair)] text-5xl font-semibold leading-[0.98] tracking-wide md:text-7xl">
          Ordinary Was Never An Option
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-stone-200 md:text-base">
          Not just an idea. It is a statement. Designed for those who stand out
          without trying.
        </p>
        <a
          href="#outfits"
          className="mt-9 border border-white/80 px-9 py-4 text-[10px] font-extrabold uppercase tracking-[0.22em] transition hover:bg-white hover:text-black"
        >
          View Collection
        </a>
      </div>
    </section>
  );
}
