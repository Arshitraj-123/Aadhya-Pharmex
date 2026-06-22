import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, ShieldCheck, BadgeCheck, FileCheck } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/about/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications & Accreditations — Adhya Pharmex Healthcare" },
      { name: "description", content: "WHO-GMP, ISO 9001:2015, FSSAI and more — our complete list of pharmaceutical certifications." },
    ],
  }),
  component: CertPage,
});

const certs = [
  { icon: ShieldCheck, name: "WHO-GMP", desc: "World Health Organization Good Manufacturing Practices" },
  { icon: Award, name: "ISO 9001:2015", desc: "Quality Management System Certified" },
  { icon: BadgeCheck, name: "ISO 14001:2015", desc: "Environmental Management System" },
  { icon: FileCheck, name: "FSSAI Licensed", desc: "Food Safety & Standards Authority of India" },
  { icon: ShieldCheck, name: "GDP Certified", desc: "Good Distribution Practices for Pharmaceuticals" },
  { icon: Award, name: "Schedule M Compliant", desc: "Drugs & Cosmetics Act compliance" },
];

function CertPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Quality Assured" title="Our Certifications" subtitle="Globally recognized accreditations that back every shipment we deliver." />
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {certs.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6, rotate: -1 }} className="p-7 rounded-2xl bg-card border border-border/50 shadow-md hover:shadow-elegant text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow mb-4">
                <c.icon className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-lg">{c.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}