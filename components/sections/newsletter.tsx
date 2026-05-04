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
    <section className="bg-secondary py-20 md:py-24 lg:py-28">
      <div className="mx-auto max-w-2xl px-8 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-foreground uppercase tracking-[0.2em]">
            Our Newsletter
          </h2>
          <p className="mt-5 md:mt-6 text-sm md:text-base text-muted-foreground leading-[1.7]">
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
                className="flex-1 px-5 py-4 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/30 transition-all duration-500"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative px-10 py-4 text-xs uppercase tracking-[0.2em] bg-foreground text-background overflow-hidden transition-all duration-700 disabled:opacity-50"
              >
                <span className="relative z-10">
                  {status === "loading" ? "..." : "Subscribe"}
                </span>
              </button>
            </div>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-5 text-sm text-green-700"
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
