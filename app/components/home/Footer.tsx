export default function Footer() {
  return (
    <footer id="contact" className="bg-[#efe3dc] px-5 py-14 text-stone-800 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.18em]">About</h3>
          <div className="mt-5 grid gap-2 text-xs leading-6 text-stone-600">
            <a href="#about">Our philosophy</a>
            <a href="#outfits">The fit archive</a>
            <a href="#shop">New arrivals</a>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.18em]">Customer Care</h3>
          <div className="mt-5 grid gap-2 text-xs leading-6 text-stone-600">
            <a href="#contact">Shipping policy</a>
            <a href="#contact">Returns and exchanges</a>
            <a href="#contact">Payment policy</a>
            <a href="#contact">FAQ</a>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.18em]">Social Icons</h3>
          <p className="mt-5 text-xs leading-6 text-stone-600">
            Follow new drops, campaign notes, and styling edits.
          </p>
          <div className="mt-5 flex gap-3">
            {["Fb", "Ig", "X"].map((item) => (
              <a
                key={item}
                href="#contact"
                className="grid size-9 place-items-center rounded-full bg-stone-950 text-xs font-bold text-white"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.18em]">App Download</h3>
          <div className="mt-5 grid max-w-40 gap-3">
            <a href="#contact" className="bg-stone-950 px-4 py-3 text-xs font-bold text-white">
              Google Play
            </a>
            <a href="#contact" className="bg-stone-950 px-4 py-3 text-xs font-bold text-white">
              App Store
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl text-center text-[10px] text-stone-500">
        Copyright 2026 What If Wear. All rights reserved.
      </p>
    </footer>
  );
}
