import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {ArrowRight,Phone,ShieldCheck,Leaf,Award,Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import heroImg from "@/assets/hero-pharma.jpg";
import productImg from "@/assets/hero-product.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
  <img
    src={heroImg}
    alt=""
    className="w-full h-full object-cover"
    width={1920}
    height={1280}
  />

  {/* SIMPLE ORANGE OVERLAY */}
  <div
    className="absolute inset-0"
    style={{
      background: "rgba(234, 88, 12, 0.72)",
    }}
  />
</div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-1/4 right-[15%] w-40 h-40 rounded-full bg-orange-300 opacity-25 blur-3xl animate-float" />

        <div className="absolute bottom-1/4 right-[30%] w-56 h-56 rounded-full bg-yellow-300 opacity-25 blur-3xl animate-float-slow" />

        <div className="absolute top-1/3 left-[5%] w-24 h-24 rounded-full bg-orange-200/20 blur-2xl animate-float-slow" />

        {/* particles */}
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-yellow-200/70"
            style={{
              top: `${(i * 53) % 90}%`,
              left: `${(i * 37) % 95}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center py-20">

        {/* LEFT */}
        <div className="text-white">

          {/* TOP TAG */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-yellow-200/40 shadow-md mb-6"
          >
            <Leaf className="w-4 h-4 text-yellow-200" />

            <span className="text-xs font-semibold tracking-wider uppercase text-yellow-100">
              Premium Ayurvedic & Allopathic Care
            </span>
          </motion.div>

          {/* HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            Nature&apos;s Power.{" "}

            <span className="bg-gradient-to-r from-orange-100 via-yellow-200 to-orange-300 bg-clip-text text-transparent animate-gradient">
              Modern Healing.
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg text-white/85 max-w-xl leading-relaxed"
          >
            Adhya Pharmex Healthcare delivers premium medicines from 50+ trusted brands — blending Ayurvedic wisdom with modern pharmacology, shipped to 400+ retailers nationwide.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-3"
          >

            {/* GREEN BUTTON */}
            <Button
              asChild
              size="xl"
              variant="hero"
              className="animate-pulse-glow shadow-glow bg-gradient-to-r from-[#22c55e] via-[#16a34a] to-[#15803d] text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.45)] border-0"
            >
              <Link to="/products">
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            {/* GLASS BUTTON */}
            <Button
              asChild
              size="xl"
              // variant="glass"
              className="animate-pulse-glow shadow-glow bg-white text-orange-500 border-white/30 hover:text-orange-400  hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.45)] border-0"
            >
              <Link to="/contact">
                <Phone className="w-4 h-4" />
                Request a Call Back
              </Link>
            </Button>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex flex-wrap gap-8 text-sm"
          >
            {[
              { v: "8000+", l: "Products", icon: ShieldCheck },
              { v: "50+", l: "Brands", icon: Award },
              { v: "400+", l: "Retailers", icon: Sparkles },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-yellow-200/15 border border-yellow-200/30 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-yellow-100" />
                </div>

                <div>
                  <div className="text-2xl font-bold text-yellow-100">
                    {s.v}
                  </div>

                  <div className="text-white/70 text-xs uppercase tracking-wider">
                    {s.l}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative hidden lg:flex justify-center items-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >

            {/* HALO */}
            <div className="absolute inset-0 -m-10 rounded-full bg-gradient-to-br from-yellow-200/40 to-orange-300/30 blur-3xl animate-pulse-glow" />

            {/* PRODUCT CARD */}
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-[380px] xl:w-[440px] rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-elegant"
            >

              {/* BADGE */}
              <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-green-500 text-white text-xs font-bold shadow-glow">
                #1 Bestseller
              </div>

              <img
                src={productImg}
                alt="Adhya Pharmex premium herbal medicine"
                width={1024}
                height={1024}
                className="w-full h-auto drop-shadow-2xl"
              />

              <div className="mt-4 text-center">

                <div className="text-xs uppercase tracking-[0.3em] text-yellow-100 font-bold">
                  Adhya Pharmex Pharma
                </div>

                <div className="text-white text-xl font-bold mt-1">
                  Premium Herbal Tonic
                </div>

                <div className="flex items-center justify-center gap-3 mt-2">

                  <span className="text-2xl font-bold text-yellow-100">
                    ₹449
                  </span>

                  <span className="text-sm text-white/50 line-through">
                    ₹599
                  </span>

                </div>
              </div>
            </motion.div>

            {/* FLOATING BADGE 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-8 top-12 px-4 py-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 text-white shadow-lg"
            >
              <div className="flex items-center gap-2">

                <ShieldCheck className="w-5 h-5 text-yellow-100" />

                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/70">
                    Certified
                  </div>

                  <div className="text-sm font-bold">
                    WHO-GMP
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FLOATING BADGE 2 */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-6 bottom-16 px-4 py-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 text-white shadow-lg"
            >
              <div className="flex items-center gap-2">

                <Leaf className="w-5 h-5 text-yellow-100" />

                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/70">
                    100% Natural
                  </div>

                  <div className="text-sm font-bold">
                    Ayurvedic
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}