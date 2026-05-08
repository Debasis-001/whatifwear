export default function Newsletter() {
  return (
    <section className="bg-[#fbf7f4] px-5 py-14 text-center">
      <h2 className="text-xs font-black uppercase tracking-[0.28em]">Our Newsletter</h2>
      <form className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="Enter your email address"
          className="min-w-0 flex-1 border border-stone-300 bg-white px-5 py-4 text-sm outline-none transition focus:border-stone-950"
        />
        <button
          type="submit"
          className="bg-stone-950 px-7 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
