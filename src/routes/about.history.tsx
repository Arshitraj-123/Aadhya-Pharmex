import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/about/history")({
  head: () => ({
    meta: [
      { title: "Company History — Aadya Pharmex Healthcare" },
      { name: "description", content: "From a single-city distributor in 2003 to a pan-India pharmaceutical leader serving 400+ retailers." },
    ],
  }),
  component: HistoryPage,
});

const milestones = [
  { year: "2003", title: "Founded in Mumbai", desc: "Started as a regional distributor with 12 partner pharmacies." },
  { year: "2008", title: "Multi-state Expansion", desc: "Reached 4 states and crossed 1000 SKUs in our catalog." },
  { year: "2013", title: "WHO-GMP Certification", desc: "Became one of the first regional distributors with WHO-GMP accreditation." },
  { year: "2017", title: "Cold Chain Network", desc: "Launched temperature-controlled logistics for biologicals & vaccines." },
  { year: "2021", title: "Digital Transformation", desc: "Introduced real-time order tracking and a B2B retailer portal." },
  { year: "2024", title: "8000+ Products", desc: "Now serving 400+ retailers across 12 states with 50+ partner brands." },
];

function HistoryPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Our Journey" title="Two Decades of Growth" subtitle="Milestones that shaped Aadya Pharmex Healthcare." />
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />
            {milestones.map((m, i) => (
              <motion.div key={m.year}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`relative mb-10 flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row gap-6`}>
                <div className="flex-1 md:text-right md:pr-10" style={{ textAlign: i % 2 === 0 ? undefined : "left" }}>
                  {i % 2 === 0 && (<MilestoneCard m={m} />)}
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-primary border-4 border-background shadow-glow z-10 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="flex-1 md:pl-10 pl-12">
                  {i % 2 !== 0 && (<MilestoneCard m={m} />)}
                  {i % 2 === 0 && <div className="md:hidden"><MilestoneCard m={m} /></div>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function MilestoneCard({ m }: { m: { year: string; title: string; desc: string } }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-md">
      <div className="text-3xl font-bold text-gradient-primary">{m.year}</div>
      <h3 className="font-semibold text-lg mt-1">{m.title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{m.desc}</p>
    </div>
  );
}