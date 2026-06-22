import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Pill } from "lucide-react";
import type { Brand } from "@/data/brands";

export function BrandCard({ brand, index = 0 }: { brand: Brand; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.06 }}
      whileHover={{ y: -10, scale: 1.03 }}
    >
      <Link
        to="/brands/$slug"
        params={{ slug: brand.slug }}
        className="group relative block bg-card rounded-3xl p-6 border border-border/50 shadow-md hover:shadow-elegant transition-smooth overflow-hidden"
      >
        <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-30 blur-xl transition-smooth`} />
        <div className="relative flex flex-col items-center text-center">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
            className={`w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-4 ring-4 ring-background group-hover:ring-primary/30 transition-smooth`}
          >
            <div className={`w-full h-full rounded-full bg-gradient-to-br ${brand.color} p-[3px]`}>
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className={`text-2xl font-extrabold tracking-tight bg-gradient-to-br ${brand.color} bg-clip-text text-transparent`}>
                  {brand.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
              </div>
            </div>
          </motion.div>
          <h3 className="font-bold text-foreground group-hover:text-primary transition-smooth">{brand.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{brand.tagline}</p>
          <div className="mt-3 flex items-center gap-1 text-[10px] uppercase tracking-widest text-primary font-bold opacity-0 group-hover:opacity-100 transition-smooth">
            <Pill className="w-3 h-3" /> View Products
          </div>
        </div>
      </Link>
    </motion.div>
  );
}