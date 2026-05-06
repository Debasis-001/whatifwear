"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setTimeout(() => {
      setStatus("success")
      setEmail("")
      setTimeout(() => setStatus("idle"), 3000)
    }, 1000)
  }

  return (
    <section className="bg-gradient-to-b from-[#D9D2C8] to-[#8D927B] py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-2xl px-8 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#6E725F]">Stay Connected</span>
          <h2 className="mt-4 font-serif text-2xl md:text-3xl lg:text-4xl font-light text-[#6E725F] tracking-wide">
            Join Our Newsletter
          </h2>
          <p className="mt-5 md:mt-6 text-sm md:text-base text-[#6E725F]/70 leading-[1.7]">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 md:mt-12">
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-4 text-sm bg-[#FAF8F5]/80 border border-[#A79F92]/30 text-[#6E725F] rounded-sm placeholder:text-[#A79F92] focus:outline-none focus:border-[#8D927B] transition-all duration-500"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-10 py-4 text-xs uppercase tracking-[0.2em] bg-[#6E725F] text-[#F3EEE8] rounded-sm overflow-hidden transition-all duration-500 hover:bg-[#6E725F]/90 disabled:opacity-50 font-medium"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </div>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-5 text-sm text-[#6E725F]"
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
