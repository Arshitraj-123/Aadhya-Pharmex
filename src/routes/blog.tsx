import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import hero from "@/assets/hero-pharma.jpg";
import callback from "@/assets/callback-pharma.jpg";
import tablet from "@/assets/product-tablet.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blogs & News — Aadya Pharmex Healthcare" },
      { name: "description", content: "Industry insights, regulatory updates and pharmaceutical distribution news from Aadya Pharmex." },
    ],
  }),
  component: BlogPage,
});

const posts = [
  { id: "1", title: "How Cold Chain Logistics Are Transforming Vaccine Distribution", date: "Apr 12, 2026", excerpt: "Inside the temperature-controlled networks that make modern vaccine delivery possible.", img: hero, tag: "Logistics" },
  { id: "2", title: "Schedule M Compliance: A 2026 Update", date: "Mar 28, 2026", excerpt: "Key changes in pharmaceutical regulation every distributor needs to know.", img: callback, tag: "Regulation" },
  { id: "3", title: "The Rise of B2B Pharmacy Portals", date: "Mar 14, 2026", excerpt: "Why digital ordering is becoming standard for retail pharmacies.", img: tablet, tag: "Technology" },
  { id: "4", title: "Authenticity in the Age of Generic Medicines", date: "Feb 22, 2026", excerpt: "Building trust through batch traceability and supply chain transparency.", img: hero, tag: "Quality" },
  { id: "5", title: "Expanding Access to Rural Healthcare", date: "Feb 08, 2026", excerpt: "How tier-3 distribution is changing patient outcomes outside metro cities.", img: callback, tag: "Industry" },
  { id: "6", title: "Storage Standards for Biologicals & Insulins", date: "Jan 30, 2026", excerpt: "A practical guide to compliant cold storage at the pharmacy level.", img: tablet, tag: "Operations" },
];

function BlogPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Blogs & News" title="Insights from the Industry" subtitle="Updates, perspectives and best practices from our pharmacists and operations team." />
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.article key={p.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl overflow-hidden bg-card border border-border/50 shadow-md hover:shadow-elegant transition-smooth">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider">{p.tag}</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="w-3 h-3" /> {p.date}</div>
                <h3 className="font-semibold text-lg mt-2 group-hover:text-primary transition-smooth line-clamp-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
                <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4 group-hover:gap-2 transition-smooth">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}