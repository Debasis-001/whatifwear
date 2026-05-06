"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, isLoading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      router.push("/profile");
    }
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      router.push("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Back to Home */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
        <Link 
          href="/" 
          className="text-sm font-medium tracking-[0.25em] text-white hover:text-gold transition-colors"
        >
          WHAT IF WEAR
        </Link>
      </nav>

      <div className="flex min-h-screen">
        {/* Left - Editorial Image */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block lg:w-1/2 relative overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
            alt="Lifestyle fashion"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/60" />
          
          {/* Overlay Content */}
          <div className="absolute bottom-16 left-16 right-16 z-10">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Welcome Back</span>
            <h2 className="mt-4 font-serif text-4xl xl:text-5xl font-light text-white leading-tight">
              Continue Your
              <br />
              Style Journey
            </h2>
            <p className="mt-4 text-sm text-white/60 max-w-sm leading-relaxed">
              Sign in to access your wishlist, track orders, and unlock exclusive member benefits.
            </p>
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex items-center justify-center px-8 py-16 lg:px-16"
        >
          <div className="w-full max-w-md">
            <div className="text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-gold">{mode === "login" ? "Welcome Back" : "Join Us"}</span>
              <h1 className="mt-4 font-serif text-3xl md:text-4xl font-light text-white">
                {mode === "login" ? "Sign In" : "Create Account"}
              </h1>
              <p className="mt-3 text-sm text-white/50">
                {mode === "login" 
                  ? "Enter your details to continue shopping." 
                  : "Create an account to start your luxury journey."}
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="mt-8 flex rounded-lg border border-white/10 p-1">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 rounded-md py-2.5 text-xs uppercase tracking-wider transition-all ${
                  mode === "login" 
                    ? "bg-gold text-charcoal font-medium" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-md py-2.5 text-xs uppercase tracking-wider transition-all ${
                  mode === "signup" 
                    ? "bg-gold text-charcoal font-medium" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Social Login */}
            <div className="mt-8">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white hover:border-gold/40 hover:bg-white/10 transition-all disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background-dark px-4 text-white/40 tracking-wider">or continue with email</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold/50 transition-all"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold/50 transition-all"
                />
              </div>

              {mode === "login" && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-gold hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-gold px-5 py-3.5 text-sm font-medium uppercase tracking-wider text-charcoal transition-all hover:bg-gold/90 disabled:opacity-50"
              >
                {isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-white/40">
              By continuing, you agree to our{" "}
              <Link href="#" className="text-gold hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="#" className="text-gold hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
