import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { featuredProducts } from "@/data/products";

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase mb-3"
            >Featured Range</motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              Best-Selling <span className="text-gradient-primary">Medicines</span>
            </motion.h2>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link to="/products">View All Products <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}