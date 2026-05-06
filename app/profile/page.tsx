"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Package, Heart, Settings, LogOut, ChevronRight, MapPin, CreditCard, Bell } from "lucide-react";
import { ProductCard } from "@/app/components/store/ProductCard";
import { StoreShell } from "@/app/components/store/StoreShell";
import { useAuth } from "@/app/context/auth-context";
import { useStore } from "@/app/context/store-context";
import { products } from "@/app/lib/products";

const orders = [
  {
    id: "WIW-2041",
    product: "Obsidian Drift Jacket",
    status: "Delivered",
    date: "16 Apr 2026",
    statusColor: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  {
    id: "WIW-1966",
    product: "Graphite Relaxed Tee",
    status: "Shipped",
    date: "Tracking active",
    statusColor: "text-[#EEA83B]",
    bgColor: "bg-[#EEA83B]/10",
  },
];

const menuItems = [
  { icon: MapPin, label: "Addresses", href: "#", description: "Manage delivery addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "#", description: "Saved cards & wallets" },
  { icon: Bell, label: "Notifications", href: "#", description: "Email & push preferences" },
  { icon: Settings, label: "Account Settings", href: "#settings", description: "Privacy & security" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { wishlist } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id)).slice(0, 3);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isLoading) {
    return (
      <StoreShell>
        <div className="flex items-center justify-center py-32">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#EEA83B] border-t-transparent" />
        </div>
      </StoreShell>
    );
  }

  if (!isAuthenticated) {
    return (
      <StoreShell>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="empty-state-premium mx-auto max-w-md py-20"
        >
          <div className="icon-wrapper">
            <User className="h-8 w-8 text-[#EEA83B]" strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-[#FDFCFA] mb-3">
            Sign in to continue
          </h2>
          <p className="text-[#FDFCFA]/60 text-sm mb-8 max-w-xs">
            Access your orders, wishlist, and account settings with your personal profile.
          </p>
          <Link
            href="/login"
            className="btn-premium"
          >
            Sign In
          </Link>
        </motion.div>
      </StoreShell>
    );
  }

  return (
    <StoreShell>
      <div className="space-y-6 md:space-y-8 py-4 md:py-6">
        {/* Profile Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card-luxury-dark p-6 md:p-8"
        >
          <div className="flex items-center gap-5">
            {user?.avatar ? (
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover border-2 border-[#EEA83B]/30"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#134B42]" />
              </div>
            ) : (
              <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#EEA83B]/20 to-[#CA763B]/10 border-2 border-[#EEA83B]/30">
                <User className="h-8 w-8 md:h-10 md:w-10 text-[#EEA83B]" strokeWidth={1.5} />
              </div>
            )}
            <div>
              <h1 className="font-serif text-xl md:text-2xl font-medium text-[#FDFCFA]">{user?.name}</h1>
              <p className="text-sm text-[#FDFCFA]/60 mt-1">{user?.email}</p>
              <p className="text-xs text-[#EEA83B] uppercase tracking-wider mt-2 font-semibold">Member since 2024</p>
            </div>
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-3 md:gap-4"
        >
          {[
            { icon: Package, label: "Orders", value: orders.length, href: "#orders" },
            { icon: Heart, label: "Wishlist", value: wishlist.length, href: "/wishlist" },
            { icon: Settings, label: "Settings", value: null, href: "#settings" },
          ].map((stat, index) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="card-luxury-dark flex flex-col items-center gap-3 p-4 md:p-6 group"
            >
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#EEA83B]/15 to-[#CA763B]/5 group-hover:from-[#EEA83B]/25 group-hover:to-[#CA763B]/15 transition-all duration-500">
                  <stat.icon className="h-5 w-5 text-[#EEA83B] group-hover:text-[#EEA83B] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                {stat.value !== null && stat.value > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#EEA83B] text-[10px] font-bold text-[#134B42]">
                    {stat.value}
                  </span>
                )}
              </div>
              <span className="text-xs text-[#FDFCFA]/80 group-hover:text-[#FDFCFA] transition-colors duration-300">{stat.label}</span>
            </Link>
          ))}
        </motion.section>

        {/* Recent Orders */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          id="orders"
          className="card-luxury-dark p-5 md:p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif text-lg md:text-xl font-medium text-[#FDFCFA]">Recent Orders</h2>
              <p className="text-xs text-[#FDFCFA]/50 mt-1">Track your purchases</p>
            </div>
            <Link href="#" className="text-xs text-[#EEA83B] hover:text-[#CA763B] transition-colors duration-300 uppercase tracking-wider font-semibold">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between rounded-xl border border-[#FDFCFA]/10 bg-[#FDFCFA]/[0.02] p-4 transition-all duration-300 hover:border-[#EEA83B]/30 hover:bg-[#FDFCFA]/[0.04] group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#EEA83B]/10 to-[#CA763B]/5 flex items-center justify-center">
                    <Package className="h-5 w-5 text-[#EEA83B]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#FDFCFA]">#{order.id}</p>
                    <p className="text-xs text-[#FDFCFA]/60 mt-0.5">{order.product}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`text-xs font-semibold ${order.statusColor} ${order.bgColor} px-2.5 py-1 rounded-full`}>
                      {order.status}
                    </p>
                    <p className="text-[10px] text-[#FDFCFA]/50 mt-1.5">{order.date}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#FDFCFA]/30 group-hover:text-[#EEA83B] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Saved Items */}
        {savedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-serif text-lg md:text-xl font-medium text-[#FDFCFA]">Saved Items</h2>
                <p className="text-xs text-[#FDFCFA]/50 mt-1">Your wishlist favorites</p>
              </div>
              <Link href="/wishlist" className="text-xs text-[#EEA83B] hover:text-[#CA763B] transition-colors duration-300 uppercase tracking-wider font-semibold">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
              {savedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Account Menu */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          id="settings"
          className="space-y-2"
        >
          <h2 className="font-serif text-lg font-medium text-[#FDFCFA] mb-4">Account</h2>
          {menuItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between rounded-xl border border-[#FDFCFA]/10 bg-[#FDFCFA]/[0.02] p-4 transition-all duration-300 hover:border-[#EEA83B]/30 hover:bg-[#FDFCFA]/[0.04] group"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#EEA83B]/10 to-[#CA763B]/5 group-hover:from-[#EEA83B]/20 group-hover:to-[#CA763B]/10 transition-all duration-500">
                  <item.icon className="h-4 w-4 text-[#EEA83B]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#FDFCFA] group-hover:text-[#EEA83B] transition-colors duration-300">{item.label}</p>
                  <p className="text-xs text-[#FDFCFA]/50">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-[#FDFCFA]/30 group-hover:text-[#EEA83B] group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          ))}
        </motion.section>

        {/* Sign Out */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-between rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm text-red-400 transition-all duration-300 hover:bg-red-500/15 hover:border-red-400/40 group"
          >
            <span className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/15 group-hover:bg-red-500/20 transition-colors duration-300">
                <LogOut className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <span className="font-medium">Sign Out</span>
            </span>
            <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </button>
        </motion.section>
      </div>
    </StoreShell>
  );
}
