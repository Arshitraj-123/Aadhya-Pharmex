import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  FlaskConical, 
  ShieldCheck, 
  Stethoscope, 
  ChevronRight, 
  Microscope,
  TrendingUp,
  Users,
  Link
} from 'lucide-react';

export function PharmaAuth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin();
  };

  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] font-sans">
      
      {/* LEFT PANEL - Branded Pharma Section */}
      <div className="relative hidden w-1/2 flex-col justify-center overflow-hidden bg-brand-dark p-12 text-white lg:flex">
        {/* Replace the Vertex Logo text with Aadhya */}
        <div className="absolute top-8 left-12 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-status-success-solid shadow-lg">
                <Link className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wide text-white">Aadhya Pharmex</span>
              <span className="text-xs text-brand-light">Distribution DMS v1.1</span>
            </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-teal-400/10 blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative z-10 w-full max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {!isLogin ? (
              <motion.div
                key="register-content"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h1 className="mb-4 text-5xl font-bold leading-tight">
                  Streamline Your <br /> Pharma Distribution
                </h1>
                <p className="mb-12 text-lg text-slate-300">
                  Take complete control of your inventory, deliveries, and compliance with our intelligent distribution management system.
                </p>

                {/* Animated Mock Dashboard for Register State */}
                <div className="relative w-full rounded-xl bg-white/10 p-6 backdrop-blur-md border border-white/20 shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-status-success-solid" />
                      <span className="font-semibold text-white">Distribution Overview</span>
                    </div>
                  </div>
                  
                  {/* Floating Badges */}
                  {/* Flies in from the bottom left */}
                  <FloatingBadge 
                    icon={<Microscope className="h-4 w-4 text-blue-600" />} 
                    text="Live Inventory" 
                    delay={0.2} 
                    startX={-80}
                    startY={60}
                    className="-left-12 top-10" 
                  />
                  {/* Flies in from the top right */}
                  <FloatingBadge 
                    icon={<ShieldCheck className="h-4 w-4 text-green-600" />} 
                    text="GST Compliant" 
                    delay={0.6} 
                    startX={80}
                    startY={-60}
                    className="-right-16 top-20" 
                  />
                  {/* Flies in from straight below */}
                  <FloatingBadge 
                    icon={<Users className="h-4 w-4 text-rose-600" />} 
                    text="Retailer Network" 
                    delay={0.4} 
                    startX={0}
                    startY={100}
                    className="-left-8 bottom-10" 
                  />

                  {/* Mock Chart Area */}
                  <div className="flex h-32 items-end gap-3 border-b border-white/20 pb-4">
                    {[40, 70, 45, 90, 65, 80].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="w-full rounded-t-sm bg-teal-400/80"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login-content"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h1 className="mb-4 text-5xl font-bold leading-tight">
                  Manage Operations <br /> Efficiently
                </h1>
                <p className="mb-12 text-lg text-slate-300">
                  From stock allocation to real-time delivery tracking, optimize your supply chain and maximize fulfillment rates.
                </p>

                {/* Alternate Layout for Login State */}
                <div className="relative w-full rounded-xl bg-white/5 p-6 backdrop-blur-md border border-white/10 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-white/10 p-4 border border-white/5">
                      <Users className="h-6 w-6 mb-2 text-status-success-solid" />
                      <div className="text-2xl font-bold">1.2k</div>
                      <div className="text-sm text-slate-300">Active Retailers</div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-4 border border-white/5">
                      <TrendingUp className="h-6 w-6 mb-2 text-status-success-solid" />
                      <div className="text-2xl font-bold">98.2%</div>
                      <div className="text-sm text-slate-300">Delivery Success</div>
                    </div>
                  </div>
                   <FloatingBadge 
                    icon={<FlaskConical className="h-4 w-4 text-purple-600" />} 
                    text="Dispatch Control" 
                    delay={0.5} 
                    startX={50}
                    startY={-50}
                    className="-right-10 -top-6" 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="absolute bottom-8 left-12 text-sm text-teal-100/50">
          © Aadhya Pharmex 2026. All Rights Reserved
        </div>
      </div>

      {/* RIGHT PANEL - Auth Form */}
      <div 
        className="relative flex w-full flex-col items-center justify-center p-8 lg:w-1/2"
        style={{
          backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      >
        <motion.div 
          layout
          className="w-full max-w-md rounded-2xl bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
        >
          <AnimatePresence mode="wait">
            {!isLogin ? (
              <motion.div
                key="register-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-dark text-status-success-solid shadow-md">
                    <Link className="h-7 w-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Create Aadhya Account</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Drive efficiency with intelligent inventory and delivery tracking
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Full name</label>
                    <input
                      type="text"
                      placeholder="Amit Kumar"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      placeholder="amit.kumar@aadhyapharmex.com"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                    <input
                      type="password"
                      placeholder="Create your password"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <button className="mt-6 w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]">
                    Sign Up
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-dark text-status-success-solid shadow-md">
                    <Link className="h-7 w-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Sign in to access your distribution dashboard and operations
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700">Password</label>
                      <button type="button" className="text-xs font-semibold text-teal-700 hover:text-teal-800">
                        Forgot Password?
                      </button>
                    </div>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <button className="mt-6 w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]">
                    Sign In
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Logins - Shared between both states */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:shadow-sm">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>

          {/* Toggle Form Button */}
          <div className="mt-8 flex justify-center border-t border-slate-100 pt-8">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="group flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-400">
          By signing up, you agree to our <br />
          <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}

// Updated Subcomponent: Handles "Fly-In" entrance AND continuous floating
function FloatingBadge({ icon, text, delay, className, startX = 0, startY = 50 }) {
  return (
    <motion.div
      // 1. The Entrance Animation (Fly In & Snap to Chart)
      initial={{ opacity: 0, x: startX, y: startY, scale: 0.5 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.7, 
        delay: delay, 
        type: "spring", 
        bounce: 0.4 
      }}
      className={`absolute z-20 ${className}`}
    >
      {/* 2. The Continuous Animation (Subtle Bobbing after landing) */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ 
          repeat: Infinity, 
          duration: 4, 
          ease: "easeInOut", 
          delay: delay + 0.8 // Start bobbing ONLY after it lands
        }}
        className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 shadow-xl border border-slate-100"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-50 text-[#27374D]">
          {icon}
        </div>
        <span className="font-semibold text-slate-700 text-sm">{text}</span>
      </motion.div>
    </motion.div>
  );
}
