import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { ProductCard } from "@/components/site/ProductCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";

type Search = { category?: string; page?: number; q?: string };

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
    page: typeof s.page === "number" ? s.page : 1,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Our Products — Adhya Pharmex Healthcare" },
      { name: "description", content: "Browse 8000+ premium medicines: tablets, syrups, injections, capsules, vitamins and more. Order via WhatsApp." },
      { property: "og:title", content: "Our Products — Adhya Pharmex Healthcare" },
      { property: "og:description", content: "8000+ pharmaceutical products across every therapeutic segment." },
    ],
  }),
  component: ProductsPage,
});

const PER_PAGE = 12;

function ProductsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(search.q ?? "");
  const [maxPrice, setMaxPrice] = useState(1000);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search.category && p.category !== search.category) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [search.category, query, maxPrice]);

  const page = search.page ?? 1;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <PageShell>
      <PageHeader eyebrow="Our Catalog" title="Premium Medicine Range" subtitle="Authentic, quality-tested products from 50+ leading pharmaceutical brands." />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Filters</h3>
                </div>
                <div className="relative mb-5">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-9 pr-3 h-10 rounded-lg bg-secondary border border-border focus:border-primary outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</label>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => navigate({ search: { category: undefined, page: 1 } })}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth ${!search.category ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                    >All Categories</button>
                    {categories.map((c) => (
                      <button
                        key={c.slug}
                        onClick={() => navigate({ search: { category: c.slug, page: 1 } })}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth ${search.category === c.slug ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                      >
                        <span>{c.name}</span>
                        <span className="text-xs opacity-70">{c.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Max Price: ₹{maxPrice}</label>
                  <input
                    type="range" min={50} max={1000} step={50}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full mt-3 accent-primary"
                  />
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{paged.length}</span> of {filtered.length} products
                </p>
              </div>
              {paged.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground">No products found. Try adjusting your filters.</div>
              ) : (
                <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paged.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </motion.div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const n = i + 1;
                    return (
                      <Link key={n} to="/products" search={{ ...search, page: n }}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-smooth ${n === page ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-card border border-border hover:border-primary"}`}>
                        {n}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}