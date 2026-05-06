"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Image from "next/image"

const aboutLinks = [
  { name: "Our Story", href: "#" },
  { name: "Sustainability", href: "#" },
  { name: "Careers", href: "#" },
]

const customerCareLinks = [
  { name: "Shipping and delivery", href: "#" },
  { name: "Terms and conditions", href: "#" },
  { name: "Privacy policy", href: "#" },
  { name: "Return policy", href: "#" },
  { name: "FAQ", href: "#" },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-8 md:px-12 py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-2 gap-10 md:gap-12 md:grid-cols-4"
        >
          {/* About Us */}
          <div>
            <h3 className="font-serif text-sm md:text-base font-medium mb-5 md:mb-6 text-gold uppercase tracking-[0.2em]">
              About Us
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm text-ivory/60 hover:text-gold transition-colors duration-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-serif text-sm md:text-base font-medium mb-5 md:mb-6 text-gold uppercase tracking-[0.2em]">
              Customer Care
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {customerCareLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm text-ivory/60 hover:text-gold transition-colors duration-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-serif text-sm md:text-base font-medium mb-5 md:mb-6 text-gold uppercase tracking-[0.2em]">
              Follow Us
            </h3>
            <p className="text-xs md:text-sm text-ivory/60 mb-5 md:mb-6 leading-[1.7]">
              For exclusive news and updates
            </p>
            <div className="flex gap-5">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-ivory/50 hover:text-gold transition-colors duration-500"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" strokeWidth={1.25} />
                </Link>
              ))}
            </div>
          </div>

          {/* Download Apps */}
          <div>
            <h3 className="font-serif text-sm md:text-base font-medium mb-5 md:mb-6 text-gold uppercase tracking-[0.2em]">
              Download Our Apps
            </h3>
            <div className="flex flex-col gap-4">
              <Link
                href="#"
                className="inline-flex items-center bg-ivory/5 hover:bg-ivory/10 transition-all duration-500 rounded px-3 py-2.5 w-fit"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on App Store"
                  width={100}
                  height={30}
                  className="h-7 md:h-8 w-auto"
                />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center bg-ivory/5 hover:bg-ivory/10 transition-all duration-500 rounded px-3 py-2.5 w-fit"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  width={100}
                  height={30}
                  className="h-7 md:h-8 w-auto"
                />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-14 md:mt-18 pt-8 border-t border-ivory/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="font-serif text-lg tracking-[0.25em] text-gold">
              WHAT IF WEAR
            </Link>
            <p className="text-center text-xs text-ivory/40 tracking-[0.1em]">
              Copyright 2026 WHAT IF WEAR. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
