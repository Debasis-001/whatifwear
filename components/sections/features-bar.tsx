"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Shield, Truck, RotateCcw, MapPin, ChevronDown } from "lucide-react"
import { useState } from "react"

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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className="bg-background py-20 md:py-24 lg:py-28 border-y border-border/30">
      <div className="mx-auto max-w-7xl px-8 md:px-12">
        {/* Desktop View - 4 columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid md:grid-cols-4 md:gap-8 lg:gap-12"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="text-center px-4"
            >
              <div className="mb-5 md:mb-6 flex justify-center">
                <feature.icon className="h-8 w-8 md:h-9 md:w-9 text-foreground" strokeWidth={1} />
              </div>
              <h3 className="font-serif text-base md:text-lg lg:text-xl font-medium text-foreground italic">
                {feature.title}
              </h3>
              <p className="mt-3 md:mt-4 text-xs md:text-sm text-muted-foreground leading-[1.7] max-w-[200px] mx-auto">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View - Accordion Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="md:hidden space-y-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="border border-border/30 rounded-lg overflow-hidden bg-card/30"
            >
              <button
                onClick={() => toggleExpand(index)}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-card/50 transition-colors duration-500"
              >
                <div className="flex items-center gap-5">
                  <feature.icon className="h-5 w-5 text-foreground" strokeWidth={1.25} />
                  <h3 className="font-serif text-sm font-medium text-foreground italic">
                    {feature.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 pt-0 text-xs text-muted-foreground leading-[1.7]">
                      {feature.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
