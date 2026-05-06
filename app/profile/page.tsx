"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Package, Heart, Settings, LogOut, ChevronRight } from "lucide-react";
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
    statusColor: "text-green-400",
  },
  {
    id: "WIW-1966",
    product: "Graphite Relaxed Tee",
    status: "Shipped",
    date: "Tracking active",
    statusColor: "text-gold",
  },
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
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      </StoreShell>
    );
  }

  if (!isAuthenticated) {
    return (
      <StoreShell>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-md py-16 text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <User className="h-8 w-8 text-white/40" />
          </div>
          <h2 className="font-serif text-2xl font-light text-white">
            Sign in to view your profile
          </h2>
          <p className="mt-3 text-white/60">
            Access your orders, wishlist, and account settings
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-gold px-8 py-3 text-sm font-medium uppercase tracking-wider text-charcoal transition hover:bg-gold/90"
          >
            Sign In
          </Link>
        </motion.div>
      </StoreShell>
    );
  }

  return (
    <StoreShell>
      <div className="space-y-6">
        {/* Profile Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
        >
          <div className="flex items-center gap-4">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-gold/30"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 border-2 border-gold/30">
                <User className="h-7 w-7 text-gold" />
              </div>
            )}
            <div>
              <h1 className="font-serif text-xl font-medium text-white">{user?.name}</h1>
              <p className="text-sm text-white/60">{user?.email}</p>
            </div>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { icon: Package, label: "Orders", href: "#orders", count: orders.length },
            { icon: Heart, label: "Wishlist", href: "/wishlist", count: wishlist.length },
            { icon: Settings, label: "Settings", href: "#settings" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-gold/30 hover:bg-white/[0.04]"
            >
              <div className="relative">
                <item.icon className="h-5 w-5 text-white/60" strokeWidth={1.5} />
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-medium text-charcoal">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="text-xs text-white/80">{item.label}</span>
            </Link>
          ))}
        </motion.section>

        {/* Orders */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          id="orders"
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-medium text-white">Recent Orders</h2>
            <Link href="#" className="text-xs text-gold hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-gold/20"
              >
                <div>
                  <p className="text-sm font-medium text-white">#{order.id}</p>
                  <p className="text-xs text-white/50">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-medium ${order.statusColor}`}>{order.status}</p>
                  <p className="text-xs text-white/40">{order.date}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/30" />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Saved Items */}
        {savedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-medium text-white">Saved Items</h2>
              <Link href="/wishlist" className="text-xs text-gold hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {savedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Account Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          id="settings"
          className="space-y-2"
        >
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-between rounded-xl border border-red-400/30 bg-red-500/5 px-5 py-4 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <span className="flex items-center gap-3">
              <LogOut className="h-4 w-4" />
              Sign Out
            </span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.section>
      </div>
    </StoreShell>
  );
}
