import { StoreShell } from "@/app/components/store/StoreShell";

export default function LoginPage() {
  return (
    <StoreShell>
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] lg:grid lg:grid-cols-2">
        <div className="relative min-h-[260px] lg:min-h-[620px]">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
            alt="Lifestyle fashion"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        </div>

        <div className="p-6 sm:p-10">
          <h1 className="text-2xl font-semibold">Login / Signup</h1>
          <p className="mt-1 text-sm text-white/55">Enter your details to continue shopping.</p>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/90 hover:border-white/30"
            >
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full rounded-xl border border-[#8CFB5A]/40 bg-[#8CFB5A]/10 px-4 py-3 text-sm text-[#8CFB5A]"
            >
              Continue with Email
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-[#8CFB5A]/60"
            />
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-[#8CFB5A]/60"
              />
              <button
                type="button"
                className="rounded-xl border border-white/20 px-4 py-3 text-sm text-white/80 hover:border-[#8CFB5A]/50 hover:text-[#8CFB5A]"
              >
                Send OTP
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-[#8CFB5A]/60"
            />
          </div>

          <button
            type="button"
            className="mt-5 w-full rounded-full bg-[#8CFB5A] px-5 py-3 text-sm font-semibold text-black transition active:scale-[0.99]"
          >
            Continue
          </button>
        </div>
      </section>
    </StoreShell>
  );
}
