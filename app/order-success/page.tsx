import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f6f1] px-4">
      <div className="w-full max-w-xl rounded-[32px] bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mt-8 text-4xl font-black text-[#134B42]">
          Order Confirmed
        </h1>

        <p className="mt-4 text-[15px] leading-7 text-[#134B42]/70">
          Your payment was successful and
          your order has been placed
          successfully.
        </p>

        <div className="mt-10 flex flex-col gap-4 md:flex-row">
          <Link
            href="/shop"
            className="flex-1 rounded-2xl bg-[#134B42] px-6 py-4 text-center text-sm font-bold text-white"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="flex-1 rounded-2xl border border-[#134B42]/10 px-6 py-4 text-center text-sm font-bold text-[#134B42]"
          >
            Go To Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}