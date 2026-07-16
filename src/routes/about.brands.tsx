import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/about/brands")({
  head: () => ({
    meta: [
      { title: "Brands We Work With — Aadya Pharmex Healthcare" },
      { name: "description", content: "Authorized distributor for 50+ leading pharmaceutical brands including Cipla, Sun Pharma, Lupin and more." },
    ],
  }),
  component: BrandsPage,
});

const brands = [
  "Cipla", "Sun Pharma", "Dr. Reddy's", "Lupin", "Zydus Cadila", "Mankind", "Torrent",
  "Glenmark", "Alkem", "Aurobindo", "Biocon", "Pfizer India", "GSK", "Sanofi",
  "Abbott", "Novartis", "Roche", "AstraZeneca", "Merck", "Boehringer", "USV",
  "Intas", "Ipca", "Wockhardt", "Bayer", "Himalaya", "Dabur Pharma", "Emcure",
  "Ajanta Pharma", "Cadila Healthcare",
];

function BrandsPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Our Partners" title="50+ Trusted Brands" subtitle="Authorized distributor for India's leading pharmaceutical manufacturers." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {brands.map((b, i) => (
              <motion.div key={b}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: (i % 10) * 0.04 }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="aspect-[3/2] rounded-xl bg-card border border-border/50 flex items-center justify-center font-bold text-foreground/80 hover:text-primary hover:border-primary/40 hover:shadow-elegant transition-smooth text-center px-3">
                {b}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}