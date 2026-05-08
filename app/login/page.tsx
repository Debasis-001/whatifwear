"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/auth-context";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, isLoading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-[#134B42] via-[#80917D] to-[#134B42]">
      {/* Back to Home */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-10 py-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-[#FDFCFA]/80 hover:text-[#EEA83B] transition-all duration-300 hover:translate-x-[-4px]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          <span className="font-serif tracking-[0.25em]">WHAT IF WEAR</span>
        </Link>
      </nav>

      <div className="flex min-h-screen">
        {/* Left - Editorial Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block lg:w-1/2 relative overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
            alt="Lifestyle fashion"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Subtle gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#134B42]/40 via-transparent to-[#134B42]/60" />
          
          {/* Overlay Content */}
          <div className="absolute bottom-16 left-12 right-12 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#EEA83B] font-semibold">Welcome Back</span>
              <h2 className="mt-5 font-serif text-4xl xl:text-5xl font-light text-[#FDFCFA] leading-[1.15] drop-shadow-lg">
                Continue Your
                <br />
                <span className="italic">Style Journey</span>
              </h2>
              <p className="mt-5 text-sm text-[#FDFCFA]/80 max-w-sm leading-[1.8]">
                Sign in to access your wishlist, track orders, and unlock exclusive member benefits.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex items-center justify-center px-6 py-20 lg:px-16"
        >
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center lg:text-left">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[10px] uppercase tracking-[0.4em] text-[#EEA83B] font-semibold"
              >
                {mode === "login" ? "Welcome Back" : "Join Us"}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 font-serif text-3xl md:text-4xl font-light text-[#FDFCFA]"
              >
                {mode === "login" ? "Sign In" : "Create Account"}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-3 text-sm text-[#FDFCFA]/70 leading-relaxed"
              >
                {mode === "login" 
                  ? "Enter your details to continue shopping." 
                  : "Create an account to start your luxury journey."}
              </motion.p>
            </div>

            {/* Mode Toggle */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex rounded-xl border border-[#FDFCFA]/15 p-1.5 bg-[#FDFCFA]/[0.03]"
            >
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 rounded-lg py-3 text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
                  mode === "login" 
                    ? "bg-[#EEA83B] text-[#134B42] font-bold shadow-lg" 
                    : "text-[#FDFCFA]/60 hover:text-[#FDFCFA]"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-lg py-3 text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
                  mode === "signup" 
                    ? "bg-[#EEA83B] text-[#134B42] font-bold shadow-lg" 
                    : "text-[#FDFCFA]/60 hover:text-[#FDFCFA]"
                }`}
              >
                Sign Up
              </button>
            </motion.div>

            {/* Social Login */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#FDFCFA]/15 bg-[#FDFCFA]/[0.03] px-5 py-4 text-sm text-[#FDFCFA] hover:border-[#EEA83B]/40 hover:bg-[#FDFCFA]/[0.06] transition-all duration-500 disabled:opacity-50 hover:scale-[1.02]"
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
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="relative my-8"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#FDFCFA]/15"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gradient-to-r from-[#134B42] via-[#80917D] to-[#134B42] px-5 text-[#FDFCFA]/50 tracking-[0.2em]">
                  or continue with email
                </span>
              </div>
            </motion.div>

            {/* Email Form */}
            <motion.form 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onSubmit={handleSubmit} 
              className="space-y-5"
            >
              {mode === "signup" && (
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#FDFCFA]/60 mb-2.5 font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="input-luxury"
                  />
                </div>
              )}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#FDFCFA]/60 mb-2.5 font-semibold">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="input-luxury"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#FDFCFA]/60 mb-2.5 font-semibold">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="input-luxury pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FDFCFA]/50 hover:text-[#EEA83B] transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                    ) : (
                      <Eye className="h-4 w-4" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {mode === "login" && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-[#EEA83B] hover:text-[#CA763B] transition-colors duration-300">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-premium w-full mt-6"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="h-4 w-4 border-2 border-[#134B42]/30 border-t-[#134B42] rounded-full animate-spin" />
                    Please wait...
                  </span>
                ) : (
                  mode === "login" ? "Sign In" : "Create Account"
                )}
              </button>
            </motion.form>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-10 text-center text-[10px] text-[#FDFCFA]/50 leading-relaxed"
            >
              By continuing, you agree to our{" "}
              <Link href="#" className="text-[#EEA83B] hover:text-[#CA763B] transition-colors duration-300">Terms of Service</Link>
              {" "}and{" "}
              <Link href="#" className="text-[#EEA83B] hover:text-[#CA763B] transition-colors duration-300">Privacy Policy</Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
