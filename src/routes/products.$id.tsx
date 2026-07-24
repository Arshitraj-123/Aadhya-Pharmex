import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, MessageCircle, Mail, ShieldCheck, Truck, Award } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { getProductById, products } from "@/data/products";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProductById(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Aadya Pharmex Healthcare` },
          { name: "description", content: loaderData.product.description.slice(0, 155) },
          { property: "og:title", content: `${loaderData.product.name} — Aadya Pharmex Healthcare` },
          { property: "og:description", content: loaderData.product.description.slice(0, 155) },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Button asChild className="mt-4"><Link to="/products">Back to Products</Link></Button>
      </div>
    </PageShell>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [zoom, setZoom] = useState(false);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <PageShell>
      <section className="pt-28 pb-12 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-primary">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div
                className="relative aspect-square rounded-3xl overflow-hidden bg-card shadow-elegant cursor-zoom-in p-4 md:p-6"
                onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)}
              >
                <img src={product.image} alt={product.name}
                  className={`w-full h-full object-contain object-center transition-smooth duration-700 ${zoom ? "scale-150" : "scale-100"}`} />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold shadow-md">{discount}% OFF</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
              <div className="flex items-baseline gap-3 mt-5">
                <span className="text-4xl font-bold text-gradient-primary">₹{product.price}</span>
                <span className="text-lg text-muted-foreground line-through">MRP ₹{product.mrp}</span>
                <span className="text-sm font-semibold text-accent">Save ₹{product.mrp - product.price}</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Spec label="Packing" value={product.packing} />
                <Spec label="Category" value={product.category} />
                <Spec label="Composition" value={product.composition} />
              </div>

              <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Button asChild size="lg" variant="whatsapp">
                  <a href={whatsappLink(`Hi, I want to buy ${product.name} (₹${product.price}, ${product.packing})`)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" /> Buy via WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact"><Mail className="w-4 h-4" /> Send Enquiry</Link>
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-4 text-center">
                {[
                  { icon: ShieldCheck, label: "Authentic" },
                  { icon: Truck, label: "Fast Delivery" },
                  { icon: Award, label: "GMP Certified" },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-1">
                    <b.icon className="w-6 h-6 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">{b.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Related <span className="text-gradient-primary">Products</span></h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-secondary">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
      <div className="text-sm font-semibold mt-1 capitalize">{value}</div>
    </div>
  );
}