import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Pill, FlaskConical, Syringe, Tablets, Droplet, Heart, Eye, Wind } from "lucide-react";
import { categories } from "@/data/products";

const iconMap = { Pill, FlaskConical, Syringe, Capsule: Tablets, Droplet, Heart, Eye, Wind };

export function Categories() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-3"
          >Browse By Category</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >Product <span className="text-gradient-primary">Categories</span></motion.h2>
          <p className="mt-3 text-muted-foreground">8000+ medicines across every therapeutic segment</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Pill;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to="/products"
                  search={{ category: cat.slug }}
                  className="group block p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-elegant transition-smooth hover-lift text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-bounce shadow-glow">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{cat.count}+ items</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}