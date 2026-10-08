import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { ProductCard } from "@/components/site/ProductCard";
import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { resolveProductImage } from "@/data/productImages";
import tablet from "@/assets/product-tablet.jpg";

type Search = { category?: string; page?: number; q?: string };

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
    page: typeof s.page === "number" ? s.page : 1,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Our Products — Aadya Medicine Agencies" },
      { name: "description", content: "Browse 8000+ premium medicines: tablets, syrups, injections, capsules, vitamins and more. Order via WhatsApp." },
      { property: "og:title", content: "Our Products — Aadya Medicine Agencies" },
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
  const [liveProducts, setLiveProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          packing: p.packing || p.sku || "10 Tabs",
          composition: p.genericName || "Standard",
          description: p.description || p.genericName || "No description available",
          isNewLaunch: Boolean(p.isNewLaunch)
        }));
        setLiveProducts(mapped);
      } catch (err) {
        console.error("Error fetching live products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const [onlyNew, setOnlyNew] = useState(false);

  const catCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    liveProducts.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [liveProducts]);

  const filtered = useMemo(() => {
    return liveProducts.filter((p) => {
      if (onlyNew && !p.isNewLaunch) return false;
      if (search.category && p.category !== search.category) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [liveProducts, onlyNew, search.category, query, maxPrice]);

  const page = search.page ?? 1;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (page >= totalPages - 3) return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

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
                  <div className="mt-3 space-y-1 max-h-[480px] overflow-y-auto pr-1">
                    <button
                      onClick={() => navigate({ search: { category: undefined, page: 1 } })}
                      className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth ${!search.category ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-secondary text-foreground/80"}`}
                    >
                      <span>All Categories</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-background/20 font-semibold">{liveProducts.length}</span>
                    </button>
                    {categories.map((c) => {
                      const count = catCounts[c.slug] ?? c.count ?? 0;
                      return (
                        <button
                          key={c.slug}
                          onClick={() => navigate({ search: { category: c.slug, page: 1 } })}
                          className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth ${search.category === c.slug ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-secondary text-foreground/80"}`}
                        >
                          <span className="truncate pr-2">{c.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${search.category === c.slug ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
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
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <span className="ml-2 text-muted-foreground">Loading products...</span>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <p className="text-sm text-muted-foreground">
                      Showing <span className="font-semibold text-foreground">{paged.length}</span> of {filtered.length} products
                    </p>
                    <button
                      onClick={() => setOnlyNew(!onlyNew)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        onlyNew
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                      }`}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      ✨ Newly Added Products ({liveProducts.filter(p => p.isNewLaunch).length})
                    </button>
                  </div>
                  {paged.length === 0 ? (
                    <div className="py-20 text-center text-muted-foreground">No products found. Try adjusting your filters.</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr gap-6">
                      {paged.map((p, i) => (
                        <ProductCard key={p.id} product={p} index={i} />
                      ))}
                    </div>
                  )}

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
                      {/* Prev Button */}
                      <button
                        disabled={page <= 1}
                        onClick={() => navigate({ search: { ...search, page: Math.max(1, page - 1) } })}
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-smooth bg-card border border-border hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Numbered Buttons */}
                      {getPageNumbers().map((num, i) => {
                        if (num === "...") {
                          return (
                            <span key={`dots-${i}`} className="w-10 h-10 flex items-center justify-center text-sm text-muted-foreground">
                              ...
                            </span>
                          );
                        }
                        const n = num as number;
                        return (
                          <Link
                            key={n}
                            to="/products"
                            search={{ ...search, page: n }}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-smooth ${
                              n === page
                                ? "bg-gradient-primary text-primary-foreground shadow-glow"
                                : "bg-card border border-border hover:border-primary"
                            }`}
                          >
                            {n}
                          </Link>
                        );
                      })}

                      {/* Next Button */}
                      <button
                        disabled={page >= totalPages}
                        onClick={() => navigate({ search: { ...search, page: Math.min(totalPages, page + 1) } })}
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-smooth bg-card border border-border hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Next Page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}