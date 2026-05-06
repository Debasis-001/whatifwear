"use client"

import { motion } from "framer-motion"
import { Shield, Truck, RotateCcw, MapPin } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Shop with confidence knowing that your transactions are safeguarded.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Shopping with no extra charges — experience the liberty of complimentary shipping.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "With our hassle-free Easy Returns, changing your mind has never been easier.",
  },
  {
    icon: MapPin,
    title: "Order Tracking",
    description: "Stay in the loop with our Order Tracking feature — from checkout to your doorway.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function FeaturesBar() {
  return (
    <section className="hidden md:block bg-ivory py-20 md:py-24 lg:py-28 border-y border-charcoal/10">
      <div className="mx-auto max-w-7xl px-8 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 md:gap-8 lg:gap-12"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="text-center px-4"
            >
              <div className="mb-5 md:mb-6 flex justify-center">
                <div className="p-3 rounded-full border border-gold/30 bg-gold/5">
                  <feature.icon className="h-6 w-6 md:h-7 md:w-7 text-gold" strokeWidth={1.25} />
                </div>
              </div>
              <h3 className="font-serif text-base md:text-lg lg:text-xl font-medium text-charcoal">
                {feature.title}
              </h3>
              <p className="mt-3 md:mt-4 text-xs md:text-sm text-charcoal/60 leading-[1.7] max-w-[200px] mx-auto">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
