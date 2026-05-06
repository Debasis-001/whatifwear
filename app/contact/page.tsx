"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Twitter, ArrowRight, Menu, X, Search, Heart as HeartIcon, User, ShoppingBag } from "lucide-react"
import { Footer } from "@/components/sections/footer"
import { useStore } from "@/app/context/store-context"
import { useAuth } from "@/app/context/auth-context"
import { SearchModal } from "@/components/search/search-modal"
import { CartPanel } from "@/components/cart/cart-panel"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
]

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "hello@whatifwear.com",
    subtext: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+91 98765 43210",
    subtext: "Mon - Sat, 10am - 7pm IST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Fashion Street",
    subtext: "Mumbai, Maharashtra 400001",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Monday - Saturday",
    subtext: "10:00 AM - 7:00 PM IST",
  },
]

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
]

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on all unworn items with original tags attached. Returns are free for all domestic orders.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! We ship to over 30 countries worldwide. International shipping typically takes 10-14 business days.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive an email with tracking information. You can also track your order in your account dashboard.",
  },
]

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  
  const { openSearch, wishlistCount, cartCount, openCart } = useStore()
  const { user, isAuthenticated } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("loading")
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setFormStatus("success")
    setFormData({ name: "", email: "", subject: "", message: "" })
    
    setTimeout(() => setFormStatus("idle"), 5000)
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#262626]">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Left - Nav Links (Desktop) */}
            <div className="hidden md:flex items-center gap-8 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] font-medium transition-colors duration-500 tracking-[0.15em] uppercase ${
                    link.href === "/contact" ? "text-[#C9A86C]" : "text-[#A3A3A3] hover:text-[#F5F5F5]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#F5F5F5] z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Center - Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-lg md:text-xl tracking-[0.25em] text-[#F5F5F5] hover:text-[#C9A86C] transition-colors duration-500">
              WHAT IF WEAR
            </Link>

            {/* Right - Icons */}
            <div className="hidden md:flex items-center gap-5 flex-1 justify-end">
              <button 
                onClick={openSearch}
                className="p-2.5 rounded-full text-[#A3A3A3] hover:text-[#C9A86C] hover:bg-[#1A1A1A] transition-all duration-300" 
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
              <Link 
                href="/wishlist" 
                className="relative p-2.5 rounded-full text-[#A3A3A3] hover:text-[#C9A86C] hover:bg-[#1A1A1A] transition-all duration-300" 
                aria-label="Wishlist"
              >
                <HeartIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 bg-[#C9A86C] text-[#0D0D0D] text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>
              <Link 
                href="/profile" 
                className="relative p-2.5 rounded-full text-[#A3A3A3] hover:text-[#C9A86C] hover:bg-[#1A1A1A] transition-all duration-300 group"
                aria-label="Profile"
              >
                {isAuthenticated && user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover border-2 border-transparent group-hover:border-[#C9A86C] transition-all duration-500"
                  />
                ) : (
                  <div className="p-0.5 rounded-full border border-[#A3A3A3]/40 group-hover:border-[#C9A86C] transition-all duration-500">
                    <User className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                )}
              </Link>
            </div>

            {/* Mobile Icons */}
            <div className="flex md:hidden items-center gap-3">
              <button 
                onClick={openSearch}
                className="p-2 rounded-full text-[#A3A3A3] hover:text-[#C9A86C] transition-colors duration-300" 
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <Link 
                href="/wishlist" 
                className="relative p-2 rounded-full text-[#A3A3A3] hover:text-[#C9A86C] transition-colors duration-300" 
                aria-label="Wishlist"
              >
                <HeartIcon className="h-5 w-5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden bg-[#1A1A1A]/98 backdrop-blur-xl border-t border-[#262626]"
          >
            <div className="px-6 py-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block py-3 transition-colors duration-300 text-sm tracking-[0.15em] uppercase ${
                    link.href === "/contact" ? "text-[#C9A86C]" : "text-[#A3A3A3] hover:text-[#F5F5F5]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=80"
          alt="Contact WHAT IF WEAR"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0D0D0D]/70" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#C9A86C] mb-6"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#F5F5F5] leading-[1.1]"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-4 md:mt-6 max-w-md text-sm md:text-base text-[#A3A3A3]"
          >
            We&apos;d love to hear from you. Let&apos;s start a conversation.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-[#1A1A1A] py-16 md:py-24 border-y border-[#262626]">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-[#0D0D0D] border border-[#262626] p-6 md:p-8 transition-all duration-500 hover:border-[#C9A86C]/30"
              >
                <div className="mb-4 inline-flex p-3 rounded-full border border-[#C9A86C]/20 bg-[#C9A86C]/5 group-hover:bg-[#C9A86C]/10 transition-colors duration-500">
                  <info.icon className="h-5 w-5 text-[#C9A86C]" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#F5F5F5] mb-2">
                  {info.title}
                </h3>
                <p className="text-sm font-medium text-[#F5F5F5]/80">{info.details}</p>
                <p className="text-xs text-[#A3A3A3] mt-1">{info.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="bg-[#0D0D0D] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9A86C]">Send A Message</span>
              <h2 className="mt-4 font-serif text-2xl md:text-3xl lg:text-4xl font-light text-[#F5F5F5] mb-8">
                We&apos;re Here To Help
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-2.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-[#1A1A1A] border border-[#262626] px-4 py-3.5 text-[#F5F5F5] placeholder-[#666666] text-sm focus:outline-none focus:border-[#C9A86C] transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-2.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-[#1A1A1A] border border-[#262626] px-4 py-3.5 text-[#F5F5F5] placeholder-[#666666] text-sm focus:outline-none focus:border-[#C9A86C] transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-2.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full bg-[#1A1A1A] border border-[#262626] px-4 py-3.5 text-[#F5F5F5] placeholder-[#666666] text-sm focus:outline-none focus:border-[#C9A86C] transition-colors duration-300"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-2.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-[#1A1A1A] border border-[#262626] px-4 py-3.5 text-[#F5F5F5] placeholder-[#666666] text-sm focus:outline-none focus:border-[#C9A86C] transition-colors duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="bg-[#C9A86C] text-[#0D0D0D] px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:bg-[#D4AF37] disabled:opacity-50 w-full sm:w-auto flex items-center justify-center gap-3"
                >
                  {formStatus === "loading" ? (
                    <span className="flex items-center gap-3">
                      <span className="h-4 w-4 border-2 border-[#0D0D0D]/30 border-t-[#0D0D0D] rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : formStatus === "success" ? (
                    "Message Sent!"
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>

                {formStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#C9A86C]"
                  >
                    Thank you! We&apos;ll get back to you within 24 hours.
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Social & Follow Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col"
            >
              {/* Map Placeholder */}
              <div className="relative aspect-video lg:aspect-auto lg:flex-1 overflow-hidden mb-8 border border-[#262626]">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                  alt="Our Location"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#0D0D0D]/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[#F5F5F5]">
                    <MapPin className="h-10 w-10 mx-auto mb-3 text-[#C9A86C]" strokeWidth={1.5} />
                    <p className="font-serif text-lg">Mumbai, India</p>
                    <p className="text-sm text-[#A3A3A3] mt-1">123 Fashion Street</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-[#1A1A1A] border border-[#262626] p-6 md:p-8">
                <h3 className="font-serif text-lg font-medium text-[#F5F5F5] mb-4">
                  Follow Us
                </h3>
                <p className="text-sm text-[#A3A3A3] mb-6">
                  Stay connected for exclusive updates, behind-the-scenes content, and style inspiration.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="p-3 bg-[#0D0D0D] border border-[#262626] text-[#A3A3A3] hover:text-[#C9A86C] hover:border-[#C9A86C]/40 hover:bg-[#C9A86C]/5 transition-all duration-500"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" strokeWidth={1.5} />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#1A1A1A] py-20 md:py-28 border-t border-[#262626]">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#C9A86C]">FAQs</span>
            <h2 className="mt-4 font-serif text-2xl md:text-3xl lg:text-4xl font-light text-[#F5F5F5]">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-[#262626] overflow-hidden bg-[#0D0D0D]"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1A1A1A]/50 transition-colors duration-300"
                >
                  <span className="font-medium text-[#F5F5F5] pr-4">{faq.question}</span>
                  <ArrowRight 
                    className={`h-4 w-4 text-[#C9A86C] flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === index ? "rotate-90" : ""
                    }`} 
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedFaq === index ? "auto" : 0,
                    opacity: expandedFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm text-[#A3A3A3] leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <SearchModal />
      <CartPanel />

      {/* Floating Cart Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={openCart}
        className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-50 bg-[#C9A86C] text-[#0D0D0D] p-4 md:p-5 rounded-full shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-[#D4AF37]"
        aria-label="Shopping Cart"
      >
        <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#0D0D0D] text-[#C9A86C] text-[10px] font-medium w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </motion.button>
    </div>
  )
}
