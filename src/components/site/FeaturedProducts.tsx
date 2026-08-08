import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { featuredProducts as staticFeaturedProducts } from "@/data/products";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import { resolveProductImage } from "@/data/productImages";
import tablet from "@/assets/product-tablet.jpg";

export function FeaturedProducts() {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Only call the protected products API if the user is logged in
    if (!isAuthenticated) return;

    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        const mapped = res.data.products.map((p: any) => ({
          id: p._id,
          name: p.tradeName,
          brand: p.companyId?.name || "Generic",
          category: p.category || "counter-products",
          image: resolveProductImage(p.tradeName, tablet).image,
          mrp: p.mrp || 10,
          price: p.ptr || 8,
          packing: p.sku || "10 Tabs",
          composition: p.genericName || "Standard",
          description: p.genericName || "No description available"
        }));
        if (mapped.length > 0) {
          setProducts(mapped.slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching live featured products:", err);
      }
    };
    fetchProducts();
  }, [isAuthenticated]);

  const itemsToDisplay = products.length > 0 ? products : staticFeaturedProducts.slice(0, 4);

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
          {itemsToDisplay.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}