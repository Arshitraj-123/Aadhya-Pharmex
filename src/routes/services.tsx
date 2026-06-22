import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Truck, Snowflake, Stethoscope, Boxes, Headphones, Network } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "What We Provide — Adhya Pharmex Healthcare" },
      { name: "description", content: "Pharma distribution, bulk supply, cold-chain logistics, and consultation services for retailers and hospitals." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Network, title: "Distribution Network", desc: "Pan-India network covering 12 states and 400+ pharmacy partners." },
  { icon: Boxes, title: "Bulk Supply", desc: "Volume pricing and dedicated account management for hospitals & chains." },
  { icon: Snowflake, title: "Cold Chain Logistics", desc: "Temperature-controlled transport for vaccines, biologicals & insulins." },
  { icon: Truck, title: "Express Delivery", desc: "Same-day and next-day delivery options across major metros." },
  { icon: Stethoscope, title: "Pharma Consultation", desc: "Inventory planning, regulatory advice and product sourcing support." },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated retailer helpline with order tracking and dispute resolution." },
];

function ServicesPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Our Services" title="What We Provide" subtitle="End-to-end pharmaceutical distribution services built for scale and reliability." />
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              whileHover={{ y: -8 }}
              className="group p-7 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-elegant transition-smooth">
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow mb-5 group-hover:scale-110 group-hover:rotate-6 transition-bounce">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}