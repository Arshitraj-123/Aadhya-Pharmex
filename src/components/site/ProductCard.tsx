import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";
import type { Product } from "@/data/products";
import { ProductDetailModal } from "@/components/site/ProductDetailModal";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-elegant transition-smooth border border-border/50"
    >
      <button type="button" onClick={() => setOpen(true)} className="block w-full text-left">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary to-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent/90 backdrop-blur text-accent-foreground text-[10px] font-bold uppercase tracking-wider">
            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        </div>
      </button>
      <div className="p-4">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{product.brand}</div>
        <button type="button" onClick={() => setOpen(true)} className="text-left w-full">
          <h3 className="font-semibold text-foreground mt-1 line-clamp-1 group-hover:text-primary transition-smooth">{product.name}</h3>
        </button>
        <p className="text-xs text-muted-foreground mt-1">{product.packing}</p>
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-xl font-bold text-primary">₹{product.price}</span>
          <span className="text-xs text-muted-foreground line-through">₹{product.mrp}</span>
        </div>
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline" className="flex-1" onClick={() => setOpen(true)}>
            <Eye className="w-3.5 h-3.5" />
            View
          </Button>
          <Button asChild size="sm" variant="whatsapp" className="flex-1">
            <a href={whatsappLink(`Hi, I want to order ${product.name} (₹${product.price})`)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-3.5 h-3.5" />
              Buy
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
    <ProductDetailModal product={product} open={open} onClose={() => setOpen(false)} />
    </>
  );
}