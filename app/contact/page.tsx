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
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-charcoal/10">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Left - Nav Links (Desktop) */}
            <div className="hidden md:flex items-center gap-8 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] font-medium transition-colors duration-500 tracking-[0.15em] uppercase ${
                    link.href === "/contact" ? "text-gold" : "text-charcoal/70 hover:text-gold"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-charcoal z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Center - Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-lg md:text-xl tracking-[0.25em] text-charcoal">
              WHAT IF WEAR
            </Link>

            {/* Right - Icons */}
            <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
              <button 
                onClick={openSearch}
                className="text-charcoal/70 hover:text-gold transition-colors duration-500" 
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <Link 
                href="/wishlist" 
                className="relative text-charcoal/70 hover:text-gold transition-colors duration-500" 
                aria-label="Wishlist"
              >
                <HeartIcon className="h-5 w-5" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link 
                href="/profile" 
                className="relative text-charcoal/70 hover:text-gold transition-all duration-500 group"
                aria-label="Profile"
              >
                {isAuthenticated && user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover border-2 border-transparent group-hover:border-gold transition-all duration-500"
                  />
                ) : (
                  <div className="p-1 rounded-full border border-charcoal/20 group-hover:border-gold/60 transition-all duration-500">
                    <User className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                )}
              </Link>
            </div>

            {/* Mobile Icons */}
            <div className="flex md:hidden items-center gap-4">
              <button 
                onClick={openSearch}
                className="text-charcoal/70 hover:text-gold transition-colors duration-500" 
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <Link 
                href="/wishlist" 
                className="relative text-charcoal/70 hover:text-gold transition-colors duration-500" 
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
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden bg-ivory/98 backdrop-blur-md border-t border-charcoal/10"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block py-3 transition-colors duration-500 text-sm tracking-[0.12em] uppercase ${
                    link.href === "/contact" ? "text-gold" : "text-charcoal/70 hover:text-gold"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-gold mb-6"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.1]"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-4 md:mt-6 max-w-md text-sm md:text-base text-white/70"
          >
            We&apos;d love to hear from you. Let&apos;s start a conversation.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-xl border border-charcoal/10 hover:border-gold/30 hover:shadow-lg transition-all duration-500 group"
              >
                <div className="mb-4 inline-flex p-3 rounded-full border border-gold/30 bg-gold/5 group-hover:bg-gold/10 transition-colors duration-500">
                  <info.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                  {info.title}
                </h3>
                <p className="text-sm font-medium text-charcoal/80">{info.details}</p>
                <p className="text-xs text-charcoal/50 mt-1">{info.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="bg-background-dark py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Send A Message</span>
              <h2 className="mt-4 font-serif text-2xl md:text-3xl lg:text-4xl font-light text-foreground-light mb-8">
                We&apos;re Here To Help
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-all duration-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-all duration-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-all duration-500"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-all duration-500 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full sm:w-auto px-10 py-4 bg-gold text-charcoal rounded-lg text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500 hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(201,169,98,0.3)] disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {formStatus === "loading" ? (
                    <>
                      <span className="h-4 w-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                      Sending...
                    </>
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
                    className="text-sm text-gold"
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
              <div className="relative aspect-video lg:aspect-auto lg:flex-1 rounded-xl overflow-hidden mb-8">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                  alt="Our Location"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="h-10 w-10 mx-auto mb-3 text-gold" strokeWidth={1.5} />
                    <p className="font-serif text-lg">Mumbai, India</p>
                    <p className="text-sm text-white/70 mt-1">123 Fashion Street</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/5 rounded-xl p-6 md:p-8 border border-white/10">
                <h3 className="font-serif text-lg font-medium text-foreground-light mb-4">
                  Follow Us
                </h3>
                <p className="text-sm text-white/60 mb-6">
                  Stay connected for exclusive updates, behind-the-scenes content, and style inspiration.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="p-3 bg-white/5 rounded-full border border-white/15 text-white/60 hover:text-gold hover:border-gold/50 hover:bg-gold/10 transition-all duration-500"
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
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold">FAQs</span>
            <h2 className="mt-4 font-serif text-2xl md:text-3xl lg:text-4xl font-light text-charcoal">
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
                className="border border-charcoal/10 rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-charcoal/[0.02] transition-colors duration-300"
                >
                  <span className="font-medium text-charcoal pr-4">{faq.question}</span>
                  <ArrowRight 
                    className={`h-4 w-4 text-gold flex-shrink-0 transition-transform duration-300 ${
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
                  <p className="px-6 pb-5 text-sm text-charcoal/70 leading-relaxed">
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
        className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-50 bg-gold text-charcoal p-4 md:p-5 rounded-full shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(201,169,98,0.4)]"
        aria-label="Shopping Cart"
      >
        <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-charcoal text-gold text-[10px] font-medium w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </motion.button>
    </div>
  )
}
