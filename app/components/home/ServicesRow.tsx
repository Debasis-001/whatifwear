import { services } from "./data";

const icons = ["●", "→", "↺", "◆"];

export default function ServicesRow() {
  return (
    <section className="bg-white px-5 py-20 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
        {services.map(([title, body], index) => (
          <article key={title} className="mx-auto max-w-xs">
            <span className="mx-auto grid size-9 place-items-center rounded-full border border-stone-950 text-xs">
              {icons[index]}
            </span>
            <h3 className="mt-5 [font-family:var(--font-playfair)] text-3xl italic">
              {title}
            </h3>
            <p className="mt-3 text-xs leading-6 text-stone-500">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
