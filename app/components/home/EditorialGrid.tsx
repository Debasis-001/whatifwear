import Image from "next/image";
import { editorialImages } from "./data";

export default function EditorialGrid() {
  return (
    <section id="about" className="grid bg-[#d8c6b4] md:grid-cols-[0.85fr_1.1fr_1.65fr]">
      {editorialImages.map((item, index) => (
        <article
          key={item.title}
          className={`group relative min-h-[360px] overflow-hidden md:min-h-[560px] ${
            index === 2 ? "md:col-auto" : ""
          }`}
        >
          <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white md:p-11">
            <h2 className="[font-family:var(--font-playfair)] text-4xl uppercase leading-[0.9] tracking-wide md:text-6xl">
              {item.title}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">{item.copy}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
