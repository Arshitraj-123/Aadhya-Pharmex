import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, MapPin, Package } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { getBrandBySlug, getProductsForBrand } from "@/data/brands";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/brands/$slug")({
  loader: ({ params }) => {
    const brand = getBrandBySlug(params.slug);
    if (!brand) throw notFound();
    return { brand, products: getProductsForBrand(brand.name) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.brand.name} Medicines — Adhya Pharmex Healthcare` },
          { name: "description", content: `Browse authentic ${loaderData.brand.name} medicines distributed by Adhya Pharmex Healthcare. ${loaderData.brand.tagline}.` },
          { property: "og:title", content: `${loaderData.brand.name} — Adhya Pharmex Healthcare` },
          { property: "og:description", content: loaderData.brand.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">Brand not found</h1>
        <Button asChild className="mt-4"><Link to="/brands">Back to Brands</Link></Button>
      </div>
    </PageShell>
  ),
  component: BrandPage,
});

function BrandPage() {
  const { brand, products } = Route.useLoaderData();

  return (
    <PageShell>
      {/* Hero Banner */}
      <section className={`relative pt-36 pb-20 overflow-hidden bg-gradient-to-br ${brand.color}`}>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/40 blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-white/30 blur-3xl animate-float" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.nav
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-white/80 mb-6"
          >
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/brands" className="hover:text-white">Brands</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">{brand.name}</span>
          </motion.nav>

          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-32 h-32 rounded-full bg-white shadow-elegant flex items-center justify-center shrink-0"
            >
              <span className={`text-4xl font-extrabold bg-gradient-to-br ${brand.color} bg-clip-text text-transparent`}>
                {brand.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center md:text-left text-white"
            >
              <div className="text-xs uppercase tracking-[0.3em] font-semibold opacity-80">{brand.tagline}</div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-2">{brand.name}</h1>
              <p className="mt-3 max-w-2xl text-white/90">{brand.description}</p>
              <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-3">
                <Pill icon={Calendar} label={`Founded ${brand.founded}`} />
                <Pill icon={MapPin} label={brand.country} />
                <Pill icon={Package} label={`${products.length} Products`} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase mb-3">Catalog</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {brand.name} <span className="text-gradient-primary">Medicines</span>
              </h2>
            </div>
            <Button asChild variant="outline"><Link to="/brands">All Brands</Link></Button>
          </div>

          {products.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">No products listed for this brand yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(products as Product[]).map((p: Product, i: number) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Pill({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-xs font-semibold border border-white/30">
      <Icon className="w-3.5 h-3.5" /> {label}
    </div>
  );
}