"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useState } from "react";

const outfits = [
  {
    name: "Bone Signature Tee",
    price: "Rs. 1,299",
    color: "bg-stone-100",
    text: "text-stone-900",
    accent: "border-stone-300",
  },
  {
    name: "Noir Identity Tee",
    price: "Rs. 1,399",
    color: "bg-neutral-950",
    text: "text-white",
    accent: "border-neutral-700",
  },
  {
    name: "Sage Studio Tee",
    price: "Rs. 1,249",
    color: "bg-[#6f7d64]",
    text: "text-white",
    accent: "border-[#56624d]",
  },
  {
    name: "Clay Limited Tee",
    price: "Rs. 1,499",
    color: "bg-[#b9825f]",
    text: "text-white",
    accent: "border-[#9b6c50]",
  },
];

export default function OutfitSlider() {
  const [active, setActive] = useState(0);
  const outfit = outfits[active];
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.45], [1, 1.05]);

  const dots = useMemo(() => outfits.map((item) => item.name), []);

  const move = (direction: number) => {
    setActive((current) => (current + direction + outfits.length) % outfits.length);
  };

  return (
    <section
      id="outfits"
      className="overflow-hidden bg-[#f4efe7] px-5 py-20 text-stone-950 md:px-10 md:py-28"
      onWheel={(event) => {
        if (Math.abs(event.deltaY) > 24) {
          move(event.deltaY > 0 ? 1 : -1);
        }
      }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-stone-500">
            Swipe the identity
          </p>
          <h2 className="mt-4 max-w-xl [font-family:var(--font-playfair)] text-5xl leading-[0.95] md:text-7xl">
            One model. Endless ways to arrive.
          </h2>
          <p className="mt-7 max-w-lg text-sm leading-7 text-stone-600">
            The body stays still, the outfit changes. Drag left or right, use
            the controls, or scroll over the frame to crossfade through the tee
            capsule.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => move(-1)}
              className="grid size-11 place-items-center rounded-full border border-stone-950 text-lg transition hover:bg-stone-950 hover:text-white"
              aria-label="Previous outfit"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="grid size-11 place-items-center rounded-full border border-stone-950 text-lg transition hover:bg-stone-950 hover:text-white"
              aria-label="Next outfit"
            >
              →
            </button>
          </div>
        </div>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragEnd={(_, info) => {
            if (info.offset.x > 45) move(-1);
            if (info.offset.x < -45) move(1);
          }}
          style={{ scale }}
          className="relative mx-auto h-[620px] w-full max-w-[620px] cursor-grab overflow-hidden rounded-t-full bg-[radial-gradient(circle_at_center,#ffffff_0%,#efe5d8_58%,#ded0bf_100%)] shadow-2xl shadow-stone-300/70 active:cursor-grabbing"
        >
          <div className="absolute inset-x-10 bottom-0 top-10 rounded-t-full border border-white/70" />
          <div className="absolute left-1/2 top-16 h-28 w-24 -translate-x-1/2 rounded-full bg-[#b98b6f] shadow-lg shadow-stone-500/20" />
          <div className="absolute left-1/2 top-[145px] h-12 w-24 -translate-x-1/2 rounded-b-[42px] bg-[#a97b60]" />
          <div className="absolute left-1/2 top-[118px] h-28 w-36 -translate-x-1/2 rounded-[48%] bg-stone-950" />
          <div className="absolute left-1/2 top-36 h-20 w-36 -translate-x-1/2 rounded-b-full bg-[#b98b6f]" />
          <div className="absolute left-[25%] top-[235px] h-64 w-12 rotate-6 rounded-full bg-[#b98b6f]" />
          <div className="absolute right-[25%] top-[235px] h-64 w-12 -rotate-6 rounded-full bg-[#b98b6f]" />
          <div className="absolute left-1/2 top-[405px] h-56 w-28 -translate-x-[86px] rotate-3 rounded-b-[44px] bg-stone-200" />
          <div className="absolute left-1/2 top-[405px] h-56 w-28 -translate-x-[6px] -rotate-3 rounded-b-[44px] bg-stone-300" />

          <AnimatePresence mode="wait">
            <motion.div
              key={outfit.name}
              initial={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={`absolute left-1/2 top-[218px] h-60 w-64 -translate-x-1/2 rounded-t-[86px] rounded-b-[28px] border ${outfit.accent} ${outfit.color} shadow-2xl shadow-stone-700/20`}
            >
              <div className="absolute -left-12 top-6 h-28 w-20 -rotate-[24deg] rounded-full border border-black/5 bg-inherit" />
              <div className="absolute -right-12 top-6 h-28 w-20 rotate-[24deg] rounded-full border border-black/5 bg-inherit" />
              <div className="absolute left-1/2 top-0 h-16 w-24 -translate-x-1/2 rounded-b-full bg-[#b98b6f]" />
              <div
                className={`absolute inset-x-8 top-24 text-center text-[10px] font-black uppercase tracking-[0.32em] ${outfit.text}`}
              >
                What If Wear
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-8 left-1/2 w-[78%] -translate-x-1/2 bg-white/75 p-5 text-center shadow-xl backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-500">
              Current look
            </p>
            <h3 className="mt-2 [font-family:var(--font-playfair)] text-2xl">
              {outfit.name}
            </h3>
            <p className="mt-1 text-sm font-semibold">{outfit.price}</p>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl justify-center gap-3">
        {dots.map((name, index) => (
          <button
            key={name}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show ${name}`}
            className={`h-2.5 rounded-full transition-all ${
              index === active ? "w-10 bg-stone-950" : "w-2.5 bg-stone-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
