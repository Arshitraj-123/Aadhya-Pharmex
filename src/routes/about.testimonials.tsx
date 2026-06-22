import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/about/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Adhya Pharmex Healthcare" },
      { name: "description", content: "Read what our 400+ retail partners and hospitals say about working with Adhya Pharmex Healthcare." },
    ],
  }),
  component: TestimonialsPage,
});

const items = [
  { name: "Dr. Anita Sharma", role: "Owner, Apex Pharmacy", text: "Adhya Pharmex has been our primary distributor for 6 years. Their on-time delivery and authentic stock have transformed how we serve our patients." },
  { name: "Suresh Patel", role: "Pharmacist, Patel Medicals", text: "What sets them apart is the cold-chain reliability — vaccines and biologicals always arrive in perfect condition." },
  { name: "Dr. Rakesh Kumar", role: "Director, City Hospital", text: "We trust Adhya Pharmex for hospital-grade injectables. Quality is consistent and pricing is competitive." },
  { name: "Priya Iyer", role: "Owner, Wellness Mart", text: "The B2B portal makes ordering effortless. Real-time tracking is a game-changer for inventory management." },
  { name: "Mohammed Faisal", role: "Pharmacy Chain Manager", text: "Across 14 stores, Adhya Pharmex is our most dependable partner. Zero compromises on authenticity." },
  { name: "Dr. Lakshmi Rao", role: "Clinical Pharmacologist", text: "I recommend Adhya Pharmex to every clinic I consult for. Their compliance and traceability are exemplary." },
];

function TestimonialsPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Trusted by Hundreds" title="What Our Partners Say" subtitle="Stories from the retailers, doctors and hospitals we serve every day." />
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }} className="p-7 rounded-2xl bg-card border border-border/50 shadow-md hover:shadow-elegant">
              <Quote className="w-8 h-8 text-accent mb-3" />
              <div className="flex gap-0.5 mb-3">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-4 h-4 fill-accent text-accent" />)}</div>
              <p className="text-foreground leading-relaxed">"{t.text}"</p>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}